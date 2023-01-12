"use strict";

/**
 * This function is used to hightlight a contact at the contact list by clicking on it.
 * 
 * @param {number} contactId - This is the ID of the contact
 */
function highlightContact(contactId) {
    let div = document.getElementById(`c-${contactId}`);
    let initial = document.getElementById(`c-i-${contactId}`);
    let name = document.getElementById(`c-name-${contactId}`);

    div.classList.add('c-contact-overview-2');
    div.classList.remove('c-contact-overview');
    initial.classList.add('c-i-small-border');
    name.classList.add('c-list-name2');
}

function removeHightlightContact() {
    // array.forEach(element => {
        
    // });
    // let allContactIds =
}