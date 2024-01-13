import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { InicialComponent } from './pages/inicial/inicial.component';

const routes: Routes = [

  {
    path: 'login',
    
    component: InicialComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        children: [
          {
            path: 'inicial',
            loadChildren: () => import('./pages/inicial/inicial.module').then(m => m.InicialModule)
          },
        ]
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
