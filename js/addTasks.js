"use strict"

let database;
let priority = "medium";
let categoryColor;
let selectedCategory = null;

let subtaskBtn = document.getElementById("addSubTaskBtn");
let urgent = document.getElementById('urgentBtn');
let medium = document.getElementById("mediumBtn");
let low = document.getElementById("lowBtn");

function setDateOfToday() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();

    if (dd < 10) { dd = '0' + dd }
    if (mm < 10) { mm = '0' + mm }
    // today = yyyy + '/' + mm + '/' + dd;
    today = yyyy + '-' + mm + '-' + dd;
    document.getElementById('task-input-dueDate').value = today;
    document.getElementById('task-input-dueDate').min = new Date().toISOString().split("T")[0];

}

async function renderAddTask() {
    contacts = await getContactsToAssign();
    renderContactsToAssign(contacts);
    await getCategories();
    getSubtasks();
    setDateOfToday();
}

async function getContactsToAssign() {
    database = JSON.parse(await loadJSONFromServer());
    let contactNames = JSON.parse(database.contacts);
    return contactNames;
}

async function validateEmail(e) {
    e.preventDefault();
    var email = document.getElementById("new-contact-input").value;
    var atIndex = email.indexOf("@");
    if (atIndex > 0) {
        var nameParts = email.substring(0, atIndex).replace(/[.-]/g, ' ').split(" ");
        var name = "";
        for (var i = 0; i < nameParts.length; i++) {
            name += nameParts[i].charAt(0).toUpperCase() + nameParts[i].slice(1).toLowerCase() + " ";
        }
        createContact(name, email, "");
        showAssignInput();
        showPopup("Contact added!")

        return true;
    } else {
        showAssignInput();
        showPopup("Invalid E-Mail!")
        return false;
    }
}

function renderContactsToAssign(contacts) {
    let assignmentContainer = document.getElementById('assignmentContainer');
    assignmentContainer.innerHTML = "";
    contacts.forEach(e => {
        assignmentContainer.innerHTML += renderContactsTemp(e);
    });
    assignmentContainer.innerHTML += renderInviteContactTemp();
}

function toggleAssignmentInput() {
    let taskInput = document.getElementById('task-input-assignedTo');
    taskInput.innerHTML = renderInviteContactInput();
}

function showAssignInput() {
    let taskInput = document.getElementById('task-input-assignedTo');
    taskInput.innerHTML = renderAssignInput();
    renderContactsToAssign(contacts);
}

function choosePriority(prio) {
    priority = prio;
    switch (prio) {
        case "urgent":
            PrioStyle("#f83525", "#fff", "#fff", "#fff", "#000", "#000");
            break;
        case "medium":
            PrioStyle("#fff", "#f83525", "#fff", "#000", "#fff", "#000");
            break;
        case "low":
            PrioStyle("#fff", "#fff", "#f83525", "#000", "#000", "#fff");
            break;
        case "none":
            PrioStyle("#fff", "#fff", "#fff", "#000", "#000", "#000");
        default:
            break;
    }
}

function PrioStyle(urgendBg, mediumBg, lowBg, urgendColor, mediumColor, lowColor) {
    urgent.style.backgroundColor = urgendBg;
    medium.style.backgroundColor = mediumBg;
    low.style.backgroundColor = lowBg;
    urgent.style.color = urgendColor;
    medium.style.color = mediumColor;
    low.style.color = lowColor;
    urgent.innerHTML = renderPrioBtnClicked("urgent");
    medium.innerHTML = renderPrioBtnUnclicked("medium");
    low.innerHTML = renderPrioBtnUnclicked("low");
}

function handleCategoryChange() {
    let currentSelect = document.getElementById('task-input-category');
    let categoryDiv = document.getElementById('category-selection');

    if (currentSelect.value === 'newCategory') {
        categoryDiv.innerHTML = renderCategoryInput();
    }
}

function selectCategory(event) {
    selectedCategory = event.target.getAttribute("value");
    const categoryHtml = event.target.innerHTML;
    document.getElementById("selectedCategory").innerHTML = `${categoryHtml}`;
}

function createNewCategory() {
    let categoryInput = document.getElementById('category-selection');
    categoryInput.innerHTML = renderCategoryInput();
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
    categoryDiv.innerHTML = createNewCategoryTemp();
    await saveCategoriesToBackend();
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

function deleteCategoryInput() {
    let categoryDiv = document.getElementById('category-selection');
    document.getElementById("new-category-input").value = "";
    categoryDiv.innerHTML = renderCategoryInputFull();
    categoryDiv.innerHTML = createNewCategoryTemp();
    getCategories();
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
    priority = null;
    setDateOfToday();
    choosePriority("none");
    hideContactsTask();
}

function addNewSubtask() {
    subtaskBtn.style.width = "50px";
    subtaskBtn.innerHTML = renderAddDeleteBtns();
}

function deleteSubtaskInput() {
    subtaskBtn.style.width = "50px";
    document.getElementById("task-input-subtasks").value = "";
    subtaskBtn.innerHTML = renderAddBtn();
}


function addSubtaskInput() {
    let subtaskInput = document.getElementById("task-input-subtasks");
    if (subtaskInput.value === "") { return; }
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

function showOrHideCategoryTask() {
    let categoryContainer = document.getElementById('task-input-category');
    try {
        categoryContainer.classList.toggle('d-none');
    } catch (e) {}
}

function showOrHideContactsTask() {
    let assignmentContainer = document.getElementById('assignmentContainer');
    try {
        assignmentContainer.classList.toggle('d-none');
    } catch (e) {}
}

function hideContactsTask() {
    let assignmentContainer = document.getElementById('assignmentContainer');
    assignmentContainer.classList.add('d-none');
}