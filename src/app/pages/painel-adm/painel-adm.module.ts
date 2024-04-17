import { NgModule } from '@angular/core';

import { PainelAdmComponent } from './painel-adm.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
import { PainelAdmCreateComponent } from './painel-adm-create/painel-adm-create/painel-adm-create.component';
import { PainelAdmRoutingModule } from './painel-adm-routing.module';


@NgModule({
  declarations: [
    PainelAdmComponent,
    PainelAdmCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    MaterialModule,
    ComponentsModule,
    FormsModule,
    PainelAdmRoutingModule,
  ]
})
export class PainelAdmModule { }
