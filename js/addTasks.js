"use strict"
//let assignmentContainer = document.getElementById('assignmentContainer');

let database;
let priority = "medium" ;
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

function renderContactsTemp(contacts) {
    return `
    <div onclick="dontClose(event)" class="contactToAssign">
        <div>${contacts.name}</div>
        <input id="${contacts.id}" type="checkbox">
    </div>
    `;
}

function renderAssignInput() {
    return `
    <div
                  class="task-input-assignedTo"
                  onclick="showOrHideContactsTask(event)"
                >
                  <span>Select contacts to assign</span>
                  <div
                    class="contactsToAssign d-none"
                    id="assignmentContainer"
                  ></div>
                  <img src="../src/img/dropDownArrow.svg" />
                </div>
    `;
}

function renderInviteContactTemp() {
    return `
        <div class="inviteBtn" onclick="toggleAssignmentInput()">
            <span>Invite new contact</span>
            <img src="../src/img/contacts-black.svg">
        </div>
    `;
}

function renderInviteContactInput() {
    return `
    <div class="addSubTask">
            <input id="new-contact-input" type="email" placeholder="Contact eMail" />
            <div class="addSubTaskBtn">
                <div class="addDeleteBtnsCat">
                    <img onclick="showAssignInput()" src="../src/img/x.svg" />
                    <div class="line"></div>
                    <img onclick="validateEmail(event);" style="filter: invert(1)" src="../src/img/hook.svg" alt="" />
                </div>
            </div>
     </div>
 `;
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