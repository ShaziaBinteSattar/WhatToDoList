// Select the input field and the add button
const inputField = document.querySelector('input') as HTMLInputElement;
const addButton = document.querySelector('button') as HTMLButtonElement;
const container = document.querySelector('.container') as HTMLDivElement;
let taskContainers = document.querySelectorAll('.task') as NodeListOf<HTMLDivElement>;

// Function to handle adding tasks
addButton.addEventListener('click', () => {
    const taskValue = inputField.value.trim();
    if (taskValue !== '') {
        assignTask(taskValue);
        inputField.value = ''; // Clear input after task is added
    }
});

// Function to assign task or create a new one if all containers are filled
function assignTask(task: string) {
    let taskAssigned = false;

    taskContainers.forEach((taskContainer, index) => {
        const taskSpan = taskContainer.querySelector('span') as HTMLSpanElement;

        // Assign task to available container if not already assigned
        if (taskSpan.textContent?.startsWith("This is the task") && !taskAssigned) {
            taskSpan.textContent = `This is given task ${index + 1}: ${task}`;
            taskAssigned = true;
        }

        // Attach the edit and delete functionality to the buttons
        const editButton = taskContainer.querySelector('.edit') as HTMLButtonElement;
        const deleteButton = taskContainer.querySelector('.delete') as HTMLButtonElement;

        if (!editButton.onclick) {
            editButton.addEventListener('click', () => editTask(taskSpan));
        }
        if (!deleteButton.onclick) {
            deleteButton.addEventListener('click', () => deleteTask(taskContainer));
        }
    });

    // If no existing task containers are available, create a new one
    if (!taskAssigned) {
        createNewTaskContainer(task);
    }
}

// Function to create a new task container div dynamically
function createNewTaskContainer(task: string) {
    const newTaskDiv = document.createElement('div');
    newTaskDiv.classList.add('task');

    // Create the task content
    const taskSpan = document.createElement('span');
    const taskIndex = taskContainers.length + 1;
    taskSpan.textContent = `This is given task ${taskIndex}: ${task}`;

    // Create edit and delete buttons
    const buttonDiv = document.createElement('div');
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.classList.add('edit');
    editButton.addEventListener('click', () => editTask(taskSpan));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add('delete');
    deleteButton.addEventListener('click', () => deleteTask(newTaskDiv));

    // Append buttons to button div
    buttonDiv.appendChild(editButton);
    buttonDiv.appendChild(deleteButton);

    // Append span and buttons div to new task div
    newTaskDiv.appendChild(taskSpan);
    newTaskDiv.appendChild(buttonDiv);

    // Append the new task div to the container
    container.appendChild(newTaskDiv);

    // Update taskContainers to include the new task div
    taskContainers = document.querySelectorAll('.task');
}

// Function to edit a task
function editTask(taskElement: HTMLSpanElement) {
    const newTask = prompt('Edit your task:', taskElement.textContent);
    if (newTask && newTask.trim() !== '') {
        taskElement.textContent = newTask;
    }
}

// Function to delete a task
function deleteTask(taskContainer: HTMLDivElement) {
    container.removeChild(taskContainer);
    taskContainers = document.querySelectorAll('.task');
}
// // Function to save tasks to local storage
// function saveTasks() {
//     const taskValues = Array.from(taskContainers).map((taskContainer) => {
//         const taskSpan = taskContainer.querySelector('span') as HTMLSpanElement;
//         return taskSpan.textContent;
//     });
//     localStorage.setItem('tasks', JSON.stringify(taskValues));
// }

// // Function to load tasks from local storage
// function loadTasks() {
//     const storedTasks = localStorage.getItem('tasks');
//     if (storedTasks) {
//         const taskValues = JSON.parse(storedTasks);
//         taskValues.forEach((taskValue, index) => {
//             const taskContainer = taskContainers[index];
//             if (taskContainer) {
//                 const taskSpan = taskContainer.querySelector('span') as HTMLSpanElement;
//                 taskSpan.textContent = taskValue;
//             } else {
//                 createNewTaskContainer(taskValue);
//             }
//         });
//     }
// }

// // Call loadTasks function when the page loads
// document.addEventListener('DOMContentLoaded', loadTasks);

// // Call saveTasks function whenever a task is added, edited or deleted
// addButton.addEventListener('click', saveTasks);
// taskContainers.forEach((taskContainer) => {
//     const editButton = taskContainer.querySelector('.edit') as HTMLButtonElement;
//     const deleteButton = taskContainer.querySelector('.delete') as HTMLButtonElement;
//     editButton.addEventListener('click', saveTasks);
//     deleteButton.addEventListener('click', saveTasks);
// });