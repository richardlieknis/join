"use strict"
const colors = ["#ff7a00", "#9327ff", "#29abe2", "#fc71ff", "#02cf2f", "#af1616", "#462f8a"]
let currentColor = 0;

function createContact() {
    const name = document.getElementById('c-new-name');
    const email = document.getElementById('c-new-email');
    const tel = document.getElementById('c-new-tel');
    const color = getColor();
    const initials = getInitials(name);

    pushToArray(name.value, email.value, tel.value, color, initials);
    cleanInputFields(name, email, tel);
}

function cleanInputFields(name, email, tel) {
    name.value = "";
    email.value = "";
    tel.value = "";
}

function pushToArray(name, email, tel, color, initials) {
    const contact = {
        name: name,
        email: email,
        phone: tel,
        color: color,
        initials: initials
    }
    contacts.push(contact);
}

function getColor() {
    let color = colors[currentColor];
    if (currentColor < colors.length - 1) {
        currentColor++
    }
    else {
        currentColor = 0;
    }
    return color;
}

function getInitials(name) {
    const names = name.split(" ");
    const firstName = names[0];
    let lastName = names[names.length - 1];
    let initials = "";
    let firstLetter = firstName.charAt(0);
    let secondLetter = lastName.charAt(0);

    if (firstName == lastName) {
        initials = firstLetter;
    }
    else {
        initials = firstLetter + secondLetter;
    }
    return initials;
}