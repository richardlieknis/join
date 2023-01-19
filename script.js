"use strict";

let users = [];
let tasks = [];
let contacts = [];

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