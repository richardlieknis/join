"use strict";

const searchInput = document.querySelector("#find-task");

searchInput.addEventListener("input", filterTasks);

function filterTasks() {
  const input = searchInput.value.toLowerCase();
  if (input) {
    filteredTasks = tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(input) ||
        task.description.toLowerCase().includes(input)
    );
    currentTasksArray = filteredTasks;
  } else {
    currentTasksArray = tasks;
  }
  render(currentTasksArray);
}
