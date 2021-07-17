import { Component, OnInit } from '@angular/core';
import { Banco } from 'src/app/models/banco';
import { NgForm } from '@angular/forms';
import { BancoService } from 'src/app/services/banco.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-banco',
  templateUrl: './banco.component.html',
  styleUrls: ['./banco.component.css']
})
export class BancoComponent implements OnInit {

  constructor(public bancoService: BancoService, public route: Router) { }

  ngOnInit(): void {
  }


  getBancos(){
    this.bancoService.getBancos().subscribe(
      res => {
        this.bancoService.bancos = res;
      },
      err=>console.error(err)
    )

  }

  addBanco(form: NgForm){
    if(form.value._id){
      this.bancoService.editBanco(form.value).subscribe(
        res => {
          this.getBancos();
          form.reset();
        },  
        err=>console.error(err)
      );
    }
    else{
      this.bancoService.createBanco(form.value).subscribe(
        res => {
          this.getBancos();
          form.reset();
          this.route.navigate(['/']);
        },  
        err=>console.error(err)
  
      )
    }
    
  }


  


}
