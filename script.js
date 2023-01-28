"use strict";

let users = [];
let tasks = [];
let contacts = [];
let categories = [
    {
        'name': 'design',
        'colorNumber': 1
    },
    {
        'name': 'sales',
        'colorNumber': 2
    },
    {
        'name': 'backoffice',
        'colorNumber': 3
    },
    {
        'name': 'media',
        'colorNumber': 4
    },
    {
        'name': 'marketing',
        'colorNumber': 5
    },
];

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
    } if (window.innerWidth <= 800) {
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