const createTodoItem = ($ul, $count, todo) => {
    const li = document.createElement('li')
    li.className = 'todo-item'
    li.dataset.id = todo.id

    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'todo-checkbox'
    checkbox.checked = todo.completed
    li.appendChild(checkbox)

    const text = document.createElement('span')
    text.className = 'todo-text'
    text.textContent = todo.text
    li.appendChild(text)

    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-delete'
    deleteBtn.textContent = '✕'
    li.appendChild(deleteBtn)

    checkbox.addEventListener('change', () => {
        li.classList.toggle('todo-item-checked');
        todo.completed = checkbox.checked
    })

    deleteBtn.addEventListener('click', () => {
        li.remove();
        refreshCount($count, $ul.children.length);
    });

    $ul.append(li);
    refreshCount($count, $ul.children.length);

    return li
}


const refreshCount = ($count, count) => {
    $count.textContent = count;
}



export { createTodoItem };