document.addEventListener('DOMContentLoaded', function() {
    const addTaskBtn = document.getElementById('add-task-btn');
    const taskSearchInput = document.getElementById('task-search');
    const tasksContainer = document.getElementById('tasks-container');

    addTaskBtn.addEventListener('click', function() {
        const newTaskText = prompt('Enter a new task:');
        if (newTaskText) {
            addTask(newTaskText);
        }
    });

    function addTask(taskText) {
        const taskElement = document.createElement('div');
        taskElement.classList.add('task-item');

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.classList.add('task-checkbox');

        const taskLabel = document.createElement('label');
        taskLabel.classList.add('task-label');
        taskLabel.textContent = taskText;

        taskElement.appendChild(checkbox);
        taskElement.appendChild(taskLabel);
        tasksContainer.appendChild(taskElement);
    }

    taskSearchInput.addEventListener('input', function() {
        const searchText = taskSearchInput.value.toLowerCase();
        const tasks = document.querySelectorAll('.task-item');
        tasks.forEach(task => {
            const taskText = task.textContent.toLowerCase();
            if (taskText.includes(searchText)) {
                task.style.display = 'block';
            } else {
                task.style.display = 'none';
            }
        });
    });
});
