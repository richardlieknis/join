"use strict";

setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

const progressStepCategories = ["todo", "inProgress", "awaitingFeedback", "done"];
let filteredTasks = [];
let isFiltering = false;
let currentTasksArray = tasks;
let currentDraggedElement;
let statusOfDraggedElement;
const taskOverlayBg = document.querySelector("#taskOverlayBg");
const taskOverlayContentContainer = document.querySelector('#taskOverlayContent');
const taskOverlayEditContentContainer = document.querySelector('#taskOverlayEditContent');
const currentCategoryContainer = document.querySelector('#currentCategory');
const categoriesContainer = document.querySelector('#categoriesContainer');
const currentStatusContainer = document.querySelector('#currentStatus');
const statusContainer = document.querySelector('#statusContainer');
const priorityUrgentButton = document.querySelector('#priority-urgent');
const priorityMediumButton = document.querySelector('#priority-medium');
const priorityLowButton = document.querySelector('#priority-low');
let currentPriority;
const contactsContainer = document.querySelector('#contactsContainer');

async function renderTasks() {
  if (!tasks.length) await loadTasksFromBackend();
  if (!contacts.length) await loadContactsFromBackend();
  if (!categories.length) await loadCategoriesFromBackend();
  if (!currentTasksArray.length && !isFiltering) {
    currentTasksArray = tasks;
  }
  for (let status of progressStepCategories) updateHtml(status, currentTasksArray);
}

function updateHtml(status, tasksArrayToRender) {
  const progressStep = tasksArrayToRender.filter((task) => task.status === status);
  const progressStepHtmlContainer = document.querySelector(`#${status}-tasks`);
  progressStepHtmlContainer.innerHTML = "";
  for (let task of progressStep) {
    progressStepHtmlContainer.innerHTML += generateTaskCardtHtml(task);
  }
  progressStepHtmlContainer.innerHTML += generatePlaceholderHtml(status);
}

function generateTaskCardtHtml(task) {
  const currentCategory = categories.filter(category => category.name === task.category);
  return `
        <div class="task-card" draggable="true" ondragstart="startDragging(${task.id})" onclick="openTaskOverlay(${task.id})">
            <span class="category color-${currentCategory[0].colorNumber}">${task.category}</span>
            <div class="title">${task.title}</div>
            <div class="description">
                ${task.description}
            </div>
            <div class="subtasks-progress ${checkIfSubtasksAreEmpty(task)}">
                <progress value="${getDoneSubtasksInPercent(task)}" max="100"></progress>
                <span>${getDoneSubtasks(task)}/${task.subtasks.length} Done</span>
            </div>
            <div class="assigned-to-and-priority-container">
                <div class="assigned-to">
                  ${getAssignedPersonsInitialsHtml(task)}
                </div>
                <div class="priority"><img src="../src/img/${task.priority}.svg" /></div>
            </div>
        </div>
  `;
}

function generatePlaceholderHtml(status) {
  return `
        <div class="task-card-placeholder ${status}-task-card-placeholder d-none"></div>
  `;
}

function checkIfSubtasksAreEmpty(task) {
  if (!task.subtasks.length) {
    return "d-none";
  } else {
    return "";
  }
}

function getDoneSubtasks(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  return doneSubtasks.length;
}

function getDoneSubtasksInPercent(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  const percent = doneSubtasks.length
    ? (100 / task.subtasks.length) * doneSubtasks.length
    : 0;
  return percent;
}

function getAssignedPersonsInitialsHtml(task) {
  const assignedContacts = contacts.filter(contact => task.assignedTo.includes(contact.id));
  let assignedPersonsHtml = "";
  if (assignedContacts.length > 3) {
    for (let i = 0; i < 2; i++) {
      assignedPersonsHtml += `<div class="initials color-${assignedContacts[i].color}">${assignedContacts[i].initials}</div>`;
    }
    assignedPersonsHtml += `<div class="initials color-x">+${assignedContacts.length  - 2}</div>`;
      } else {  
        for (let assignedPerson of assignedContacts) {
          assignedPersonsHtml += `<div class="initials color-${assignedPerson.color}">${assignedPerson.initials}</div>`;
        }
      }
  return assignedPersonsHtml;
}

