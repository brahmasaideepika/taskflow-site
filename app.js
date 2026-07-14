import { saveTasks, loadTasks } from "./modules/storage.js";
import { renderTaskList } from "./modules/render.js";
import { validateTaskInput } from "./modules/validation.js";

let tasks = loadTasks();

const form = document.getElementById("task-form");
const input = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");

let currentFilter = "all";

function createTask(text) {
    return {
        id: Date.now(),
        text: text.trim(),
        completed: false
    };
}

function updateCounter() {
    taskCount.textContent = `${tasks.length} Task(s)`;
}

function getFilteredTasks() {
    if (currentFilter === "active") {
        return tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        return tasks.filter(task => task.completed);
    }

    return tasks;
}

function render() {
    renderTaskList(taskList, getFilteredTasks());
    updateCounter();
}

render();

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (!validateTaskInput(input.value)) {
        return;
    }

    tasks.push(createTask(input.value));

    saveTasks(tasks);

    input.value = "";

    render();
});

taskList.addEventListener("click", (e) => {

    const taskElement = e.target.closest(".task");

    if (!taskElement) return;

    const id = Number(taskElement.dataset.id);

    if (e.target.classList.contains("delete-btn")) {
        tasks = tasks.filter(task => task.id !== id);

        saveTasks(tasks);

        render();
    }

    if (e.target.type === "checkbox") {

        const task = tasks.find(task => task.id === id);

        task.completed = e.target.checked;

        saveTasks(tasks);

        render();
    }
});

document.querySelectorAll("[data-filter]").forEach(button => {

    button.addEventListener("click", () => {

        currentFilter = button.dataset.filter;

        render();
    });

});