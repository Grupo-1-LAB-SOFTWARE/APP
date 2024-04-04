import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PesquisaComponent } from './pesquisa.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { PesquisaRoutingModule } from './pesquisa-routing.module';
import { PesquisaCreateComponent } from './pesquisa-create/pesquisa-create.component';


@NgModule({
  declarations: [
    PesquisaComponent,
  
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    FormsModule,
    PesquisaRoutingModule
  ]
})
export class PesquisaModule { }
