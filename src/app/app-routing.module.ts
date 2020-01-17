import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { DatosPersComponent } from './components/datos-pers/datos-pers.component';
import { ModalComponent } from './components/modal/modal.component';


const routes: Routes = [
  {path:'inicio', component:InicioComponent},
  {path:'datospers/:id',component:DatosPersComponent},
  {path:'modal/:id',component:ModalComponent},
  {path:'**',component:InicioComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
