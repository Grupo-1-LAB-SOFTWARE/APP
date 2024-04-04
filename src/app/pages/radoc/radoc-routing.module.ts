import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RadocComponent } from './radoc.component';


const routes: Routes = [
  {
    path: '',
    component: RadocComponent,
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RadocRoutingModule { }
