function openAddTask() {
    renderAddTask();
    let addTaskOverlay = document.getElementById("addTaskOverlay");
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.add("slideIn");
    addTaskOverlay.classList.remove("d-none");
}

function closeAddTask() {
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.remove("slideIn");
    taskModul.classList.add("slideOut");
    setTimeout(addDisplayNoneTask, 550);
}

function openAddContact() {
    let addContactOverlay = document.getElementById("addContactOverlay");
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.add("slideIn");
    addContactOverlay.classList.remove('d-none');
}

function openEditContact(contactId) {
    let addContactOverlay = document.getElementById("addContactOverlay");
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.add("slideIn");
    addContactOverlay.classList.remove('d-none');

    fillEditContactField(contactId);
}

async function fillEditContactField(contactId) {
    await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    let index = getIndexOfArray(contacts, contactId);
    document.getElementById('c-new-name').value = contacts[index].name;

    if (contacts[index].email) {
        document.getElementById('c-new-email').value = contacts[index].email;
    } else {
        document.getElementById('c-new-email').value = "";
    }

    if (contacts[index].tel) {
        document.getElementById('c-new-tel').value = contacts[index].tel;
    } else {
        document.getElementById('c-new-tel').value = "";

    }
}

function closeAddContact() {
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.remove("slideIn");
    contactModul.classList.add("slideOut");
    setTimeout(addDisplayNoneContact, 550);
}

function dontClose(e) {
    e.stopPropagation();
}

function addDisplayNoneTask() {
    addTaskOverlay.classList.add("d-none")
}

function addDisplayNoneContact() {
    addContactOverlay.classList.add("d-none")
}