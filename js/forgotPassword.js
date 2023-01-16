function forgotPassword() {
    document.getElementById('login-page').innerHTML = '';
    document.getElementById('login-page').style = 'width: 826px; height: 462px'
    document.getElementById('login-page').innerHTML += forgotPasswordTemplate();
}

async function onSubmit(event) {
    event.preventDefault(); 
    let formData = new FormData(event.target); // Create a FormData based on Form Element in HTML
    let response = await action(formData);
    if(response.ok)
        alert('Email was send!');
    else
        alert('Email not send!')
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

function getEmailUrlParameters() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const email = urlParams.get('email');
    return email;
}

function sendData() {

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
        <form onsubmit="onSubmit(event)">
            <input id="forgot-password" required class="input-login background-image-email" placeholder="Email" name="email" type="email" src="src/img/email.svg">
        <div class="continue-btn-container">
            <button type="submit" value="Submit" style="width: 264px; height: 51px" class="btn-primary">Send me the email</button>
        </div>
        </form>`;
}