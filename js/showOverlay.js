function openAddTask() {
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

async function openEditContact(contactId) {
    let addContactOverlay = document.getElementById("addContactOverlay");
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.add("slideIn");
    addContactOverlay.classList.remove('d-none');
    
        await downloadFromServer();
    contacts = await JSON.parse(backend.getItem('contacts')) || [];
    let index = getIndexOfContact(contaxtId)
    document.getElementById('c-new-name').value = contacts[1].name;
}

function getIndexOfContact(contactId) {
    let index;
    for (let i = 0; i < contacts.length; i++) {
        const Id = contacts[i].id;
        
        if (contactId == Id) {
            index = i;
        }
    }
    return index
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