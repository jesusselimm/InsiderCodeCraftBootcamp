document.addEventListener('DOMContentLoaded', function() {
    // Select DOM elements
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');
    
    // Function to run when "Add" button is clicked
    addTaskBtn.addEventListener('click', addTask);
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTask();
        }
    });
    
    // Task adding function
    function addTask() {
        const taskText = taskInput.value.trim();
        
        // Prevent adding empty tasks
        if (taskText === '') {
            alert('Please enter a task!');
            return;
        }
        
        // Create new task element
        const li = document.createElement('li');
        
        // Add task content
        const taskContent = document.createElement('span');
        taskContent.textContent = taskText;
        taskContent.classList.add('task-content');
        li.appendChild(taskContent);
        
        // Create button container
        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');
        
        // Add completed button
        const completedBtn = document.createElement('button');
        completedBtn.textContent = 'Completed';
        completedBtn.classList.add('completed-btn');
        buttonContainer.appendChild(completedBtn);
        
        // Add delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.classList.add('delete-btn');
        buttonContainer.appendChild(deleteBtn);
        
        // Add button container to list item
        li.appendChild(buttonContainer);
        
        // Add to task list
        taskList.appendChild(li);
        
        // Clear input field
        taskInput.value = '';
        taskInput.focus();
        
        // Mark task as completed when clicking on "Completed" button
        completedBtn.addEventListener('click', function() {
            li.classList.toggle('completed');
            // Change button text based on completion status
            if (li.classList.contains('completed')) {
                completedBtn.textContent = 'Uncomplete';
            } else {
                completedBtn.textContent = 'Completed';
            }
        });
        
        // Remove task when delete button is clicked
        deleteBtn.addEventListener('click', function() {
            li.remove();
        });
    }
}); 