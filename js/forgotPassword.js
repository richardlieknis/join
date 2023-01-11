function forgotPassword () {
    document.getElementById('login-page').innerHTML = '';
    document.getElementById('login-page').style = 'width: 826px; height: 462px'
    document.getElementById('login-page').innerHTML += forgotPasswordTemplate();
}

function forgotPasswordTemplate() {
    return /*html*/`
    <div class="border-bottom display-center">
        <img onclick="backToLogin()" class="position-arrow" src="../src/img/blueBackArrow.svg">
        <div>
            <h1 style="width: 626px">I forgot my password</h1>
        </div>
    </div>
        <span style="text-align: center">
            <b>Don't worry! We will send you an email with the instructions to <br>reset your password.</b>
        </span>
        <form>
            <input class="input-login background-image-email" placeholder="Email" type="email" src="src/img/email.svg">
        <div class="continue-btn-container">
            <button style="width: 264px;" class="login-btn">Send me the email</button>
        </div>
        </form>`;
}