"use strict";

/**
 * render category for task overlay
 *
 * @param {number} taskIndex - index of task
 */
function renderCategory(taskIndex) {
  const categoryContainer = document.querySelector("#category");
  const currentCategory = categories.filter(
    (category) => category.name === tasks[taskIndex].category
  );
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
    const day = tasks[taskIndex][containerId].split("-")[2];
    const month = tasks[taskIndex][containerId].split("-")[1];
    const year = tasks[taskIndex][containerId].split("-")[0];
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
    if (subtasksArray[i].done)
      subtasksHtml += generateCheckedSubtaskHtml(
        tasks[taskIndex].id,
        subtasksArray,
        i
      );
    if (!subtasksArray[i].done)
      subtasksHtml += generateUncheckedSubtaskHtml(
        tasks[taskIndex].id,
        subtasksArray,
        i
      );
  }
  return subtasksHtml;
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
  const assignedPersonsContainer = document.querySelector(
    "#assignedPersonsContainer"
  );
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
  const assignedContacts = contacts.filter((contact) =>
    tasks[taskIndex].assignedTo.includes(contact.id)
  );
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
  const taskOverlayButtonsContainer = document.querySelector(
    "#taskOverlayButtons"
  );
  taskOverlayButtonsContainer.innerHTML =
    generateTaskOverlayButtonsHtml(taskIndex);
}

/**
 * open edit view of task
 *
 * @param {number} taskId - id of task
 */
function renderEditTask(taskId) {
  const taskIndex = getIndexOfArray(tasks, taskId);
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
  document.querySelector('#taskOverlayContent').classList.add("d-none");
  document.querySelector('#taskOverlayEditContent').classList.remove("d-none");
}

/**
 * render current category
 *
 * @param {number} taskIndex - index of task
 */
function renderCurrentCategory(taskIndex) {
  document.querySelector('#currentCategory').innerHTML = tasks[taskIndex].category;
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
      categoriesContainer.innerHTML += generateCategoriesHtml(category);
    }
  }
}

/**
 * render current title for task edit view
 *
 * @param {number} taskIndex - index of task
 */
function renderCurrentTitle(taskIndex) {
  document.querySelector("#currentTitle").value = tasks[taskIndex].title;
}

/**
 * render current description for task edit view
 *
 * @param {number} taskIndex - index of task
 */
function rendercurrentDescription(taskIndex) {
  document.querySelector("#currentDescription").value =
    tasks[taskIndex].description;
}

/**
 * render current status for task edit view
 *
 * @param {number} taskIndex - index of task
 */
function renderCurrentStatus(taskIndex) {
  document.querySelector('#currentStatus').innerHTML = tasks[taskIndex].status;
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
 * render current due date for task edit view
 *
 * @param {number} taskIndex - index of task
 */
function renderCurrentDueDate(taskIndex) {
  document.querySelector("#currentDueDate").value = tasks[taskIndex].dueDate;
}

/**
 * render priority buttons for task edit view
 *
 */
function renderCurrentPriority() {
  removeActiveClassFromPriorityButton();
  if (currentPriority === "urgent") {
    document.querySelector('#priority-urgent').classList.add("active");
    document.querySelector('#priority-urgent').childNodes[3].src = "../src/img/urgent-white.svg";
  } else if (currentPriority === "medium") {
    document.querySelector('#priority-medium').classList.add("active");
    document.querySelector('#priority-medium').childNodes[3].src = "../src/img/medium-white.svg";
  } else if (currentPriority === "low") {
    document.querySelector('#priority-low').classList.add("active");
    document.querySelector('#priority-low').childNodes[3].src = "../src/img/low-white.svg";
  }
}

/**
 * render assigned contacts
 *
 * @param {number} taskIndex - index of task
 */
function renderCurrentAssignedContacts(taskIndex) {
  const assignedContacts = contacts.filter((contact) => tasks[taskIndex].assignedTo.includes(contact.id));
  const assignedContactsContainer = document.querySelector("#assignedContacts");
  assignedContactsContainer.innerHTML = "";
  for (let assignedPerson of assignedContacts) {
    assignedContactsContainer.innerHTML += generateCurrentAssignedPersonsHtml(assignedPerson);
  }
}

/**
 * render list of contacts
 *
 * @param {number} taskIndex - index of task
 */
function renderContacts(taskIndex) {
  contactsContainer.innerHTML = "";
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
 * render invite new contact container
 *
 * @param {number} taskId - id of task
 */
function renderInviteNewContactInputContainer(taskId) {
  const inviteNewContactInputContainer = document.querySelector("#inviteNewContactInputContainer");
  inviteNewContactInputContainer.innerHTML = generateInviteNewContactInputContainerHtml(taskId);
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
