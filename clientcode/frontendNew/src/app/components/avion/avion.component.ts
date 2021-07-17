import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Avion } from 'src/app/models/avion';
import { NgForm } from '@angular/forms';
import { AvionService } from '../../services/avion.service';
import { BancoService } from 'src/app/services/banco.service';
import { Router } from '@angular/router';
import { Banco } from 'src/app/models/banco';


@Component({
  selector: 'app-avion',
  templateUrl: './avion.component.html',
  styleUrls: ['./avion.component.css']
})
export class AvionComponent implements OnInit {

  Admin = false;
  banco: Banco;


  constructor(public avionService: AvionService, public bancoService: BancoService, public route: Router) {

  }

  ngOnInit(): void {

    this.getAviones();
    this.getBancos();

    if (localStorage.getItem('email') == "Administrador@gmail.com") {
      this.Admin = true;
    }
  }

  resetForm(form: NgForm) {
    form.reset();
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

  addAvion(form: NgForm) {
    if (form.value._id) {
      this.avionService.editAvion(form.value).subscribe(
        res => {
          this.getAviones();
          form.reset();
        },
        err => console.error(err)
      );
    }
    else {
      this.avionService.createAvion(form.value).subscribe(
        res => {
          this.getAviones();
          form.reset();
        },
        err => console.error(err)

      )
    }

  }

  // deleteAvion(_id:string){
  //   const res = confirm("¿Estas seguro que quieres borrarlo?");
  //   if(res){

  //     this.avionService.deleteAvion(_id).subscribe(
  //       (res)=>{
  //         this.getAviones();
  //       },
  //       (err)=>console.error(err)
  //     );
  //   }
  // }

  editAvion(avion: Avion) {
    this.avionService.selectedAvion = avion;
  }


  MakeReserva(avion: NgForm) {

    const respuesta = confirm("¿Estas seguro que quieres reservarlo?");

    var cuentaBanco = false;
    var pagado = false;

    this.avionService.getAvion(avion.value).subscribe(
      res => {
        if (res.disponible == true && respuesta == true) {
          
          res.disponible = false;

          this.avionService.editAvion(res).subscribe( //Pone a false el avión
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

              res.disponible = true;

              this.avionService.editAvion(res).subscribe(
                res => console.log(res),
                err => console.log(err)
              );
            }
          }
          if (pagado == true) { //Hace la reserva
            this.avionService.MakeReserva(res).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
          }
        } else {
          if (respuesta == true && res.disponible == false) {
            
            this.avionService.reservado(res).subscribe( //Pone a false el avión
              res => console.log(res),
              err => console.log(err)
            );


            alert("El Avión ya ha sido reservado");

          }
        }

      },
      err => err
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
