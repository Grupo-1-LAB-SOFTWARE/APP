import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsinoComponent } from './ensino.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';
//import { EnsinoCreateComponent } from './ensino-create/ensino-create.component';
import { EnsinoRoutingModule } from './ensino-routing.module';


@NgModule({
  declarations: [
    EnsinoComponent,
    EnsinoCreateComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    FormsModule,
    EnsinoRoutingModule
  ]
})
export class EnsinoModule { }
