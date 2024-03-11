const todoList =  [
  {
    name: 'wash dishes',
    date: "1999-02-01"
  },
  {
    name: 'wach move',
    date: "'1999-02-01'"
  }
];
randerTodoList();
function randerTodoList() {
  let innerHTML = '';
  todoList.forEach((todoObject,index) => {
    const {name,dueDate} = todoObject;
    const html = `
    <div>${name}</div>
    <div>${dueDate}</div>
    <button class="delet-button js-delet-button">Delete</button>
    `;
    innerHTML += html
  });
  document.querySelector('.js-todo-info')
    .innerHTML = innerHTML;
  document.querySelectorAll('.js-delet-button').forEach((deletButton,index) => {
    deletButton.addEventListener('click', () => {
      todoList.splice(index,1);
      randerTodoList();
    });
  });  
}
document.querySelector('.js-add-button')
  .addEventListener('click',() => {
    addTodo();
  });
  function addTodo() {
    const inputElemnt = document.querySelector('.js-text-input');
    const name = inputElemnt.value;
    const dueDate = document.querySelector('.js-date-input').value;
    todoList.push({
      name,
      dueDate
    });
    inputElemnt.value = "";
    randerTodoList();
  }
