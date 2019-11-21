// This is the main function called 'addFunctionality' which pretty much sets all the Event Listeners to the buttons and the other elements so that the program works as intended for the end-user.
let addFunctionality = function() {
    // Stopping the reloading from occuring when 'enter' is pressed on the textbox - and adding my own functionality which is to add the item to the current To-Do List.
    document.querySelector('.form').addEventListener('submit', function(event) {
        event.preventDefault();

        let newTodoObject = {
            todo: `${document.querySelector('.todo-textbox').value}`,
            completed: 0
        }

        if (localStorage.getItem('todos')) {
            let JSONTodosArray = JSON.parse(localStorage.getItem('todos'));
            JSONTodosArray.push(newTodoObject);
            localStorage.setItem('todos', JSON.stringify(JSONTodosArray));
        } else {
            let JSONTodosArray = [newTodoObject];
            localStorage.setItem('todos', JSON.stringify(JSONTodosArray));
        }

        document.querySelector('.todo-textbox').value = '';
        loadItems();
    })


    // Adding functionality to the 'Delete All' button so everything in the Local Storage gets deleted when pressed.
    document.querySelector('.clear-all-button').addEventListener('click', function(event) {
        localStorage.clear();
        loadItems();
    })


    // Adding functionality to the 'Not Completed' tasks when they are clicked - they become 'Completed'.
    let allUncompletedTodos = document.querySelectorAll('.todo-item');
    let parsedObject = JSON.parse(localStorage.getItem('todos'));
    allUncompletedTodos.forEach(function(todo, index) {
        todo.addEventListener('click', function(event) {
            parsedObject.forEach(function(todo, index) {
                if (todo.todo === event.target.textContent) {
                    todo.completed = 1;
                }
            })
            let stringifiedObject = JSON.stringify(parsedObject);
            localStorage.setItem('todos', stringifiedObject);
            loadItems();
        })
    })


    // Adding functionality to the 'Completed' tasks so that when they are clicked, they get deleted.
    let completedTodos = document.querySelectorAll('.completed-todo-item');
    parsedObject = JSON.parse(localStorage.getItem('todos'));
    completedTodos.forEach(function(todo, index) {

        todo.addEventListener('click', function(event) {
            parsedObject.forEach(function(todo,index) {
                if (todo.todo === event.target.textContent) {
                    parsedObject.splice(index,1);
                }
            })
            let stringifiedObject = JSON.stringify(parsedObject);
            localStorage.setItem('todos', stringifiedObject);
            loadItems();
        })

    })
}


// Creating a function which deletes everything within the 'Todos Section' and then reloads everything in their new state. It is called initially so that user sees everything when they open the page.
function loadItems() {
    document.querySelector('.todos-section').innerHTML = '';
    let extractedElements = document.querySelectorAll('.todos-section');
    extractedElements.forEach(function(element, index) {
        element.innerHTML = '';
    })


    let todosJSON = JSON.parse(localStorage.getItem('todos'));
    if (todosJSON) {
        todosJSON.forEach(function(todo, index) {
            let button = document.createElement('button');
            button.textContent = `${todo.todo}`;

            if (todo.completed === 0) {
                button.classList.add('todo-item');
                document.querySelector('.todos-section').appendChild(button);
            } else if (todo.completed === 1) {
                button.classList.add('completed-todo-item');
                document.querySelector('.todos-section').appendChild(button);
            }
        })
    }

    // Whenever the inner HTML is deleted and then elements are added back into the div, we need to add the Event Listeners again and so that is why we call the function below which recreates all the functionality.
    addFunctionality();
}


// Initially calling the two functions which loads in the items and then adds functionality to everything like the 'Delete All' button and the textbox and everything.
loadItems();
addFunctionality();