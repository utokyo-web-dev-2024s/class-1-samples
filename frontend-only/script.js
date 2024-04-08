const addTodoButton = document.getElementById("add-todo-button");
addTodoButton.onclick = () => {
  const todoInput = document.getElementById("todo-input");
  const newTodo = todoInput.value;
  if (newTodo !== "") {
    const li = document.createElement("li");
    li.textContent = newTodo;
    const todoContainer = document.getElementById("todo-container");
    todoContainer.appendChild(li);
    todoInput.value = "";
  }
};
