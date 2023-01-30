/**
 * This function load the forgot password page
 * 
 */
function forgotPassword() {
    document.getElementById('login-page').innerHTML = '';
    document.getElementById('login-page').innerHTML += forgotPasswordTemplate();
    document.getElementById('sign-up').classList.add('d-none');
}
/**
 * This function is used to send the mail with a password reset link to the user
 * 
 * 
 */
async function sendMail(event) {
    event.preventDefault();
    let formData = new FormData(event.target); // Create a FormData based on Form Element in HTML
    let response = await action(formData);
    if (response.ok) {
        document.getElementById('email-send').innerHTML += /*html*/`<div class="send-mail">
            <img src="../src/img/send-mail.svg">
        </div>`;
    }
    setTimeout(function(){location.href='index.html'} , 3000);   
}

function action(formData) {
    const input = 'https://gruppe-join-422.developerakademie.net/join/send_mail.php';
    const requestInit = {
        method: 'post',
        body: formData
    };

    return fetch(
        input,
        requestInit
    );
}
/**
 * This function is need to reset your password
 * 
 */
async function resetPassword() {
    let newPassword = document.getElementById('new-password');
    let confirmPassword = document.getElementById('confirm-password');
    let email = getEmailUrlParameters();

    let user = users.find(u => u.email === email);
    if (user.email === email) {
        if (newPassword.value === confirmPassword.value) {
            user.password = newPassword.value;
            await backend.setItem('users', JSON.stringify(users));
            console.log('Password reset successful!');
            document.getElementById('successful-reset').innerHTML += /*html*/`<div class="send-mail">
                <img src="../src/img/resetPassword.svg">
        </div>`
            setTimeout(function(){location.href = '../index.html'} , 3000);
        } else {
            console.log('Passwords do not match');
            newPassword.value = '';
            confirmPassword.value = '';
        }
    }
}
/**
 * This function is need to get the URL parameter from the email link, to reset your password
 * 
 */
function getEmailUrlParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function forgotPasswordTemplate() {
    return /*html*/`
    <div class="border-bottom display-center">
        <img onclick="backToLogin()" class="position-arrow" src="src/img/blueBackArrow.svg">
        <div class="forgot-password">
            <h1>I forgot my password</h1>
        </div>
    </div>
        <span style="text-align: center">
            <b>Don't worry! We will send you an email with the instructions to <br>reset your password.</b>
        </span>
        <form class="form-login-width" onsubmit="sendMail(event)">
            <input id="forgot-password" required class="input-login background-image-email" placeholder="Email" name="email" type="email" src="src/img/email.svg">
        <div class="continue-btn-container">
            <button id="mail-btn" type="submit" value="Submit" style="width: 264px; height: 51px" class="btn-primary">Send me the email</button>
        </div>
        </form>`;
}