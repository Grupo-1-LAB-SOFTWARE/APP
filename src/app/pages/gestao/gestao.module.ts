import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GestaoComponent } from './gestao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { GestaoRoutingModule } from './gestao-routing.module';
import { GestaoCreateComponent } from './gestao-create/gestao-create.component';


@NgModule({
  declarations: [
    GestaoComponent,
    GestaoCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    FormsModule,
    GestaoRoutingModule
  ]
})
export class GestaoModule { }
