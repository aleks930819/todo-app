const addButton = document.getElementById('add-btn');
const addForm = document.getElementById('add-form');
const addInput = document.getElementById('add-input');
const editButton = document.getElementById('edit-btn');
const deleteButton = document.getElementById('delete-btn');
const btns = document.querySelector('.tasks-btns');
const taskContainer = document.querySelector('.task-container');

window.addEventListener('load', (ev) => {
  let tasks = getTaskFromLocalStorage();
  render(tasks);
});

addForm.addEventListener('submit', addTask);

taskContainer.addEventListener('click', (ev) => {
  let parentId;

  if (ev.target.parentElement.id === 'task-btns') {
    parentId = ev.target.parentElement.parentElement.id;

    if (ev.target.id === 'delete-btn') {
      deleteTask(parentId);
    }

    if (ev.target.id === 'edit-btn') {
      editTask(parentId);
    }
  }
});



function addTask(event) {
  event.preventDefault();
  const inputValue = addInput.value;
  if (!inputValue) {
    return;
  }
  const taskID = randomId();
  const currentTask = taskView(inputValue, taskID);

  saveTaskToLocalStorage(taskID, inputValue);

  addInput.value = '';

  taskContainer.insertAdjacentHTML('beforeend', currentTask);
}


function render(props) {
  props.forEach((task) =>
    taskContainer.insertAdjacentHTML('beforeend', taskView(task[1], task[0]))
  );
}


function randomId() {
  let id = Math.random().toString(36).substring(2, 6);

  return id;
}


function saveTaskToLocalStorage(id, task) {
  localStorage.setItem(id, task);
}

function getTaskFromLocalStorage(id) {
  const tasks = { ...localStorage };
  const arrayFromTasks = Object.entries(tasks);
  return arrayFromTasks;
}


function deleteTask(parentId) {
  localStorage.removeItem(parentId);
  taskContainer.innerHTML = '';
  const currentTasks = getTaskFromLocalStorage();
  render(currentTasks);
}

function editTask(parentId) {
  const editView = editTaskView();
  taskContainer.insertAdjacentHTML('beforeend', editView);
  const editInput = document.getElementById('edit-input');
  const editForm = document.getElementById('edit-form');
  const editBox = document.getElementById('edit-task-input');

  editForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const newTask = editInput.value;
    if (newTask === '') {
      return;
    }
    localStorage.setItem(parentId, newTask);
    taskContainer.innerHTML = '';
    const newTasks = getTaskFromLocalStorage();
    render(newTasks);
  });

  editBox.addEventListener('click', (event) => {
    if (!event.target.parentElement.id) {
      editBox.remove();
    }
  });
}


function editTaskView() {
  return `
<div id="edit-task-input">

<form id="edit-form">
    <input id="edit-input" type="text" placeholder="edit your task">
    <div id="task-btns">
        <button class="edit color-green">EDIT</button>
    </div>

</form>
</div>

`;
}

function taskView(task, id) {
  return `
      <div id=${id} class="task">
  
  
      <div class="task-text">
  
          <p>${task}</p>
  
      </div>
  
      <div id="task-btns">
          <button id="edit-btn" class="edit color-green">EDIT</button>
          <button id="delete-btn" class="delete color-red">DELETE</button>
  
      </div>
  </div>
  `;
}
