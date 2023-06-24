class Task {
    public id: number;
    public completed: boolean;

    constructor(public description: string) {
      this.id = Math.floor(Math.random() * 1001);
    this.completed = false;
    }
}

class TaskManager {
    public tasks: Task[];

    constructor(tasks: Task[] = []) {
    this.tasks = tasks;
    }

    addTask(description: string) {
    this.tasks.push(new Task(description));
    }

    deleteTask(id: number) {
    const indexToDelete = this.tasks.findIndex((task) => task.id === id);
    this.tasks.splice(indexToDelete, 1);
    }

    updateTaskDescription(id: number, newDescription: string): void {
    const indexToUpdate = this.tasks.findIndex((task) => task.id === id);
    this.tasks[indexToUpdate].description = newDescription;
    }

    completeTask(id: number): void {
    const indexToUpdate = this.tasks.findIndex((task) => task.id === id);
    this.tasks[indexToUpdate].completed = true;
    }
}


let manager:any;

  




function showTasksInLists() {
    localStorage.setItem("manager", JSON.stringify(manager))
    document.getElementById("active")!.innerHTML = "";
    document.getElementById("completed")!.innerHTML = "";
    for (let task of manager.tasks) {
        if (task.completed == false) {
            document.getElementById("active")!.innerHTML += `
    <div class="task"> <li class=" list-group-item d-inline-block w-50">${task.description}</li> <span> <button class="btn btn-success" onclick="completeTask(${task.id})"><i class="fa-solid fa-check"></i></button> <button class="btn btn-primary" onclick="updateDescription(${task.id})"><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" onclick="deleteTask(${task.id})"><i class="fa-solid fa-trash"></i></button></span> </div> `;
        } else {
            document.getElementById("completed")!.innerHTML += `
    <div class="task"> <li class="list-group-item d-inline-block w-50 text-decoration-line-through">${task.description}</li> <span> <button class="btn btn-success" disabled><i class="fa-solid fa-check-double"></i></button> <button class="btn btn-primary" disabled><i class="fa-solid fa-pen"></i></button> <button class="btn btn-danger" disabled><i class="fa-solid fa-trash"></i></button></span> </div> `;
        }
    }
}

showTasksInLists();

function completeTask(id:number){
    manager.completeTask(id);
    showTasksInLists();
}
function updateDescription(id: number) {
    let newDescription = prompt("Enter new description:");
    if (newDescription != null || newDescription != "") {
        manager.updateTaskDescription(id, newDescription!);
        showTasksInLists();}
        else alert("Sorry! Something went wrong");
    }
    function deleteTask(id: number) {
    if (confirm("Are you sure you want to delete this task??")) {
        manager.deleteTask(id);
        showTasksInLists();
    }
    }

    function addNewTask() {

        let description = (document.getElementById("description") as HTMLInputElement).value;
        manager.addTask(description);
        (document.getElementById("description") as HTMLInputElement).value = "";
        showTasksInLists();
    }