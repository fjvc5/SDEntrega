import { Component, OnInit } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';
import { NgForm} from '@angular/forms';
import { HotelService } from '../../services/hotel.service';
import { Router } from '@angular/router';
import { Banco } from 'src/app/models/banco';
import {BancoService } from 'src/app/services/banco.service';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.css']
})
export class HotelComponent implements OnInit {

  Admin = false;
  banco: Banco;

  constructor(public hotelService: HotelService,  public bancoService: BancoService, public route: Router) { }

  ngOnInit(): void {
    
    this.getHoteles();
    this.getBancos();
    if(localStorage.getItem('email') == "Administrador@gmail.com"){
      this.Admin = true;
    }
  }


  resetForm(form: NgForm){
    form.reset();
  }

  getHoteles(){
    this.hotelService.getHoteles().subscribe(
      res => {
        console.log(res);
        this.hotelService.hoteles = res;
      },
      err=>console.error(err)
    )

  }

  addHotel(form: NgForm){
    if(form.value._id){
      this.hotelService.editHotel(form.value).subscribe(
        res => {
          this.getHoteles();
          form.reset();
        },  
        err=>console.error(err)
      );
    }
    else{
      this.hotelService.createHotel(form.value).subscribe(
        res => {
          this.getHoteles();
          form.reset();
        },  
        err=>console.error(err)
  
      )
    }
    
  }

  // deleteHotel(_id:string){
  //   const res = confirm("¿Estas seguro que quieres borrarlo?");
  //   if(res){

  //     this.hotelService.deleteHotel(_id).subscribe(
  //       (res)=>{
  //         this.getHoteles();
  //       },
  //       (err)=>console.error(err)
  //     );
  //   }
  // }

  editHotel(hotel: Hotel){
   
      this.hotelService.selectedHotel = hotel;
    
    
  }


  MakeReserva(hotel: NgForm){
    
    const respuesta = confirm("¿Estas seguro que quieres reservarlo?");

    var cuentaBanco = false;
    var pagado = false;

     this.hotelService.getHotel(hotel.value).subscribe(
     
      res => {
        if (res.disponible == true && respuesta == true) {
     
          this.hotelService.reservado(res).subscribe( //Pone a false el avión
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

              this.hotelService.desReservado(res).subscribe(
                res => console.log(res),
                err => console.log(err)
              );
            }
          }
          else{
            alert("Necesita registrar su cuenta bancaria");
            pagado = false;
            this.hotelService.desReservado(res).subscribe( //Pone a false el avión
              res => console.log(res),
              err => console.log(err)
            );
            this.route.navigate(['/banco'])
           }
          if (pagado == true) { //Hace la reserva
            this.hotelService.MakeReserva(res).subscribe(
              res => console.log(res),
              err => console.log(err)
            );
          }
        } else {
          if (respuesta == true && res.disponible == false) {

            this.hotelService.reservado(res).subscribe( //Pone a false el avión
              res => console.log(res),
              err => console.log(err)
            );

            alert("El Hotel ya está reservado");
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
