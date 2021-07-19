import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Coche } from '../models/coche';
//import { User } from '../models/user';
import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class CocheService {
  // URL_API = 'https://localhost:3100/api/coche'
  // URL_APIRE = 'https://localhost:3100/api/reservas'

 URL_API = 'https://172.20.42.14:3100/api/coche'
  URL_APIRE = 'https://172.20.42.14:3100/api/reservas'
  coches: Coche[];
  selectedCoche: Coche;
  
  reservas: Reserva[];
  selectedReserva: Reserva;

  constructor(private http:HttpClient) {

    this.coches = [];
    this.selectedCoche = {
      modelo: "",
      matricula:"",
      destino:"",
      _id: "",
      fechaIni: new Date().toLocaleDateString(),
      fechaFin: new Date().toLocaleDateString(),
      disponible: false,
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

  getCoches(){
    return this.http.get<Coche[]>(this.URL_API);
  }

  getCoche(coche: Coche){
    return this.http.get<Coche>(`${this.URL_API}/${coche._id}`);
  }

  // getReservas(){
  //   return this.http.get<Reserva[]>(this.URL_APIRE);
  // }
  
  // createReserva(reserva: Reserva){
  //   return this.http.post(this.URL_APIRE, reserva/*, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")}*/);
  // }


  createCoche(coche: Coche){
    return this.http.post(this.URL_API, coche, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }


  editCoche(coche: Coche){
    return this.http.put(`${this.URL_API}/${coche._id}`, coche, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  reservado(coche: Coche){
    coche.disponible = false;
    
    return this.http.put(`${this.URL_API}/${coche._id}`, coche, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  desReservado(coche: Coche){
    coche.disponible = true;
    
    
    return this.http.put(`${this.URL_API}/${coche._id}`, coche, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  }

  MakeReserva(coche: Coche){
    
    // coche.disponible = false;
    // this.editCoche(coche);
    this.selectedReserva.emailUser = localStorage.getItem('email');
    this.selectedReserva.modeloCoche= coche.modelo;
    this.selectedReserva.matricula= coche.matricula;
    return this.http.post(this.URL_APIRE, this.selectedReserva, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') + "")})
  }



  // deleteCoche(_id:string){
  //   return this.http.delete(`${this.URL_API}/${_id}`, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")})
  // }
}
