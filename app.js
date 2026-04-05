const newTaskInput = document.querySelector('#new-task');
const addTaskButton = document.querySelector('#add-task-button');
const taskList = document.querySelector('#task-list');
const clearCompletedButton = document.querySelector('#clear-completed');
const taskCount = document.querySelector('#task-count');

let tasks = [];

function renderTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task) => {
    const listItem = document.createElement('li');
    listItem.className = `task-item${task.completed ? ' completed' : ''}`;

    const label = document.createElement('p');
    label.className = 'task-label';
    label.textContent = task.text;

    const actions = document.createElement('div');
    actions.className = 'task-actions';

    const toggleButton = document.createElement('button');
    toggleButton.textContent = task.completed ? 'Undo' : 'Complete';
    toggleButton.addEventListener('click', () => toggleTask(task.id));

    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => removeTask(task.id));

    actions.append(toggleButton, removeButton);
    listItem.append(label, actions);
    taskList.appendChild(listItem);
  });

  updateTaskCount();
}

function updateTaskCount() {
  const remaining = tasks.filter((task) => !task.completed).length;
  taskCount.textContent = `${remaining} ${remaining === 1 ? 'task' : 'tasks'} left`;
}

function addTask(text) {
  if (!text.trim()) return;

  tasks = [
    ...tasks,
    {
      id: Date.now(),
      text: text.trim(),
      completed: false,
    },
  ];

  newTaskInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, completed: !task.completed } : task
  );
  renderTasks();
}

function removeTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  renderTasks();
}

function clearCompleted() {
  tasks = tasks.filter((task) => !task.completed);
  renderTasks();
}

addTaskButton.addEventListener('click', () => addTask(newTaskInput.value));
newTaskInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    addTask(newTaskInput.value);
  }
});
clearCompletedButton.addEventListener('click', clearCompleted);

renderTasks();
