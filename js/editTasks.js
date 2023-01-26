setURL('https://gruppe-join-422.developerakademie.net/smallest_backend');

let taskIdCounter = 0;
let subtasks = [];

// Create tasks

async function createTask(status) {
    await loadTasksFromBackend();
    const title = document.getElementById("task-input-title");
    const description = document.getElementById("task-input-description");
    const category = document.getElementById("task-input-category");
    const assignedTo = document.getElementById("task-input-assignedTo");
    const dueDate = document.getElementById("task-input-dueDate");

    await setTasksIdCounter();
    pushToTasksArray(title.value, description.value, category.value, assignedTo.value, dueDate.value, status);
    clearTasksInputFields(title, description, category, assignedTo, dueDate);
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

function pushToTasksArray(title, description, category, assignedTo, dueDate, status) {
    const task = {
        id: taskIdCounter,
        title: title,
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

function clearTasksInputFields(title, description, category, assignedTo, dueDate) {
    title.value = "";
    description.value = "";
    category.value = "";
    assignedTo.value = "";
    dueDate.value = "";
    choosePriority("none")
}

// Edit Tasks

async function editTask(taskId) {
    await loadTasksFromBackend();
    const category = document.getElementById('currentCategory');
    const title = document.getElementById('currentTitle');
    const description = document.getElementById('currentDescription');
    const dueDate = document.getElementById('currentDueDate');

    pushEditedTasks(taskId, category.value, title.value, description.value, dueDate.value);
}

async function pushEditedTasks(taskId, category, title, description, dueDate) {
    const index = getIndexOfArray(tasks, taskId);
    tasks[index].category = category;
    tasks[index].title = title;
    tasks[index].description = description;
    tasks[index].dueDate = dueDate;

    await saveTasksToBackend();
}