function getInitials(name) {
  const fullname = name.split(" ");
  const [forename, lastname] = [fullname[0], fullname[fullname.length - 1]];
  return forename[0] + lastname[0];
}

function openTaskOverlay(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId)
  renderCategory(taskIndex);
  renderContentOnly(taskIndex, "title");
  renderContentOnly(taskIndex, "description");
  renderContentOnly(taskIndex, "dueDate");
  renderSubtasksContainer(taskIndex);
  renderPriority(taskIndex);
  renderAssignedToContainer(taskIndex);
  renderTaskOverlayButtons(taskIndex);
  renderInviteNewContactInputContainer(taskId);
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  taskOverlayBg.classList.remove("d-none");
}

function closeTaskOverlay() {
  taskOverlayBg.classList.add("d-none");
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  hideCategories();
  hideStatus();
  hideContacts();

  hideInviteNewContactInput();
}

renderTasks();

function renderCategory(taskIndex) {
  const categoryContainer = document.querySelector("#category");
  const currentCategory = categories.filter(category => category.name === tasks[taskIndex].category);
  categoryContainer.className = "";
  categoryContainer.classList.add("category");
  categoryContainer.classList.add(`color-${currentCategory[0].colorNumber}`);
  categoryContainer.innerHTML = tasks[taskIndex].category;
}

function renderContentOnly(taskIndex, containerId) {
  const container = document.querySelector(`#${containerId}`);
  container.innerHTML = "";
  if (containerId === "dueDate") {
    const day = tasks[taskIndex][containerId].split('-')[2];
    const month = tasks[taskIndex][containerId].split('-')[1];
    const year = tasks[taskIndex][containerId].split('-')[0];
    container.innerHTML = `${day}.${month}.${year}`;
  } else {
    container.innerHTML = tasks[taskIndex][containerId];
  }
}

function renderSubtasksContainer(taskIndex) {
  const subtaskContainer = document.querySelector("#subtasksContainer");
  const subtaskElementsContainer = document.querySelector("#subtasks");
  subtaskElementsContainer.innerHTML = "";
  if (tasks[taskIndex].subtasks.length) {
    subtaskElementsContainer.innerHTML = renderAllSubtasks(taskIndex);
    subtaskContainer.className = "subtasks";
  } else {
    subtaskContainer.className = "subtasks d-none";
  }
}

function renderAllSubtasks(taskIndex) {
  let subtasksHtml = "";
  const subtasksArray = [...tasks[taskIndex].subtasks];
  for (let i = 0; i < subtasksArray.length; i++) {
    if (subtasksArray[i].done) subtasksHtml += generateCheckedSubtaskHtml(tasks[taskIndex].id, subtasksArray, i);
    if (!subtasksArray[i].done) subtasksHtml += generateUncheckedSubtaskHtml(tasks[taskIndex].id, subtasksArray, i);
  }
  return subtasksHtml;
}

function generateCheckedSubtaskHtml(taskId, subtasksArray, subtaskIndex) {
  return `
      <div class="subtask" id="subtask-${subtaskIndex}" onclick="clickSubtask(${taskId}, ${subtaskIndex})">
        <input class="subtask-checkbox" type="checkbox" checked />
        <span>${subtasksArray[subtaskIndex].title}</span>
      </div>
    `;
}

function generateUncheckedSubtaskHtml(taskId, subtasksArray, subtaskIndex) {
  return `
      <div class="subtask" id="subtask-${subtaskIndex}" onclick="clickSubtask(${taskId}, ${subtaskIndex})">
        <input class="subtask-checkbox" type="checkbox" />
        <span>${subtasksArray[subtaskIndex].title}</span>
      </div>
    `;
}

async function clickSubtask(taskId, subtaskIndex) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  if (tasks[taskIndex].subtasks[subtaskIndex].done) {
    tasks[taskIndex].subtasks[subtaskIndex].done = false;
  } else if (!tasks[taskIndex].subtasks[subtaskIndex].done) {
    tasks[taskIndex].subtasks[subtaskIndex].done = true;
  }
  await renderTasks();
  openTaskOverlay(taskId);
  await saveTasksToBackend();
}

