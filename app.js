document.getElementById("formTask").addEventListener("submit", saveTask);

function saveTask(e) {
  let title = document.getElementById("title").value;
  let description = document.getElementById("description").value;
  let completed = false;

  const task = {
    title,
    description,
    completed
  };

  if (localStorage.getItem("tasksRepo") === null) {
    let tasks = [];
    tasks.push(task);
    localStorage.setItem("tasksRepo", JSON.stringify(tasks));
  } else {
    let tasks = JSON.parse(localStorage.getItem("tasksRepo"));
    tasks.push(task);
    localStorage.setItem("tasksRepo", JSON.stringify(tasks));
  }

  viewTasks();

  document.getElementById("formTask").reset();

  e.preventDefault();
}

function getTasks(repo, view, completeBool) {
  let tasks = JSON.parse(localStorage.getItem(repo));
  let tasksView = document.getElementById(view);

  tasksView.innerHTML = "";

  for (let i = 0; i < tasks.length; i++) {
    console.log(tasks[i].completed + "->GET TASKS");
    if (tasks.completed === completeBool) {
      let title = tasks[i].title;
      let description = tasks[i].description;

      console.log(title + "->GET TASKS");
      console.log(description + "->GET TASKS");

      tasksView.innerHTML += `<div class="card mb-3">
            <div class="card-body">
                <h4 class="card-title">${title}</h4>
                <p class="card-text">${description}</p>
                
            </div>
            <div class="card-footer bg-secundary">
                    <a href="#" onclick="deleteTask('${title}','tasks')" class="btn btn-outline-danger btn-sm ml-5">Delete</a>
                    <a href="#" onclick="completeTask('${title}')" class="btn btn-success btn-sm ml-5">Complete</a>
                </div>
            </div>`;
    }
  }
}

function deleteTask(title, repo) {
  console.log(title + "-> Delete");

  let tasks = JSON.parse(localStorage.getItem(repo));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      tasks.splice(i, 1);
    }
  }
  localStorage.setItem(repo, JSON.stringify(tasks));
  viewTasks();
}

function completeTask(title) {
  console.log(title + "-> completed");

  let tasks = JSON.parse(localStorage.getItem("tasksRepo"));

  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].title == title) {
      let titulo = tasks.title;
      let desc = tasks.description;
      let completado = true;
      const update = {
        titulo,
        desc,
        completado
      };
      tasks[i] = update;
    }
  }

  viewTasks();
}

function viewTasks() {
  getTasks("tasksRepo", "tasksView", false);
  getTasks("tasksRepo", "completedView", true);
}
