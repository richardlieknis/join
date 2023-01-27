"use strict";

setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

const progressStepCategories = ["todo", "inProgress", "awaitingFeedback", "done"];
let filteredTasks = [];
let currentTasksArray = tasks;
let currentDraggedElement;
let statusOfDraggedElement;
const taskOverlayBg = document.querySelector("#taskOverlayBg");
const taskOverlayContentContainer = document.querySelector('#taskOverlayContent');
const taskOverlayEditContentContainer = document.querySelector('#taskOverlayEditContent');
const currentCategoryContainer = document.querySelector('#currentCategory');
const categoriesContainer = document.querySelector('#categoriesContainer');
const priorityUrgentButton = document.querySelector('#priority-urgent');
const priorityMediumButton = document.querySelector('#priority-medium');
const priorityLowButton = document.querySelector('#priority-low');
let currentPriority;
const contactsContainer = document.querySelector('#contactsContainer');

const dummyData = [
  {
    id: 1,
    category: "design",
    title: "task a",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [1, 2],
    priority: "low",
    status: "todo",
  },
  {
    id: 2,
    category: "sales",
    title: "task b",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [2, 4],
    priority: "medium",
    status: "todo",
  },
  {
    id: 3,
    category: "backoffice",
    title: "task c",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [1, 3],
    priority: "low",
    status: "inProgress",
  },
  {
    id: 4,
    category: "media",
    title: "task d",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [4],
    priority: "urgent",
    status: "inProgress",
  },
  {
    id: 5,
    category: "marketing",
    title: "task e",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: false },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [1, 2, 3, 4],
    priority: "low",
    status: "awaitingFeedback",
  },
  {
    id: 6,
    category: "backoffice",
    title: "task f",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [3, 4],
    priority: "urgent",
    status: "awaitingFeedback",
  },
  {
    id: 7,
    category: "marketing",
    title: "task g",
    description: "Modify the contents of the main website...",
    dueDate: "2023-02-01",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: true },
    ],
    assignedTo: [2, 3, 4],
    priority: "low",
    status: "done",
  },
  {
    id: 8,
    category: "media",
    title: "task h",
    description: "Make the product presentation to prospective buyers",
    dueDate: "2023-02-01",
    subtasks: [],
    assignedTo: [1],
    priority: "urgent",
    status: "done",
  },
];

async function render() {
  if (!tasks.length) await loadTasksFromBackend();
  if (!contacts.length) await loadContactsFromBackend();
  if (!currentTasksArray.length) {
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
  return `
        <div class="task-card" draggable="true" ondragstart="startDragging(${task.id})" onclick="openTaskOverlay(${task.id})">
            <span class="category ${task.category}">${task.category}</span>
            <div class="title">${task.title}</div>
            <div class="description">
                ${task.description}
            </div>
            <div class="subtasks-progress ${checkIfSubtasksAreEmpty(task)}">
                <progress value="${getDoneSubtasksInPercent(task)}" max="100"><progress>
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
  if (!task.subtasks.length) return "d-none";
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
  for (let assignedPerson of assignedContacts) {
    assignedPersonsHtml += `<div class="initials color-${assignedPerson.color}">${assignedPerson.initials}</div>`;
  }
  return assignedPersonsHtml;
}

function getInitials(name) {
  const fullname = name.split(" ");
  const [forename, lastname] = [fullname[0], fullname[fullname.length - 1]];
  return forename[0] + lastname[0];
}

function startDragging(id) {
  currentDraggedElement = id;
}

function allowDrop(ev) {
  ev.preventDefault();
}

async function moveTo(status) {
  console.log(status);
  const taskIndex = getIndexOfArray(tasks, currentDraggedElement);
  tasks[taskIndex].status = status;
  console.log(tasks[taskIndex].status);
  await saveTasksToBackend();
  // await saveContactsToBackend();
  render();
}

function getStatusOfDraggedElement(status) {
  statusOfDraggedElement = status;
}

function addPlaceholder() {
  const placeholder = document.querySelectorAll(".task-card-placeholder");

  for (let place of placeholder) {
    const status = place.classList[1].split("-")[0];
    if (!(statusOfDraggedElement === status))
      place.classList.remove("d-none");
  }
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
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  taskOverlayBg.classList.remove("d-none");
}

function closeTaskOverlay() {
  taskOverlayBg.classList.add("d-none");
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  hideCategories();
  hideContacts();
}

render();

function renderCategory(taskIndex) {
  const categoryContainer = document.querySelector("#category");
  categoryContainer.className = "";
  categoryContainer.classList.add("category");
  categoryContainer.classList.add("design");
  // categoryContainer.classList.add(tasks[taskIndex].category);
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
    subtasksHtml += generateSubtaskHtml(subtasksArray, i);
  }
  return subtasksHtml;
}

function generateSubtaskHtml(subtasksArray, subtaskId) {
  return `
      <div class="subtask" id="subtask-${subtaskId}">
        <input
          class="subtask-checkbox"
          type="checkbox"
          ${checkIfDone(subtasksArray, subtaskId)}
        />
        <span>${subtasksArray[subtaskId]}</span>
      </div>
    `;
}

function checkIfDone(subtasksArray, subtaskId) {
  if (subtasksArray[subtaskId].done) return "checked";
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
  renderCurrentStatus(taskIndex);
  renderCategories(tasks[taskIndex].category);
  renderCurrentTitle(taskIndex);
  rendercurrentDescription(taskIndex);
  renderCurrentDueDate(taskIndex);
  renderCurrentPriority(taskIndex);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  renderEditTaskOverlayButtons(taskIndex);
  taskOverlayContentContainer.classList.add('d-none');
  taskOverlayEditContentContainer.classList.remove('d-none');
}

function renderCurrentStatus(taskIndex) {
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
  render();
}

async function deleteTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  tasks.splice(taskIndex, 1);
  await saveTasksToBackend();
  closeTaskOverlay();
  render();
}