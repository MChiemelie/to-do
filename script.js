function createTaskManager(storageKey, ulElement, formElement, inputElement, taskNumber, completedNumber, uncompletedNumber) {
  let tasks = JSON.parse(localStorage.getItem(storageKey)) || [];

  function updateNumbers() {
    taskNumber.textContent = tasks.length;
    const completed = tasks.filter((task) => task.done).length;
    completedNumber.textContent = completed;
    uncompletedNumber.textContent = tasks.length - completed;
  }

  function displayTasks() {
    ulElement.innerHTML = "";
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <div class="task-container">
          <p class="task">${task.task}</p>
          <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.done ? "checked" : ""}>
        </div>
        <div class="task-btns">
          <button class="delete-btn" data-index="${index}">Delete</button>
          <button class="update-btn" data-index="${index}">Update</button>
        </div>
      `;
      ulElement.appendChild(li);
    });

    // Update the counters after displaying tasks
    updateNumbers();

    ulElement.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        deleteTask(e.target.dataset.index);
      });
    });

    ulElement.querySelectorAll(".update-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        updateTask(e.target.dataset.index);
      });
    });

    ulElement.querySelectorAll(".task-checkbox").forEach((checkbox) => {
      checkbox.addEventListener("change", (e) => {
        toggleTask(e.target.dataset.index, e.target.checked);
      });
    });
  }

  function addTask(taskText) {
    tasks.push({ task: taskText, done: false });
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    displayTasks();
  }

  function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    displayTasks();
  }

  function updateTask(index) {
    const updatedTask = prompt("Update task:", tasks[index].task);
    if (updatedTask) {
      tasks[index].task = updatedTask;
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      displayTasks();
    }
  }

  function toggleTask(index, checked) {
    tasks[index].done = checked;
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    updateNumbers();
  }

  formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const taskText = inputElement.value.trim();
    if (taskText) {
      addTask(taskText);
      inputElement.value = "";
    }
  });

  displayTasks();
}

const gridSections = document.querySelectorAll(".grid > div");

if (gridSections.length >= 4) {
  createTaskManager("first-Tasks", gridSections[0].querySelector("ul"), gridSections[0].querySelector("form"), gridSections[0].querySelector("input"), gridSections[0].querySelector(".task-number"), gridSections[0].querySelector(".number-completed"), gridSections[0].querySelector(".number-uncompleted"));

  createTaskManager("second-Tasks", gridSections[1].querySelector("ul"), gridSections[1].querySelector("form"), gridSections[1].querySelector("input"), gridSections[1].querySelector(".task-number"), gridSections[1].querySelector(".number-completed"), gridSections[1].querySelector(".number-uncompleted"));

  createTaskManager("third-Tasks", gridSections[2].querySelector("ul"), gridSections[2].querySelector("form"), gridSections[2].querySelector("input"), gridSections[2].querySelector(".task-number"), gridSections[2].querySelector(".number-completed"), gridSections[2].querySelector(".number-uncompleted"));

  createTaskManager("last-Tasks", gridSections[3].querySelector("ul"), gridSections[3].querySelector("form"), gridSections[3].querySelector("input"), gridSections[3].querySelector(".task-number"), gridSections[3].querySelector(".number-completed"), gridSections[3].querySelector(".number-uncompleted"));
} else {
  console.error("Expected 4 grid sections, but found less.");
}
