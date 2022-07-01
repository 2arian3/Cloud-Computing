import string
import random
import flask
import redis
import json


def get_config():
    with open('./config.json', 'r') as f:
        return json.load(f)


config = get_config()
app = flask.Flask(__name__)
redis_db = redis.Redis(host=config['db_host'], port=config['db_port'],
                       password=config['db_password'], db=config['db_name'])


@app.route('/', methods=['GET'])
def index():
    return flask.render_template('index.html')


@app.route('/create', methods=['POST'])
def create():
    note_content = flask.request.json['note_content']
    note_address = ''.join([random.choice(string.ascii_letters + string.digits) for _ in range(12)]).lower()
    redis_db.set(note_address, note_content, ex=int(get_config()['expiration']))
    return flask.jsonify({'note_address': note_address})


@app.route('/<note_address>', methods=['GET'])
def show(note_address):
    note = redis_db.get(note_address)
    if note is None:
        return flask.redirect('/')
    return flask.render_template('remove.html', note=note.decode('utf-8'))


@app.route('/<note_address>/remove', methods=['GET'])
def remove(note_address):
    redis_db.delete(note_address)
    return flask.jsonify({})


app.run(host=config['host'], port=config['port'])
