function loadSignUp() {
    let signUp = document.getElementById('login-page');

    signUp.innerHTML = '';
    signUp.innerHTML += signUpTemplate();
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
        <input id="name" class="input-login background-image-name" placeholder="Name" type="text">
        <input id="email" class="input-login background-image-email" placeholder="Email" type="email" src="src/img/email.svg">
        <input id="password" class="input-login background-image-password" placeholder="Password" type="password" src="src/img/password.svg">
    <div class="continue-btn-container">
        <button class="login-btn">Sign up</button>
    </div>
    </form>`;
}