const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

let tasks = [];
try {
  tasks = JSON.parse(localStorage.getItem("obraTrackTasks")) || [];
} catch (error) {
  console.error("Não foi possível carregar as tarefas guardadas:", error);
  tasks = [];
}

function saveTasks() {
  try {
    localStorage.setItem("obraTrackTasks", JSON.stringify(tasks));
  } catch (error) {
    console.error("Não foi possível guardar as tarefas:", error);
    alert("Não foi possível guardar a tarefa. O armazenamento local pode estar cheio ou bloqueado.");
  }
}

// Evita XSS ao inserir texto do utilizador em innerHTML
function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("pt-PT", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}

function updateStats() {
  totalTasks.textContent = tasks.length;
  pendingTasks.textContent = tasks.filter((task) => !task.completed).length;
  completedTasks.textContent = tasks.filter((task) => task.completed).length;
}

function renderTasks() {
  const filter = filterTasks.value;
  const filteredTasks = tasks.filter((task) => {
    if (filter === "pending") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  taskList.innerHTML = "";

  if (filteredTasks.length === 0) {
    taskList.innerHTML = `
      <p class="empty-message">
        Ainda não existem tarefas nesta lista.
      </p>
    `;
    return;
  }

  filteredTasks.forEach((task) => {
    const taskElement = document.createElement("article");
    taskElement.className = `task ${task.completed ? "completed" : ""}`;
    taskElement.innerHTML = `
      <button class="complete-button" title="Concluir tarefa">
        ${task.completed ? "✓" : ""}
      </button>
      <div>
        <p class="task-title">${escapeHtml(task.name)}</p>
        <p class="task-info">
          ${escapeHtml(task.project)} · Prazo: ${formatDate(task.dueDate)}
        </p>
      </div>
      <div class="task-right">
        <span class="priority ${task.priority}">${task.priority}</span>
        <button class="delete-button" title="Eliminar tarefa">Eliminar</button>
      </div>
    `;
    taskElement
      .querySelector(".complete-button")
      .addEventListener("click", () => toggleTask(task.id));
    taskElement
      .querySelector(".delete-button")
      .addEventListener("click", () => deleteTask(task.id));
    taskList.appendChild(taskElement);
  });
}

function toggleTask(id) {
  tasks = tasks.map((task) => {
    if (task.id === id) {
      return { ...task, completed: !task.completed };
    }
    return task;
  });
  saveTasks();
  updateStats();
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((task) => task.id !== id);
  saveTasks();
  updateStats();
  renderTasks();
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const project = document.getElementById("projectName").value.trim();
  const dueDate = document.getElementById("dueDate").value;
  const priority = document.getElementById("priority").value;

  if (!name || !project || !dueDate) {
    alert("Por favor preenche todos os campos antes de adicionar a tarefa.");
    return;
  }

  const task = {
    id: crypto.randomUUID(),
    name,
    project,
    dueDate,
    priority,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  updateStats();
  renderTasks();
  taskForm.reset();
});

filterTasks.addEventListener("change", renderTasks);

document.getElementById("currentDate").textContent =
  new Date().toLocaleDateString("pt-PT", {
    weekday: "long",
    day: "numeric",
    month: "long"
  });

updateStats();
renderTasks();
