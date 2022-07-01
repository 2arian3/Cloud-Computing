const yes_button = document.querySelector('.create_note_yes');
const no_button = document.querySelector('.create_note_no');


no_button.addEventListener('click', function () {
    // TODO fix
    const note_address = window.location.href.split('/')[window.location.href.split('/').length-1];
    window.location.href = window.location.href.replace(`/${note_address}`, '');
});

yes_button.addEventListener('click', function () {
    document.querySelector('.note').style.display = 'block';
    document.querySelector('.create_note_no').style.display = 'none';
    document.querySelector('.create_note_yes').style.display = 'none';
    document.querySelector('h3').innerText = 'Note Content';
    fetch(`${window.location.href}/remove`).then(res => {
        console.log(res);
    })
});