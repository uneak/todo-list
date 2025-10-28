import './style.css'
import {createTodoItem} from './components.js'

const $ul = document.getElementById('todoList');
const $input = document.getElementById('todoInput');
const $addBtn = document.getElementById('addBtn');
const $count = document.getElementById('count');

$addBtn.addEventListener('click', () => {
    const text = $input.value.trim();
    if (text) {
        createTodoItem($ul, $count, {id: Date.now(), text, completed: false});
        $input.value = '';
    }
});
