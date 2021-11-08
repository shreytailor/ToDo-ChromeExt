const localStorage = window.localStorage;

function render() {
    const todoSection = document.querySelector(".todos-section");
    todoSection.innerHTML = "";
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos == null) return;

    for (const todo of todos) {
        let button = document.createElement("button");
        button.textContent = todo.text;
        button.setAttribute("data-timestamp", todo.timestamp);

        if (todo.completed == false) {
            button.classList.add("incomplete");
        } else if (todo.completed == true) {
            button.classList.add("completed");
        }
        
        todoSection.appendChild(button);
    }

    addEventListeners();
};

function addEventListeners() {
    document.querySelectorAll(".incomplete").forEach(element => {
        element.addEventListener("click", event => {
            console.log("Clicked");
            let todos = JSON.parse(localStorage.getItem("todos"));
            
            todos = todos.map(todo => {
                if (todo.timestamp == event.target.dataset.timestamp) {
                    todo.completed = true;
                }
    
                return todo;
            });
    
            localStorage.setItem("todos", JSON.stringify(todos));
            render();
        });
    });
    
    document.querySelectorAll(".completed").forEach(element => {
        element.addEventListener("click", event => {
            let todos = JSON.parse(localStorage.getItem("todos"));
    
            todos = todos.filter(todo => {
                return !(todo.timestamp == event.target.dataset.timestamp);
            });
    
            localStorage.setItem("todos", JSON.stringify(todos));
            render();
        });
    });
}

render();

document.querySelector("form").addEventListener("submit", event => {
    event.preventDefault();
    if (event.target[0].value == "") return;

    let todos = JSON.parse(localStorage.getItem("todos"));
    if (todos == null) todos = [];
    
    todos.push({
        text: event.target[0].value,
        timestamp: Math.round(Date.now() / 1000),
        completed: false
    });
    
    event.target[0].value = "";
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
});

document.querySelector("#clear-button").addEventListener("click", event => {
    localStorage.clear();
    render();
});