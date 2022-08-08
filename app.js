// Model
let todos
// Retrieve localStorage
const savedTodos = JSON.parse(localStorage.getItem("todos"))
// Check if it's an array
if (Array.isArray(savedTodos)) {
  todos = savedTodos
} else {
  todos = [
    {
      title: "Learn JS",
      dueDate: "2022-31-12",
      id: "id1",
    },
  ]
}

// Creates a todo
const createTodo = (title, dueDate) => {
  const id = "" + new Date().getTime()

  todos.push({
    title: title,
    dueDate: dueDate,
    id: id,
  })

  saveTodos()
}

// Deletes a todo
const removeTodo = (idToDelete) => {
  todos = todos.filter((todo) => {
    // If the id of this todo matches idToDelete, return false
    // For everything else, return true
    if (todo.id === idToDelete) {
      return false
    } else {
      return true
    }
  })

  saveTodos()
}

const saveTodos = () => {
  localStorage.setItem("todos", JSON.stringify(todos))
}

// Controller
const addTodo = () => {
  const textbox = document.getElementById("todo-title")
  const title = textbox.value

  const datePicker = document.getElementById("date-picker")
  const dueDate = datePicker.value

  createTodo(title, dueDate)
  render()
}

const deleteTodo = (event) => {
  const deleteButton = event.target
  const idToDelete = deleteButton.id

  removeTodo(idToDelete)
  render()
}

// View
const render = () => {
  // reset our list
  document.getElementById("todo-list").innerHTML = ""
  todoList = document.getElementById("todo-list")

  todos.forEach((todo) => {
    const elementTitle = document.createElement("div")
    elementTitle.innerText = todo.title

    const elementDate = document.createElement("div")
    elementDate.innerText = todo.dueDate

    const deleteButton = document.createElement("button")
    deleteButton.innerText = "Delete"
    deleteButton.style = "margin-left: 12px"
    deleteButton.onclick = deleteTodo
    deleteButton.id = todo.id

    const todoItems = [elementTitle, elementDate, deleteButton]
    todoItems.forEach((item) => todoList.appendChild(item))
  })
}

render()
