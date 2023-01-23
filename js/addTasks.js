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
    subtasks.push(subtaskInput.value);
    deleteSubtaskInput();

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