totalTasks = [
  {
    id: "1",
    todaytask: "walking",
    ischecked: false,
  },
];
function updateUiList() {
  clearUl();
  for (let task of totalTasks) {
    const event = MakeLiList(task);
    const ul = document.querySelector("#unchecked-task");
    ul.appendChild(event);
  }
}
function clearUl() {
  const ul = document.querySelector("#unchecked-task");
  ul.innerHTML = "";
}
function MakeLiList(task) {
  if (task.ischecked) {
    const li = document.createElement("li");
    li.setAttribute("id", `task-${task["id"]}`);
    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox");
    inputCheckBox.checked = true;
    let id = `task-${task["id"]}-check`;
    inputCheckBox.setAttribute("id", id);
    const p = document.createElement("p");
    p.setAttribute("class", "para");
    p.setAttribute("id", `task-${task["id"]}-para`);
    p.innerHTML = task["work"];
    p.style.textDecoration = "line-through";
    li.appendChild(inputCheckBox);
    li.appendChild(p);
    inputCheckBox.addEventListener("change", function () {
      if (inputCheckBox.checked) {
        checkingCheckBox(task["id"], true);
      } else {
        checkingCheckBox(task["id"], false);
      }
    });
    return li;
  } else {
    const li = document.createElement("li");
    li.setAttribute("id", `task-${task["id"]}`);
    const inputCheckBox = document.createElement("input");
    inputCheckBox.setAttribute("type", "checkbox");
    let id = `task-${task["id"]}-check`;
    inputCheckBox.setAttribute("id", id);
    const p = document.createElement("p");
    p.setAttribute("class", "para");
    p.setAttribute("id", `task-${task["id"]}-para`);
    p.innerHTML = task["work"];
    p.style.textDecoration = "";
    li.appendChild(inputCheckBox);
    li.appendChild(p);
    inputCheckBox.addEventListener("change", function () {
      if (inputCheckBox.checked) {
        checkingCheckBox(task["id"], true);
      }
    });
    return li;
  }
}
function checkingCheckBox(taskId, bool) {
  const checkIndex = totalTasks.findIndex((task) => task.id == taskId);
  if (checkIndex != -1) {
    totalTasks[checkIndex]["ischecked"] = bool;
    sortArray();
    saveToLocalStorage();
    updateUiList();
  }
}
function sortArray() {
  totalTasks.sort((a, b) =>
    a.ischecked === b.ischecked ? 0 : a.ischecked ? 1 : -1
  );
}
function addForm() {
  const form = document.querySelector("#total-form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let taskInput = document.querySelector("#task").value;
    let button = document.querySelector("#button-todo");
    if(taskInput=="")
    {
      alert("assign something")
    }
    const task = {
      id: new Date().getTime(),
      work: taskInput,
      ischecked: false,
    };
    addtask(task);
    updateUiList();
  });
}
function addtask(task) {
  totalTasks.push(task);
  sortArray();
  saveToLocalStorage();
}
// function strikeOut(id){
//     const checkbox = document.querySelector("#id");
// }
function saveToLocalStorage() {
  const str = JSON.stringify(totalTasks);
  localStorage.setItem("my-event-list", str);
}
function getFromLocalStorage() {
  const str = localStorage.getItem("my-event-list");
  if (!str) {
    return totalTasks;
  } else {
    totalTasks = JSON.parse(str);
  }
}
getFromLocalStorage();
updateUiList();
addForm();
