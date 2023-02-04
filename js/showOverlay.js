let contactsDetailsDisplayed = false;

async function openAddTask(status) {
    document.querySelector('#createTaskForm').setAttribute("onsubmit", `createTask('${status}'); return false;`); 
    await renderAddTask(status);
    let addTaskOverlay = document.getElementById("addTaskOverlay");
    let taskModul = document.getElementById('addTaskModul');
    let createBtn = document.getElementById('mobile-btn-addTask');
    document.getElementById('profile').classList.add('d-none');
    taskModul.classList.add("slideIn");
    createBtn.classList.add("slideIn");
    addTaskOverlay.classList.remove("d-none");
    document.getElementById('header-overlay-addTask').classList.add('slideIn','header-resp-addTask-template');
}

function closeAddTask() {
    let taskModul = document.getElementById('addTaskModul');
    let createBtn = document.getElementById('mobile-btn-addTask');
    taskModul.classList.remove("slideIn");
    taskModul.classList.add("slideOut");
    createBtn.classList.remove("slideIn");
    createBtn.classList.add("slideOut");
    document.getElementById('profile').classList.remove('d-none');
    setTimeout(addDisplayNoneTask, 550);
    document.getElementById('header-overlay-addTask').classList.remove('slideIn','header-resp-addTask-template');
}

function openAddContact() {
    let addContactOverlay = document.getElementById("addContactOverlay");
    let addContactModul = document.getElementById('addContactModul');
    addContactModul.classList.add("slideIn");
    addContactOverlay.classList.remove('d-none');
}

function openEditContact(contactId) {
    let editContactOverlay = document.getElementById("editContactOverlay");
    let editContactModul = document.getElementById('editContactModul');
    editContactModul.classList.add("slideIn");
    editContactOverlay.classList.remove('d-none');
    document.getElementById('edit-contact-form').setAttribute("onsubmit", `editContact(${contactId}); return false`);
    document.getElementById('edit-contact-delete').setAttribute("onclick", `deleteContact(${contactId})`);

    fillEditContactField(contactId);
}

async function fillEditContactField(contactId) {
    await loadContactsFromBackend();
    let index = getIndexOfArray(contacts, contactId);
    document.getElementById('c-edit-name').value = contacts[index].name;
    document.getElementById('edit-c-initials').innerHTML = contacts[index].initials;
    document.getElementById('edit-c-initials').classList.add(`color-${contacts[index].color}`);
    document.getElementById('editContactOverlay').setAttribute("onclick", `closeEditContact(${contactId}); return false`);
    document.getElementById('c-edit-close').setAttribute("onclick", `closeEditContact(${contactId}); return false`);

    if (contacts[index].email) {
        document.getElementById('c-edit-email').value = contacts[index].email;
    } else {
        document.getElementById('c-edit-email').value = "";
    }

    if (contacts[index].phone) {
        document.getElementById('c-edit-tel').value = contacts[index].phone;
    } else {
        document.getElementById('c-edit-tel').value = "";

    }
}

async function fillEditTasksField(taskId) {
    await loadTasksFromBackend();
    let index = getIndexOfArray(tasks, taskId);
    document.getElementById('task-input-title').value = tasks[index].titel;

    if (tasks[index].description) {
        document.getElementById('task-input-description').value = tasks[index].description;
    } else {
        document.getElementById('task-input-description').value = "";
    }

    if (tasks[index].category) {
        document.getElementById('task-input-category').value = tasks[index].category;
    } else {
        document.getElementById('task-input-category').value = "";
    }

    if (tasks[index].category) {
        document.getElementById('task-input-category').value = tasks[index].category;
    } else {
        document.getElementById('task-input-category').value = "";
    }


}

function closeAddContact() {
    let contactModul = document.getElementById('addContactModul');
    contactModul.classList.remove("slideIn");
    contactModul.classList.add("slideOut");
    setTimeout(addDisplayNoneContact, 550);
}

function closeEditContact(contactId) {
    let index = getIndexOfArray(contacts, contactId);
    document.getElementById('edit-c-initials').classList.remove(`color-${contacts[index].color}`);

    let contactModul = document.getElementById('editContactModul');
    contactModul.classList.remove("slideIn");
    contactModul.classList.add("slideOut");

    setTimeout(editDisplayNoneContact, 550);
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

function editDisplayNoneContact() {
    editContactOverlay.classList.add("d-none")
}