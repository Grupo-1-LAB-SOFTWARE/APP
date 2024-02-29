import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'perfil/painel',
    pathMatch: 'full'
  },
  {
    path: 'perfil',
    redirectTo: 'perfil/painel',
    pathMatch: 'full'

  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'cadastro',
    component: CadastroComponent
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'perfil',
        children: [
          {
            path: 'painel',
            loadChildren: ()=> import('./pages/perfil/perfil.module').then(m => m.PerfilModule)
          },
          
        ]
      }
    ]
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'documento',
        canActivate: [authGuard],
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
          },
        ]
      },
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