function renderPriority(taskIndex) {
  const priorityContainer = document.querySelector("#priority");
  priorityContainer.className = "";
  priorityContainer.classList.add("category");
  priorityContainer.classList.add(tasks[taskIndex].priority);
  priorityContainer.innerHTML = `<span>${tasks[taskIndex].priority}</span>`;
  priorityContainer.innerHTML += `<img src="../src/img/${tasks[taskIndex].priority}-white.svg" />`;
}

function renderAssignedToContainer(taskIndex) {
  const assignedToContainer = document.querySelector("#assignedToContainer");
  const assignedPersonsContainer = document.querySelector("#assignedPersonsContainer");
  assignedPersonsContainer.innerHTML = "";
  if (tasks[taskIndex].assignedTo.length) {
    assignedPersonsContainer.innerHTML = renderAllAssignedPersons(taskIndex);
    assignedToContainer.className = "assigned-persons-container";
  } else {
    assignedToContainer.className = "assigned-persons-container d-none";
  }
}

function renderAllAssignedPersons(taskIndex) {
  let assignedPersonHtml = "";
  const assignedContacts = contacts.filter(contact => tasks[taskIndex].assignedTo.includes(contact.id));
  for (let i = 0; i < assignedContacts.length; i++) {
    assignedPersonHtml += generateAssignedPersonsHtml(assignedContacts, i);
  }
  return assignedPersonHtml;
}

function generateAssignedPersonsHtml(assignedContacts, assignedContactIndex) {
  return `
      <div class="assigned-person">
        <span class="initials color-${assignedContacts[assignedContactIndex].color}">${assignedContacts[assignedContactIndex].initials}</span>
        <span class="full-name">${assignedContacts[assignedContactIndex].name}</span>
      </div>
    `;
}

function renderTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateTaskOverlayButtonsHtml(taskIndex);
}

function generateTaskOverlayButtonsHtml(taskIndex) {
  return `
      <div class="close-button" onclick="closeTaskOverlay()">
        <img src="../src/img/close-icon.svg" />
      </div>
      <button class="edit-icon btn-primary" onclick="renderEditTask(${tasks[taskIndex].id})">
        <img src="../src/img/edit-icon.svg" />
      </button>
  `;
}

function renderEditTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId)
  currentPriority = tasks[taskIndex].priority;
  renderCurrentCategory(taskIndex);
  renderCategories(tasks[taskIndex].category);
  renderCurrentTitle(taskIndex);
  rendercurrentDescription(taskIndex);
  renderCurrentStatus(taskIndex);
  renderStatus(tasks[taskIndex].status);
  renderCurrentDueDate(taskIndex);
  renderCurrentPriority(taskIndex);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  renderEditTaskOverlayButtons(taskIndex);
  taskOverlayContentContainer.classList.add('d-none');
  taskOverlayEditContentContainer.classList.remove('d-none');
}

function renderCurrentCategory(taskIndex) {
  currentCategoryContainer.innerHTML = tasks[taskIndex].category;
}

function renderCategories(categoryToIgnore) {
  categoriesContainer.innerHTML = "";
  for (let category of categories) {
    if (category.name !== categoryToIgnore) {
      categoriesContainer.innerHTML += `
      <div onclick="setCategory('${category.name}')">
        <span>${category.name}</span>
        <div class="category-color color-${category.colorNumber}"></div>
      </div>
      `;
    }
  }
}

function showOrHideCategories() {
  categoriesContainer.classList.toggle('d-none');
}

function hideCategories() {
  if (!categoriesContainer.classList.contains('d-none')) categoriesContainer.classList.add('d-none');
}

function setCategory(category) {
  currentCategoryContainer.innerHTML = category;
  renderCategories(category);
}

function renderCurrentTitle(taskIndex) {
  document.querySelector('#currentTitle').value = tasks[taskIndex].title;
}

