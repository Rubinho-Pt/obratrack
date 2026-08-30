const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const filterTasks = document.getElementById("filterTasks");
const languageSelect = document.getElementById("languageSelect");
const submitButton = taskForm.querySelector("button[type='submit']");
const formError = document.getElementById("formError");
const toast = document.getElementById("toast");
const totalTasks = document.getElementById("totalTasks");
const pendingTasks = document.getElementById("pendingTasks");
const completedTasks = document.getElementById("completedTasks");

const translations = {
  pt: {
    locale:"pt-PT", brandTagline:"Gestão de obra", overview:"Visão geral", tasks:"Tarefas", dataSynced:"Dados sincronizados", savedDevice:"Guardados neste dispositivo", controlPanel:"PAINEL DE CONTROLO", greeting:"Bom trabalho", subtitle:"Acompanhe o progresso da obra e mantenha a equipa alinhada.", language:"Idioma", totalTasksLabel:"Total de tarefas", allProjects:"Em todas as obras", pendingLabel:"Por concluir", attention:"Requerem atenção", completedLabel:"Concluídas", overallProgress:"Progresso acumulado", planning:"PLANEAMENTO", newTask:"Nova tarefa", newTaskHelp:"Registe uma atividade e associe-a à obra certa.", taskLabel:"Tarefa", projectLabel:"Obra", dueDate:"Prazo", priorityLabel:"Prioridade", taskPlaceholder:"Ex.: Confirmar entrega de cimento", projectPlaceholder:"Ex.: Remodelação T2", required:"Todos os campos são obrigatórios.", addTask:"Adicionar tarefa", adding:"A adicionar…", execution:"EXECUÇÃO", myTasks:"As minhas tarefas", tasksHelp:"Organize prioridades e acompanhe o trabalho em curso.", show:"Mostrar", statusTask:"Estado / tarefa", actions:"Ações", footerTagline:"Construir melhor, com clareza.", all:"Todas as tarefas", pending:"Por concluir", completed:"Concluídas", Low:"Baixa", Medium:"Média", High:"Alta", due:"Prazo", noTasks:"Sem tarefas por agora", noTasksHelp:"Adicione a primeira tarefa para começar a planear.", allDone:"Tudo tratado", allDoneHelp:"Não existem tarefas por concluir nesta lista.", noCompleted:"Ainda sem conclusões", noCompletedHelp:"As tarefas concluídas irão aparecer aqui.", reopen:"Reabrir tarefa", complete:"Concluir tarefa", delete:"Eliminar tarefa", taskCompleted:"Tarefa concluída", taskReopened:"Tarefa reaberta", taskDeleted:"Tarefa eliminada", taskAdded:"Tarefa adicionada com sucesso", invalidTask:"Preencha todos os campos com valores válidos.", saveError:"Não foi possível guardar. Verifique o armazenamento do navegador.", loadError:"Alguns dados guardados eram inválidos e foram ignorados."
  },
  en: {
    locale:"en-GB", brandTagline:"Construction management", overview:"Overview", tasks:"Tasks", dataSynced:"Data synced", savedDevice:"Saved on this device", controlPanel:"CONTROL PANEL", greeting:"Let’s get to work", subtitle:"Track project progress and keep your team aligned.", language:"Language", totalTasksLabel:"Total tasks", allProjects:"Across all projects", pendingLabel:"To complete", attention:"Require attention", completedLabel:"Completed", overallProgress:"Overall progress", planning:"PLANNING", newTask:"New task", newTaskHelp:"Register an activity and assign it to the right project.", taskLabel:"Task", projectLabel:"Project", dueDate:"Due date", priorityLabel:"Priority", taskPlaceholder:"E.g. Confirm concrete delivery", projectPlaceholder:"E.g. Apartment renovation", required:"All fields are required.", addTask:"Add task", adding:"Adding…", execution:"EXECUTION", myTasks:"My tasks", tasksHelp:"Organize priorities and track work in progress.", show:"Show", statusTask:"Status / task", actions:"Actions", footerTagline:"Build better, with clarity.", all:"All tasks", pending:"To complete", completed:"Completed", Low:"Low", Medium:"Medium", High:"High", due:"Due", noTasks:"No tasks yet", noTasksHelp:"Add your first task to start planning.", allDone:"All caught up", allDoneHelp:"There are no outstanding tasks on this list.", noCompleted:"No completed tasks yet", noCompletedHelp:"Completed tasks will appear here.", reopen:"Reopen task", complete:"Complete task", delete:"Delete task", taskCompleted:"Task completed", taskReopened:"Task reopened", taskDeleted:"Task deleted", taskAdded:"Task added successfully", invalidTask:"Complete every field with valid values.", saveError:"Could not save your changes. Check browser storage and try again.", loadError:"Some saved data was invalid and has been ignored."
  },
  fr: {
    locale:"fr-FR", brandTagline:"Gestion de chantier", overview:"Vue d’ensemble", tasks:"Tâches", dataSynced:"Données synchronisées", savedDevice:"Enregistrées sur cet appareil", controlPanel:"TABLEAU DE BORD", greeting:"Bon travail", subtitle:"Suivez l’avancement du chantier et gardez votre équipe alignée.", language:"Langue", totalTasksLabel:"Total des tâches", allProjects:"Tous les chantiers", pendingLabel:"À terminer", attention:"Demandent votre attention", completedLabel:"Terminées", overallProgress:"Progression globale", planning:"PLANIFICATION", newTask:"Nouvelle tâche", newTaskHelp:"Enregistrez une activité et associez-la au bon chantier.", taskLabel:"Tâche", projectLabel:"Chantier", dueDate:"Échéance", priorityLabel:"Priorité", taskPlaceholder:"Ex. : Confirmer la livraison du béton", projectPlaceholder:"Ex. : Rénovation appartement", required:"Tous les champs sont obligatoires.", addTask:"Ajouter la tâche", adding:"Ajout…", execution:"EXÉCUTION", myTasks:"Mes tâches", tasksHelp:"Organisez les priorités et suivez le travail en cours.", show:"Afficher", statusTask:"État / tâche", actions:"Actions", footerTagline:"Mieux construire, en toute clarté.", all:"Toutes les tâches", pending:"À terminer", completed:"Terminées", Low:"Faible", Medium:"Moyenne", High:"Haute", due:"Échéance", noTasks:"Aucune tâche", noTasksHelp:"Ajoutez votre première tâche pour commencer.", allDone:"Tout est fait", allDoneHelp:"Aucune tâche n’est en attente.", noCompleted:"Aucune tâche terminée", noCompletedHelp:"Les tâches terminées apparaîtront ici.", reopen:"Rouvrir la tâche", complete:"Terminer la tâche", delete:"Supprimer la tâche", taskCompleted:"Tâche terminée", taskReopened:"Tâche rouverte", taskDeleted:"Tâche supprimée", taskAdded:"Tâche ajoutée avec succès", invalidTask:"Remplissez tous les champs avec des valeurs valides.", saveError:"Impossible d’enregistrer. Vérifiez le stockage du navigateur.", loadError:"Certaines données invalides ont été ignorées."
  },
  de: {
    locale:"de-DE", brandTagline:"Baustellenmanagement", overview:"Übersicht", tasks:"Aufgaben", dataSynced:"Daten synchronisiert", savedDevice:"Auf diesem Gerät gespeichert", controlPanel:"KONTROLLZENTRUM", greeting:"Gute Arbeit", subtitle:"Verfolgen Sie den Baufortschritt und halten Sie Ihr Team auf Kurs.", language:"Sprache", totalTasksLabel:"Aufgaben gesamt", allProjects:"In allen Projekten", pendingLabel:"Offen", attention:"Benötigen Aufmerksamkeit", completedLabel:"Erledigt", overallProgress:"Gesamtfortschritt", planning:"PLANUNG", newTask:"Neue Aufgabe", newTaskHelp:"Erfassen Sie eine Aktivität und ordnen Sie sie dem richtigen Projekt zu.", taskLabel:"Aufgabe", projectLabel:"Projekt", dueDate:"Fälligkeitsdatum", priorityLabel:"Priorität", taskPlaceholder:"Z. B. Betonlieferung bestätigen", projectPlaceholder:"Z. B. Wohnungsrenovierung", required:"Alle Felder sind erforderlich.", addTask:"Aufgabe hinzufügen", adding:"Wird hinzugefügt…", execution:"AUSFÜHRUNG", myTasks:"Meine Aufgaben", tasksHelp:"Prioritäten organisieren und laufende Arbeiten verfolgen.", show:"Anzeigen", statusTask:"Status / Aufgabe", actions:"Aktionen", footerTagline:"Besser bauen, mit Klarheit.", all:"Alle Aufgaben", pending:"Offen", completed:"Erledigt", Low:"Niedrig", Medium:"Mittel", High:"Hoch", due:"Fällig", noTasks:"Noch keine Aufgaben", noTasksHelp:"Fügen Sie die erste Aufgabe hinzu.", allDone:"Alles erledigt", allDoneHelp:"Es gibt keine offenen Aufgaben.", noCompleted:"Noch nichts erledigt", noCompletedHelp:"Erledigte Aufgaben erscheinen hier.", reopen:"Aufgabe wieder öffnen", complete:"Aufgabe erledigen", delete:"Aufgabe löschen", taskCompleted:"Aufgabe erledigt", taskReopened:"Aufgabe wieder geöffnet", taskDeleted:"Aufgabe gelöscht", taskAdded:"Aufgabe erfolgreich hinzugefügt", invalidTask:"Füllen Sie alle Felder mit gültigen Werten aus.", saveError:"Speichern nicht möglich. Prüfen Sie den Browser-Speicher.", loadError:"Einige ungültige gespeicherte Daten wurden ignoriert."
  }
};

