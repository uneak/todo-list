// Import du fichier de style CSS
import './style.css'
// Import de la fonction createTodoItem depuis le fichier components.js
import {createTodoItem} from './components.js'

// Sélection des éléments DOM
// Liste des tâches
const $ul = document.getElementById('todoList');
// Champ de saisie pour les nouvelles tâches
const $input = document.getElementById('todoInput');
// Bouton pour ajouter une nouvelle tâche
const $addBtn = document.getElementById('addBtn');
// Élément affichant le nombre de tâches
const $count = document.getElementById('count');

// Bouton pour importer les tâches depuis un fichier
const $import = document.getElementById('import');
// Input caché pour sélectionner le fichier
const $fileInput = document.getElementById('fileInput');

// Event listener pour le bouton d'import - déclenche le clic sur l'input caché
$import.addEventListener('click', () => {
    // Simuler un clic sur l'input de fichier pour ouvrir le sélecteur de fichier
    $fileInput.click();
});

// Event listener pour quand un fichier est sélectionné
$fileInput.addEventListener('change', (e) => {
    // Récupérer le fichier sélectionné
    const file = e.target.files[0];
    if (file) {
        // Créer un lecteur de fichier
        const reader = new FileReader();
        // Quand le fichier est chargé
        reader.onload = (event) => {
            // Parser le JSON et récupérer les données
            const data = JSON.parse(event.target.result);
            // Créer une tâche pour chaque élément
            data.forEach(todo => {
                createTodoItem($ul, $count, todo);
            });
            console.log("Tâches importées:", data);
        };
        // Lire le fichier en tant que texte
        reader.readAsText(file);
    }
});

// Bouton pour exporter les tâches
const $export = document.getElementById('export');
// Event listener pour le bouton d'export
$export.addEventListener('click', () => {
    console.log("export");

    // Créer un tableau pour stocker les données des tâches
    let data = [];
    // Parcourir tous les éléments li de la liste
    for (let i = 0; i < $ul.children.length; i++) {
        const $li = $ul.children[i];
        // Récupérer la checkbox pour savoir si la tâche est complétée
        const $checkbox = $li.querySelector('.todo-checkbox');
        // Récupérer le texte de la tâche
        const $text = $li.querySelector('.todo-text');

        // Ajouter les données de la tâche au tableau
        data.push({
            id: $li.dataset.id,
            text: $text.textContent,
            completed: $checkbox.checked
        });
    }

    // Créer un blob (fichier) JSON avec les données
    const file = new Blob([JSON.stringify(data)], {type: 'application/json'});
    // Créer une URL pour le fichier
    const url = URL.createObjectURL(file);
    // Créer un lien téléchargement
    const a = document.createElement('a');
    // Définir l'URL du lien
    a.href = url;
    // Définir le nom du fichier téléchargé
    a.download = 'todo-list.json';
    // Cliquer sur le lien pour démarrer le téléchargement
    a.click();
    // Libérer la mémoire de l'URL créée
    URL.revokeObjectURL(url);
});

// Event listener pour le bouton d'ajout de tâche
$addBtn.addEventListener('click', () => {
    // Récupérer et nettoyer la saisie utilisateur
    const text = $input.value.trim();
    // Vérifier que le texte n'est pas vide
    if (text) {
        // Créer une nouvelle tâche avec un ID unique, le texte et marquée comme non complétée
        createTodoItem($ul, $count, {id: Date.now(), text, completed: false});
        // Vider le champ de saisie
        $input.value = '';
    }
});
