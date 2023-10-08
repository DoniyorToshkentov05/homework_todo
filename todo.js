let todos = JSON.parse(localStorage.getItem('todos')) || [];

const newTodoForm = document.querySelector('#new-todo-form');

newTodoForm.addEventListener('submit', e => {
    e.preventDefault();

    const todo = {
        content: e.target.elements.content.value,
        done: false
    }

    todos.push(todo);

    localStorage.setItem('todos', JSON.stringify(todos));

    e.target.reset();

    ShowTodo();
})
ShowTodo();

function ShowTodo() {
const todoList = document.querySelector('#todo-list');

todoList.innerHTML = '';
todos.forEach(todo => {

    const todoItem = document.createElement('div');
    todoItem.classList.add('todo-item');

    const label = document.createElement('label');
    const input = document.createElement('input');
    const todoContent = document.createElement('div');
    const actions = document.createElement('div');
    const editBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');


    
    todoContent.classList.add('todo-content');
    actions.classList.add('actions');
    editBtn.classList.add('edit-btn');
    deleteBtn.classList.add('delete-btn');

    todoContent.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

    editBtn.innerHTML = 'Edit';
    deleteBtn.innerHTML = 'Delete';

    label.appendChild(input);
    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
  
    todoItem.appendChild(todoContent);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    if (todo.done) {
        todoItem.classList.add('done');
    }

  
  

    deleteBtn.addEventListener('click', (e) => {
        todos = todos.filter(t => t != todo);
        localStorage.setItem('todos', JSON.stringify(todos));
        ShowTodo()
    })
    editBtn.addEventListener('click', e => {
        const input = todoContent.querySelector('input');
        input.removeAttribute('readonly');
        input.style.borderStyle = 'inset';
        input.focus();
        input.addEventListener('blur', e => {
            input.setAttribute('readonly', true);
            todo.content = e.target.value;
            localStorage.setItem('todos', JSON.stringify(todos));
            ShowTodo()
        })
    })

})
}