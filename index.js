var taskcount = 0;//Tasks in list
var list = [];


function completeTask(id, fromlist){ // completed tasks get style asigned (Toggle)
    var elm = "TB" + id;
    console.log(fromlist);
    var element = document.getElementById(elm).classList;
    var completed = true;
    if(element.contains('completed')){
        completed = false;
        element.remove('completed'); //Remove completed style

    }else{
        element.add('completed');//Add completed style
    }
    if(!fromlist){
        console.log("changing complete state")
        for(let i =0; i < list.length; i++){
            if(list[i].id == id){
               // console.log("Found array value : " + list[i].id);
                list[i].completed = completed;
                localStorage.clear();
                localStorage.setItem('todos', JSON.stringify(list));
                //list[i].remove();
            }
        }
    }
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
     //localStorage.clear();
    if(localStorage.getItem('todos')){
        list = JSON.parse(localStorage.getItem('todos'));
        console.log(list);
        console.log("LIST LENGTH" + list.length);

        for(let i =0; i < list.length; i++){
            generateDiv(list[i].TaskName, list[i].id, list[i].completed,true);
        }
    }
}


function removeTask(id){
    document.getElementById('TB' + id).remove();
    taskcount--;
    if(taskcount== 0){
        document.getElementById('no-tasks').classList.remove("hidden");
    }

    for(let i =0; i < list.length; i++){
        if(list[i].id == id){
            console.log("Found array value : " + list[i].id);
            list.splice(i,1);
            localStorage.clear();
            localStorage.setItem('todos', JSON.stringify(list));
            //list[i].remove();
        }
    }
}

function newTask(){
    var taskname = document.getElementById('newTask').value;
    if(taskname == "" && taskname.trim() == ''){ return;}
    generateDiv(taskname, "none", false,false);
}

function generateUI(){ //Development test
    generateDiv("Example Task");
}

function generateDiv(name, idnum, completed,fromlist){
    var id;
    if(taskcount== 0){
        document.getElementById('no-tasks').classList.add("hidden");
    }
    if(idnum == "none"){
         id = Math.random().toString(36).slice(2, 7);
        id= id.trim();
    }else{
         id = idnum;
    }
    console.log(id);
    var task = document.createElement('div');
    task.className = "TaskBox"
    task.id = "TB" + id;
    task.innerHTML = '<h1>'+ name +'</h1><div class="buttons"><button class="Complete" onclick="completeTask(`'+ String(id) + '`, false)">✔</button><button class="Delete" onclick="removeTask(`'+String(id)+'`)">🗑</button></div>';
    document.getElementById('tasklist').append(task);
    console.log("New task Generated");

    if(completed){
        completeTask(id,true);
    }
    taskcount++;
    document.getElementById('newTask').value = "";


    if(!fromlist){
        let newtask = {
            id: id, 
            TaskName: name,
            completed: false
        };
        list.push(newtask);
        localStorage.setItem('todos', JSON.stringify(list));
    }
}
