function login() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    let user = users.find(u => u.email == email.value && u.password == password.value);
    console.log(user);
    if(user) {
        log('User gefunden!');
        window.location.href = '../html/summary.html';
    }else {
        document.getElementById('not-exist').innerHTML = /*html*/`<span style="color: red; font-size: 14px">This user does not exist</span>`;
    }
}

function guest() {
    window.location.href = '../html/summary.html';
}

