import { InicialComponent } from "./inicial.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';
const routes: Routes = [
  {
    path: '',
    component: InicialComponent,
    // children: [
    //   {
    //     path: '',
    //     component:
    //   },

    // ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InicialRouteRoutingModule { }
