"use strict";

let users = [];
let tasks = [];
let contacts = [
    {
        id: 1,
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
    },
    {
        id: 2,
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "MV",
    },
    {
        id: 3,
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "AS",
    },
    {
        id: 4,
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "DE",
    },
];
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
    }
}