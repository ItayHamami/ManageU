var Task = /** @class */ (function () {
    function Task(description) {
        this.description = description;
        this.id = Math.floor(Math.random() * 1001);
        this.completed = false;
    }
    return Task;
}());
var TaskManager = /** @class */ (function () {
    function TaskManager(tasks) {
        if (tasks === void 0) { tasks = []; }
        this.tasks = tasks;
    }
    TaskManager.prototype.addTask = function (description) {
        this.tasks.push(new Task(description));
    };
    TaskManager.prototype.deleteTask = function (id) {
        var indexToDelete = this.tasks.findIndex(function (task) { return task.id === id; });
        this.tasks.splice(indexToDelete, 1);
    };
    TaskManager.prototype.updateTaskDescription = function (id, newDescription) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id === id; });
        this.tasks[indexToUpdate].description = newDescription;
    };
    TaskManager.prototype.completeTask = function (id) {
        var indexToUpdate = this.tasks.findIndex(function (task) { return task.id === id; });
        this.tasks[indexToUpdate].completed = true;
    };
    return TaskManager;
}());
var manager;
function restoreData(classConstructor) {
    // Retrieve the data from local storage
    var storedData = localStorage.getItem('manager');
    var manager;
    if (storedData) {
        try {
            var parsedData = JSON.parse(storedData);
            if (parsedData && Array.isArray(parsedData.tasks)) {
                // Recreate the class instance from the stored data
                manager = new classConstructor(parsedData.tasks);
                console.log(manager);
                console.log(manager.tasks);
                showTasksInLists();
            }
            else {
                console.log('No valid tasks found in stored data');
                manager = new classConstructor([]);
            }
        }
        catch (error) {
            console.log('Error parsing stored data:', error);
            manager = new classConstructor([]);
        }
    }
    else {
        console.log('No data found in local storage');
        manager = new classConstructor([]);
    }
    return manager;
}
document.addEventListener('DOMContentLoaded', function () {
    manager = restoreData(TaskManager);
    // Rest of your code for managing tasks and updating local storage
    // ...
});
/*
function filterSearch() {
  // Declare variables
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("actions");
  tr = table.getElementsByTagName("tr");

  // Loop through all table rows, and hide those who don't match the search query
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0];
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}
*/
// document.addEventListener('DOMContentLoaded', filterSearch);
function showTasksInLists() {
    localStorage.setItem("manager", JSON.stringify(manager));
    document.getElementById("active").innerHTML = "";
    document.getElementById("completed").innerHTML = "";
    for (var _i = 0, _a = manager.tasks; _i < _a.length; _i++) {
        var task = _a[_i];
        if (task.completed == false) {
            document.getElementById("active").innerHTML += "\n    <div class=\"task\"> <li class=\" list-group-item d-inline-block w-50\">".concat(task.description, "</li> <span> <button class=\"btn btn-success\" onclick=\"completeTask(").concat(task.id, ")\"><i class=\"fa-solid fa-check\"></i></button> <button class=\"btn btn-primary\" onclick=\"updateDescription(").concat(task.id, ")\"><i class=\"fa-solid fa-pen\"></i></button> <button class=\"btn btn-danger\" onclick=\"deleteTask(").concat(task.id, ")\"><i class=\"fa-solid fa-trash\"></i></button></span> </div> ");
        }
        else {
            document.getElementById("completed").innerHTML += "\n    <div class=\"task\"> <li class=\"list-group-item d-inline-block w-50 text-decoration-line-through\">".concat(task.description, "</li> <span> <button class=\"btn btn-success\" disabled><i class=\"fa-solid fa-check-double\"></i></button> <button class=\"btn btn-primary\" disabled><i class=\"fa-solid fa-pen\"></i></button> <button class=\"btn btn-danger\" disabled><i class=\"fa-solid fa-trash\"></i></button></span> </div> ");
        }
    }
}
showTasksInLists();
function completeTask(id) {
    manager.completeTask(id);
    showTasksInLists();
}
function updateDescription(id) {
    var newDescription = prompt("Enter new description:");
    if (newDescription != null || newDescription != "") {
        manager.updateTaskDescription(id, newDescription);
        showTasksInLists();
    }
    else
        alert("Sorry! Something went wrong");
}
function deleteTask(id) {
    if (confirm("Are you sure you want to delete this task??")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
}
function addNewTask() {
    var description = document.getElementById("description").value;
    manager.addTask(description);
    document.getElementById("description").value = "";
    showTasksInLists();
}
