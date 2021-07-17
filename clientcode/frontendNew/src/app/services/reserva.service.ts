import { Injectable } from '@angular/core';
import { ReservaComponent } from '../components/reserva/reserva.component';
import { Reserva } from '../models/reserva';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coche } from 'src/app/models/coche';
import { Avion } from 'src/app/models/avion';
import { Hotel } from 'src/app/models/hotel';

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  URL_APIRE = 'https://localhost:3100/api/reservas'

  // URL_APIRE = 'https://172.20.42.17:3100/api/reservas'

  reservas: Reserva[];
  selectedReserva: Reserva;

  constructor(private http: HttpClient) { 

    this.reservas = [];

    this.selectedReserva = {
      emailUser: "",
      modeloCoche:"",
      matricula:"",
      habitacionHotel:"",
      nombreHotel:"",
      _id: "",
      asientoAvion: "",
      desAvi: ""
    };


  }

  getReservas(){
    return this.http.get<Reserva[]>(this.URL_APIRE);
  }

  createReserva(reserva: Reserva){
    //console.log(reserva)
    
    return this.http.post(this.URL_APIRE, reserva, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }


  deleteReserva(reserva: Reserva){
   
    return this.http.delete(`${this.URL_APIRE}/${reserva._id}`, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }


}
