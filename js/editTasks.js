setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

let taskIdCounter = 0;
let subtasks = ["Subtask Test1", "Subtask Test2"];

// Create tasks

async function createTask(status) {
    await loadTasksFromBackend();
    const titel = document.getElementById("task-input-title");
    const description = document.getElementById("task-input-description");
    const category = document.getElementById("task-input-category");
    const assignedTo = document.getElementById("task-input-assignedTo");
    const dueDate = document.getElementById("task-input-dueDate");

    await setTasksIdCounter();
    pushToTasksArray(titel.value, description.value, category.value, assignedTo.value, dueDate.value, status);
    clearTasksInputFields(titel, description, category, assignedTo, dueDate);
    await saveTasksToBackend();
}

async function saveTasksToBackend() {
    await backend.setItem('tasks', JSON.stringify(tasks));
}

async function loadTasksFromBackend() {
    await downloadFromServer();
    tasks = JSON.parse(backend.getItem('tasks')) || [];
}

async function setTasksIdCounter() {
    await downloadFromServer();
    taskIdCounter = await backend.getItem('taskIdCounter');
    taskIdCounter++;
    await backend.setItem('taskIdCounter', taskIdCounter);
}

function pushToTasksArray(titel, description, category, assignedTo, dueDate, status) {
    const task = {
        id: taskIdCounter,
        titel: titel,
        description: description,
        category: category,
        assignedTo: [+assignedTo],
        dueDate: dueDate,
        status: status,
        priority: priority,
        subtasks: subtasks
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
    choosePriority("none")
}

// Edit Tasks