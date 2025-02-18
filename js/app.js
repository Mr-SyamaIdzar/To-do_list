let tasks = [];

const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim(); // trim() menghapus spasi awal dan akhir

  // Kondisi jika text tidak kosong
  if (text) {
    tasks.push({
      text: text,
      completed: false,
    });

    updateTaskList();
    taskInput.value = ""; // Mengkosongkan inputan
  }
};

const toggleTaskComplete = (index) => {
  // tasks[index].completed akan diubah ke kebalikan dari nilai saat ini (jika true menjadi false, dan sebaliknya).
  tasks[index].completed = !tasks[index].completed;
  updateTaskList();
};

const deleteTask = (index) => {
  tasks.splice(index, 1); // Menghapus satu elemen dari array pada posisi index
  updateTaskList();
};

const editTask = (index) => {
  const taskInput = document.getElementById("taskInput");
  taskInput.value = tasks[index].text;

  tasks.splice(index, 1);
  updateTaskList();
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
