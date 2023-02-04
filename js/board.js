"use strict";

setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

const progressStepCategories = ["todo", "inProgress", "awaitingFeedback", "done"];
let filteredTasks = [];
let isFiltering = false;
let currentTasksArray = tasks;
let currentDraggedElement;
let statusOfDraggedElement;
let currentPriority;
const createTaskButton = document.querySelector('#createTaskButton');

/**
 * render all tasks in board
 * 
 */
async function renderTasks() {
  if (!tasks.length) await loadTasksFromBackend();
  if (!contacts.length) await loadContactsFromBackend();
  if (!categories.length) await loadCategoriesFromBackend();
  if (!currentTasksArray.length && !isFiltering) {
    currentTasksArray = tasks;
  }
  for (let status of progressStepCategories) updateHtml(status, currentTasksArray);
}

/**
 * update columns html in board
 * 
 * @param {string} status - status name of the column which should update html
 * @param {Array} tasksArrayToRender - array to render in specified status
 */
function updateHtml(status, tasksArrayToRender) {
  const progressStep = tasksArrayToRender.filter((task) => task.status === status);
  const progressStepHtmlContainer = document.querySelector(`#${status}-tasks`);
  progressStepHtmlContainer.innerHTML = "";
  for (let task of progressStep) {
    progressStepHtmlContainer.innerHTML += generateTaskCardtHtml(task);
  }
  progressStepHtmlContainer.innerHTML += generatePlaceholderHtml(status);
}

/**
 * check if subtasks array is empty
 * 
 * @param {object} task - task to check
 * @returns - d-none if subtaks array is empty
 */
function checkIfSubtasksAreEmpty(task) {
  return task.subtasks.length ? "" : "d-none";
}

/**
 * get number of done subtasks
 * 
 * @param {object} task - task from which the completed subtasks are to be counted
 * @returns - count of completed subtasks
 */
function getDoneSubtasks(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  return doneSubtasks.length;
}

/**
 * get percent of done subtasks
 * 
 * @param {object} task - task from which the completed subtasks are to be counted in percent
 * @returns - percent of completed subtasks
 */
function getDoneSubtasksInPercent(task) {
  const doneSubtasks = task.subtasks.filter((subtask) => subtask.done);
  const percent = doneSubtasks.length ? (100 / task.subtasks.length) * doneSubtasks.length : 0; 
  return percent;
}

/**
 * get initals
 * 
 * @param {string} name - name from which the initials are needed
 * @returns - initials
 */
function getInitials(name) {
  const fullname = name.split(" ");
  const [forename, lastname] = [fullname[0], fullname[fullname.length - 1]];
  return forename[0] + lastname[0];
}

/**
 * open task overlay
 * 
 * @param {number} taskId - id of the task to be opened
 */
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
  document.querySelector('#taskOverlayContent').classList.remove('d-none');
  document.querySelector('#taskOverlayEditContent').classList.add('d-none');
  document.querySelector('#taskOverlayBg').classList.remove('d-none');
}

/**
 * close task overlay
 * 
 */
function closeTaskOverlay() {
  document.querySelector("#taskOverlayBg").classList.add("d-none");
  document.querySelector('#taskOverlayContent').classList.remove('d-none');
  document.querySelector('#taskOverlayEditContent').classList.add('d-none');
  hideCategories();
  hideStatus();
  hideContacts();

  hideInviteNewContactInput();
}

renderTasks();

/**
 * check or uncheck subtask
 * 
 * @param {number} taskId - id of task
 * @param {number} subtaskIndex - index of subtask which is clicked
 */
async function clickSubtask(taskId, subtaskIndex) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  await toggleTaskDone(taskIndex, subtaskIndex);
  await renderTasks();
  openTaskOverlay(taskId);
  await saveTasksToBackend();
}

async function toggleTaskDone(taskIndex, subtaskIndex) {
  if (tasks[taskIndex].subtasks[subtaskIndex].done) {
    tasks[taskIndex].subtasks[subtaskIndex].done = false;
  } else if (!tasks[taskIndex].subtasks[subtaskIndex].done) {
    tasks[taskIndex].subtasks[subtaskIndex].done = true;
  }
}

/**
 * toggle category list
 * 
 */
function showOrHideCategories() {
  document.querySelector('#categoriesContainer').classList.toggle('d-none');
  hideStatus();
  hideContacts();
}

/**
 * hide category list
 * 
 */
function hideCategories() {
  if (!document.querySelector('#categoriesContainer').classList.contains('d-none')) document.querySelector('#categoriesContainer').classList.add('d-none');
}