function rendercurrentDescription(taskIndex) {
  document.querySelector('#currentDescription').value = tasks[taskIndex].description;
}

function renderCurrentStatus(taskIndex) {
  currentStatusContainer.innerHTML = tasks[taskIndex].status;
}

function renderStatus(statusToIgnore) {
  statusContainer.innerHTML = "";
  for (let status of progressStepCategories) {
    if (status !== statusToIgnore) {
      statusContainer.innerHTML += `
      <div onclick="setStatus('${status}')">
        <span>${status}</span>
      </div>
      `;
    }
  }
}

function showOrHideStatus() {
  console.log("runs");
  statusContainer.classList.toggle('d-none');
}

function hideStatus() {
  if (!statusContainer.classList.contains('d-none')) statusContainer.classList.add('d-none');
}

function setStatus(status) {
  currentStatusContainer.innerHTML = status;
  renderStatus(status);
}

function renderCurrentDueDate(taskIndex) {
  document.querySelector('#currentDueDate').value = tasks[taskIndex].dueDate;
}

function renderCurrentPriority() {
  removeActiveClassFromPriorityButton();
  if (currentPriority === "urgent") {
    priorityUrgentButton.classList.add('active');
    priorityUrgentButton.childNodes[3].src = "../src/img/urgent-white.svg";
  } else if (currentPriority === "medium") {
    priorityMediumButton.classList.add('active');
    priorityMediumButton.childNodes[3].src = "../src/img/medium-white.svg";  
  } else if (currentPriority === "low") {
    priorityLowButton.classList.add('active');
    priorityLowButton.childNodes[3].src = "../src/img/low-white.svg";
  }
}

function removeActiveClassFromPriorityButton() {
  const priorityButtons = document.querySelectorAll('.priority-button');
  for (let priorityButton of priorityButtons) {
    priorityButton.classList.remove('active');
  }
  priorityUrgentButton.childNodes[3].src = "../src/img/urgent.svg";
  priorityMediumButton.childNodes[3].src = "../src/img/medium.svg";
  priorityLowButton.childNodes[3].src = "../src/img/low.svg";
}

function setPriority(priority) {
  currentPriority = priority;
  renderCurrentPriority();
}

function renderCurrentAssignedContacts(taskIndex) {
  const assignedContacts = contacts.filter(contact => tasks[taskIndex].assignedTo.includes(contact.id));
  const assignedContactsContainer = document.querySelector('#assignedContacts');
  assignedContactsContainer.innerHTML = "";
  for (let assignedPerson of assignedContacts) {
    assignedContactsContainer.innerHTML += generateCurrentAssignedPersonsHtml(assignedPerson)
  }
}

function generateCurrentAssignedPersonsHtml(assignedPerson) {
  return `
      <div class="initials color-${assignedPerson.color}">${assignedPerson.initials}</div>
  `;
}

function renderContacts(taskIndex) {
  contactsContainer.innerHTML = "";
  // contactsContainer.innerHTML = `
  //     <div onclick="uncheckContact();dontClose(event);">
  //       <span>You</span>
  //       <input type="checkbox" />
  //     </div>
  //   `;
  for (let contact of contacts) {
    if (tasks[taskIndex].assignedTo.includes(contact.id)) {
      contactsContainer.innerHTML += generateCheckedContactsHtml(contact, taskIndex);
    } else {
      contactsContainer.innerHTML += generateUncheckedContactsHtml(contact, taskIndex);
    }
  }
  contactsContainer.innerHTML += generateInviteNewContactHtml(taskIndex);
}

function generateCheckedContactsHtml(contact, taskIndex) {
  return `
    <div onclick="uncheckContact(${contact.id}, ${taskIndex});dontClose(event);">
      <span>${contact.name}</span>
      <input type="checkbox" checked/>
    </div>
  `;
}

function generateUncheckedContactsHtml(contact, taskIndex) {
  return `
    <div onclick="checkContact(${contact.id}, ${taskIndex});dontClose(event);">
      <span>${contact.name}</span>
      <input type="checkbox"/>
    </div>
  `;
}

