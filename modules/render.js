export function renderTaskList(
  taskListElement,
  tasks
) {

  taskListElement.innerHTML = "";

  if (tasks.length === 0) {

    taskListElement.innerHTML =
      "<li class='empty-state'>No tasks found</li>";

    return;
  }

  tasks.forEach(task => {

    const li =
      document.createElement("li");

    li.className =
      task.completed
        ? "task completed"
        : "task";

    li.dataset.id = task.id;

    li.innerHTML = `
      <label>
        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
        >
        <span>${task.text}</span>
      </label>

      <button class="delete-btn">
        Delete
      </button>
    `;

    taskListElement.appendChild(li);
  });
}
