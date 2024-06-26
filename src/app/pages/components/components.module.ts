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
import { CHSemanalAtividadesPesquisaDialogComponent } from './dialogs/pesquisa/ch-semanal-atividades-pesquisa-dialog/ch-semanal-atividades-pesquisa-dialog';
import { LivroCapituloVerbetePublicadoDialogComponent } from './dialogs/pesquisa/livro-capitulo-verbete-publicado-dialog/livro-capitulo-verbete-publicado-dialog';
import { OutraAtividadePesquisaDialogComponent } from './dialogs/pesquisa/outra-atividade-pesquisa-dialog/outra-atividade-pesquisa-dialog';
import { ProjetoPesquisaProducaoIntelectualDialogComponent } from './dialogs/pesquisa/projeto-pesquisa-dialog/projeto-pesquisa-dialog';
import { TrabalhoCompletoPublicadoDialogComponent } from './dialogs/pesquisa/trabalho-publicado-dialog/trabalho-publicado-dialog';
import { TrabalhoCompletoResumoPublicadoDialogComponent } from './dialogs/pesquisa/trabalho-resumo-dialog/trabalho-resumo-dialog';
import { ProjetoExtensaoDialogComponent } from './dialogs/extensao/projeto-extensao-dialog/projeto-extensao-dialog';
import { EstagioExtensaoDialogComponent } from './dialogs/extensao/estagio-extensao-dialog/estagio-extensao-dialog';
import { AtividadeEnsinoNaoFormalDialogComponent } from './dialogs/extensao/atividade-ensino-nao-formal-dialog/atividade-ensino-nao-formal-dialog';
import { OutraAtividadeExtensaoDialogComponent } from './dialogs/extensao/outra-atividade-extensao-dialog/outra-atividade-extensao-dialog';
import { CHSemanalAtividadesExtensaoDialogComponent } from './dialogs/extensao/ch-semanal-atividades-extensao-dialog/ch-semanal-atividades-extensao-dialog';
import { AtividadeGestaoRepresentacaoDialogComponent } from './dialogs/gestao/atividade_gestao_representacao-dialog/atividade_gestao_representacao-dialog';
import { AfastamentoDialogComponent } from './dialogs/gestao/afastamento-dialog/afastamento-dialog';
import { OutraInformacaoDialogComponent } from './dialogs/gestao/outra_informacao-dialog/outra_informacao-dialog';
import { QualificacaoDocenteAcademicaProfissionalDialogComponent } from './dialogs/gestao/qualificacao_docente_academica_profissional-dialog/qualificacao_docente_academica_profissional-dialog';


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
    AvaliacaoDiscenteDialogComponent,
    CHSemanalAtividadesPesquisaDialogComponent,
    LivroCapituloVerbetePublicadoDialogComponent,
    OutraAtividadePesquisaDialogComponent,
    ProjetoPesquisaProducaoIntelectualDialogComponent,
    TrabalhoCompletoPublicadoDialogComponent,
    TrabalhoCompletoResumoPublicadoDialogComponent,
    ProjetoExtensaoDialogComponent,
    EstagioExtensaoDialogComponent,
    AtividadeEnsinoNaoFormalDialogComponent,
    OutraAtividadeExtensaoDialogComponent,
    CHSemanalAtividadesExtensaoDialogComponent,
    AtividadeGestaoRepresentacaoDialogComponent,
    AfastamentoDialogComponent,
    OutraInformacaoDialogComponent,
    QualificacaoDocenteAcademicaProfissionalDialogComponent,
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
    CHSemanalAtividadesPesquisaDialogComponent,
    LivroCapituloVerbetePublicadoDialogComponent,
    OutraAtividadePesquisaDialogComponent,
    ProjetoPesquisaProducaoIntelectualDialogComponent,
    TrabalhoCompletoPublicadoDialogComponent,
    TrabalhoCompletoResumoPublicadoDialogComponent,
    ProjetoExtensaoDialogComponent,
    EstagioExtensaoDialogComponent,
    AtividadeEnsinoNaoFormalDialogComponent,
    OutraAtividadeExtensaoDialogComponent,
    CHSemanalAtividadesExtensaoDialogComponent,
    AtividadeGestaoRepresentacaoDialogComponent,
    AfastamentoDialogComponent,
    OutraInformacaoDialogComponent,
    QualificacaoDocenteAcademicaProfissionalDialogComponent,
    ContainerComponent,
  
  ]
})
export class ComponentsModule { }
