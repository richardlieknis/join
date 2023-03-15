"use strict";

let users = [];
let tasks = [];
let contacts = [];
let categories = [];

setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

function getIndexOfArray(array, id) {
    let index;
    for (let i = 0; i < array.length; i++) {

        if (id == array[i].id) index = i;

    }
    return index;
}

function logoutPopUp() {
    let userMenu = document.getElementById('user-menu');
    if (userMenu.classList.contains('d-none')) {
        userMenu.classList.remove('d-none');
    } else {
        userMenu.classList.add('d-none');
    }
    if (window.innerWidth <= 800) {
        let mobileMenu = document.getElementById('mobile-menu');
        if (mobileMenu.classList.contains('d-none')) {
            mobileMenu.classList.remove('d-none');
        } else {
            mobileMenu.classList.add('d-none');
        }
    }
}

function removeClassWithPrefix(divId, prefix) {
    let div = document.getElementById(divId);
    let classes = div.className.split(" ");
    let newClasses = classes.filter(c => !c.startsWith(prefix));
    div.className = newClasses.join(" ");
}

function showPopup(msg) {
    document.body.innerHTML += renderPopup(msg);

    let popup = document.getElementById('createdPopup');
    popup.classList.remove('d-none');

    setTimeout(() => {
        popup.remove();
    }, 3000)
}

function renderPopup(msg) {
    return `
        <div id="createdPopup" class="d-none">${msg}</div>
    `;

}