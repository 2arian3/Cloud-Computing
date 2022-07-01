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

    fetch(`${window.location.href}/create`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            note_content: note_content
        })
    }).then(res => {
        return res.json();
    }).then(data => {
        document.querySelector('.link').value = window.location.href + data['note_address'];
    });
});