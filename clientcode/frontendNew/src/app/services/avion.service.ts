import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Avion } from '../models/avion';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class AvionService {
  // URL_API = 'https://localhost:3100/api/avion'
  // URL_APIRE = 'https://localhost:3100/api/reservas'

  URL_API = 'https://172.20.42.14:3100/api/avion'
  URL_APIRE = 'https://172.20.42.14:3100/api/reservas'

  aviones: Avion[];
  selectedAvion: Avion;

  reservas: Reserva[];
  selectedReserva: Reserva;

  constructor(private http:HttpClient) {

    this.aviones = [];
    this.selectedAvion = {
      asiento: "",
      destino:"",
      _id: "",
      fechaIni: new Date().toLocaleDateString(),
      fechaFin: new Date().toLocaleDateString(),
      disponible: true,
      precio: 0
    };

    this.selectedReserva = {
      emailUser: "",
      modeloCoche:"",
      matricula:"",
      habitacionHotel:"",
      nombreHotel:"",
      _id: "",
      asientoAvion: "",
      desAvi:""
    };
  }

  getAviones(){
    return this.http.get<Avion[]>(this.URL_API);
  }

  getAvion(avion: Avion){
    return this.http.get<Avion>(`${this.URL_API}/${avion._id}`);
  }

  createAvion(avion: Avion){
    return this.http.post(this.URL_API, avion, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }


  editAvion(avion: Avion){
    return this.http.put(`${this.URL_API}/${avion._id}`, avion, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  reservado(avion: Avion){
    avion.disponible = false;
    return this.http.put(`${this.URL_API}/${avion._id}`, avion, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  desReservado(avion: Avion){
    avion.disponible = true;
    return this.http.put(`${this.URL_API}/${avion._id}`, avion, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  MakeReserva(avion: Avion){
    this.selectedReserva.emailUser = localStorage.getItem('email');
    this.selectedReserva.asientoAvion= avion.asiento;
    this.selectedReserva.desAvi= avion.destino;
    return this.http.post(this.URL_APIRE, this.selectedReserva, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') + "")})
  }

  // deleteAvion(_id:string){
  //   return this.http.delete(`${this.URL_API}/${_id}`, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  // }
}
