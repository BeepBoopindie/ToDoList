var taskcount = 0;//Tasks in list
var list = [];




function completeTask(id){ // completed tasks get style asigned (Toggle)
    var element = document.getElementById("TB" + id).classList;
    if(element.contains('completed')){
        element.remove('completed'); //Remove completed style
        return;
    }
    element.add('completed');//Add completed style
}

function getTasks(){
    //Start by Adding listener to textbox for user to be able to press enter to submit.
    document.getElementById('newTask')
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
       document.getElementById('addbtn').click();
    }
});
    //Get any tasks saved in local storage
    localStorage.clear();
    if(localStorage.getItem('todos')){
        list = JSON.parse(localStorage.getItem('todos'));
        console.log(JSON.stringify(list));
        for(let i =0; i < list.length; i++){
            generateDiv(list[i].TaskName, list[i].id);
        }
    }
}


function removeTask(id){
    document.getElementById('TB' + id).remove();
    taskcount--;
    if(taskcount== 0){
        document.getElementById('no-tasks').classList.remove("hidden");
    }
}

function newTask(){
    var taskname = document.getElementById('newTask').value;
    if(taskname == "" && taskname.trim() == ''){ return;}
    generateDiv(taskname, "none");
}

function generateUI(){ //Development test
    generateDiv("Example Task");
}

function generateDiv(name, idnum){
    if(taskcount== 0){
        document.getElementById('no-tasks').classList.add("hidden");
    }
    if(idnum == "none"){
        var id = Math.random().toString(36).slice(2, 7);
        id= id.trim();
    }else{
        var id = idnum;
    }
    var task = document.createElement('div');
    task.className = "TaskBox"
    task.id = "TB" + id;
    task.innerHTML = '<h1>'+ name +'</h1><div class="buttons"><button class="Complete" onclick="completeTask(`'+String(id)+'`)">✔</button><button class="Delete" onclick="removeTask(`'+String(id)+'`)">🗑</button></div>';
    document.getElementById('tasklist').append(task);
    console.log("New task Generated");
    taskcount++;
    document.getElementById('newTask').value = "";
   // var task = {'id': + String(id.trim()) + `', 'TaskName':'` + name + `','completed': 'false'`};
   // list.push(task);
   // localStorage.setItem('todos', JSON.stringify(list));
}