import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';


const routes: Routes = [

  {
    path:'login',
    component: LoginComponent
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'perfil',
        loadChildren: () => import('./pages/perfil/perfil.module').then(m => m.PerfilModule)
      }
    ]
  },
  {
    path:'',
    redirectTo:'/perfil',
    pathMatch: 'full'
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'documento',
        children: [
          {
            path: 'ensino',
            loadChildren: () => import('./pages/ensino/ensino.module').then(m => m.EnsinoModule)
          },
          {
            path: 'pesquisa',
            loadChildren: () => import('./pages/pesquisa/pesquisa.module').then(m => m.PesquisaModule)
          },
          {
            path: 'gestao',
            loadChildren: () => import('./pages/gestao/gestao.module').then(m => m.GestaoModule)
          },
          {
            path: 'extensao',
            loadChildren: () => import('./pages/extensao/extensao.module').then(m => m.ExtensaoModule)
          }
        ]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
