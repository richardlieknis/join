"use strict"
let database;

function setDateOfToday() {
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
    getSubtasks();
    setDateOfToday();
}

async function getContactsToAssign() {
    database = JSON.parse(await loadJSONFromServer());
    let contactNames = JSON.parse(database.contacts);
    contactNames.forEach(element => {
        document.getElementById("task-input-assignedTo").innerHTML += renderContactsToAssign(element);
    });
}

function choosePriority(prio) {
    let prioBtns = document.getElementById("prioBtns");
    let urgent = document.getElementById("urgentBtn");
    let medium = document.getElementById("mediumBtn");
    let low = document.getElementById("lowBtn");

    switch (prio) {
        case "urgent":
            urgent.style.backgroundColor = "#f83525";
            medium.style.backgroundColor = "#fff";
            low.style.backgroundColor = "#fff";
            urgent.innerHTML = renderPrioBtnClicked("urgent");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "medium":
            medium.style.backgroundColor = "#ff7a00";
            urgent.style.backgroundColor = "#fff";
            low.style.backgroundColor = "#fff";
            medium.innerHTML = renderPrioBtnClicked("medium");
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "low":
            low.style.backgroundColor = "#02cf2f";
            medium.style.backgroundColor = "#fff";
            urgent.style.backgroundColor = "#fff";
            low.innerHTML = renderPrioBtnClicked("low");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            break;

        default:
            break;
    }
}

function renderPrioBtnClicked(prio) {
    return `
    <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
    <img src="../src/img/${prio}-white.svg" width="18px"/>
    `;
}

function renderPrioBtnUnclicked(prio) {
    return `
    <span>${prio.charAt(0).toUpperCase() + prio.slice(1)}</span>
    <img src="../src/img/${prio}.svg" width="18px"/>
    `;
}

function renderPrioBtns() {
    return `
    <div onclick="choosePriority('urgent')" id="urgentBtn" class="prioBtn">
                                        <span>Urgent</span>
                                        <img src="../src/img/urgent.svg" />
                                    </div>
                                    <div onclick="choosePriority('medium')" id="mediumBtn" class="prioBtn">
                                        <span>Medium</span>
                                        <img src="../src/img/medium.svg" />
                                    </div>
                                    <div onclick="choosePriority('low')" id="lowBtn" class="prioBtn">
                                        <span>Low</span>
                                        <img src="../src/img/low.svg" />
                                    </div>
    `;
}

function addNewSubtask() {
    let subtaskBtn = document.getElementById("addSubTaskBtn");
    subtaskBtn.style.width = "100px";
    subtaskBtn.innerHTML = renderAddDeleteBtns();
}

function deleteSubtaskInput() {
    let subtaskBtn = document.getElementById("addSubTaskBtn");
    subtaskBtn.style.width = "50px";
    document.getElementById("task-input-subtasks").value = "";
    subtaskBtn.innerHTML = renderAddBtn();
}

function addSubtaskInput() {
    let subtaskInput = document.getElementById("task-input-subtasks");
    let errSubtask = document.querySelector(".errorSubtask");
    if (subtaskInput.value === "") { errSubtask.classList.remove("d-none"); return; }
    errSubtask.classList.add("d-none");
    subtasks.push(subtaskInput.value);
    getSubtasks();
    deleteSubtaskInput();
}

function getSubtasks() {
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
        <img onclick="addNewSubtask()" src="../src/img/plus.svg" alt="" />
    </div>
    `;
}

function renderContactsToAssign(element) {
    return `
      <option value="${element.id}">${element.name}</option>
    `;
}