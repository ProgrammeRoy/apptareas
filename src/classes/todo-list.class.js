import { Todo } from './todo.class.js'

export class TodoList {
    constructor() {
        // this.todos = [];
        this.cargarLocalStorage();
    }

    nuevoTodo(todo) {
        this.todos.push(todo);
        this.guardarLocalStorage();
    }

    eliminarTodo(id) {
        this.todos = this.todos.filter(todo => todo.id != id)
        this.guardarLocalStorage();
    }

    marcarCompletado(id) {
        for (const todo of this.todos) {
            if (todo.id == id) {
                todo.completado = !todo.completado;
                this.guardarLocalStorage();
                break;
            }
        }
    }

    eliminarCompletados() {
        this.todos = this.todos.filter(todo => !todo.completado);
        this.guardarLocalStorage();
        this.cargarLocalStorage();
    }


    //Cuando este trabajando con un Dominio, se tiene que configurar el Local..
    guardarLocalStorage() {
        //this.todos resulta un objeto, por lo que se debe convertir a JSON para leer sus elementos
        localStorage.setItem('todo', JSON.stringify(this.todos));
    }
    cargarLocalStorage() {
        this.todos = localStorage.getItem('todo') ?
            JSON.parse(localStorage.getItem('todo')) : [];

        this.todos = this.todos.map(obj => Todo.fromJson(obj));
    }

}