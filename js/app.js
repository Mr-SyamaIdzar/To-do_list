let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({
      text: text,
      completed: false,
    });

    updateTaskList();
  }
};

const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
};

const updateTaskList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
    <div class="taskItem">
      <div class="task ${task.completed ? "completed" : ""}">
        <input type="checkbox" class="checkbox" ${
          task.completed ? "checked" : ""
        }/>
        <p>${task.text}</p>
      </div>

      <div class="icons">
        <img src="../assets/edit.png" onClick="editTask(${index})"/>
        <img src="../assets/bin.png" onClick="deleteTask(${index})"/>
      </div>
    </div>
    `;

    listItem.addEventListener("change", () => toggleTaskComplete(index));
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();

  addTask();
});
