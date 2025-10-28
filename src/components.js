/**
 * Crée un élément de liste de tâches (li) avec tous ses composants et événements
 * @param {HTMLElement} $ul - La liste (ul) où ajouter l'élément
 * @param {HTMLElement} $count - L'élément pour afficher le compteur de tâches
 * @param {Object} todo - L'objet tâche contenant {id, text, completed}
 * @returns {HTMLElement} L'élément li créé
 */
const createTodoItem = ($ul, $count, todo) => {
    // Créer l'élément li et lui ajouter les classes CSS
    const li = document.createElement('li')
    li.className = 'todo-item'

    // Si la tâche est complétée, ajouter la classe pour le style visuel (strikethrough)
    if (todo.completed) {
        li.classList.add('todo-item-checked');
    }

    // Créer la checkbox pour marquer la tâche comme complétée
    const checkbox = document.createElement('input')
    checkbox.type = 'checkbox'
    checkbox.className = 'todo-checkbox'
    checkbox.checked = todo.completed
    li.appendChild(checkbox)

    // Créer le span pour afficher le texte de la tâche
    const text = document.createElement('span')
    text.className = 'todo-text'
    text.textContent = todo.text
    li.appendChild(text)

    // Créer le bouton de suppression
    const deleteBtn = document.createElement('button')
    deleteBtn.className = 'btn-delete'
    deleteBtn.textContent = '✕'
    li.appendChild(deleteBtn)

    // Événement : quand on clique sur la checkbox, basculer l'état "complété"
    checkbox.addEventListener('change', () => {
        li.classList.toggle('todo-item-checked');
        todo.completed = checkbox.checked
    })

    // Événement : quand on clique sur le bouton supprimer, retirer la tâche
    deleteBtn.addEventListener('click', () => {
        li.remove();
        refreshCount($count, $ul.children.length);
    });

    // Ajouter la tâche à la liste et mettre à jour le compteur
    $ul.append(li);
    refreshCount($count, $ul.children.length);

    return li
}


/**
 * Met à jour le compteur de tâches affiché dans l'interface
 * @param {HTMLElement} $count - L'élément HTML où afficher le nombre
 * @param {number} count - Le nombre de tâches à afficher
 */
const refreshCount = ($count, count) => {
    $count.textContent = count;
}



export { createTodoItem };