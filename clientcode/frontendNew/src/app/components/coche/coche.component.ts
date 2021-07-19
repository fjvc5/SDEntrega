import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CocheService } from '../../services/coche.service';
import { Coche } from '../../models/coche';
import { NgForm } from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Reserva } from 'src/app/models/reserva';
import { Router } from '@angular/router';
import { Banco } from 'src/app/models/banco';
import {BancoService } from 'src/app/services/banco.service';

@Component({
  selector: 'app-coche',
  templateUrl: './coche.component.html',
  styleUrls: ['./coche.component.css']
  
})

export class CocheComponent implements OnInit {

  Admin = false;
  banco: Banco;


  constructor(public cocheService: CocheService, public userService: SignupService, public bancoService: BancoService, public route: Router) { }



  ngOnInit(): void {
    
    this.getCoches();
    this.getBancos();
    //this. getReservas();
    // this.MakeReserva();
    if(localStorage.getItem('email') == "Administrador@gmail.com"){
      this.Admin = true;
    }
  }

  resetForm(form: NgForm){
    form.reset();
  }

  getCoches(){
    this.cocheService.getCoches().subscribe(
      res => {
        this.cocheService.coches = res;
      },
      err=>console.error(err)
    )

  }

  // getReservas(){
  //   this.cocheService.getReservas().subscribe(
  //     (res:any) => {
  //       console.log(res);
  //       // this.cocheService.selectedReserva._id = res._id;
  //       // this.cocheService.selectedReserva.modeloCoche = res.modelo;
  //       // this.cocheService.selectedReserva.nombreUser = localStorage.getItem('email');
  //       // console.log(res)
  //     },
  //     err=>console.error(err)
  //   )

  // }


  addCoche(form: NgForm){
    
    if(form.value._id ){
      this.cocheService.editCoche(form.value).subscribe(
        res => {
          this.getCoches();
          
          //console.log(localStorage.getItem('token') + "");
          form.reset();
        },  
        err=>console.error(err)
      );
    }
    else{
      //if(this.Admin == true){
        this.cocheService.createCoche(form.value).subscribe(
          res => {
            this.getCoches();
            form.reset();
          },  
          err=>console.error(err)
    
        )
      //}
     
    }
    
  }

  // deleteCoche(_id:string){
  //   const res = confirm("¿Estas seguro que quieres borrarlo?");
  //   if(res){

  //     this.cocheService.deleteCoche(_id).subscribe(
  //       (res)=>{
  //         this.getCoches();
  //       },
  //       (err)=>console.error(err)
  //     );
  //   }
  // }

  editCoche(coche: Coche){
   
      this.cocheService.selectedCoche = coche; 
    
  }

  MakeReserva(coche: NgForm){
    
    const respuesta = confirm("¿Estas seguro que quieres reservarlo?");

    var cuentaBanco = false;
    var pagado = false;

   this.cocheService.getCoche(coche.value).subscribe(
     
      res => {
        if (res.disponible == true && respuesta == true) {

          this.cocheService.reservado(res).subscribe( //Pone a false el avión
            res => console.log(res),
            err => console.log(err)
          );

          for (var i = 0; i < this.bancoService.bancos.length; i++) {
            if (this.bancoService.bancos[i].emailUser == localStorage.getItem('email')) { //Encuentra al usuario en el banco
              this.banco = this.bancoService.bancos[i];
              cuentaBanco = true;
            }
          }

          if (cuentaBanco == true) { //Si tiene cuenta
            if ((this.banco.saldo - res.precio) >= 0) { //Si puede pagarlo
              this.banco.saldo = this.banco.saldo - res.precio;
              pagado = true;
              this.bancoService.editBanco(this.banco).subscribe(
                res => res,
                err => err
              )
            }
            else { //Si no puede pagarlo
              alert("Saldo insuficiente");

              this.cocheService.desReservado(res).subscribe(
                res => console.log(res),
                err => console.log(err)
              );
            }
          }
           else{
            alert("Necesita registrar su cuenta bancaria");
            pagado = false;
            this.cocheService.desReservado(res).subscribe( //Pone a false el avión
              res => console.log(res),
              err => console.log(err)
            );
            this.route.navigate(['/banco'])
           }
          if (pagado == true) { //Hace la reserva
            this.cocheService.MakeReserva(res).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
          }
        } else {
          if (respuesta == true && res.disponible == false) {
            this.cocheService.reservado(res).subscribe( //Pone a false el avión
              res => console.log(res),
              err => console.log(err)
            );
            alert("El Coche ya está reservado");
          }
        }

      },
      err => err
    ) 



  }

  getBancos(){
    this.bancoService.getBancos().subscribe(
      res => {
        this.bancoService.bancos = res;
       // console.log(res)
      },
      err=>console.error(err)
    )

  }



}
