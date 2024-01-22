import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnsinoComponent } from './ensino.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    EnsinoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    FormsModule
  ]
})
export class EnsinoModule { }
