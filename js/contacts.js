"use strict";

let sortedContacts = [];
let highlightedContact;

/**
 * This function is used to hightlight a contact at the contact list by clicking on it.
 * 
 * @param {number} contactId - This is the ID of the contact
 */
function highlightContact(contactId) {
    unHighlightContact(contactId);
    let div = document.getElementById(`c-${contactId}`);
    let initial = document.getElementById(`c-i-${contactId}`);
    let name = document.getElementById(`c-name-${contactId}`);

    div.classList.add('c-contact-overview-2');
    div.classList.remove('c-contact-overview');
    initial.classList.add('c-i-small-border');
    name.classList.add('c-list-name2');
    highlightedContact = contactId;

    displayContactDetails(contactId);
}

function unHighlightContact(contactId) {
    if (highlightedContact) {
        console.log(contactId);
        let div = document.getElementById(`c-${highlightedContact}`);
        let initial = document.getElementById(`c-i-${highlightedContact}`);
        let name = document.getElementById(`c-name-${highlightedContact}`);

        div.classList.remove('c-contact-overview-2');
        div.classList.add('c-contact-overview');
        initial.classList.remove('c-i-small-border');
        name.classList.remove('c-list-name2');
    }
}

function removeHightlightContact() {
    // array.forEach(element => {

    // });
    // let allContactIds =
}

async function renderContacts() {
    await loadContactsFromBackend();
    const contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';
    sortContacts();
    contactList.innerHTML = generateContactList();
}

function sortContacts() {
    contacts.sort(function (a, b) {
        return compareStrings(a.name, b.name);
    })
}

function compareStrings(a, b) {
    a = a.toLowerCase();
    b = b.toLowerCase();

    return (a < b) ? -1 : (a > b) ? 1 : 0;
}

function generateContactList() {
    let html = addButtonAtContactList();

    let firstLetter = '';
    contacts.forEach(contact => {
        const id = contact.id;
        const name = contact.name;
        const email = contact.email;
        const initials = contact.initials;
        const color = contact.color;
        if (firstLetter != Array.from(name)[0]) {
            firstLetter = Array.from(name)[0].toUpperCase();
            html += adSectionLetter(firstLetter);
        }

        html += contactListHtml(id, name, email, initials, color);
    });
    return html;
}

function showContactDetail() {
        document.getElementById('c-view').style = 'display: unset';
        document.getElementById('addContactBtn').style = 'display: none';
        document.getElementById('contact-list').classList.add('width-unset'); 
}

function goBackToContacts() {
    document.getElementById('c-view').style = 'display: none;';
    document.getElementById('addContactBtn').style = 'display: unset';
    document.getElementById('contact-list').classList.remove('width-unset');  
}

function displayContactDetails(contactId) {
    if (contactsDetailsDisplayed == false) {
        let contactDetails = document.getElementById("contactDetails");
        contactDetails.classList.add("slideIn");
        contactDetails.classList.remove("d-none");
        contactsDetailsDisplayed = true;
    }

    changeDisplayedContactDetails(contactId);
}

function notDisplayContactDetails() {
    if (contactsDetailsDisplayed == true) {
        let contactDetails = document.getElementById("contactDetails");
        contactDetails.classList.remove("slideIn");
        contactDetails.classList.add("d-none");
        contactsDetailsDisplayed = false;
    }
}

function changeDisplayedContactDetails(contactId) {
    let index = getIndexOfArray(contacts, contactId);
    removeClassWithPrefix("c-f-details-initials", "color-");
    document.getElementById('c-f-details-name').innerHTML = contacts[index].name;
    document.getElementById('c-f-details-initials').innerHTML = contacts[index].initials;
    document.getElementById('c-f-details-initials').classList.add(`color-${contacts[index].color}`);
    document.getElementById('openEditContact').setAttribute("onclick", `openEditContact(${contactId})`);
    document.getElementById('contacts-addTask').setAttribute("onclick", `createContactTask(${contactId})`);

    changeDisplayedEmail(index);
    changeDisplayedPhone(index);
}

function changeDisplayedEmail(index) {
    if (contacts[index].email) {
        document.getElementById('c-floating-email').innerHTML = contacts[index].email;
        document.getElementById('c-floating-email-header').innerHTML = "Email";
    }
    else {
        document.getElementById('c-floating-email').innerHTML = "";
        document.getElementById('c-floating-email-header').innerHTML = "";
    }
}

function changeDisplayedPhone(index) {
    if (contacts[index].phone) {
        document.getElementById('c-floating-tel').innerHTML = contacts[index].phone;
        document.getElementById('c-floating-tel-header').innerHTML = "Phone";
    }
    else {
        document.getElementById('c-floating-tel').innerHTML = "";
        document.getElementById('c-floating-tel-header').innerHTML = "";
    }
}

function createContactTask(contactId) {
    openAddTask('todo');
    document.getElementById('c-view').style = 'display: none;';
    document.getElementById('addContactBtn').style = 'display: unset';
    document.getElementById('contact-list').style = 'width: 100%';
    document.getElementById('task-input-assignedTo').selected
    // document.getElementById('task-input-assignedTo').value = contacts[getIndexOfArray(contacts, contactId)].name;

    setOption(document.getElementById('task-input-assignedTo'), `${contactId}`);
}

function setOption(selectElement, value) {
    let options = selectElement.options;
    for (var i = 0, optionsLength = options.length; i < optionsLength; i++) {
        if (options[i].value == value) {
            selectElement.selectedIndex = i;
            return true;
        }
    }
    return false;
}