import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { NgForm} from '@angular/forms';
import { SignupService } from 'src/app/services/signup.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { from } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(public signupService: SignupService, private route: Router) { }

  
  registrado= false;

  ngOnInit(): void {
    
    //this.getSignups();
    
  }


  resetForm(form: NgForm){
    form.reset();
  }

  getSignups(){
    this.signupService.getSignups().subscribe(
      res => {
        this.signupService.signups = res;
        
      },
      err=>console.error(err)
    )

  }



  addSignup(form: NgForm){
    // if(form.value._id){
    //   this.signupService.editSignup(form.value).subscribe(
    //     res => {
    //       this.getSignups();
    //       form.reset();
    //     },  
    //     err=>console.error(err)
    //   );
    // }
    // else{
      

      // if(form.value.email){

      // }
    this.signupService.getSignups().subscribe(
      res=>{
        for(var i=0; i<res.length; i++){
          if(form.value.email == res[i].email){
            alert("EL usuario ya existe")
            this.registrado = true;
          }
        }
        
      },
      err=>console.log(err)
    )

      if(this.registrado == false){
        this.signupService.createSignup(form.value).subscribe(
          res => {
            // this.getSignups();
            form.reset();
            this.route.navigate(['/signin'])
          },  
          err=>console.error(err)
    
        )
      } 
    // }
    
  }

  // deleteSignup(_id:string){
  //   const res = confirm("¿Estas seguro que quieres borrarlo?");
  //   if(res){

  //     this.signupService.deleteSignup(_id).subscribe(
  //       (res)=>{
  //         this.getSignups();
  //       },
  //       (err)=>console.error(err)
  //     );
  //   }
  // }

  // editSignup(signup: User){
    
  //   this.signupService.selectedSignup = signup;
    
  // }

}
