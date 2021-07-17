import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Hotel } from '../models/hotel';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  URL_API = 'https://localhost:3100/api/hotel'
  URL_APIRE = 'https://localhost:3100/api/reservas'

//  URL_API = 'https://172.20.42.17:3100/api/hotel'
//   URL_APIRE = 'https://172.20.42.17:3100/api/reservas'

  hoteles: Hotel[];
  selectedHotel: Hotel;

  reservas: Reserva[];
  selectedReserva: Reserva;

  constructor(private http:HttpClient) {

    this.hoteles = [];
    this.selectedHotel = {
      nombre: "",
      direccion:"",
      _id: "",
      fechaIni: new Date().toLocaleDateString(),
      fechaFin: new Date().toLocaleDateString(),
      disponible: true,
      precio: 0,
      numHabitacion: "",
      categoria: "",
      destino: ""
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
  

  getHoteles(){
    return this.http.get<Hotel[]>(this.URL_API);
  }

  getHotel(hotel: Hotel){
    return this.http.get<Hotel>(`${this.URL_API}/${hotel._id}`);
  }

  createHotel(hotel: Hotel){
    return this.http.post(this.URL_API, hotel, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') + "")});
  }


  editHotel(hotel: Hotel){
    return this.http.put(`${this.URL_API}/${hotel._id}`, hotel, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  reservado(hotel: Hotel){
    hotel.disponible = false;
    return this.http.put(`${this.URL_API}/${hotel._id}`, hotel, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  desReservado(hotel: Hotel){
    hotel.disponible = true;
    return this.http.put(`${this.URL_API}/${hotel._id}`, hotel, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  MakeReserva(hotel: Hotel){
    
    this.selectedReserva.emailUser = localStorage.getItem('email');
    this.selectedReserva.habitacionHotel= hotel.numHabitacion;
    this.selectedReserva.nombreHotel= hotel.nombre;
    return this.http.post(this.URL_APIRE, this.selectedReserva, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') + "")})
  }


  deleteHotel(_id:string){
    return this.http.delete(`${this.URL_API}/${_id}`, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }
}
