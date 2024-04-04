import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfilComponent } from './perfil.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilCreateComponent } from './perfil-create/perfil-create.component';


@NgModule({
  declarations: [
    PerfilComponent,
    PerfilCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
