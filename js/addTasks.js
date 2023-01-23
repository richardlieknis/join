"use strict"

initTasks();

function initTasks() {
    let today = new Date();

    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }

    if (mm < 10) {
        mm = '0' + mm
    }

    // today = yyyy + '/' + mm + '/' + dd;
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('task-input-dueDate').value = today;
    addSubtaskCheckbox();
}


function renderAddTask() {
    getContactsToAssign();
}

function getContactsToAssign() {
    let contactNames;
    contacts.forEach(element => {

    });
}

function addNewSubtask() {
    let subtaskBtn = document.getElementById("addSubTaskBtn");
    subtaskBtn.style.width = "100px";
    subtaskBtn.innerHTML = renderAddDeleteBtns();
}

function deleteSubtaskInput() {
    let subtaskInput = document.getElementById("task-input-subtasks");
    let subtaskBtn = document.getElementById("addSubTaskBtn");
    subtaskBtn.style.width = "50px";
    subtaskInput.value = "";
    subtaskBtn.innerHTML = renderAddBtn();
}

function addSubtaskInput() {
    let subtaskInput = document.getElementById("task-input-subtasks");
    if (subtaskInput.value === "") return;
    subtasks.push(subtaskInput.value);
    addSubtaskCheckbox();
    deleteSubtaskInput();
}

function addSubtaskCheckbox() {
    document.getElementById("task-checkbox-subtasks").innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        document.getElementById("task-checkbox-subtasks").innerHTML += renderSubtaskCheckbox(i);
    }
}

function renderSubtaskCheckbox(index) {
    return `
    <div id="subtask${index}" class="subtask">
        <input type="checkbox" />
        <span>${subtasks[index]}</span>
    </div>
    `;
}

function renderAddDeleteBtns() {
    return `
    <div class="addDeleteBtns">
        <img onclick="deleteSubtaskInput()" src="../src/img/x.svg" />
        <div class="line"></div>
        <img onclick="addSubtaskInput()" src="../src/img/hook.svg" style="filter: invert(1)">
    </div>`;
}

function renderAddBtn() {
    return `
    <div class="addDeleteBtns">
        <img src="../src/img/plus.svg" alt="" />
    </div>
    `;
}