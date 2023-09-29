document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task");
    const priorityInput = document.getElementById("priority");
    const deadlineInput = document.getElementById("deadline");
    const addTaskButton = document.getElementById("add-task");
    const taskList = document.getElementById("task-list");

    // Create an array to store tasks
    const tasks = [];

    addTaskButton.addEventListener("click", () => {
        const task = taskInput.value;
        const priority = priorityInput.value;
        const deadline = deadlineInput.value;
        if (task.trim() === "" || deadline === "") {
            alert("Please select an upcoming date for the deadline.");
            return; // Don't add task if task or deadline is empty
        }

        const selectedDate = new Date(deadline);
        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            alert("Please select an upcoming date for the deadline.");
            return; // Don't add task if deadline is not in the future
        }

        const taskItem = document.createElement("div");
        taskItem.classList.add("task");
        taskItem.innerHTML = `
            <p>${task}</p>
            <p>Priority: ${priority}</p>
            <p>Deadline: ${deadline}</p>
            <button class="mark-done">Mark Done</button>
        `;

        // Push the task object to the tasks array
        tasks.push({
            task,
            priority,
            deadline,
            element: taskItem,
        });

        // Sort tasks by priority before appending
        tasks.sort((a, b) => {
            const priorityOrder = { top: 1, middle: 2, low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });

        // Clear the task list and append tasks in sorted order
        taskList.innerHTML = "";
        tasks.forEach((taskObj) => {
            taskList.appendChild(taskObj.element);
        });

        taskInput.value = "";
        priorityInput.value = "top";
        deadlineInput.value = "";
    });

    taskList.addEventListener("click", (event) => {
        if (event.target.classList.contains("mark-done")) {
            const taskItem = event.target.parentElement;
            taskItem.style.backgroundColor = "#f2f2f2";
            event.target.disabled = true;
        }
    });
});
