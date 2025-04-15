const addTodoBtn = $("#addTodoBtn");
const modal = $(".modal");
const closeModalBtn = $("#closeModalBtn");
const taskTitle = $("#taskTitle");
const taskDescription = $("#taskDescription");
const createTodoBtn = $("#createTodoBtn");
const taskList = $("#taskList");

const openModal = () => modal.addClass("active");
const closeModal = () => modal.removeClass("active");
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
    const todo = $(` <div
        class="task-item bg-zinc-900 hover:shadow-md hover:bg-zinc-800 rounded-lg p-4 transition-all duration-300">
        <div class="flex flex-col lg:flex-row md:flex-row justify-between items-start">
            <div>
                <h3 class="font-bold">${values[0]}</h3>
                <p class="text-sm text-gray-400">${values[1]}</p>
            </div>
            <div class="flex mt-1 lg:m-0 md:m-0 items-center gap-x-2">
                <button
                    class="px-2 py-1 bg-green-500/20 text-green-500 rounded-lg hover:bg-green-500/30 transition-colors duration-300">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                        class="size-5">
                        <path fill-rule="evenodd"
                            d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z"
                            clip-rule="evenodd" />
                    </svg>
                </button>
                <button
                    class="px-2 py-1 bg-red-500/20 text-red-500 rounded-lg hover:bg-red-500/30 transition-colors duration-300">
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
    closeModal();
    removeInputValue();
  }
};

addTodoBtn.click(openModal);
closeModalBtn.click(closeModal);
createTodoBtn.click(createTodo);