async function uncheckContact(contactId, taskIndex) {
  console.log("uncheck", contactId, taskIndex);
  console.log(tasks[taskIndex].assignedTo);
  const index = tasks[taskIndex].assignedTo.indexOf(contactId);
  if (index > -1) tasks[taskIndex].assignedTo.splice(index, 1);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  await saveTasksToBackend();
}

async function checkContact(contactId, taskIndex) {
  tasks[taskIndex].assignedTo.push(contactId);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  await saveTasksToBackend();
}

function renderInviteNewContactInputContainer(taskId) {
  const inviteNewContactInputContainer = document.querySelector('#inviteNewContactInputContainer');
  inviteNewContactInputContainer.innerHTML = generateInviteNewContactInputContainerHtml(taskId);
}

function generateInviteNewContactInputContainerHtml(taskId) {
  return `
    <form onsubmit="addNewContact(${taskId});return false">
      <input type="email" placeholder="Contact email" required id="contactEmail">
      <div>
          <button type="reset" onclick="hideInviteNewContactInput()">
              <img src="../src/img/close-icon.svg">
          </button>
          <img src="../src/img/delimiter-vertical.svg">
          <button type="submit">
              <img src="../src/img/hook-blue.svg">
          </button>
      </div>
    </form>
  `;
}

function generateInviteNewContactHtml() {
  return `
    <div class="invite-new-contact" onclick="showInviteNewContactInput();dontClose(event);">
      <span>Invite new contact</span>
      <img src="../src/img/contacts-black.svg">
    </div>
  `;
}

function showInviteNewContactInput() {
  document.querySelector('#assignedToSelectButton').classList.add('d-none');
  document.querySelector('#inviteNewContactInputContainer').classList.remove('d-none');
}

function hideInviteNewContactInput() {
  // document.querySelector('#contactEmail').value = '-';
  document.querySelector('#assignedToSelectButton').classList.remove('d-none');;
  document.querySelector('#inviteNewContactInputContainer').classList.add('d-none');
  hideContacts();
  document.querySelector('#contactEmail').value = '';
}

async function addNewContact(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  await loadContactsFromBackend();
  await setContactIdCounter();
  await getColor();
  if (!checkIfContactExist(contactEmail.value)) {
    pushToContactsArray(contactEmail.value, contactEmail.value, '', currentColor, '');
    await saveContactsToBackend();
    const contactToAssign = contacts.filter(contact => contact.email === contactEmail.value);
    tasks[taskIndex].assignedTo.push(contactToAssign[0].id);
    renderContacts(taskIndex);
    hideInviteNewContactInput();
    showPopup("Contact has been created");
  } else {
    showPopup("There is already a contact with this email address");
  }
}

function checkIfContactExist(contactEmail) {
  const emailsArray = contacts.map(contact => contact.email.toLowerCase());
  return emailsArray.includes(contactEmail.toLowerCase()) ? true : false;
}

function showOrHideContacts() {
  contactsContainer.classList.toggle('d-none');
}

function hideContacts() {
  if (!contactsContainer.classList.contains('d-none')) contactsContainer.classList.add('d-none');
}

function renderEditTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateEditTaskOverlayButtonsHtml(taskIndex);
}

function generateEditTaskOverlayButtonsHtml(taskIndex) {
  return `
      <div class="close-button" onclick="closeTaskOverlay()">
        <img src="../src/img/close-icon.svg" />
      </div>
      <button class="edit-icon delete-button btn-secondary" onclick="deleteTask(${tasks[taskIndex].id})">
        <img src="../src/img/trash.svg" />
      </button>
      <button class="edit-icon save-button btn-primary" onclick="saveChanges(${tasks[taskIndex].id})">
        <span>OK</span>
        <img src="../src/img/hook.svg" />
      </button>
  `;
}

async function saveChanges(taskId) {
  await editTask(taskId);
  openTaskOverlay(taskId);
  renderTasks();
}

async function deleteTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  tasks.splice(taskIndex, 1);
  await saveTasksToBackend();
  closeTaskOverlay();
  renderTasks();
}