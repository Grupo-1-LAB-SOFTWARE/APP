import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/shared/material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { ErrorDialogComponent } from './dialogs/error-dialog/error-dialog.component';
import { ConfirmDialogComponent } from './dialogs/confirm-dialog/confirm-dialog.component';
import { CadastroFormBaseComponent } from './cadastro-form-base/cadastro-form-base.component';
import { ContainerComponent } from './container/container.component';



@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    CadastroFormBaseComponent,
    ContainerComponent

  ],
  imports: [
    CommonModule,
    CoreModule,
    MaterialModule,
    SharedModule,
  ],
  exports: [
    HeaderComponent,
    LayoutComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    CadastroFormBaseComponent
  ]
})
export class ComponentsModule { }
