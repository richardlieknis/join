setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

let taskIdCounter = 0;
let subtasks = [];

async function createTask() {
  await loadTasksToBackend();
  const titel = document.getElementById("task-input-title");
  const description = document.getElementById("task-input-description");
  const category = document.getElementById("task-input-category");
  const assignedTo = document.getElementById("task-input-assignedTo");
  const dueDate = document.getElementById("task-input-dueDate");

  pushToTasksArray(titel.value, description.value, category.value, assignedTo.value, dueDate.value);
  clearTasksInputFields(titel, description, category, assignedTo, dueDate);
}

async function saveTasksToBackend() {
  await backend.setItem('tasks', JSON.stringify(tasks));
}

async function loadTasksFromBackend() {
  await downloadFromServer();
  tasks = JSON.parse(backend.getItem('tasks')) || [];
}

function pushToTasksArray(titel, description, category, assignedTo, dueDate) {
  const task = {
    id: taskIdCounter,
    titel: titel,
    description: description,
    category: category,
    assignedTo: assignedTo,
    dueDate: dueDate
  }
  tasks.push(task);
  taskIdCounter++;
}

function clearTasksInputFields(titel, description, category, assignedTo, dueDate) {
  titel.value = "";
  description.value = "";
  category.value = "";
  assignedTo.value = "";
  dueDate.value = "";
}