const icons = {
  check:'<svg viewBox="0 0 24 24"><path d="m7 12 3 3 7-7"/></svg>',
  trash:'<svg viewBox="0 0 24 24"><path d="M4 7h16M9 7V4h6v3M7 7l1 13h8l1-13M10 11v5M14 11v5"/></svg>',
  empty:'<svg viewBox="0 0 24 24"><path d="M8 6h11M8 12h11M8 18h7"/><path d="m3 6 1 1 2-2M3 12l1 1 2-2M3 18l1 1 2-2"/></svg>',
  loader:'<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66"/></svg>'
};

const allowedPriorities = new Set(["Low","Medium","High"]);
const priorityMap = { Baixa:"Low", "Média":"Medium", Alta:"High" };
let hadLoadError = false;
let tasks = loadTasks();
let currentLanguage = "pt";
try { currentLanguage=localStorage.getItem("obraTrackLanguage")||"pt"; } catch { /* Use Portuguese when storage is unavailable. */ }
let toastTimer;

function text() { return translations[currentLanguage]; }
function normalizeTask(task) {
  if (!task || typeof task !== "object") return null;
  const priority=priorityMap[task.priority]||task.priority;
  const dueDate=typeof task.dueDate==="string"&&/^\d{4}-\d{2}-\d{2}$/.test(task.dueDate)?task.dueDate:"";
  if ((typeof task.id!=="string"&&typeof task.id!=="number")||typeof task.name!=="string"||!task.name.trim()||typeof task.project!=="string"||!task.project.trim()||!dueDate||!allowedPriorities.has(priority)||typeof task.completed!=="boolean") return null;
  return {...task,name:task.name.trim(),project:task.project.trim(),dueDate,priority};
}
function loadTasks() {
  try { const parsed=JSON.parse(localStorage.getItem("obraTrackTasks")||"[]"); if(!Array.isArray(parsed)) throw new Error("Invalid task collection"); const valid=parsed.map(normalizeTask).filter(Boolean); hadLoadError=valid.length!==parsed.length; return valid; }
  catch { hadLoadError=true; return []; }
}
function saveTasks() { try { localStorage.setItem("obraTrackTasks",JSON.stringify(tasks)); return true; } catch { showFormError(text().saveError); return false; } }
function createId() { return crypto.randomUUID?.()||("task-"+Date.now()+"-"+Math.random().toString(36).slice(2)); }
function showFormError(message) { formError.textContent=message; formError.classList.add("show"); }
function clearFormError() { formError.textContent=""; formError.classList.remove("show"); }
function escapeHTML(value) { const el=document.createElement("span"); el.textContent=value; return el.innerHTML; }
function formatDate(date) { return new Date(`${date}T00:00:00`).toLocaleDateString(text().locale,{day:"2-digit",month:"short",year:"numeric"}); }
function showToast(message) { toast.textContent=message; toast.classList.add("show"); clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),2200); }
function updateStats() { totalTasks.textContent=tasks.length; pendingTasks.textContent=tasks.filter(task=>!task.completed).length; completedTasks.textContent=tasks.filter(task=>task.completed).length; }

