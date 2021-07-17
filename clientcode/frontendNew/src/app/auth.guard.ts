import { Injectable } from '@angular/core';
import { CanActivate} from '@angular/router';
import { SignupService } from './services/signup.service';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})



export class AuthGuard implements CanActivate {

  constructor(private authService: SignupService, private route: Router){}


  canActivate(){
    if(this.authService.loggedIn() == true){
      return true;
    }
    this.route.navigate(['/signin'])
    return false;
  }

  
}
