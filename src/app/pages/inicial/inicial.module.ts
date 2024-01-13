import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    CoreModule,
    CommonModule,
    ComponentsModule
  ]
})
export class InicialModule { }