function applyLanguage(language) {
  currentLanguage = translations[language] ? language : "pt";
  const copy = text();
  document.documentElement.lang = currentLanguage;
  try { localStorage.setItem("obraTrackLanguage", currentLanguage); } catch { /* Language still changes for this session. */ }
  languageSelect.value = currentLanguage;
  languageSelect.setAttribute("aria-label", copy.language);
  document.querySelectorAll("[data-i18n]").forEach(el => el.textContent = copy[el.dataset.i18n]);
  document.querySelectorAll("[data-i18n-placeholder]").forEach(el => el.placeholder = copy[el.dataset.i18nPlaceholder]);
  document.querySelector('#priority option[value="Low"]').textContent = copy.Low;
  document.querySelector('#priority option[value="Medium"]').textContent = copy.Medium;
  document.querySelector('#priority option[value="High"]').textContent = copy.High;
  document.querySelector('#filterTasks option[value="all"]').textContent = copy.all;
  document.querySelector('#filterTasks option[value="pending"]').textContent = copy.pending;
  document.querySelector('#filterTasks option[value="completed"]').textContent = copy.completed;
  document.getElementById("currentDate").textContent = new Date().toLocaleDateString(copy.locale,{weekday:"long",day:"numeric",month:"long"});
  renderTasks();
  if (hadLoadError) { showFormError(copy.loadError); hadLoadError=false; }
}

