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


async function renderAddTask() {
    await getContactsToAssign();
    getSubtasks();
    getCategories();
    setDateOfToday();
}

async function getContactsToAssign() {
    database = JSON.parse(await loadJSONFromServer());
    let contactNames = JSON.parse(database.contacts);
    document.getElementById("task-input-assignedTo").innerHTML = "";
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

async function addNewCategory() {
    await loadCategoriesFromBackend();
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
    await saveCategoriesToBackend();
}

function deleteCategoryInput() {
    let categoryDiv = document.getElementById('category-selection');
    document.getElementById("new-category-input").value = "";
    categoryDiv.innerHTML = renderCategoryInputFull();
    getCategories();
}

async function getCategories() {
    await loadCategoriesFromBackend();
    let taskCategoryDiv = document.getElementById('task-input-category');
    taskCategoryDiv.innerHTML = "";
    taskCategoryDiv.innerHTML = renderCategoryInputFull();
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
    console.log(color);
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
    subtasks.push({ title: subtaskInput.value, done: false });
    getSubtasks();
    deleteSubtaskInput();
}

function getSubtasks() {
    document.getElementById("task-checkbox-subtasks").innerHTML = "";

    for (let i = 0; i < subtasks.length; i++) {
        document.getElementById("task-checkbox-subtasks").innerHTML += renderSubtaskCheckbox(i);
    }
}