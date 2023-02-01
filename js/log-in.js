setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

/**
 * This function load all Users from the Backend
 * 
 */
async function loadUsers() {
    await downloadFromServer();
    users = JSON.parse(backend.getItem('users')) || [];
    email = getEmailUrlParameters();
}

/**
 * This function is used for the login 
 * 
 */
function login() {
    let email = document.getElementById('email-login');
    let password = document.getElementById('password-login');
    let user = users.find(u => u.email.toLowerCase() == email.value.toLowerCase() && u.password == password.value);
    if (user) {
        saveLoggedUserLocal(user);
        window.location.href = 'html/summary.html';
    } else {
        document.getElementById('not-exist').innerHTML = /*html*/`<span style="color: red; font-size: 14px">This user does not exist</span>`;
        email.value = '';
        password.value = '';
    }
    isRememberMe();
}
/**
 *This function saved the logged User in the local storage
 * 
 * @param {*} user - this is the name from the logged user
 */
function saveLoggedUserLocal(user) {
    loggedUser = user.name;
    localStorage.setItem('loggedUser', loggedUser);
}
/**
 * This function is used for the log-in as guest
 * 
 */
async function guest() {
    document.getElementById('email-login').value = 'guest@join-422.com';
    document.getElementById('password-login').value = 'guest1234';
    loggedUser = 'Guest';
    localStorage.setItem('loggedUser', loggedUser);
    document.getElementById('not-exist').style = 'display: none';
    window.location.href = 'html/summary.html';
}

function backToLogin() {
    window.location.href = '../index.html';
}
