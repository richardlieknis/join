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
 * @param {*} tasksArrayToRender - array to render in specified status
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
  taskOverlayContentContainer.classList.remove('d-none');
  taskOverlayEditContentContainer.classList.add('d-none');
  taskOverlayBg.classList.remove("d-none");
}

/**
 * close task overlay
 * 
 */
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

/**
 * render category for task overlay
 * 
 * @param {number} taskIndex - index of task
 */
function renderCategory(taskIndex) {
  const categoryContainer = document.querySelector("#category");
  const currentCategory = categories.filter(category => category.name === tasks[taskIndex].category);
  categoryContainer.className = "";
  categoryContainer.classList.add("category");
  categoryContainer.classList.add(`color-${currentCategory[0].colorNumber}`);
  categoryContainer.innerHTML = tasks[taskIndex].category;
}

/**
 * render part of task overlay
 * 
 * @param {number} taskIndex - index of task
 * @param {string} containerId - id of part to render
 */
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

/**
 * render subtask container
 * 
 * @param {number} taskIndex - index of task
 */
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

/**
 * render subtasks for task overlay
 * 
 * @param {number} taskIndex - index of task
 * @returns - html of subtasks
 */
function renderAllSubtasks(taskIndex) {
  let subtasksHtml = "";
  const subtasksArray = [...tasks[taskIndex].subtasks];
  for (let i = 0; i < subtasksArray.length; i++) {
    if (subtasksArray[i].done) subtasksHtml += generateCheckedSubtaskHtml(tasks[taskIndex].id, subtasksArray, i);
    if (!subtasksArray[i].done) subtasksHtml += generateUncheckedSubtaskHtml(tasks[taskIndex].id, subtasksArray, i);
  }
  return subtasksHtml;
}

/**
 * check or uncheck subtask
 * 
 * @param {number} taskId - id of task
 * @param {number} subtaskIndex - index of subtask which is clicked
 */
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

/**
 * render priority for task overlay
 * 
 * @param {number} taskIndex - index of task
 */
function renderPriority(taskIndex) {
  const priorityContainer = document.querySelector("#priority");
  priorityContainer.className = "";
  priorityContainer.classList.add("category");
  priorityContainer.classList.add(tasks[taskIndex].priority);
  priorityContainer.innerHTML = `<span>${tasks[taskIndex].priority}</span>`;
  priorityContainer.innerHTML += `<img src="../src/img/${tasks[taskIndex].priority}-white.svg" />`;
}

/**
 * render assigned contacts for task overlay
 * 
 * @param {number} taskIndex - index of task
 */
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

/**
 * render contactlist
 * 
 * @param {number} taskIndex - index of task
 * @returns - html of contacts
 */
function renderAllAssignedPersons(taskIndex) {
  let assignedPersonHtml = "";
  const assignedContacts = contacts.filter(contact => tasks[taskIndex].assignedTo.includes(contact.id));
  for (let i = 0; i < assignedContacts.length; i++) {
    assignedPersonHtml += generateAssignedPersonsHtml(assignedContacts, i);
  }
  return assignedPersonHtml;
}

/**
 * render buttons of task overlay
 * 
 * @param {number} taskIndex - index of task
 */
function renderTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateTaskOverlayButtonsHtml(taskIndex);
}

/**
 * open edit view of task
 * 
 * @param {number} taskId - id of task
 */
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

/**
 * render current category
 * 
 * @param {number} taskIndex - index of task
 */
function renderCurrentCategory(taskIndex) {
  currentCategoryContainer.innerHTML = tasks[taskIndex].category;
}


/**
 * render categories list for task edit view
 * 
 * @param {string} categoryToIgnore - current category which should not displayd twice
 */
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

/**
 * toggle category list
 * 
 */
function showOrHideCategories() {
  categoriesContainer.classList.toggle('d-none');
}

/**
 * hide category list
 * 
 */
function hideCategories() {
  if (!categoriesContainer.classList.contains('d-none')) categoriesContainer.classList.add('d-none');
}

/**
 * set category
 * 
 * @param {string} category - new category
 */
function setCategory(category) {
  currentCategoryContainer.innerHTML = category;
  renderCategories(category);
}

