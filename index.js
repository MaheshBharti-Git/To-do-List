//elements
const todoList = document.getElementById('todos');
const container = document.getElementById('task-container');
const task = document.getElementById('inputTask') 
const listDiv = document.getElementsByClassName('todo-list')[0];
const warning = document.getElementById("warning");
const Box = document.getElementById("update-box");
const updateInput = document.getElementById("task-text")
const body = document.getElementsByTagName('body')[0];

// initial todos
var temp2 = JSON.parse(localStorage.getItem('itemjson'));
if(temp2!=null)
{
    for (let i = 0; i < temp2.length; i++) {
        const e = temp2[i];
        addtask(e);
        task.value="";
    }
}

//setting Date
const new_h2 = document.createElement('h2');
let temp = new Date();
let date = "Today :- " + temp.getDate() + "/" + temp.getMonth() + "/" + temp.getFullYear();
new_h2.innerText = `${date}`;
container.insertBefore(new_h2, container.firstChild);
new_h2.classList.add("inside");


//task saving at local storage

function show(e) {
    e.preventDefault();

    if (task.value!="") {
        
           if (localStorage.length == 0) {
                list = [];
                list.push(task.value);
                localStorage.setItem('itemjson', JSON.stringify(list));
            }
            else {
                listStr = localStorage.getItem('itemjson');
                list = JSON.parse(listStr).reverse();
                list.push(task.value);
                list = list.reverse();
                localStorage.setItem('itemjson', JSON.stringify(list));
            }
            addtask(task.value);
            task.value="";
    }
}

// task showing on page
task.addEventListener('keypress',(e)=>{
    if (e.code=='Enter') {
       show(e)     
    }
})

add.addEventListener('click', (e) => {
    show(e);
})

//task list genration function

function addtask(a) {
    
    let newTaskElement = document.createElement('li');
    newTaskElement.classList.add('listItem');
    const taskElmarkup = `
            <div>
            <span class = 'todo1' >${a}</span>
            </div>            
    
            <div class="todo-icons">
                <i class="update-task fa-regular fa-pen-to-square fa-lg"></i>
                <i class=" remove-task fa-sharp fa-regular fa-circle-xmark fa-lg"></i>
           </div>
        `
        newTaskElement.innerHTML = taskElmarkup;

    
        var i = document.getElementsByClassName('listItem');
        console.log(i);
        if (i.length==0) {
            todoList.appendChild(newTaskElement);
        }
        else
        todoList.insertBefore(newTaskElement,i[0]); 
}

// task list all clear 
const clearbtn = document.getElementById("clearAll")
clearbtn.addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    location.reload();
})

//deleting indivisual tasks

todoList.addEventListener('click',(e)=>{
    if (e.target.classList.contains('remove-task')) {
        var taskToDlt = e.target.closest('li');
        todoList.removeChild(taskToDlt);
        taskToDlt = e.target.closest('li').getElementsByClassName('todo1');

        var text = ""+taskToDlt.innerHTML;
        
        var listOfLclStrg = JSON.parse(localStorage.getItem('itemjson'));
        var index ;
        for (let i = 0; i < listOfLclStrg.length; i++) {
            const element = listOfLclStrg[i];
            if(element==text)index=i;
        }      
        
        listOfLclStrg.splice(index,1);  
        if (listOfLclStrg.length==0) {
             localStorage.clear();
        }
        else
        localStorage.setItem('itemjson',JSON.stringify(listOfLclStrg));

    }
})

//edit indivisual task
todoList.addEventListener('click',(e)=>{
    if (e.target.classList.contains('update-task')) {
            var taskToUpdate = e.target.closest('li').getElementsByClassName('todo1');
            var text = ""+taskToUpdate[0].innerHTML;
            console.log(taskToUpdate);
            updateInput.value = text;


            document.body.classList.add('active');
            Box.style = "visibility: visible";
            
            Box.addEventListener('click',(e)=>{
                if(e.target.classList.contains('update-btn')){

                    var temp =  updateInput.value ;
                    var listOfLclStrg = JSON.parse(localStorage.getItem('itemjson'));
                    var index ;
                    for (let i = 0; i < listOfLclStrg.length; i++) {
                        const element = listOfLclStrg[i];
                        if(element==text)index=i;
                    } 
                    listOfLclStrg.splice(index,1,temp); 
                    if (listOfLclStrg.length==0) {
                        localStorage.clear();
                   }
                   else
                       localStorage.setItem('itemjson',JSON.stringify(listOfLclStrg));
                   
                   location.reload();
                }
                else if(e.target.classList.contains('cancel')){
                    Box.style = "visibility:hidden;"
                    location.reload();
                }
            }) 
        }
      
    })

//hiding elements
setInterval(() => {
    if (localStorage.length != 0) {
        warning.style = "visibility: hidden;";
        listDiv.style = "visibility: visible;"
    }
    else{
        warning.style = "visibility: visible;";
        listDiv.style = "visibility: hidden;"
    }
},10);





