import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './pages/components/layout/layout.component';
import { LoginComponent } from './pages/login/login.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EnsinoComponent } from './pages/ensino/ensino.component';
import { PesquisaComponent } from './pages/pesquisa/pesquisa.component';
import { GestaoComponent } from './pages/gestao/gestao.component';
import { ExtensaoComponent } from './pages/extensao/extensao.component';

const routes: Routes = [
  {
    path: 'perfil',
    pathMatch: 'full',
    component: PerfilComponent
  },
  {
    path:'',
    redirectTo:'/perfil',
    pathMatch: 'full'
  },
  {
    path: 'documento',
    component: LayoutComponent,
    children: [
      {
        path: 'ensino',
        component: EnsinoComponent
      },
      {
        path: 'pesquisa',
        component: PesquisaComponent
      },
      {
        path: 'gestao',
        component: GestaoComponent
      },
      {
        path: 'extensao',
        component: ExtensaoComponent
      },
      // Adicione outras rotas relacionadas a documentos conforme necessário
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
