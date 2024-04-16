import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { authGuard } from './core/guards/auth.guard';
import { TelaConfirmarComponent } from './pages/tela-confirmar/tela-confirmar.component';


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
    path: 'tela-confirmar',
    component: TelaConfirmarComponent
  },
  {
    path: 'tela-confirmar/:username',
    component: TelaConfirmarComponent
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
            path: 'radoc',
            loadChildren: () => import('./pages/radoc/radoc.module').then(m => m.RadocModule)
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
