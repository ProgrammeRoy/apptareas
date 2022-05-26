import { Todo } from '../classes';
import { todoList } from '../index';

//Referencias en el HTML
const divTodoList = document.querySelector('.todo-list');
const txtInput = document.querySelector('.new-todo');
const btnBorrar = document.querySelector('.clear-completed');
const ulFiltros = document.querySelector('.filters');
const anchorFiltros = document.querySelectorAll('.filtro')
const numeroPendientes = document.querySelector('.todo-count-number')


//Crea la lista de tareas en HTML
export const crearTodoHtml = (todo) => {
    const htmlTodo = `
        <li class="${todo.completado? 'completed':''}" data-id="${todo.id}">
            <div class="view">
                <input class="toggle" type="checkbox" ${todo.completado? 'checked':''}>
                <label>${todo.tarea}</label>
                <button class="destroy"></button>
            </div>
            <input class="edit" value="Create a TodoMVC template">
        </li>
                    `

    //Create Div just to make it easy to add the html
    const div = document.createElement('div');
    div.innerHTML = htmlTodo;

    divTodoList.append(div.firstElementChild);
    return div.firstElementChild;

}

//Eventos
//Identifica el valor del input y la tecla presionada
txtInput.addEventListener('keyup', (event) => {
    //13 corresponde al Enter, el value es el valor ingresado en el input
    if (event.keyCode === 13 && txtInput.value.length > 0) {
        console.log(txtInput.value);
        const nuevoTodo = new Todo(txtInput.value);

        //Explora la lista de tareas y agrega el nuevo
        todoList.nuevoTodo(nuevoTodo)

        // console.log(todoList);

        //Ejecuta la creacion del HTML
        crearTodoHtml(nuevoTodo);

        //Borrar lo q se escribe en el input
        txtInput.value = '';
    }
});

divTodoList.addEventListener('click', (event) => {

    const nombreElemento = event.target.localName; //input, label, button
    const todoElemento = event.target.parentElement.parentElement; //Obtiene el padre de los elementos, es decir el li.
    const todoId = todoElemento.getAttribute('data-id'); //Obtiene el Id del item

    if (nombreElemento.includes('input')) {
        todoList.marcarCompletado(todoId);
        todoElemento.classList.toggle('completed'); //Pinta el item como raya en el centro
    } else if (nombreElemento.includes('button')) {
        todoList.eliminarTodo(todoId); //Elimina la tarea en el array
        divTodoList.removeChild(todoElemento); //Lo elimina en el Html 
    }

    console.log(todoList);
})

btnBorrar.addEventListener('click', () => {
    todoList.eliminarCompletados();
    for (let i = divTodoList.children.length - 1; i >= 0; i--) {
        const elemento = divTodoList.children[i];
        if (elemento.classList.contains('completed')) {
            divTodoList.removeChild(elemento);
        }
    }
});

ulFiltros.addEventListener('click', (event) => {
    const filtro = event.target.text
    if (!filtro) { return; }

    anchorFiltros.forEach(elem => elem.classList.remove('selected'));
    event.target.classList.add('selected');

    for (const elemento of divTodoList.children) {
        elemento.classList.remove('hidden');
        const completado = elemento.classList.contains('completed');

        switch (filtro) {
            case 'Pendientes':
                if (completado) {
                    elemento.classList.add('hidden');
                }
                break;
            case 'Completados':
                if (!completado) {
                    elemento.classList.add('hidden');
                }
                break;
        }
    }
});