/**
 * set category
 * 
 * @param {string} category - new category
 */
function setCategory(category) {
  document.querySelector('#currentCategory').innerHTML = category;
  renderCategories(category);
}

/**
 * toggle status list
 * 
 */
function showOrHideStatus() {
  document.querySelector('#statusContainer').classList.toggle('d-none');
  hideCategories();
  hideContacts();
}

/**
 * hide status list
 * 
 */
function hideStatus() {
  if (!document.querySelector('#statusContainer').classList.contains('d-none')) document.querySelector('#statusContainer').classList.add('d-none');
}

/**
 * set status
 * 
 * @param {string} status - new status
 */
function setStatus(status) {
  document.querySelector('#currentStatus').innerHTML = status;
  renderStatus(status);
}

/**
 * remove active class from priority buttons
 * 
 */
function removeActiveClassFromPriorityButton() {
  const priorityButtons = document.querySelectorAll('.priority-button');
  for (let priorityButton of priorityButtons) {
    priorityButton.classList.remove('active');
  }
  document.querySelector('#priority-urgent').childNodes[3].src = "../src/img/urgent.svg";
  document.querySelector('#priority-medium').childNodes[3].src = "../src/img/medium.svg";
  document.querySelector('#priority-low').childNodes[3].src = "../src/img/low.svg";
}

/**
 * set priority
 * 
 * @param {string} priority - new priority
 */
function setPriority(priority) {
  currentPriority = priority;
  renderCurrentPriority();
}

/**
 * check contact
 * 
 * @param {number} contactId - id of contact
 * @param {number} taskIndex - index of task
 */
async function checkContact(contactId, taskIndex) {
  tasks[taskIndex].assignedTo.push(contactId);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  await saveTasksToBackend();
}

/**
 * uncheck contact
 * 
 * @param {number} contactId - id of contact
 * @param {number} taskIndex - index of task
 */
async function uncheckContact(contactId, taskIndex) {
  const index = tasks[taskIndex].assignedTo.indexOf(contactId);
  if (index > -1) tasks[taskIndex].assignedTo.splice(index, 1);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  await saveTasksToBackend();
}

/**
 * show invite new contact input field
 * 
 */
function showInviteNewContactInput() {
  document.querySelector('#assignedToSelectButton').classList.add('d-none');
  document.querySelector('#inviteNewContactInputContainer').classList.remove('d-none');
}

/**
 * hide invite new contact input field
 * 
 */
function hideInviteNewContactInput() {
  // document.querySelector('#contactEmail').value = '-';
  document.querySelector('#assignedToSelectButton').classList.remove('d-none');;
  document.querySelector('#inviteNewContactInputContainer').classList.add('d-none');
  hideContacts();
  document.querySelector('#contactEmail').value = '';
}

/**
 * add new contact from task overlay edit view and assign to task
 * 
 * @param {number} taskId - id of task
 */
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

/**
 * check if new contact exists in contacts array
 * 
 * @param {string} contactEmail - email to check
 * @returns - true or false
 */
function checkIfContactExist(contactEmail) {
  const emailsArray = contacts.map(contact => contact.email.toLowerCase());
  return emailsArray.includes(contactEmail.toLowerCase()) ? true : false;
}

/**
 * toggle contact list in task overlay edit view
 * 
 */
function showOrHideContacts() {
  document.querySelector('#contactsContainer').classList.toggle('d-none');
  hideCategories();
  hideStatus();
}

/**
 * hide contact list in task overlay edit view
 * 
 */
function hideContacts() {
  if (!document.querySelector('#contactsContainer').classList.contains('d-none')) document.querySelector('#contactsContainer').classList.add('d-none');
}
document.querySelector('#taskOverlayEditContent').addEventListener('click', closeDropDowns);

/**
 * close dropdowns when user are clicking on task edit overlay
 * 
 * @param {object} e - element which was clicked
 */
function closeDropDowns(e) {
  if (!e.target.className.includes("drop")) {
    hideCategories();
    hideStatus();
    hideContacts();
  }
}

/**
 * save task changes
 * 
 * @param {number} taskId 
 */
async function saveChanges(taskId) {
  await editTask(taskId);
  openTaskOverlay(taskId);
  renderTasks();
}

/**
 * delete task
 * 
 * @param {number} taskId 
 */
async function deleteTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId);
  tasks.splice(taskIndex, 1);
  await saveTasksToBackend();
  closeTaskOverlay();
  renderTasks();
}