export class Todo{
    constructor(tarea){
        this.tarea = tarea;
        this.id = new Date().getTime(); //Unique code ex. 1241234141
        this.completado = false;
        this.creado = new Date();
    }
}