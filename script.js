"use strict";

let users = [];
let tasks = [];
let contacts = [];
<<<<<<< HEAD
let loggedUser;

async function saveTasksToBackend() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

async function loadTasksFromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function saveContactsToBackend() {
    await backend.setItem('contacts', JSON.stringify(contacts));
}

async function loadContactsFromBackend() {
    await downloadFromServer();
    contacts = JSON.parse(backend.getItem('contacts')) || [];
}
=======
>>>>>>> 252eb0b6168b7e61aad353557e175439dd87499d
