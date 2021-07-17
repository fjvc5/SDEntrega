import { Component, OnInit } from '@angular/core';
import { ReservaService } from 'src/app/services/reserva.service';
import { Reserva } from 'src/app/models/reserva';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BancoService } from 'src/app/services/banco.service';
import { CocheService } from 'src/app/services/coche.service';
import { AvionService } from 'src/app/services/avion.service';
import { HotelService } from 'src/app/services/hotel.service';
import { Banco } from 'src/app/models/banco';
import { isInteger } from '@ng-bootstrap/ng-bootstrap/util/util';

@Component({
  selector: 'app-mis-reservas',
  templateUrl: './mis-reservas.component.html',
  styleUrls: ['./mis-reservas.component.css']
})
export class MisReservasComponent implements OnInit {

  constructor(public reservaService: ReservaService, public route: Router, public bancoService: BancoService, public cocheService: CocheService, public avionService: AvionService, public hotelService: HotelService) { }

  banco: Banco;
  

  ngOnInit(): void {
    this.misReservas();
    this.getCoches();
    this.getAviones();
    this.getHoteles();
    this.getBancos();
  
  }

  misReservas(){

    this.reservaService.getReservas().subscribe(
      res => {
       
          for(var i=0; i<res.length;i++){
          if(res[i].emailUser == localStorage.getItem('email')){
            
            this.reservaService.reservas.push(res[i])

          }
        }
      },
      err=>console.error(err)
    )
    
  
  }


  BorraReserva(reserva: Reserva){

    var total = 0;

    for(var i=0; i<this.bancoService.bancos.length; i++){
      if(this.bancoService.bancos[i].emailUser == localStorage.getItem('email')){
        this.banco = this.bancoService.bancos[i];
      }
    }

   

    for (var i = 0; i < this.cocheService.coches.length; i++) {
      if(this.cocheService.coches[i].matricula == reserva.matricula && this.cocheService.coches[i].modelo == reserva.modeloCoche){

        total = total + this.cocheService.coches[i].precio;

        this.cocheService.desReservado(this.cocheService.coches[i]).subscribe(res=>res, err=>err);

      }
    }

    for(var i=0; i<this.avionService.aviones.length; i++){
      if(this.avionService.aviones[i].asiento == reserva.asientoAvion && this.avionService.aviones[i].destino == reserva.desAvi){
        total = total + this.avionService.aviones[i].precio;
        this.avionService.desReservado(this.avionService.aviones[i]).subscribe(res=>res, err=>err)
      }
    }

    for(var i=0; i<this.hotelService.hoteles.length; i++){
      if(this.hotelService.hoteles[i].numHabitacion == reserva.habitacionHotel && this.hotelService.hoteles[i].nombre == reserva.nombreHotel){
        total = total + this.hotelService.hoteles[i].precio;
        this.hotelService.desReservado(this.hotelService.hoteles[i]).subscribe(res=>res, err=>err)
      }
    }


  
    this.banco.saldo= Number(this.banco.saldo) + Number(total);


    
    this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);


    this.reservaService.deleteReserva(reserva).subscribe(
      res=>res,
      err=>err
    );

    alert("Reserva Eliminada")
    this.route.navigate(['/']);
  }

  getCoches(){
    this.cocheService.getCoches().subscribe(
      res => {
        this.cocheService.coches = res;
      },
      err=>console.error(err)
    )

  }

  getAviones() {
    this.avionService.getAviones().subscribe(
      res => {
        // this.numAviones = res.length;
        this.avionService.aviones = res;
      },
      err => console.error(err)
    )

  }

  getHoteles(){
    this.hotelService.getHoteles().subscribe(
      res => {
        
        this.hotelService.hoteles = res;
      },
      err=>console.error(err)
    )

  }

  getBancos(){
    this.bancoService.getBancos().subscribe(
      res => {
        this.bancoService.bancos = res;
      },
      err=>console.error(err)
    )

  }


}
