function openAddTask() {
    let addTaskOverlay = document.getElementById("addTaskOverlay");
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.add("slideIn");
    addTaskOverlay.classList.remove("d-none");
}

function closeAddTask() {
    let taskModul = document.getElementById('addTaskModul');
    taskModul.classList.remove("slideIn");
    taskModul.classList.add("slideOut");
    setTimeout(addDisplayNone, 550);
}

function openAddContact() {
    //TODO
}

function closeAddContact() {

}

function dontClose(e) {
    e.stopPropagation();
}

function addDisplayNone() {
    addTaskOverlay.classList.add("d-none")
}