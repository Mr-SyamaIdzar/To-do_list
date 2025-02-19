document.addEventListener("DOMContentLoaded", () => {
  const storageTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storageTasks) {
    storageTasks.forEach((task) => tasks.push(task));
    updateTaskList();
    updateStats();
  }
});

let tasks = [];

const saveTasks = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim(); // trim() menghapus spasi awal dan akhir

  // Kondisi jika text tidak kosong
  if (text) {
    tasks.push({
      text: text,
      completed: false,
    });

    taskInput.value = ""; // Mengkosongkan inputan
    updateTaskList();
    updateStats();
    saveTasks();
  }
};

const toggleTaskComplete = (index) => {
  // tasks[index].completed akan diubah ke kebalikan dari nilai saat ini (jika true menjadi false, dan sebaliknya).
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
  updateStats();
  saveTasks();
};

const deleteTask = (index) => {
  tasks.splice(index, 1); // Menghapus satu elemen dari array pada posisi index
  updateTaskList();
  updateStats();
  saveTasks();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTaskList();
  updateStats();
  saveTasks();
};

const updateStats = () => {
  const completeTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  let progress;
  if (totalTasks === 0) {
    progress = 0;
  } else {
    progress = (completeTasks / totalTasks) * 100;
  }
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`;

  document.getElementById(
    "numbers"
  ).innerHTML = `${completeTasks} / ${totalTasks}`;

  if (tasks.length && completeTasks === totalTasks) {
    snow();
  }
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

    // Memanggil toggleTaskComplete ketika status checkbox berubah
    listItem.addEventListener("change", () => toggleTaskComplete(index));
    // Setiap elemen <li> yang dibuat kemudian ditambahkan ke taskList.
    taskList.append(listItem);
  });
};

document.getElementById("newTask").addEventListener("click", function (e) {
  // e.preventDefault() digunakan untuk mencegah perilaku default dari tombol (misalnya, mengirim form)
  e.preventDefault();

  addTask();
});

const snow = () => {
  const duration = 3 * 1000,
  animationEnd = Date.now() + duration;

let skew = 1;

function randomInRange(min, max) {
  return Math.random() * (max - min) + min;
}

(function frame() {
  const timeLeft = animationEnd - Date.now(),
    ticks = Math.max(200, 500 * (timeLeft / duration));

  skew = Math.max(0.8, skew - 0.001);

  confetti({
    particleCount: 1,
    startVelocity: 0,
    ticks: ticks,
    origin: {
      x: Math.random(),
      // since particles fall down, skew start toward the top
      y: Math.random() * skew - 0.2,
    },
    colors: ["#ffffff"],
    shapes: ["circle"],
    gravity: randomInRange(0.4, 0.6),
    scalar: randomInRange(0.4, 1),
    drift: randomInRange(-0.4, 0.4),
  });

  if (timeLeft > 0) {
    requestAnimationFrame(frame);
  }
})();
}