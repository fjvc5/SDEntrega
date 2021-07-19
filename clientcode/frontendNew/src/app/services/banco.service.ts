import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Banco } from '../models/banco';
// import { Reserva } from '../models/reserva';

@Injectable({
  providedIn: 'root'
})
export class BancoService {


  // URL_APIBA = 'https://localhost:3100/api/cuenta'
  URL_APIBA = 'https://172.20.42.14:3100/api/cuenta'

  bancos: Banco[];
  selectedBanco: Banco;



  constructor(private http:HttpClient) { 

    this.bancos = [];
    this.selectedBanco = {
      _id: "",
      nombreBanco: "",
      emailUser: "",
      numTarjeta: "",
      saldo: 0
    };
  }

  getBancos(){
    return this.http.get<Banco[]>(this.URL_APIBA);
  }

  createBanco(banco: Banco){
    return this.http.post(this.URL_APIBA, banco, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }

  editBanco(banco: Banco){
    return this.http.put(`${this.URL_APIBA}/pago/${banco._id}`, banco, {headers: new HttpHeaders().set('Authorization', localStorage.getItem('token')+ "")});
  }

 
  
}
