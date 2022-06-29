import config from './config.js'

const port = config.port

const yes_button = document.querySelector('.create_note_yes');
const no_button = document.querySelector('.create_note_no');


no_button.addEventListener('click', function () {
    window.location.href = `http://localhost:${port}`;
});

yes_button.addEventListener('click', function () {
    document.querySelector('.note').style.display = 'block';
    document.querySelector('.create_note_no').style.display = 'none';
    document.querySelector('.create_note_yes').style.display = 'none';
    document.querySelector('h3').innerText = 'Note Content';

    const note_address = window.location.href.split('/')[window.location.href.split('/').length - 1];

    fetch(`http://localhost:${port}/${note_address}/remove`).then(res => {
        console.log(res);
    })
});