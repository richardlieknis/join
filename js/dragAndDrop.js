"use strict";

function startDragging(id) {
    currentDraggedElement = id;
  }
  
  function allowDrop(ev) {
    ev.preventDefault();
  }
  
  async function moveTo(status) {
    const taskIndex = getIndexOfArray(tasks, currentDraggedElement);
    tasks[taskIndex].status = status;
    await saveTasksToBackend();
    renderTasks();
  }
  
  function getStatusOfDraggedElement(status) {
    statusOfDraggedElement = status;
  }
  
  function addPlaceholder() {
    const placeholder = document.querySelectorAll(".task-card-placeholder");
  
    for (let place of placeholder) {
      const status = place.classList[1].split("-")[0];
      if (!(statusOfDraggedElement === status))
        place.classList.remove("d-none");
    }
  }