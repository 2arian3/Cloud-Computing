import config from './config.js'
const port = config.port

const create_button = document.querySelector('.create_note');

create_button.addEventListener('click', function () {
    const note_content = document.querySelector('.note').value;
    console.log(note_content);
    document.querySelector('.note').style.display = 'none';
    document.querySelector('.create_note').style.display = 'none';
    document.querySelector('.main').style.height = '100px';
    document.querySelector('.link_ready').style.display = 'block';
    document.querySelector('.link').style.display = 'block';
    document.querySelector('.top').style.flexDirection = 'column';
    document.querySelector('.top').style.height = '80%';

    fetch(`http://localhost:${port}/create`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            note_content: note_content
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        console.log(data['note_address']);
        document.querySelector('.link').value = data['note_address'];
    });
});