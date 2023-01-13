function openAddTask() {
    let addTaskOverlay = document.getElementById("addTaskOverlay");
    addTaskOverlay.classList.remove("d-none");
}

function closeAddTask() {
    addTaskOverlay.classList.add("d-none");
}

function dontClose(e) {
    e.stopPropagation();
}