function renderTasks() {
  const copy=text(), filter=filterTasks.value;
  const filtered=tasks.filter(task=>filter==="pending"?!task.completed:filter==="completed"?task.completed:true);
  taskList.innerHTML="";
  if(!filtered.length) {
    const messages={all:[copy.noTasks,copy.noTasksHelp],pending:[copy.allDone,copy.allDoneHelp],completed:[copy.noCompleted,copy.noCompletedHelp]};
    const [title,description]=messages[filter];
    taskList.innerHTML=`<div class="empty-message"><span class="empty-icon">${icons.empty}</span><strong>${title}</strong><span>${description}</span></div>`;
    return;
  }
  filtered.forEach(task=>{
    const article=document.createElement("article");
    article.className=`task ${task.completed?"completed":""}`;
    const toggleLabel=task.completed?copy.reopen:copy.complete;
    article.innerHTML=`<div class="task-main"><button class="complete-button" type="button" aria-label="${toggleLabel}" title="${toggleLabel}">${icons.check}</button><div class="task-copy"><p class="task-title">${escapeHTML(task.name)}</p><p class="task-info">${escapeHTML(task.project)} · ${copy.due}: ${formatDate(task.dueDate)}</p></div></div><span class="priority ${task.priority}">${copy[task.priority]}</span><button class="delete-button" type="button" aria-label="${copy.delete}" title="${copy.delete}">${icons.trash}</button>`;
    article.querySelector(".complete-button").addEventListener("click",()=>toggleTask(task.id));
    article.querySelector(".delete-button").addEventListener("click",()=>deleteTask(task.id));
    taskList.appendChild(article);
  });
}

function toggleTask(id) {
  let completed=false;
  const previous=tasks;
  tasks=tasks.map(task=>task.id===id?(completed=!task.completed,{...task,completed}):task);
  if(!saveTasks()) { tasks=previous; return; }
  clearFormError(); updateStats(); renderTasks(); showToast(completed?text().taskCompleted:text().taskReopened);
}
function deleteTask(id) { const previous=tasks; tasks=tasks.filter(task=>task.id!==id); if(!saveTasks()){tasks=previous;return;} clearFormError(); updateStats(); renderTasks(); showToast(text().taskDeleted); }

taskForm.addEventListener("submit",event=>{
  event.preventDefault();
  clearFormError();
  const task=normalizeTask({id:createId(),name:document.getElementById("taskName").value.trim(),project:document.getElementById("projectName").value.trim(),dueDate:document.getElementById("dueDate").value,priority:document.getElementById("priority").value,completed:false});
  if(!task){showFormError(text().invalidTask);return;}
  submitButton.disabled=true;
  submitButton.classList.add("loading");
  submitButton.innerHTML=`${icons.loader}<span>${text().adding}</span>`;
  setTimeout(()=>{
    tasks.unshift(task);
    if(!saveTasks()){tasks.shift();submitButton.disabled=false;submitButton.classList.remove("loading");applyLanguage(currentLanguage);return;}
    updateStats(); taskForm.reset(); submitButton.disabled=false; submitButton.classList.remove("loading");
    submitButton.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 5v14M5 12h14"/></svg><span data-i18n="addTask"></span>';
    applyLanguage(currentLanguage); showToast(text().taskAdded);
  },280);
});

filterTasks.addEventListener("change",renderTasks);
languageSelect.addEventListener("change",event=>applyLanguage(event.target.value));
taskForm.addEventListener("input",clearFormError);
document.getElementById("currentYear").textContent=new Date().getFullYear();
updateStats();
applyLanguage(currentLanguage);
