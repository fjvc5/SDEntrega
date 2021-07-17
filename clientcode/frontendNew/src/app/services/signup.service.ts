import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  URLU_API = 'https://localhost:3100/api/auth/usuarios'
  URLT_API = 'https://localhost:3100/api/auth/tokens'


  // URLU_API = 'https://172.20.42.17:3100/api/auth/usuarios'
  // URLT_API = 'https://172.20.42.17:3100/api/auth/tokens'

  signups: User[];
  selectedSignup: User;

  constructor(private http:HttpClient) {

    this.signups = [];
    this.selectedSignup = {
    _id: "",
    email: "",
    nombreComp: "",
    pass: "",
    signUpdate: new Date().toLocaleDateString()
      
    };

 
  }

  getSignups(){
    return this.http.get<User[]>(this.URLU_API);
  }

  createSignup(signup: User){
    return this.http.post(this.URLU_API, signup);
  }

  createSignin(signin: User){
    return this.http.post(this.URLT_API, signin);
  }


  loggedIn(){
    if(localStorage.getItem('token')){
      return true;
    }else{
      return false;
    }
  }
  // editSignup(signup: User){
  //   return this.http.put(`${this.URL_API}/${signup._id}`, signup)
  // }

  // deleteSignup(_id:string){
  //   return this.http.delete(`${this.URL_API}/${_id}`)
  // }
}

