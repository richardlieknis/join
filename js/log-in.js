setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

function login() {
    let email = document.getElementById('email-login');
    let password = document.getElementById('password-login');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    if(user) {
        console.log('User gefunden!');
        window.location.href = '../html/summary.html';
    }else {
        document.getElementById('not-exist').innerHTML = /*html*/`<span style="color: red; font-size: 14px">This user does not exist</span>`;
        email.value = '';
        password.value = '';
    }
}

function guest() {
    window.location.href = '../html/summary.html';
}

