import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { CocheComponent } from './components/coche/coche.component';
import { AvionComponent } from './components/avion/avion.component';
import { HotelComponent } from './components/hotel/hotel.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path: '/coche', component:CocheComponent},
  {path: '/avion', component:AvionComponent},
  {path: '/hotel', component:HotelComponent},
  {path: '/signup', component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule{}