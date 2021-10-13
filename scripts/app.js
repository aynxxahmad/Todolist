//SELECTORS
const todoInput=document.querySelector('.todo_input');
const todoButton=document.querySelector('.todo_button');
const todoList=document.querySelector('.todo_list');


const navOptions=document.querySelector(`.nav`);

//EVENT LISTENERS
document.addEventListener(`DOMContentLoaded`,showLocalStorage); //run when the browser is fully loaded 
todoButton.addEventListener(`click`,addTodo);
todoList.addEventListener(`click`,deleteTodo);
navOptions.addEventListener(`click`,filterTodo);




//FUNCTIONS

//generating a Tododiv as parent with children constituting of todo_data=li and relevant buttons 
function addTodo(e){
    e.preventDefault();
    //todo div
    const newDiv=document.createElement('div');
    newDiv.classList.add(`todo_div`);

    //todo li
    const newLi=document.createElement(`li`);
    newLi.classList.add('todo_li');
    newLi.innerText=todoInput.value;

    //check button
    const checkButton=document.createElement(`button`);
    checkButton.classList.add(`check_button`);
    checkButton.innerHTML=`<i class="fas fa-check"></i>`

    //trash button
    const trashButton=document.createElement(`button`);
    trashButton.classList.add(`trash_button`);
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`;

    //Appending Everthing to their respecting parent element
    newDiv.appendChild(newLi);
    newDiv.appendChild(checkButton);
    newDiv.appendChild(trashButton);
    todoList.appendChild(newDiv);
     //saving to local storage
    savetoLocalStorage(todoInput.value);
    todoInput.value="";//clearing the input field

}

//for marking a todo as completed or checking if it is to be deleted
function deleteTodo(e){
    const item=e.target;
    const todo=(item.parentElement);
    if(item.classList[0]==='check_button') //checking the first class assigned 
        todo.classList.toggle('completed');

    else if(item.classList[0]==='trash_button'){
        todo.classList.add('fall');
        removeTodo(todo);
        todo.addEventListener(`transitionend`,()=>{ //run when the transition ends
            todo.remove();
        });
    }
}

//function for filtering todos

function filterTodo(e){
    const todos=todoList.childNodes;
    todos.forEach(function(todo){
        if(e.target.innerText==='All'){
            todo.style.display=`flex`;
        }
        else if(e.target.innerText==='Completed'){
            if(todo.classList.contains(`completed`))
                todo.style.display=`flex`;
            else
                todo.style.display=`none`;
        }
        else if(e.target.innerText==='Uncompleted'){
            if(!todo.classList.contains(`completed`))
                todo.style.display=`flex`;
            else
                todo.style.display=`none`;
        }
    
    });
}



//function for saving to localStorage
function savetoLocalStorage(todo){
    let todos;
    //checking if i have anything in todos already or not
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }
        todos.push(todo);//adding to the returned array
        localStorage.setItem("todos",JSON.stringify(todos))

}

function showLocalStorage(){
    let todos;
    //checking if i have anything in todos already or not
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    //creating the UI
    todos.forEach(function(todo){
        const newDiv=document.createElement('div');
    newDiv.classList.add(`todo_div`);

    //todo li
    const newLi=document.createElement(`li`);
    newLi.classList.add('todo_li');
    newLi.innerText=todo;

    //check button
    const checkButton=document.createElement(`button`);
    checkButton.classList.add(`check_button`);
    checkButton.innerHTML=`<i class="fas fa-check"></i>`

    //trash button
    const trashButton=document.createElement(`button`);
    trashButton.classList.add(`trash_button`);
    trashButton.innerHTML=`<i class="fas fa-trash"></i>`;

    //Appending Everthing to their respecting parent element
    newDiv.appendChild(newLi);
    newDiv.appendChild(checkButton);
    newDiv.appendChild(trashButton);
    todoList.appendChild(newDiv);
    todoInput.value="";
    });
}

//function for removing todo when its trash icon is clicked
function removeTodo(todo){
    let todos;
    //checking if i have anything in todos already or not
    if(localStorage.getItem("todos")===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem("todos"));
    }

    const todoText=todo.children[0].innerText; //todo is a div so we are targetting the inner Text of its first child i.e li
    const todoTextIndex=todos.indexOf(todoText); //finding index of the innertext of relevant todo in localStorage with key="todos"

    todos.splice(todoTextIndex,1);
    localStorage.setItem("todos",JSON.stringify(todos));

}

//end of code