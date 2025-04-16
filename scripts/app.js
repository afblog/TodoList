const addTodoBtn = $("#addTodoBtn");
const modal = $(".modal");
const closeModalBtn = $("#closeModalBtn");
const cancelTodoBtn = $("#cancelTodoBtn");
const taskTitle = $("#taskTitle");
const taskDescription = $("#taskDescription");
const createTodoBtn = $("#createTodoBtn");
const taskList = $("#taskList");

let todos = [];

const checkEmptyTaskList = () => {
  if (taskList.children().length === 0) {
    taskList.append(
      `<div class="w-full h-full flex items-center justify-center emptyImage">
            <img class="size-60" src="./images/vacant.svg" alt="vacant">
        </div>`
    );
  } else {
    $(".emptyImage").remove();
  }
};

checkEmptyTaskList();

const setLocalStorage = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const getLocalStorage = () => {
  const storedTodos = JSON.parse(localStorage.getItem("todos"));
  return storedTodos ? storedTodos : [];
};

const addBorderColor = (borderColor) => {
  const titleInputValue = taskTitle.val();
  const descriptionInputValue = taskDescription.val();
  if (titleInputValue.trim() === "") {
    taskTitle.addClass(borderColor);
  }

  if (descriptionInputValue.trim() === "") {
    taskDescription.addClass(borderColor);
  }
};

const removeBorderColor = (borderColor) => {
  taskTitle.removeClass(borderColor);
  taskDescription.removeClass(borderColor);
};

const openModal = () => modal.addClass("active");
const closeModal = () => {
  modal.removeClass("active");
  removeInputValue();
  removeBorderColor("border-red-500");
};

const removeInputValue = () => {
  taskTitle.val("");
  taskDescription.val("");
};

const getTodoInputValue = () => {
  const titleInputValue = taskTitle.val();
  const descriptionInputValue = taskDescription.val();
  if (titleInputValue.trim() !== "" && descriptionInputValue.trim() !== "") {
    return [titleInputValue, descriptionInputValue];
  } else {
    return null;
  }
};

const createTodo = (event) => {
  event.preventDefault();
  let values = getTodoInputValue();

  if (values) {
    const todoObj = {
      id: Date.now(),
      title: values[0],
      description: values[1],
      completed: false,
    };

    todos.push(todoObj);

    const todo = $(` <div data-id="${todoObj.id}"
        class="task-item bg-zinc-900 hover:shadow-md hover:bg-zinc-800 rounded-lg p-4 transition-all duration-300">
        <div class="flex flex-col lg:flex-row md:flex-row justify-between items-start">
            <div>
                <h3 class="todo_title font-bold">${values[0]}</h3>
                <p class="text-sm text-gray-400">${values[1]}</p>
            </div>
            <div class="flex mt-1 lg:m-0 md:m-0 items-center gap-x-2">
                <button
                    class="completeTask px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                            class="size-5">
                        <path fill-rule="evenodd"
                          d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                          clip-rule="evenodd" />
                     </svg>
                </button>
                <button
                    class="deleteTodoBtn px-2 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="size-5">
                        <path fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>`);

    taskList.append(todo);
    setLocalStorage("todos", todos);
    checkEmptyTaskList();
    closeModal();
    removeInputValue();
  } else {
    addBorderColor("border-red-500");
  }
};

function deleteTodo() {
  const todoElement = $(this).closest(".task-item");
  const todoId = Number(todoElement.data("id"));

  todoElement.remove();

  todos = todos.filter((todo) => todo.id !== todoId);

  setLocalStorage("todos", todos);

  checkEmptyTaskList();
}

function completeTodoTask() {
  const todoElement = $(this).closest(".task-item");
  const todoId = Number(todoElement.data("id"));

  todos = todos.map((todo) => {
    if (todo.id === todoId) {
      return { ...todo, completed: true };
    }
    return todo;
  });

  setLocalStorage("todos", todos);

  renderTodos();
}

const undoTask = function () {
  const todoElement = $(this).closest(".task-item");
  const todoId = Number(todoElement.attr("data-id"));

  todos = todos.map((todo) =>
    todo.id === todoId ? { ...todo, completed: false } : todo
  );

  setLocalStorage("todos", todos);
  renderTodos();
};

const renderTodos = () => {
  taskList.empty();

  if (todos.length === 0) {
    checkEmptyTaskList();
    return;
  }

  todos.forEach((todo) => {
    const todoHtml = $(` <div data-id="${todo.id}"
        class="task-item bg-zinc-900 ${
          todo.completed ? "opacity-70" : ""
        } hover:shadow-md hover:bg-zinc-800 rounded-lg p-4 transition-all duration-300">
        <div class="flex flex-col lg:flex-row md:flex-row justify-between items-start">
            <div>
                <h3 class="todo_title ${
                  todo.completed ? "line-through" : ""
                } font-bold">${todo.title}</h3>
                <p class="text-sm text-gray-400">${todo.description}</p>
            </div>
            <div class="flex mt-1 lg:m-0 md:m-0 items-center gap-x-2">
    ${
      todo.completed
        ? `<button
        class="undoTask px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
        </svg>
    </button>`
        : `
           <button
                    class="completeTask px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="size-5">
                        <path fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clip-rule="evenodd" />
                    </svg>
            </button>`
    }
             
                <button
                    class="deleteTodoBtn px-2 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="size-5">
                        <path fill-rule="evenodd"
                            d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
            </div>
        </div>
    </div>`);

    taskList.append(todoHtml);
  });
};

$(document).ready(function () {
  todos = getLocalStorage();
  renderTodos();
});

const checkInputValid = () => {
  const titleInputValue = taskTitle.val();
  const descriptionInputValue = taskDescription.val();
  if (titleInputValue.trim() !== "") {
    taskTitle.removeClass("border-red-500");
  }

  if (descriptionInputValue.trim() !== "") {
    taskDescription.removeClass("border-red-500");
  }
};

addTodoBtn.click(openModal);
closeModalBtn.click(closeModal);
createTodoBtn.click(createTodo);
cancelTodoBtn.click(closeModal);
taskList.on("click", ".deleteTodoBtn", deleteTodo);
taskList.on("click", ".completeTask", completeTodoTask);
taskList.on("click", ".undoTask", undoTask);
taskTitle.on("input", checkInputValid);
taskDescription.on("input", checkInputValid);
