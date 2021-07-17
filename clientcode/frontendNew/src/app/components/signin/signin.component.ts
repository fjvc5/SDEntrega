import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm} from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import{Router} from '@angular/router'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(public signupService: SignupService, public route: Router) { }

  ngOnInit() {   
  }


   resetForm(form: NgForm){
     form.reset();
   }

 

  addSignin(form: NgForm){
    this.signupService.createSignin(form.value).subscribe(
      (res:any) => {

        var token = res.token;
        var tokenAux = `Bearer ${token}`;

        if(token === undefined){
          alert("La contraseña es errónea")
          form.reset()
        }
        else{
            var emailAux = form.value.email;
            localStorage.setItem('token', tokenAux);
            localStorage.setItem('email', emailAux);
        }
        
        
        window.location.assign("https://localhost:4200/")
      },  
      err=>console.error(err)

    )
    // }
   
  }


}
