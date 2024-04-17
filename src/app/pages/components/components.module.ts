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
import { AtividadeLetivaDialogComponent } from './dialogs/ensino/atividade-letiva-dialog/atividade-letiva-dialog';
import { AtividadePedagogicaDialogComponent } from './dialogs/ensino/atividade-pedagogica-dialog/atividade-pedagogica-dialog';
import { AtividadeOrientacaoDialogComponent } from './dialogs/ensino/atividade-orientacao-dialog/atividade-orientacao-dialog';
import { DescricaoOrientacaoDialogComponent } from './dialogs/ensino/descricao-orientacao-dialog/descricao-orientacao-dialog';
import { SupervisaoAcademicaDialogComponent } from './dialogs/ensino/supervisao-academica-dialog/supervisao-academica-dialog';
import { PreceptoriaTutoriaDialogComponent } from './dialogs/ensino/preceptoria-tutoria-dialog/preceptoria-tutoria-dialog';
import { BancaExaminadoraDialogComponent } from './dialogs/ensino/banca-examinadora-dialog/banca-examinadora-dialog';
import { AvaliacaoDiscenteDialogComponent } from './dialogs/ensino/avaliacao-discente-dialog/avaliacao-discente-dialog';




@NgModule({
  declarations: [
    HeaderComponent,
    LayoutComponent,
    ErrorDialogComponent,
    ConfirmDialogComponent,
    CadastroFormBaseComponent,
    ContainerComponent,
    AtividadeLetivaDialogComponent,
    AtividadePedagogicaDialogComponent,
    AtividadeOrientacaoDialogComponent,
    DescricaoOrientacaoDialogComponent,
    SupervisaoAcademicaDialogComponent,
    PreceptoriaTutoriaDialogComponent,
    BancaExaminadoraDialogComponent,
    AvaliacaoDiscenteDialogComponent
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
    CadastroFormBaseComponent,
    AtividadeLetivaDialogComponent,
    AtividadePedagogicaDialogComponent,
    AtividadeOrientacaoDialogComponent,
    DescricaoOrientacaoDialogComponent,
    SupervisaoAcademicaDialogComponent,
    PreceptoriaTutoriaDialogComponent,
    BancaExaminadoraDialogComponent,
    AvaliacaoDiscenteDialogComponent,
    ContainerComponent
  ]
})
export class ComponentsModule { }
