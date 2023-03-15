let taskIdCounter = 0;
let subtasks = [];


// Create tasks

async function createTask(status) {
    const title = document.getElementById("task-input-title");
    const description = document.getElementById("task-input-description");
    const category = document.getElementById("task-input-category");
    console.log(category.value);
    const dueDate = document.getElementById("task-input-dueDate");
    const assignedTo = getAssignedPersons();
    await loadTasksFromBackend();
    await setTasksIdCounter();
    pushToTasksArray(title.value, description.value, category.value, [...assignedTo], dueDate.value, status);
    clearTasksInputFields(title, description, category, assignedTo, dueDate);
    await saveTasksToBackend();
    showPopup("Task added to Board!");
    subtasks = [];
    clearTaskInputs();
}

async function createTaskAtBoard(status) {
    await createTask(status);
    closeAddTask();
    currentTasksArray = tasks;
    try {
        await renderTasks();
    } catch (error) {}
    addOverlayOnclick();
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
        assignedTo: assignedTo,
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

function getAssignedPersons() {
    const availavlePersons = getAllContactIds();
    let assignedTo = [];

    availavlePersons.forEach(i => {
        if (document.getElementById(i).checked) {
            assignedTo.push(i);
        }
    });
    return assignedTo;
}

function getAllContactIds() {
    let availavlePersons = [];

    contacts.forEach(i => {
        availavlePersons.push(i.id);
    });
    return availavlePersons;
}

// Edit Tasks

async function editTask(taskId) {
    const category = document.getElementById('currentCategory');
    const title = document.getElementById('currentTitle');
    const description = document.getElementById('currentDescription');
    const status = document.getElementById('currentStatus');
    const dueDate = document.getElementById('currentDueDate');

    pushEditedTasks(taskId, category.textContent, title.value, description.value, status.textContent, dueDate.value);
}

async function pushEditedTasks(taskId, category, title, description, status, dueDate) {
    const index = getIndexOfArray(tasks, taskId);
    tasks[index].category = category;
    tasks[index].title = title;
    tasks[index].description = description;
    tasks[index].status = status;
    tasks[index].dueDate = dueDate;
    tasks[index].priority = currentPriority;

    await saveTasksToBackend();
}