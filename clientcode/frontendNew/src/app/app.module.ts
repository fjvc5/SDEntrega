import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { CocheComponent } from './components/coche/coche.component';
import { FormsModule } from '@angular/forms';
import { AvionComponent } from './components/avion/avion.component';
import { RouterModule } from '@angular/router';
import { HotelComponent } from './components/hotel/hotel.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ReservaComponent } from './components/reserva/reserva.component';
import { BancoComponent } from './components/banco/banco.component';
import { AuthGuard } from './auth.guard';
import { MisReservasComponent } from './components/mis-reservas/mis-reservas.component';
import { InicioComponent } from './components/inicio/inicio.component';

@NgModule({
  declarations: [
    AppComponent,
    CocheComponent,
    AvionComponent,
    HotelComponent,
    SignupComponent,
    SigninComponent,
    ReservaComponent,
    BancoComponent,
    MisReservasComponent,
    InicioComponent,
  
    
  ],
  imports: [
    BrowserModule,  
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {path: 'coche', component: CocheComponent, canActivate: [AuthGuard]},
      {path: 'avion', component: AvionComponent, canActivate: [AuthGuard]},
      {path: 'hotel', component: HotelComponent, canActivate: [AuthGuard]},
      {path: 'signup', component: SignupComponent},
      {path: 'signin', component: SigninComponent},
      {path: 'reservas', component: ReservaComponent, canActivate: [AuthGuard]},
      {path: 'banco', component: BancoComponent, canActivate: [AuthGuard]},
      {path: 'misReservas', component: MisReservasComponent, canActivate: [AuthGuard]},
      {path: '', component: InicioComponent}


    ])
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
