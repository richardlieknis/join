"use strict"


let database;
let priority;
let categoryColor;

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
    document.getElementById('task-input-dueDate').min = new Date().toISOString().split("T")[0];

}


function renderAddTask() {
    getContactsToAssign();
    getSubtasks();
    getCategories();
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
    let urgent = document.getElementById("urgentBtn");
    let medium = document.getElementById("mediumBtn");
    let low = document.getElementById("lowBtn");

    priority = prio;

    switch (prio) {
        case "urgent":
            urgent.style.backgroundColor = "#f83525";
            medium.style.backgroundColor = "#fff";
            low.style.backgroundColor = "#fff";
            urgent.style.color = "#fff";
            medium.style.color = "#000";
            low.style.color = "#000";
            urgent.innerHTML = renderPrioBtnClicked("urgent");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "medium":
            medium.style.backgroundColor = "#ff7a00";
            urgent.style.backgroundColor = "#fff";
            low.style.backgroundColor = "#fff";
            urgent.style.color = "#000";
            medium.style.color = "#fff";
            low.style.color = "#000";
            medium.innerHTML = renderPrioBtnClicked("medium");
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            low.innerHTML = renderPrioBtnUnclicked("low");
            break;
        case "low":
            low.style.backgroundColor = "#02cf2f";
            medium.style.backgroundColor = "#fff";
            urgent.style.backgroundColor = "#fff";
            urgent.style.color = "#000";
            medium.style.color = "#000";
            low.style.color = "#fff";
            low.innerHTML = renderPrioBtnClicked("low");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");
            break;
        case "none":
            low.style.backgroundColor = "#fff";
            medium.style.backgroundColor = "#fff";
            urgent.style.backgroundColor = "#fff";
            urgent.style.color = "#000";
            medium.style.color = "#000";
            low.style.color = "#000";
            low.innerHTML = renderPrioBtnUnclicked("low");
            medium.innerHTML = renderPrioBtnUnclicked("medium");
            urgent.innerHTML = renderPrioBtnUnclicked("urgent");


        default:
            break;
    }
}

function handleCategoryChange() {
    let currentSelect = document.getElementById('task-input-category');
    let categoryDiv = document.getElementById('category-selection');

    if (currentSelect.value === 'newCategory') {
        categoryDiv.innerHTML = renderCategoryInput();
    }
}

function addNewCategory() {
    let newCategoryInput = document.getElementById('new-category-input');
    let categoryDiv = document.getElementById('category-selection');

    if (newCategoryInput.value === "") return;
    let createNew = {
        name: newCategoryInput.value,
        colorNumber: categoryColor || 1,
    }

    categories.push(createNew);
    categoryDiv.innerHTML = renderCategoryInputFull();
    getCategories();
}

function deleteCategoryInput() {
    let categoryDiv = document.getElementById('category-selection');
    document.getElementById("new-category-input").value = "";
    categoryDiv.innerHTML = renderCategoryInputFull();
    getCategories();
}

function getCategories() {
    let taskCategoryDiv = document.getElementById('task-input-category');
    categories.forEach(element => {
        taskCategoryDiv.innerHTML += renderCategoryInputOptionsExtra(element);
    });
}

function addColor(color, element) {
    let elements = document.getElementsByClassName("colorOption");
    for (let i = 0; i < elements.length; i++) {
        elements[i].classList.remove("scaleColor");
    }

    element.classList.add("scaleColor");
    categoryColor = color;
}

function clearTaskInputs() {
    document.getElementById('task-input-title').value = '';
    document.getElementById('task-input-description').value = '';
    document.getElementById('task-input-category').selectedIndex = 0;
    document.getElementById('task-input-assignedTo').selectedIndex = 0;
    priority = null;
    setDateOfToday();
    choosePriority("none");
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
    //errSubtask.classList.add("d-none");
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
    <div  class="subtask">
        <input id="subtask${index}" type="checkbox" />
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
      <option value="${element.id}">
        ${element.name}
        <input type="checkbox"></input>
      </option>
      
    `;
}

function renderCategoryInputFull() {
    return `
    <select style="width: 100%" required id="task-input-category" onchange="handleCategoryChange()">
                      <option disabled selected>
                        Select or create a Category!
                      </option>
                      <option value="newCategory">New Category</option>
                    </select>
    `;
}

function renderCategoryInputOptionsExtra(category) {
    return `
                      <option value="${category.name}" class="color-${category.colorNumber}">
                      ${category.name.charAt(0).toUpperCase() + category.name.slice(1)}
                      </option>
    `;
}


function renderCategoryInput() {
    return `
    <div class="addSubTask">
            <input id="new-category-input" type="text" />
            <div class="addSubTaskBtn">
                <div class="addDeleteBtnsCat">
                    <img onclick="deleteCategoryInput()" src="../src/img/x.svg" />
                    <div class="line"></div>
                    <img onclick="addNewCategory()" style="filter: invert(1)" src="../src/img/hook.svg" alt="" />
                </div>
            </div>
        </div>
        <div class="chooseColor">
        <span onclick="addColor(1, this)" class="color-1 colorOption"></span>
        <span onclick="addColor(2, this)" class="color-2 colorOption"></span>
        <span onclick="addColor(3, this)" class="color-3 colorOption"></span>
        <span onclick="addColor(4, this)" class="color-4 colorOption"></span>
        <span onclick="addColor(5, this)" class="color-5 colorOption"></span>
        <span onclick="addColor(6, this)" class="color-6 colorOption"></span>
        <span onclick="addColor(7, this)" class="color-7 colorOption"></span>
    </div>
    `;
}