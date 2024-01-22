import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExtensaoComponent } from './extensao.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { ComponentsModule } from '../components/components.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ExtensaoComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    ComponentsModule,
    FormsModule
  ]
})
export class ExtensaoModule { }
