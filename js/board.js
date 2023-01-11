"use strict";

const categories = ["todo", "inProgress", "awaitingFeedback", "done"];
let currentTasksArray = tasks;
let filteredTasks = [];
let currentDraggedElement;
let categoryOfDraggedElement;

const dummyData = [
  {
    id: 0,
    label: "design",
    title: "task a",
    description: "Modify the contents of the main website...",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "SM",
      },
    ],
    priority: "low",
    category: "todo",
  },
  {
    id: 1,
    label: "sales",
    title: "task b",
    description: "Make the product presentation to prospective buyers",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "SM",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "SM",
      },
    ],
    priority: "urgent",
    category: "todo",
  },
  {
    id: 2,
    label: "backoffice",
    title: "task c",
    description: "Modify the contents of the main website...",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "SM",
      },
    ],
    priority: "low",
    category: "inProgress",
  },
  {
    id: 3,
    label: "media",
    title: "task d",
    description: "Make the product presentation to prospective buyers",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "SM",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "SM",
      },
    ],
    priority: "urgent",
    category: "inProgress",
  },
  {
    id: 4,
    label: "marketing",
    title: "task e",
    description: "Modify the contents of the main website...",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "SM",
      },
    ],
    priority: "low",
    category: "awaitingFeedback",
  },
  {
    id: 5,
    label: "backoffice",
    title: "task f",
    description: "Make the product presentation to prospective buyers",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "SM",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "SM",
      },
    ],
    priority: "urgent",
    category: "awaitingFeedback",
  },
  {
    id: 6,
    label: "marketing",
    title: "task g",
    description: "Modify the contents of the main website...",
    subtasks: [
      { title: "subtask 1", done: true },
      { title: "subtask 2", done: false },
    ],
    assignedTo: [
      {
        name: "Sandra Müller",
        email: "sandra.mueller@gmx.de",
        phone: "+4994937394",
        color: "blue",
        initials: "SM",
      },
      {
        name: "Manuel Vogel",
        email: "manu.vogel@gmail.com",
        phone: "+49934798347",
        color: "pink",
        initials: "SM",
      },
    ],
    priority: "low",
    category: "done",
  },
  {
    id: 7,
    label: "media",
    title: "task h",
    description: "Make the product presentation to prospective buyers",
    subtasks: [],
    assignedTo: [
      {
        name: "Anton Sommer",
        email: "anton.so@gmx.net",
        phone: "+4998747394",
        color: "dark-blue",
        initials: "SM",
      },
      {
        name: "Denise Eibold",
        email: "denise.e@gmail.com",
        phone: "+494556657",
        color: "red",
        initials: "SM",
      },
    ],
    priority: "urgent",
    category: "done",
  },
];

tasks.push(...dummyData);

function render() {
  for (let category of categories) updateHtml(category, currentTasksArray);
}

// prettier-ignore
function updateHtml(category, tasksArrayToRender) {
  const progressStep = tasksArrayToRender.filter((task) => task.category === category);
  const progressStepHtmlContainer = document.querySelector(`#${category}-tasks`);
  progressStepHtmlContainer.innerHTML = "";
  for (let task of progressStep) {
    progressStepHtmlContainer.innerHTML += generateTaskCardtHtml(task);
  }
  progressStepHtmlContainer.innerHTML += generatePlaceholderHtml(category);
}

// prettier-ignore
function generateTaskCardtHtml(task) {
  return `
        <div class="task-card" draggable="true" ondragstart="startDragging(${task.id})">
            <span class="label ${task.label}">${task.label}</span>
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
                <div class="priority"><img src="../src/img/${
                  task.priority
                }.svg" /></div>
            </div>
        </div>
  `;
}

function generatePlaceholderHtml(category) {
  return `
        <div class="task-card-placeholder ${category}-task-card-placeholder d-none"></div>
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
  let assignedPersonsHtml = "";
  for (let assignedPerson of task.assignedTo) {
    assignedPersonsHtml += `<div class="initials ${assignedPerson.color}">${assignedPerson.initials}</div>`;
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

function moveTo(category) {
  tasks[currentDraggedElement].category = category;
  render();
}

function getCategoryOfDraggedElement(category) {
  categoryOfDraggedElement = category;
}

function addPlaceholder() {
  const placeholder = document.querySelectorAll(".task-card-placeholder");

  for (let place of placeholder) {
    const category = place.classList[1].split("-")[0];
    if (!(categoryOfDraggedElement === category))
      place.classList.remove("d-none");
  }
}

render();
