document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('taskForm');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');
    const titleError = document.getElementById('titleError');
    const priorityError = document.getElementById('priorityError');
    const todoTaskList = document.getElementById('todoTaskList');
    const completedTaskList = document.getElementById('completedTaskList');
    const searchInput = document.getElementById('searchInput');
    const searchButton = document.getElementById('searchButton');
    
    const modal = document.getElementById('taskModal');
    const addTaskButton = document.getElementById('addTaskButton');
    const closeModal = document.querySelector('.close-modal');
    
    let tasks = [];
    
    const STATUS = {
        TODO: 'todo',
        IN_PROGRESS: 'inProgress',
        COMPLETED: 'completed'
    };
    
    addTaskButton.addEventListener('click', function() {
        modal.style.display = 'block';
        taskTitle.focus();
    });
    
    closeModal.addEventListener('click', function() {
        modal.style.display = 'none';
        taskForm.reset();
        titleError.textContent = '';
        priorityError.textContent = '';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            taskForm.reset();
            titleError.textContent = '';
            priorityError.textContent = '';
        }
    });
    
    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        try {
            let isValid = true;
            
            if (!taskTitle.value.trim()) {
                titleError.textContent = 'Title is required.';
                isValid = false;
            } else {
                titleError.textContent = '';
            }
            
            const selectedPriority = document.querySelector('input[name="priority"]:checked');
            if (!selectedPriority) {
                priorityError.textContent = 'Please select a priority.';
                isValid = false;
            } else {
                priorityError.textContent = '';
            }
            
            if (!isValid) return;
            
            const newTask = {
                id: Date.now(),
                title: taskTitle.value.trim(),
                description: taskDescription.value.trim(),
                priority: selectedPriority.value,
                status: STATUS.TODO,
                createdAt: new Date()
            };
            
            tasks.push(newTask);
            renderTasks();
            saveTasksToStorage();
            
            taskForm.reset();
            modal.style.display = 'none';
            
        } catch (error) {
            console.error('Error adding task:', error);
            alert('An unexpected error occurred. Please try again.');
        }
    });
    
    document.addEventListener('click', function(event) {
        if (!event.target.closest('.menu-dots') && !event.target.closest('.dropdown-menu')) {
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                menu.classList.remove('show');
            });
        }
        
        if (event.target.closest('.menu-dots')) {
            event.stopPropagation();
            const menuButton = event.target.closest('.menu-dots');
            const dropdown = menuButton.nextElementSibling;
            
            document.querySelectorAll('.dropdown-menu.show').forEach(menu => {
                if (menu !== dropdown) {
                    menu.classList.remove('show');
                }
            });
            
            dropdown.classList.toggle('show');
        }
        
        if (event.target.closest('.dropdown-item')) {
            const item = event.target.closest('.dropdown-item');
            const taskCard = item.closest('.task-card');
            const taskId = parseInt(taskCard.dataset.id);
            
            item.closest('.dropdown-menu').classList.remove('show');
            
            if (item.classList.contains('start-action')) {
                changeTaskStatus(taskId, STATUS.IN_PROGRESS);
            } else if (item.classList.contains('complete-action')) {
                changeTaskStatus(taskId, STATUS.COMPLETED);
            } else if (item.classList.contains('edit-action')) {
                editTask(taskId);
            } else if (item.classList.contains('delete-action')) {
                deleteTask(taskId);
            }
        }
    });
    
    searchButton.addEventListener('click', function() {
        if (searchInput.value.length > 0) {
            searchInput.value = '';
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchButton.classList.remove('is-clear-btn');
            renderTasks();
        } else {
            searchTasks();
        }
        
        searchInput.focus();
    });
    
    searchInput.addEventListener('input', function() {
        if (this.value.length > 0) {
            searchButton.innerHTML = '<i class="fas fa-times"></i>';
            searchButton.classList.add('is-clear-btn');
            
            searchTasks();
        } else {
            searchButton.innerHTML = '<i class="fas fa-search"></i>';
            searchButton.classList.remove('is-clear-btn');
            
            renderTasks();
        }
    });
    
    searchInput.addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            searchTasks();
        }
    });
    
    if (searchInput.value.length > 0) {
        searchButton.innerHTML = '<i class="fas fa-times"></i>';
        searchButton.classList.add('is-clear-btn');
    }
    
    function updateTaskStatistics() {
        const totalTasks = tasks.length;
        
        // Grafik arkaplan rengini karanlık mod durumuna göre belirleme
        const chartBgColor = document.body.classList.contains('dark-mode') ? '#333' : '#f0f0f0';
        
        if (totalTasks === 0) {
            document.querySelector('.completed-chart').style.background = 
                `conic-gradient(var(--completed-color) 0% 0%, ${chartBgColor} 0% 100%)`;
            document.querySelector('.inprogress-chart').style.background = 
                `conic-gradient(var(--progress-color) 0% 0%, ${chartBgColor} 0% 100%)`;
            document.querySelector('.todo-chart').style.background = 
                `conic-gradient(var(--todo-color) 0% 0%, ${chartBgColor} 0% 100%)`;
            
            document.querySelector('.completed-chart .chart-percentage').textContent = '0%';
            document.querySelector('.inprogress-chart .chart-percentage').textContent = '0%';
            document.querySelector('.todo-chart .chart-percentage').textContent = '0%';
            return;
        }
        
        const completedCount = tasks.filter(task => task.status === STATUS.COMPLETED).length;
        const inProgressCount = tasks.filter(task => task.status === STATUS.IN_PROGRESS).length;
        const todoCount = tasks.filter(task => task.status === STATUS.TODO).length;
        
        const completedPercentage = Math.round((completedCount / totalTasks) * 100);
        const inProgressPercentage = Math.round((inProgressCount / totalTasks) * 100);
        const todoPercentage = Math.round((todoCount / totalTasks) * 100);
        
        document.querySelector('.completed-chart').style.background = 
            `conic-gradient(var(--completed-color) 0% ${completedPercentage}%, ${chartBgColor} ${completedPercentage}% 100%)`;
        document.querySelector('.inprogress-chart').style.background = 
            `conic-gradient(var(--progress-color) 0% ${inProgressPercentage}%, ${chartBgColor} ${inProgressPercentage}% 100%)`;
        document.querySelector('.todo-chart').style.background = 
            `conic-gradient(var(--todo-color) 0% ${todoPercentage}%, ${chartBgColor} ${todoPercentage}% 100%)`;
        
        document.querySelector('.completed-chart .chart-percentage').textContent = `${completedPercentage}%`;
        document.querySelector('.inprogress-chart .chart-percentage').textContent = `${inProgressPercentage}%`;
        document.querySelector('.todo-chart .chart-percentage').textContent = `${todoPercentage}%`;
    }
    
    function renderTasks() {
        const todoTasks = tasks.filter(task => task.status === STATUS.TODO);
        const inProgressTasks = tasks.filter(task => task.status === STATUS.IN_PROGRESS);
        const completedTasks = tasks.filter(task => task.status === STATUS.COMPLETED);
        
        renderTaskList(todoTaskList, todoTasks, 'No tasks to show. Click "Add task" to create a new task.');
        
        renderTaskList(inProgressTaskList, inProgressTasks, 'No tasks in progress.');
        
        renderTaskList(completedTaskList, completedTasks, 'No completed tasks yet.');
        
        updateTaskStatistics();
        
        setupDragAndDrop();
    }
    
    function renderTaskList(container, taskList, emptyMessage) {
        if (taskList.length === 0) {
            container.innerHTML = `<div class="empty-list">${emptyMessage}</div>`;
            return;
        }
        
        container.innerHTML = '';
        
        taskList.forEach(task => {
            const taskCard = document.createElement('div');
            taskCard.classList.add('task-card');
            taskCard.dataset.id = task.id;
            
            let statusDotClass, statusText, statusClass;
            
            if (task.status === STATUS.TODO) {
                statusDotClass = 'todo-dot';
                statusText = 'Not Started';
                statusClass = 'status-not-started';
            } else if (task.status === STATUS.IN_PROGRESS) {
                statusDotClass = 'progress-dot';
                statusText = 'In Progress';
                statusClass = 'status-in-progress';
            } else {
                statusDotClass = 'completed-dot';
                statusText = 'Completed';
                statusClass = 'status-completed';
            }
            
            const createdDate = new Intl.DateTimeFormat('en-US', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric'
            }).format(new Date(task.createdAt));
            
            const priorityClass = `priority-${task.priority.toLowerCase()}`;
            
            let menuItems = '';
            
            if (task.status === STATUS.TODO) {
                menuItems = `
                    <div class="dropdown-item start-action">
                        <i class="fas fa-play"></i> Start
                    </div>
                    <div class="dropdown-item edit-action">
                        <i class="fas fa-edit"></i> Edit
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item delete-action">
                        <i class="fas fa-trash"></i> Delete
                    </div>
                `;
            } else if (task.status === STATUS.IN_PROGRESS) {
                menuItems = `
                    <div class="dropdown-item complete-action">
                        <i class="fas fa-check"></i> Complete
                    </div>
                    <div class="dropdown-item edit-action">
                        <i class="fas fa-edit"></i> Edit
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item delete-action">
                        <i class="fas fa-trash"></i> Delete
                    </div>
                `;
            } else {
                menuItems = `
                    <div class="dropdown-item edit-action">
                        <i class="fas fa-edit"></i> Edit
                    </div>
                    <div class="dropdown-divider"></div>
                    <div class="dropdown-item delete-action">
                        <i class="fas fa-trash"></i> Delete
                    </div>
                `;
            }
            
            taskCard.innerHTML = `
                <span class="task-status-dot ${statusDotClass}"></span>
                <div class="task-menu">
                    <button class="menu-dots">
                        <i class="fas fa-ellipsis-v"></i>
                    </button>
                    <div class="dropdown-menu">
                        ${menuItems}
                    </div>
                </div>
                <div class="task-content">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description || 'No description'}</div>
                    <div class="task-meta">
                        <span>Priority: <span class="task-priority ${priorityClass}">${task.priority}</span></span>
                        <span>Status: <span class="task-status ${statusClass}">${statusText}</span></span>
                        <span class="task-date">Created: ${createdDate}</span>
                    </div>
                </div>
            `;
            
            container.appendChild(taskCard);
        });
    }
    
    function changeTaskStatus(taskId, newStatus) {
        const task = tasks.find(task => task.id === taskId);
        if (task) {
            task.status = newStatus;
            renderTasks();
            saveTasksToStorage();
        }
    }
    
    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
        saveTasksToStorage();
    }
    
    function searchTasks() {
        const searchText = searchInput.value.toLowerCase().trim();
        
        if (!searchText) {
            renderTasks();
            return;
        }
        
        const filteredTasks = tasks.filter(task => 
            task.title.toLowerCase().includes(searchText) || 
            (task.description && task.description.toLowerCase().includes(searchText))
        );
        
        const filteredTodoTasks = filteredTasks.filter(task => task.status === STATUS.TODO);
        const filteredInProgressTasks = filteredTasks.filter(task => task.status === STATUS.IN_PROGRESS);
        const filteredCompletedTasks = filteredTasks.filter(task => task.status === STATUS.COMPLETED);
        
        renderTaskList(todoTaskList, filteredTodoTasks, 'No matching tasks.');
        renderTaskList(inProgressTaskList, filteredInProgressTasks, 'No matching in-progress tasks.');
        renderTaskList(completedTaskList, filteredCompletedTasks, 'No matching completed tasks.');
    }
    
    function editTask(taskId) {
        const task = tasks.find(task => task.id === taskId);
        if (!task) return;
        
        taskTitle.value = task.title;
        taskDescription.value = task.description || '';
        
        document.querySelectorAll('input[name="priority"]').forEach(radio => {
            if (radio.value === task.priority) {
                radio.checked = true;
            }
        });
        
        modal.style.display = 'block';
        
        const originalSubmitHandler = taskForm.onsubmit;
        
        taskForm.onsubmit = function(event) {
            event.preventDefault();
            
            try {
                let isValid = true;
                
                if (!taskTitle.value.trim()) {
                    titleError.textContent = 'Title is required.';
                    isValid = false;
                } else {
                    titleError.textContent = '';
                }
                
                const selectedPriority = document.querySelector('input[name="priority"]:checked');
                if (!selectedPriority) {
                    priorityError.textContent = 'Please select a priority.';
                    isValid = false;
                } else {
                    priorityError.textContent = '';
                }
                
                if (!isValid) return;
                
                task.title = taskTitle.value.trim();
                task.description = taskDescription.value.trim();
                task.priority = selectedPriority.value;
                
                renderTasks();
                saveTasksToStorage();
                
                taskForm.reset();
                modal.style.display = 'none';
                
                taskForm.onsubmit = originalSubmitHandler;
                
            } catch (error) {
                console.error('Error updating task:', error);
                alert('An unexpected error occurred. Please try again.');
            }
        };
    }
    
    function setupDragAndDrop() {
        const todoSection = document.querySelector('.to-do-section');
        const progressSection = document.querySelector('.progress-section');
        const completedSection = document.querySelector('.completed-section');
        
        document.querySelectorAll('.task-card').forEach(card => {
            card.setAttribute('draggable', 'true');
            
            card.addEventListener('dragstart', function(e) {
                e.dataTransfer.setData('text/plain', card.dataset.id);
                card.classList.add('dragging');
                document.body.classList.add('dragging-active');
                
                e.dataTransfer.effectAllowed = "move";
                
                setTimeout(() => {
                    card.style.visibility = 'hidden';
                }, 50);
            });
            
            card.addEventListener('dragend', function() {
                card.classList.remove('dragging');
                document.body.classList.remove('dragging-active');
                card.style.visibility = 'visible';
                
                todoSection.classList.remove('to-do-highlight');
                progressSection.classList.remove('progress-highlight');
                completedSection.classList.remove('completed-highlight');
            });
        });
        
        setupDropZone(todoTaskList, STATUS.TODO, todoSection, 'to-do-highlight');
        setupDropZone(inProgressTaskList, STATUS.IN_PROGRESS, progressSection, 'progress-highlight');
        setupDropZone(completedTaskList, STATUS.COMPLETED, completedSection, 'completed-highlight');
        
        function setupDropZone(container, status, section, highlightClass) {
            section.addEventListener('dragover', function(e) {
                e.preventDefault();
                section.classList.add(highlightClass);
            });
            
            section.addEventListener('dragleave', function(e) {
                if (!section.contains(e.relatedTarget)) {
                    section.classList.remove(highlightClass);
                }
            });
            
            section.addEventListener('drop', function(e) {
                e.preventDefault();
                section.classList.remove(highlightClass);
                
                const taskId = parseInt(e.dataTransfer.getData('text/plain'));
                const task = tasks.find(t => t.id === taskId);
                
                if (task && task.status !== status) {
                    changeTaskStatus(taskId, status);
                }
            });
        }
    }
    
    function loadTasksFromStorage() {
        const savedTasks = localStorage.getItem('todoTasks');
        if (savedTasks) {
            try {
                const parsedTasks = JSON.parse(savedTasks, (key, value) => {
                    if (key === 'createdAt') {
                        return new Date(value);
                    }
                    return value;
                });
                
                tasks = parsedTasks;
                renderTasks();
            } catch (error) {
                console.error('Task loading error:', error);
            }
        }
    }
    
    function saveTasksToStorage() {
        try {
            localStorage.setItem('todoTasks', JSON.stringify(tasks));
        } catch (error) {
            console.error('Task saving error:', error);
        }
    }
    
    // Dark mode toggle işlevselliği
    const darkModeToggle = document.getElementById('darkModeToggle');

    // Dark mode fonksiyonu - karanlık modu açıp kapatan
    function toggleDarkMode() {
        document.body.classList.toggle('dark-mode');
        
        // İkon değiştirme
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            localStorage.setItem('darkMode', 'enabled');
        } else {
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            localStorage.setItem('darkMode', 'disabled');
        }
        
        // Karanlık mod değiştiğinde grafikleri güncelle
        updateTaskStatistics();
    }

    // Kullanıcının önceki tercihini kontrol et
    function checkDarkModePreference() {
        if (localStorage.getItem('darkMode') === 'enabled') {
            document.body.classList.add('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            document.body.classList.remove('dark-mode');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    }

    // Sayfa yüklendiğinde tercihi kontrol et
    checkDarkModePreference();
    
    // Dark mode butonuna tıklama olayı ekle
    darkModeToggle.addEventListener('click', toggleDarkMode);
    
    renderTasks();
    loadTasksFromStorage();
});