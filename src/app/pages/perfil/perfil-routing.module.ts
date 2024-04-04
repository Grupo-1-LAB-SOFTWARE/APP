import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './perfil.component';
import { PerfilCreateComponent } from './perfil-create/perfil-create.component';


const routes: Routes = [
  {
    path: '',
    component: PerfilComponent,
    children: [
      {
        path: 'editar',
        component: PerfilCreateComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
