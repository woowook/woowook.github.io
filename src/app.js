/* eslint-env browser */

// querySelector - html 요소를 선택할 때 사용되며 가장 첫번째 요소를 선택
// id의 경우 #을 붙이고 class인 경우 .를 붙여서 선택, 태그는 태그 그대로
// Html에서 class 이름이 toDoForm을 찾아서 첫번째 요소를 리턴
const toDoForm = document.querySelector(".toDoForm");
const toDoInput = toDoForm.querySelector("input");
const toDos = document.querySelector(".toDos");
const addTodoButton = document.querySelector(".addBtn");
const todoItem = document.querySelector(".li");

const TODOLIST = "toDoList"; // 추가
let toDoList = []; // 추가

function loadToDoList() {
  const loadedToDoList = localStorage.getItem(TODOLIST);
  if (loadedToDoList !== null) {
    // JSON.parse - String 객체를 json 객체로 변환
    const parsedToDoList = JSON.parse(loadedToDoList);
    for (const toDo of parsedToDoList) {
      const { text } = toDo; // Const text = toDo;
      paintToDo(text);
      saveToDo(text);
    }
  }
}

function saveToDo(toDo) {
  const toDoObject = {
    text: toDo,
    id: toDoList.length + 1,
  };
  toDoList.push(toDoObject);
  // 브라우저에 key-value 값을 storage에 저장
  // setItem(key, value) - 아이템 추가
  // getItem(key) - 아이템을 읽기 위해 사용
  // JSON.stringify - json 객체를 String 객체로 변환
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function createToDo(event) {
  event.preventDefault(); // 이벤트에 대해 새창이 열리지 않도록
  // 미입력이나 스페이스 입력시 제한
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Regular_Expressions
  if (toDoInput.value.replace(/\s/g, "").length === 0) {
    alert("미입력 혹은 공백을 입력했음");
    toDoInput.focus();
  } else {
    const toDo = toDoInput.value;
    paintToDo(toDo);
    saveToDo(toDo);
    toDoInput.value = "";
  }
}
function paintToDo(toDo) {
  // JS에서 html 요소를 생성하기 위해 createElement 사용 (li, span)
  const li = document.createElement("li");
  const span = document.createElement("span");
  const checkbox = document.createElement("input");
  const delButton = document.createElement("span");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");

  delButton.textContent = "X";
  delButton.classList.add("close");
  delButton.addEventListener("click", delToDo);
  span.innerHTML = toDo;
  li.append(checkbox);
  li.append(span);
  li.append(delButton);
  li.id = toDoList.length + 1;
  li.addEventListener("click", function () {
    completeTodo(li.id);
  });
  // checkbox?
  checkbox.addEventListener("click", function () {
    completeTodo(li.id);
    console.log("checked");
  });

  toDos.append(li);
}

function delToDo(event) {
  const { target: button } = event; // Const button = event.target;
  const li = button.parentNode; // ParentNode메서드는 해당 HTML 태그의 부모 태그를 반환한다.
  li.remove();
  toDoList = toDoList.filter((toDo) => toDo.id !== Number(li.id)); // Function (toDo) { return toDo.id !== li.id;}
  localStorage.setItem(TODOLIST, JSON.stringify(toDoList));
}

function completeTodo(id) {
  const item = document.getElementById(id);
  if (item.classList.contains("checked")) {
    item.classList.remove("checked");
  } else {
    item.classList.add("checked");
  }
}

// function complete(event) {
//   // https://developer.mozilla.org/en-US/docs/Web/API/Node/parentElement
//   const tar = event.target.parentElement;
//   if (tar.classList.contains("checked")) {
//     tar.classList.remove("checked");
//   } else {
//     tar.classList.add("checked");
//   }
// }

/////////////////////////////////////////
// remove todo item

function removeTodoItem(elem) {
  elem.remove();
  updateItemsCount(-1);
}

// clear comleted items

document.querySelector(".clear").addEventListener("click", () => {
  document
    .querySelectorAll('.list-item input[type="checkbox"]:checked')
    .forEach((item) => {
      removeTodoItem(item.closest("li"));
    });
});

// filter todo list items
document.querySelectorAll(".filter input").forEach((radio) => {
  radio.addEventListener("change", (e) => {
    filterTodoItems(e.target.id);
  });
});

function filterTodoItems(id) {
  const allItems = toDoList.querySelectorAll("li");

  switch (id) {
    case "all":
      allItems.forEach((item) => {
        item.classList.remove("hidden");
      });
      break;
    case "active":
      allItems.forEach((item) => {
        item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
    default:
      allItems.forEach((item) => {
        !item.querySelector("input").checked
          ? item.classList.add("hidden")
          : item.classList.remove("hidden");
      });
      break;
  }
}

function init() {
  loadToDoList(); // 추가
  // https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener
  // https://developer.mozilla.org/ko/docs/Web/Events

  addTodoButton.addEventListener("click", createToDo);
  toDoForm.addEventListener("submit", createToDo);
  toDoForm.addEventListener("click", completeTodo);
  // toDoForm.addEventListener("click", complete);
}

init();
