"use strict";

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

function getAssignedPersonsInitialsHtml(task) {
  console.log(task.assignedTo);
  
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

function generateAssignedPersonsHtml(assignedContacts, assignedContactIndex) {
    return `
        <div class="assigned-person">
          <span class="initials color-${assignedContacts[assignedContactIndex].color}">${assignedContacts[assignedContactIndex].initials}</span>
          <span class="full-name">${assignedContacts[assignedContactIndex].name}</span>
        </div>
      `;
}

function generateCurrentAssignedPersonsHtml(assignedPerson) {
  return `
      <div class="initials color-${assignedPerson.color}">${assignedPerson.initials}</div>
  `;
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

function generateCategoriesHtml(category) {
  return `
    <div onclick="setCategory('${category.name}')">
      <span>${category.name}</span>
      <div class="category-color color-${category.colorNumber}"></div>
    </div>
  `;
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