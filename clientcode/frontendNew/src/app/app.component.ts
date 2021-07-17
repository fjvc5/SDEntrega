import { Component, ViewEncapsulation } from '@angular/core';
import { NgForm} from '@angular/forms';
// import { SignupService } from 'src/app/services/signup.service';
import{Router} from '@angular/router'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'frontend';
  
  constructor(public route: Router) { } 

  logOut = localStorage.length;

   deleteSignin(form: NgForm){

    localStorage.clear();
    this.logOut = 0;
    this.route.navigate(['/signin']);
    
  }

  





}
