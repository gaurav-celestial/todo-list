const listContainer = document.querySelector(".todo-items ul");

const taskBtn = document.querySelector(".task-btn");

const addTask = () => {
  const listContainerIncomplete = document.querySelector(".incomplete");

  const textInput = document.querySelector(".add-task-input");
  const val = textInput.value;

  if (!val) {
    alert("please enter a task");
    return;
  }
  const html = `<li class="todo-item">
                    <div >
                        <span class="material-symbols-outlined cursor">
                        radio_button_unchecked
                        </span>
                       <p> ${val} </p>
                     </div>
                     <span class="material-symbols-outlined cursor"> delete </span>
                </li>`;

  listContainerIncomplete.insertAdjacentHTML("beforeend", html);
  textInput.value = "";
  save();
};

taskBtn.addEventListener("click", addTask);
document.addEventListener("keydown", (e) => {
  e.key === "Enter" && addTask();
});

const todoItems = document.querySelector(".todo-items");

todoItems.addEventListener("click", function (e) {
  const listContainerComplete = document.querySelector(".complete");
  const listContainerIncomplete = document.querySelector(".incomplete");
  const heading = document.querySelector(".heading");

  const els = [...e.target.parentNode.childNodes];
  const text = e.target.textContent.trim();

  if (text === "delete") {
    e.target.parentNode.remove();

    listContainerComplete.childNodes.length <= 3 &&
      heading.classList.add("hidden");
  } else if (text === "radio_button_unchecked") {
    heading.classList.remove("hidden");

    e.target.textContent = "radio_button_checked";
    els[3].style.textDecoration = "line-through";

    const html = `<li class="todo-item"> ${e.target.parentNode.parentNode.innerHTML} </li>`;

    listContainerComplete.insertAdjacentHTML("beforeend", html);
    e.target.parentNode.parentNode.remove();
  } else if (text === "radio_button_checked") {
    e.target.textContent = "radio_button_unchecked";
    els[3].style.textDecoration = "none";

    const html = `<li class="todo-item"> ${e.target.parentNode.parentNode.innerHTML} </li>`;

    listContainerIncomplete.insertAdjacentHTML("beforeend", html);
    e.target.parentNode.parentNode.remove();

    listContainerComplete.childNodes.length <= 3 &&
      heading.classList.add("hidden");
  }
  save();
});

const save = function () {
  localStorage.setItem("data", listContainer.innerHTML);
};

if (listContainer.childNodes.length >= 5) {
  listContainer.innerHTML = localStorage.getItem("data");
}