/**
 * render current title for task edit view
 * 
 * @param {number} taskIndex - index of task
 */
function renderCurrentTitle(taskIndex) {
  document.querySelector('#currentTitle').value = tasks[taskIndex].title;
}

/**
 * render current description for task edit view
 * 
 * @param {number} taskIndex - index of task
 */
function rendercurrentDescription(taskIndex) {
  document.querySelector('#currentDescription').value = tasks[taskIndex].description;
}

/**
 * render current status for task edit view
 * 
 * @param {number} taskIndex - index of task
 */
function renderCurrentStatus(taskIndex) {
  currentStatusContainer.innerHTML = tasks[taskIndex].status;
}

/**
 * render status list for task edit view (only in mobile view)
 * 
 * @param {string} statusToIgnore - current status which should not displayd twice
 */
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

/**
 * toggle status list
 * 
 */
function showOrHideStatus() {
  console.log("runs");
  statusContainer.classList.toggle('d-none');
}

/**
 * hide status list
 * 
 */
function hideStatus() {
  if (!statusContainer.classList.contains('d-none')) statusContainer.classList.add('d-none');
}

/**
 * set status
 * 
 * @param {string} status - new status
 */
function setStatus(status) {
  currentStatusContainer.innerHTML = status;
  renderStatus(status);
}

/**
 * render current due date for task edit view
 * 
 * @param {number} taskIndex - index of task
 */
function renderCurrentDueDate(taskIndex) {
  document.querySelector('#currentDueDate').value = tasks[taskIndex].dueDate;
}

/**
 * render priority buttons for task edit view
 * 
 */
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

/**
 * remove active class from priority buttons
 * 
 */
function removeActiveClassFromPriorityButton() {
  const priorityButtons = document.querySelectorAll('.priority-button');
  for (let priorityButton of priorityButtons) {
    priorityButton.classList.remove('active');
  }
  priorityUrgentButton.childNodes[3].src = "../src/img/urgent.svg";
  priorityMediumButton.childNodes[3].src = "../src/img/medium.svg";
  priorityLowButton.childNodes[3].src = "../src/img/low.svg";
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
 * render assigned contacts
 * 
 * @param {number} taskIndex - index of task
 */
function renderCurrentAssignedContacts(taskIndex) {
  const assignedContacts = contacts.filter(contact => tasks[taskIndex].assignedTo.includes(contact.id));
  const assignedContactsContainer = document.querySelector('#assignedContacts');
  assignedContactsContainer.innerHTML = "";
  for (let assignedPerson of assignedContacts) {
    assignedContactsContainer.innerHTML += generateCurrentAssignedPersonsHtml(assignedPerson)
  }
}

/**
 * render list of contacts
 * 
 * @param {number} taskIndex - index of task
 */
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
  console.log("uncheck", contactId, taskIndex);
  console.log(tasks[taskIndex].assignedTo);
  const index = tasks[taskIndex].assignedTo.indexOf(contactId);
  if (index > -1) tasks[taskIndex].assignedTo.splice(index, 1);
  renderContacts(taskIndex);
  renderCurrentAssignedContacts(taskIndex);
  await saveTasksToBackend();
}

/**
 * render invite new contact container
 * 
 * @param {number} taskId - id of task
 */
function renderInviteNewContactInputContainer(taskId) {
  const inviteNewContactInputContainer = document.querySelector('#inviteNewContactInputContainer');
  inviteNewContactInputContainer.innerHTML = generateInviteNewContactInputContainerHtml(taskId);
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
  contactsContainer.classList.toggle('d-none');
}

/**
 * hide contact list in task overlay edit view
 * 
 */
function hideContacts() {
  if (!contactsContainer.classList.contains('d-none')) contactsContainer.classList.add('d-none');
}

/**
 * render buttons in task overlay edit view
 * 
 * @param {number} taskIndex - index of task
 */
function renderEditTaskOverlayButtons(taskIndex) {
  const taskOverlayButtonsContainer = document.querySelector("#taskOverlayButtons");
  taskOverlayButtonsContainer.innerHTML = generateEditTaskOverlayButtonsHtml(taskIndex);
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