function addButtonAtContactList() {
    return `
    <button onclick="openAddContact()" class="btn-new-mobile btn-primary">
    <span>New contact</span>
    <img src="../src/img/new-contact.svg" alt="">
    </button>
    `;
}

function contactListHtml(id, name, email, initials, color) {
    return `
    <div id="c-${id}" class="c-contact-overview" onclick="highlightContact(${id}), showContactDetail()">
    <div id="c-i-${id}" class="c-initials c-i-small color-${color}">${initials}</div>
    <div class="contact-summery">
        <p id="c-name-${id}" class="c-list-name">${name}</p>
        <p class="c-list-mail">${email}</p>
    </div>
    </div>
    `;
}

function adSectionLetter(letter) {
    return `
    <div class="c-letter-div">
    <div class="c-initial-letter">${letter}</div>
    <div class="c-initial-letter-border"></div>
    </div>
    `;
}