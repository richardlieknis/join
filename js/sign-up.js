async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
}

const urlParams = new URLSearchParams(window.location.search);
const msg = urlParams.get('msg');
if (msg) {
    document.getElementById('sign-up-msg').innerHTML = msg;
} else{
    document.getElementById('sign-up-msg').style = 'display: none'
}

function loadSignUp() {
    let signUp = document.getElementById('login-page');
    signUp.innerHTML = '';
    signUp.innerHTML += signUpTemplate();
}

async function addUser() {
    let user = document.getElementById('name');
    let email = document.getElementById('email');
    let password = document.getElementById('password');
    users.push({name: user.value, email: email.value, password: password.value});
    await backend.setItem('users', JSON.stringify(users));
    window.location.href = 'index.html?msg=<b>You have successfully registered!</b>';
}

function backToLogin() {
    window.location.href = 'index.html';
}

function signUpTemplate() {
    return /*html*/`
    <div class="border-bottom display-center">
        <img onclick="backToLogin()" class="position-arrow" src="../src/img/blueBackArrow.svg">
        <div>
            <h1>Sign up</h1>
        </div>
    </div>
    <form onsubmit="addUser(); return false;">
        <input required id="name" class="input-login background-image-name" placeholder="Name" type="text">
        <input required id="email" class="input-login background-image-email" placeholder="Email" type="email" src="src/img/email.svg">
        <input required id="password" class="input-login background-image-password" placeholder="Password" type="password" src="src/img/password.svg">
    <div class="continue-btn-container">
        <button class="login-btn">Sign up</button>
    </div>
    </form>`;
}