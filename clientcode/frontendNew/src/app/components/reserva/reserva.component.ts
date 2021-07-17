import { Component, OnInit } from '@angular/core';
import { Reserva } from 'src/app/models/reserva';
import { ReservaService } from 'src/app/services/reserva.service';
import { NgForm } from '@angular/forms';
import { CocheService } from 'src/app/services/coche.service';
import { AvionService } from 'src/app/services/avion.service';
import { HotelService } from 'src/app/services/hotel.service';
import { BancoService } from 'src/app/services/banco.service';

import { Banco } from 'src/app/models/banco';

import { Avion } from 'src/app/models/avion';
import { Coche } from 'src/app/models/coche';
import { Hotel } from 'src/app/models/hotel';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {


  User = localStorage.getItem('email');

  constructor(public bancoService: BancoService, public reservaService: ReservaService, public route: Router, public cocheService: CocheService, public avionService: AvionService, public hotelService: HotelService) { }

  saldoReserva = 0;
  saldoCliente = 0;
  banco: Banco;
  cocheR: Coche;
  avioneR: Avion;
  hoteleR: Hotel;
  boolCoche = false;
  boolAvion = false;
  boolHotel = false;

  // modeloForm = "";
  // asientoForm = "";
  // habitacionForm = "";

  ngOnInit(): void {
    //this.getReservas();

    this.getCoches();
    this.getAviones();
    this.getHoteles();
    this.getBancos();
    // console.log(this.getAviones())
    //console.log(this.getBancos())


  }

  getReservas() {
    this.reservaService.getReservas().subscribe(
      res => {
        // console.log(res.length);
        for (var i = 0; i < res.length; i++) {
          if (res[i].emailUser == localStorage.getItem('email')) {
            //console.log(res[i]);
            //this.reservaService.reservas.push(res[i])
          }
        }

      },
      err => console.error(err)
    )

  }

  // addReserva(form: NgForm){


  //   form.value.emailUser = localStorage.getItem('email');

  //   var reserva = false;
  //   var pagar = false;



  //   // //Primero ponemos los disponibles a false "Reservamos"
  //   // for(var i=0; i<this.cocheService.coches.length;i++){

  //   //   //Poner esto en ifs distintos
  //   //   if(this.cocheService.coches[i].modelo == form.value.modeloCoche && this.cocheService.coches[i].matricula == form.value.matricula && this.cocheService.coches[i].disponible == true){ //Pondremos el disponible == true por si abrimos más de una página a la vez
  //   //       this.saldoReserva= this.saldoReserva + this.cocheService.coches[i].precio;
  //   //       this.cocheService.coches[i].disponible = false;
  //   //       this.cocheR = this.cocheService.coches[i];
  //   //       this.boolCoche = true;
  //   //       this.cocheService.reservado(this.cocheService.coches[i]).subscribe(
  //   //         res=>res,
  //   //         err=>err
  //   //       );

  //   //   }
  //   // }

  //   // //console.log(this.cocheR)


  //   // for(var i=0; i<this.avionService.aviones.length;i++){
  //   //   //Poner esto en ifs distintos
  //   //   if(this.avionService.aviones[i].asiento == form.value.asientoAvion && this.avionService.aviones[i].destino == form.value.desAvi && this.avionService.aviones[i].disponible == true){
  //   //     this.saldoReserva = this.saldoReserva + this.avionService.aviones[i].precio;
  //   //      this.cocheService.coches[i].disponible = false;
  //   //      this.avioneR = this.avionService.aviones[i];
  //   //      this.boolAvion = true;
  //   //      this.avionService.reservado(this.avionService.aviones[i]).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //      );
  //   //    }
  //   // }


  //   // for(var i=0; i<this.hotelService.hoteles.length;i++){

  //   //   //Poner esto en ifs distintos
  //   //   if(this.hotelService.hoteles[i].numHabitacion == form.value.habitacionHotel && this.hotelService.hoteles[i].nombre == form.value.nombreHotel && this.hotelService.hoteles[i].disponible == true){
  //   //     this.saldoReserva = this.saldoReserva + this.hotelService.hoteles[i].precio;
  //   //     this.hotelService.hoteles[i].disponible = false;
  //   //     this.hoteleR = this.hotelService.hoteles[i];
  //   //     this.boolHotel = true;
  //   //     this.hotelService.reservado(this.hotelService.hoteles[i]).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );
  //   //   }
  //   // }

  //   // //Aquí ya ha puesto los servicios reservados a false
  //   // //Sacamos que usuario está reservando y si tiene el saldo necesario se reservará
  //   // if(this.cocheR !== undefined || this.avioneR !== undefined  || this.hoteleR !== undefined ){
  //   //   for(var i=0; i<this.bancoService.bancos.length && reserva == false;i++){
  //   //     if(this.bancoService.bancos[i].emailUser == localStorage.getItem('email')){ //Encuentra al usuario
  //   //       this.banco = this.bancoService.bancos[i];
  //   //       reserva = true;
  //   //     }
  //   //     else{
  //   //       reserva = false;
  //   //       // console.log("Cuenta del Usuario no encontrada")
  //   //     }
  //   //   }




  //   //   //Entra en este if, por lo que lo deja en false y no lo vuelve a poner a true en caso de fallar en la escritura del formulario

  //   //   if(reserva == true && this.banco.saldo >= this.saldoReserva){ //El saldo es suficiente para pagar la reserva

  //   //     this.saldoCliente = this.banco.saldo - this.saldoReserva;

  //   //     pagar = true;

  //   //   }
  //   //   else{ //No tiene el saldo suficiente por lo que cancelamos la reserva

  //   //     if(reserva == true){
  //   //       alert("Lo siento, no tienes saldo suficiente")
  //   //     }
  //   //     else{
  //   //       alert("Registrate Primero")
  //   //     }

  //   //     //Pone a true de nuevo los servicios

  //   //     this.cocheService.desReservado(this.cocheR).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );

  //   //     this.avionService.desReservado(this.avioneR).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );

  //   //     this.hotelService.desReservado(this.hoteleR).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );


  //   //     this.route.navigate(['/'])
  //   //   }

  //   //   if(reserva == false){
  //   //     this.route.navigate(['/banco'])
  //   //   }   


  //   //   //Si no encuentra el coche/avion/hotel igualmente lo reserva, eso hay que revisarlo
  //   //   if(this.boolCoche == false && (form.value.modeloCoche != "" || form.value.matricula != "") ){
  //   //     pagar = false;
  //   //     alert("Reserva no realizada, lo siento algún dato del coche es erróneo")

  //   //     this.avionService.desReservado(this.avioneR).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );

  //   //     this.hotelService.desReservado(this.hoteleR).subscribe(
  //   //       res=>res,
  //   //       err=>err
  //   //     );

  //   //   }else{
  //   //       if(this.boolAvion == false && (form.value.asientoAvion != "" || form.value.desAvi != "")){
  //   //         pagar = false;
  //   //         alert("Reserva no realizada, lo siento algún dato del avión es erróneo")

  //   //         this.cocheService.desReservado(this.cocheR).subscribe(
  //   //           res=>res,
  //   //           err=>err
  //   //         );

  //   //         this.hotelService.desReservado(this.hoteleR).subscribe(
  //   //           res=>res,
  //   //           err=>err
  //   //         );

  //   //       }
  //   //       else{
  //   //         if(this.boolHotel == false && (form.value.nombreHotel != "" || form.value.habitacionHotel != "")){
  //   //           pagar = false;
  //   //           alert("Reserva no realizada, lo siento algún dato del hotel es erróneo")

  //   //           this.cocheService.desReservado(this.cocheR).subscribe(
  //   //             res=>res,
  //   //             err=>err
  //   //           );

  //   //           this.avionService.desReservado(this.avioneR).subscribe(
  //   //             res=>res,
  //   //             err=>err
  //   //           );
  //   //         }
  //   //       }

  //   //   }



  //   //   if(pagar == true){

  //   //     this.banco.saldo = this.saldoCliente;


  //   //     this.bancoService.editBanco(this.banco).subscribe( //Me pone a NULL los atributos que no son salario
  //   //       res=>res,
  //   //       err=>err
  //   //     )


  //   //     this.reservaService.createReserva(form.value).subscribe( //Mete la reserva en la BBDD
  //   //       res => {
  //   //         this.getReservas();
  //   //         this.bancoService.getBancos().subscribe(
  //   //           res=>res,
  //   //           err=>err
  //   //         );

  //   //         alert("Reserva realizada con éxito");
  //   //         form.reset();


  //   //         this.route.navigate(['/'])
  //   //       },  
  //   //       err=>console.error(err)

  //   //     )
  //   //   }

  //   // }
  //   // else{
  //   //   alert("Lo siento no has introducido ningún servicio")
  //   // }

  // }


  addReserva(form: NgForm) {

    var puedeReservar = false;
    var tieneBanco = false;
    var servicioYaReservado = false;

    form.value.emailUser = localStorage.getItem('email');

    //Sacamos el coche del formulario
    for (var i = 0; i < this.cocheService.coches.length; i++) {
      if (this.cocheService.coches[i].modelo == form.value.modeloCoche && this.cocheService.coches[i].matricula == form.value.matricula) {

        this.cocheR = this.cocheService.coches[i];

      }
    }

    //Sacamos el avion del formulario
    for (var i = 0; i < this.avionService.aviones.length; i++) {
      if (this.avionService.aviones[i].asiento == form.value.asientoAvion && this.avionService.aviones[i].destino == form.value.desAvi) {
        this.avioneR = this.avionService.aviones[i];
      }
    }

    //Sacamos el hotel del formulario
    for (var i = 0; i < this.hotelService.hoteles.length; i++) {
      if (this.hotelService.hoteles[i].numHabitacion == form.value.habitacionHotel && this.hotelService.hoteles[i].nombre == form.value.nombreHotel) {

        this.hoteleR = this.hotelService.hoteles[i];

      }
    }


    for(var i=0; i<this.bancoService.bancos.length && tieneBanco == false;i++){
      if(this.bancoService.bancos[i].emailUser == localStorage.getItem('email')){ //Encuentra al usuario
        this.banco = this.bancoService.bancos[i];
        tieneBanco = true;
      }
    }
    
    if(tieneBanco == false){
      this.route.navigate(['/banco'])
      alert("Tienes que registrar tu cuenta")
    }


    if(this.cocheR === undefined && this.avioneR === undefined && this.hoteleR === undefined){
      alert("Por favor revise bien los datos rellenados")
    }

    if (this.cocheR !== undefined && tieneBanco == true) {
      this.cocheService.getCoche(this.cocheR).subscribe( //Sacamos el coche de la BD
        res => {
          if (res.disponible == true) {
            this.cocheService.reservado(res).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
            //this.saldoReserva = this.saldoReserva + res.precio;  //Sacamos el precio del coche para cobrarlo luego

            this.banco.saldo = this.banco.saldo - res.precio;

            if(this.banco.saldo >= 0){
              this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
              puedeReservar=true;
            }
            else{
              alert("Saldo insuficiente para el coche");
              this.cocheService.desReservado(res).subscribe(res => res, err => err); //Lo ponemos a true pues no tenemos el dinero suficiente
              this.route.navigate(['/']);
            }
          }
          else {
            this.cocheService.reservado(res).subscribe(res => res, err => err);
            alert("El Coche ya está reservado");
            servicioYaReservado = true;
            this.route.navigate(['/']);
          }

          if (this.avioneR !== undefined && servicioYaReservado == false ) {

            this.avionService.getAvion(this.avioneR).subscribe(
              resp => {

                if (resp.disponible == true) {
                  this.avionService.reservado(resp).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
                  //this.saldoReserva = this.saldoReserva + resp.precio;  //Sacamos el precio del avion para cobrarlo luego


                  this.banco.saldo = this.banco.saldo - resp.precio;

                  if(this.banco.saldo >= 0){
                    this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                    puedeReservar=true;
                  }
                  else{
                    alert("Saldo insuficiente para el avion");
                    this.avionService.desReservado(resp).subscribe(res => res, err => err); //Lo ponemos a true pues no tenemos el dinero suficiente
                    this.cocheService.desReservado(res).subscribe(res => res, err => err); //Quitamos la reserva del coche, pues ha dado un error
                    
                    this.banco.saldo = this.banco.saldo + resp.precio + res.precio; //Devolvemos el dinero de lo cobrado
                    
                    
                    this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                    puedeReservar=false; //Lo ponemos a false para que no reserve

                    this.route.navigate(['/']);
                  }
  
                }
                else {
                  this.avionService.reservado(resp).subscribe(res => res, err => err);
                  this.cocheService.desReservado(res).subscribe(res => res, err => err); //Quitamos la reserva del coche, pues ha dado un error
                  
                  this.banco.saldo = this.banco.saldo + res.precio;
                  this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);

                  alert("El Avion ya está reservado");
                  servicioYaReservado = true;
                  this.route.navigate(['/']);
                }

                if (this.hoteleR !== undefined && servicioYaReservado == false) {
                  this.hotelService.getHotel(this.hoteleR).subscribe(
                    respu => {

                      if (respu.disponible == true) {
                        this.hotelService.reservado(respu).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
                        //this.saldoReserva = this.saldoReserva + respu.precio;  //Sacamos el precio del Hotel para cobrarlo luego

                
                        this.banco.saldo = this.banco.saldo - respu.precio;

                        if(this.banco.saldo >= 0){
                          this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                          puedeReservar=true;
                        }
                        else{
                          alert("Saldo insuficiente para el hotel");
                          this.hotelService.desReservado(respu).subscribe(res => res, err => err);//Lo ponemos a true pues no tenemos el dinero suficiente
                          this.avionService.desReservado(resp).subscribe(res => res, err => err); //Lo ponemos a true pues no tenemos el dinero suficiente
                          this.cocheService.desReservado(res).subscribe(res => res, err => err); //Quitamos la reserva del coche, pues ha dado un error

                          this.banco.saldo = this.banco.saldo + resp.precio + res.precio + respu.precio; //Devolvemos el dinero de lo cobrado

                          this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                          puedeReservar=false; //Lo ponemos a false para que no reserve

                          this.route.navigate(['/']);
                        }

                        if(puedeReservar == true){
                          this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                          alert("Reserva hecha");
                          this.route.navigate(['/']);
                        }
                      }
                      else {
                        this.hotelService.reservado(respu).subscribe(res => res, err => err);
                        this.cocheService.desReservado(res).subscribe(res => res, err => err);//Quitamos la reserva del coche, pues ha dado un error
                        this.avionService.desReservado(resp).subscribe(res => res, err => err);//Quitamos la reserva del avión, pues ha dado un error
                        this.banco.saldo = this.banco.saldo + res.precio + resp.precio;
                        this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                        alert("El Hotel ya está reservado")
                        servicioYaReservado = true;
                        this.route.navigate(['/']);
                      }
                    },
                  err=>err)
                }
                else{
                  if(puedeReservar == true && servicioYaReservado == false){
                    this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                    alert("Reserva hecha");
                    this.route.navigate(['/']);
                  }
                }
              },
            err=>err)
          }
          else{
            if (this.hoteleR !== undefined && servicioYaReservado == false) {
              this.hotelService.getHotel(this.hoteleR).subscribe(
                respu => {

                  if (respu.disponible == true) {
                    this.hotelService.reservado(respu).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
                    //this.saldoReserva = this.saldoReserva + respu.precio;  //Sacamos el precio del Hotel para cobrarlo luego

                    this.banco.saldo = this.banco.saldo - respu.precio;

                    if(this.banco.saldo >= 0){
                      this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                      puedeReservar=true;
                    }
                    else{
                      alert("Saldo insuficiente para el hotel");
                      this.hotelService.desReservado(respu).subscribe(res => res, err => err);//Lo ponemos a true pues no tenemos el dinero suficiente
                      this.cocheService.desReservado(res).subscribe(res => res, err => err); //Quitamos la reserva del coche, pues ha dado un error

                      this.banco.saldo = this.banco.saldo + res.precio + respu.precio; //Devolvemos el dinero de lo cobrado

                      this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                      puedeReservar=false; //Lo ponemos a false para que no reserve
                      this.route.navigate(['/']);
                    }

                    if(puedeReservar == true){
                      this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                      alert("Reserva hecha");
                      this.route.navigate(['/']);
                    }

                  }
                  else {
                    this.hotelService.reservado(respu).subscribe(res => res, err => err);
                    this.cocheService.desReservado(res).subscribe(res => res, err => err);//Quitamos la reserva del coche, pues ha dado un error
                    alert("El Hotel ya está reservado")
                    this.banco.saldo = this.banco.saldo + res.precio;
                    this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                    servicioYaReservado = true;
                    this.route.navigate(['/']);
                  }
                },
              err=>err)
            }
            else{
              if(puedeReservar == true && servicioYaReservado == false){
                this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                alert("Reserva hecha");
                this.route.navigate(['/']);
              }
            }
          }
        },
      err=>err)
    }
    else{
      if (this.avioneR !== undefined && tieneBanco == true)  {

        this.avionService.getAvion(this.avioneR).subscribe(
          resp => {

            if (resp.disponible == true) {
              this.avionService.reservado(resp).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
              //this.saldoReserva = this.saldoReserva + resp.precio;  //Sacamos el precio del avion para cobrarlo luego

              this.banco.saldo = this.banco.saldo - resp.precio;

              if(this.banco.saldo >= 0){
                this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                puedeReservar=true;
              }
              else{
                alert("Saldo insuficiente para el avion");
                this.avionService.desReservado(resp).subscribe(res => res, err => err); //Lo ponemos a true pues no tenemos el dinero suficiente

                this.route.navigate(['/']);
              }

            }
            else {
              this.avionService.reservado(resp).subscribe(res => res, err => err);
              
              alert("El Avion ya está reservado")
              servicioYaReservado = true;
              this.route.navigate(['/']);
            }


            if (this.hoteleR !== undefined && servicioYaReservado == false) {
              this.hotelService.getHotel(this.hoteleR).subscribe(
                respu => {

                  if (respu.disponible == true) {
                    this.hotelService.reservado(respu).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
                    //this.saldoReserva = this.saldoReserva + respu.precio;  //Sacamos el precio del Hotel para cobrarlo luego

                    this.banco.saldo = this.banco.saldo - respu.precio;

                    if(this.banco.saldo >= 0){
                      this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                      puedeReservar=true;
                    }
                    else{
                      alert("Saldo insuficiente para el hotel");
                      this.hotelService.desReservado(respu).subscribe(res => res, err => err);//Lo ponemos a true pues no tenemos el dinero suficiente
                      this.avionService.desReservado(resp).subscribe(res => res, err => err); //Lo ponemos a true pues no tenemos el dinero suficiente

                      this.banco.saldo = this.banco.saldo + resp.precio + respu.precio; //Devolvemos el dinero de lo cobrado

                      this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                      puedeReservar=false; //Lo ponemos a false para que no reserve
                      this.route.navigate(['/']);
                    }

                    if(puedeReservar == true){
                      this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                      alert("Reserva hecha");
                      this.route.navigate(['/']);
                    }
                  }
                  else {
                    this.hotelService.reservado(respu).subscribe(res => res, err => err);
                    
                    this.avionService.desReservado(resp).subscribe(res => res, err => err);//Quitamos la reserva del avión, pues ha dado un error
                    this.banco.saldo = this.banco.saldo + resp.precio;
                    this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                    alert("El Hotel ya está reservado")
                    servicioYaReservado = true;
                    
                    this.route.navigate(['/']);
                  }
                },
              err=>err)
            }
            else{
              if(puedeReservar == true && servicioYaReservado == false){
                this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                alert("Reserva hecha");
                this.route.navigate(['/']);
              }
            }
          },
        err=>err)
      }
      else{
        if (this.hoteleR !== undefined && tieneBanco == true) {
          this.hotelService.getHotel(this.hoteleR).subscribe(
            respu => {

              if (respu.disponible == true) {
                this.hotelService.reservado(respu).subscribe(res => res, err => err); //Lo ponemos a false lo primero Y esperamos confirmación. Aquí otra persona ya no podrá reservarlo
                this.saldoReserva = this.saldoReserva + respu.precio;  //Sacamos el precio del Hotel para cobrarlo luego

                this.banco.saldo = this.banco.saldo - this.saldoReserva;

                if(this.banco.saldo >= 0){
                  this.bancoService.editBanco(this.banco).subscribe(res=>res, err=>err);
                  puedeReservar=true;
                }
                else{
                  alert("Saldo insuficiente para el hotel");
                  this.hotelService.desReservado(respu).subscribe(res => res, err => err);//Lo ponemos a true pues no tenemos el dinero suficiente

                  this.route.navigate(['/']);
                }

                if(puedeReservar == true){
                  this.reservaService.createReserva(form.value).subscribe(res=>res, err=>err)
                  alert("Reserva hecha");
                  this.route.navigate(['/']);
                }
              }
              else {
                this.hotelService.reservado(respu).subscribe(res => res, err => err);
                
                alert("El Hotel ya está reservado")
                servicioYaReservado = true;
                this.route.navigate(['/']);
              }
            },
          err=>err)
        }
      }
    }
  }

  misReservas() {

    this.reservaService.getReservas().subscribe(
      res => {

        for (var i = 0; i < res.length; i++) {
          if (res[i].emailUser == localStorage.getItem('email')) {

            this.reservaService.reservas.push(res[i])
            this.route.navigate(['/misReservas'])

          }
        }
      },
      err => console.error(err)
    )


  }


  getCoches() {

    //var cont = 0;

    this.cocheService.getCoches().subscribe(
      res => {
        //console.log(this.cocheService.coches = res);
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true) {

            this.cocheService.coches.push(res[i])

            // if(res[i].modelo == this.modeloForm){
            //   this.cochesR = res[i]
            // }
            // console.log(this.cochesR)
            //cont++;
          }
        }


      },
      err => console.error(err)
    )
  }

  getAviones() {
    //var cont = 0;

    this.avionService.getAviones().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true) {
            this.avionService.aviones.push(res[i])

            // if(res[i].asiento == this.asientoForm){
            //   this.avionesR = res[i]
            // }

            //cont++;
          }
        }
      },
      err => console.error(err)
    )

  }

  getHoteles() {
    //var cont = 0;
    this.hotelService.getHoteles().subscribe(
      res => {
        for (var i = 0; i < res.length; i++) {
          if (res[i].disponible == true) {
            this.hotelService.hoteles.push(res[i])
            // if(res[i].numHabitacion == this.habitacionForm){
            //   this.hotelesR = res[i]
            // }

            //cont++;
          }
        }

      },
      err => console.error(err)
    )

  }

  getBancos() {
    this.bancoService.getBancos().subscribe(
      res => {
        this.bancoService.bancos = res;
        // console.log(res)
      },
      err => console.error(err)
    )

  }

}
