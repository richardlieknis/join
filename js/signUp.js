function signUp() {
    let signUp = document.getElementById('login-page');

    signUp.innerHTML = '';
    signUp.innerHTML += signUpTemplate();
}

function backToLogin() {
    document.getElementById('login-page').innerHTML = '';
    document.getElementById('login-page').innerHTML += logInTemplate();
}

function signUpTemplate() {
    return /*html*/`
    <div class="border-bottom display-center">
        <img onclick="backToLogin()" class="position-arrow" src="../src/img/blueBackArrow.svg">
        <div>
            <h1>Sign up</h1>
        </div>
    </div>
        <input class="input-login background-image-name" placeholder="Name" type="text">
        <input class="input-login background-image-email" placeholder="Email" type="email" src="src/img/email.svg">
        <input class="input-login background-image-password" placeholder="Password" type="password" src="src/img/password.svg">
        <div class="continue-btn-container">
            <button class="login-btn">Sign up</button>
    </div>`;
}

function logInTemplate() {
    return /*html*/`
    <div class="border-bottom display-center">
        <div>
            <h1>Log in</h1>
        </div>
    </div>
    <input class="input-login background-image-email" placeholder="Email" type="email"
        src="src/img/email.svg">
    <input class="input-login background-image-password" placeholder="Password" type="password"
        src="src/img/password.svg">
    <div class="forgot-password-container">
        <div class="remember-me">
            <div class="remember-me-box"></div>
            <span>Remember me</span>
        </div>
        <div>
            <a onclick="forgotPassword()" class="forgot-password" href="#">Forgot my password</a>
        </div>
    </div>
    <div class="continue-btn-container">
        <button class="login-btn">Log in</button>
        <button class="guest-btn">Guest Log in</button>
    </div>`;
}