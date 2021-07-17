export interface Hotel {
    _id: string,
    nombre: String,
    direccion: String,
    numHabitacion: String,
    categoria: String,
    destino: String,
    fechaIni: String, //Año/mes/dia
    fechaFin: String,
    disponible : Boolean,
    precio : number
};