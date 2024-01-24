import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnsinoComponent } from './ensino.component';


const routes: Routes = [
  {
    path: '',
    component: EnsinoComponent
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnsinoRoutingModule { }
