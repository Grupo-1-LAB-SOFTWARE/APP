import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PainelAdmComponent } from './painel-adm.component';
import { PainelAdmCreateComponent } from './painel-adm-create/painel-adm-create/painel-adm-create.component';


const routes: Routes = [
  {
    path: '',
    component: PainelAdmComponent,
    children: [
      {
        path: 'editar',
        component: PainelAdmCreateComponent
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PainelAdmRoutingModule { }
