import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pesquisa, IprojetoPesquisaProducaoIntelectual, ItrabalhoCompletoPublicadoPeriodicoBoletimTecnico, IlivroCapituloVerbetePublicado, ItrabalhoCompletoResumoPublicadoApresentadoCongressos, IoutraAtividadePesquisaProducaoIntelectual, IchSemanalAtividadesPesquisa } from 'src/app/core/interfaces/pesquisa.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { DialogData } from '../../radoc/radoc.component';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjetoPesquisaProducaoIntelectualDialogComponent } from '../../components/dialogs/pesquisa/projeto-pesquisa-dialog/projeto-pesquisa-dialog';
import { TrabalhoCompletoPublicadoDialogComponent } from '../../components/dialogs/pesquisa/trabalho-publicado-dialog/trabalho-publicado-dialog';
import { LivroCapituloVerbetePublicadoDialogComponent } from '../../components/dialogs/pesquisa/livro-capitulo-verbete-publicado-dialog/livro-capitulo-verbete-publicado-dialog';
import { TrabalhoCompletoResumoPublicadoDialogComponent } from '../../components/dialogs/pesquisa/trabalho-resumo-dialog/trabalho-resumo-dialog';
import { OutraAtividadePesquisaDialogComponent } from '../../components/dialogs/pesquisa/outra-atividade-pesquisa-dialog/outra-atividade-pesquisa-dialog';
import { CHSemanalAtividadesPesquisaDialogComponent } from '../../components/dialogs/pesquisa/ch-semanal-atividades-pesquisa-dialog/ch-semanal-atividades-pesquisa-dialog';

@Component({
  selector: 'app-pesquisa-create',
  templateUrl: './pesquisa-create.component.html',
  styleUrls: ['./pesquisa-create.component.scss']
})
export class PesquisaCreateComponent implements OnInit {

  @Input() isCreate!: boolean;

  @Input() pesquisa: pesquisa | undefined;

  @Input() pesquisaSize: number | undefined;

  floatLabelControl = 'always' as FloatLabelType;
  //forms
  formProjetoPesquisaProducaoIntelectual!: any;
  formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico!: any;
  formLivroCapituloVerbetePublicado!: any;
  formTrabalhoCompletoResumoPublicadoApresentadoCongressos!: any;
  formOutraAtividadePesquisaProducaoIntelectual!: any;
  formCHSemanalAtividadesPesquisa!: any;

  step: number = 1;
  atividadeNAME:any | undefined;
  pesquisaId!: number;

  dialogData!: DialogData | undefined;
  nomeRelatorio: string = '';
  constructor(
    private readonly pesquisaService: CrudService<pesquisa>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private projetoPesquisaProducaoIntelectualService: CrudService<IprojetoPesquisaProducaoIntelectual>,
    private trabalhoCompletoPublicadoPeriodicoBoletimTecnicoService: CrudService<ItrabalhoCompletoPublicadoPeriodicoBoletimTecnico>,
    private livroCapituloVerbetePublicadoService: CrudService<IlivroCapituloVerbetePublicado>,
    private trabalhoCompletoResumoPublicadoApresentadoCongressosService: CrudService<ItrabalhoCompletoResumoPublicadoApresentadoCongressos>,
    private outraAtividadePesquisaProducaoIntelectualService: CrudService<IoutraAtividadePesquisaProducaoIntelectual>,
    private chSemanalAtividadesPesquisaService: CrudService<IchSemanalAtividadesPesquisa>,
    private CrudService: CrudService<any>,
    private sharedDataService: SharedDataService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(){
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
    });

    this.formProjetoPesquisaProducaoIntelectual = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      titulo:['', [Validators.required]],
      funcao:['', [Validators.required]],
      cadastro_proped:['', [Validators.required]],
      situacao_atual:['', [Validators.required]],
    });
    this.formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
    this.formLivroCapituloVerbetePublicado = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
    this.formTrabalhoCompletoResumoPublicadoApresentadoCongressos = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
    this.formOutraAtividadePesquisaProducaoIntelectual = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      descricao:['',[Validators.required]],
    });
    this.formCHSemanalAtividadesPesquisa = this.formBuilder.group({
      ch_semanal_primeiro_semestre:['',[Validators.required]],
      ch_semanal_segundo_semestre:['',[Validators.required]],
    });

    if(!this.isCreate){
      this.pesquisaId = Number(this.pesquisa?.id);
    }
    console.log(this.pesquisa)
    console.log(this.formBuilder.array([this.formBuilder.control('')]));

  }
  openDialogProjetoDePesquisaOuProducaoIntelectual(){
    const dialogRef = this.dialog.open(ProjetoPesquisaProducaoIntelectualDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogTrabalhoCompletoPublicadoPeriodicoBoletimTecnico(){
    const dialogRef = this.dialog.open(TrabalhoCompletoPublicadoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogLivroCapituloVerbetePublicado(){
    const dialogRef = this.dialog.open(LivroCapituloVerbetePublicadoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogTrabalhoCompletoResumoPublicadoApresentadoCongressos(){
    const dialogRef = this.dialog.open(TrabalhoCompletoResumoPublicadoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogOutraAtividadePesquisaProducaoIntelectual(){
    const dialogRef = this.dialog.open(OutraAtividadePesquisaDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogCHSemanalAtividadesPesquisa(){
    const dialogRef = this.dialog.open(CHSemanalAtividadesPesquisaDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


  goBack() {
    if (this.step > 1) {
      this.step--;
    }
  }

  goNext() {
    if (this.step < 8) {
      this.step++;
    }
  }

  async submit() {
    const formValue = this.formProjetoPesquisaProducaoIntelectual.getRawValue();
    if (!this.formProjetoPesquisaProducaoIntelectual.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.pesquisaService.create('pesquisa',formValue) :
        await this.pesquisaService.update('pesquisa', formValue);
        this._snackbar.open('Relatório de pesquisa salvo com sucesso.', 'OK', {
          duration: 5000
        });
      // Evitando o uso de location.reload() para atualizar a interface do usuário
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relatório de pesquisa.', 'OK', {
        duration: 5000
      });
    }
  }

  //buttonsSubmit
  async submitProjetoPesquisaProducaoIntelectual() {
    const formValue = this.formProjetoPesquisaProducaoIntelectual.getRawValue();
    console.log(formValue);

    if (!this.formProjetoPesquisaProducaoIntelectual.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.projetoPesquisaProducaoIntelectualService.createEnsino('projeto_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Projeto de pesquisa ou de produção intelectual criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.projetoPesquisaProducaoIntelectualService.update('projeto_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Projeto de pesquisa ou de produção intelectual atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formProjetoPesquisaProducaoIntelectual.reset();
  }
  async submitTrabalhoCompletoPublicadoPeriodicoBoletimTecnico() {
    const formValue = this.formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico.getRawValue();
    console.log(formValue);

    if (!this.formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.trabalhoCompletoPublicadoPeriodicoBoletimTecnicoService.createEnsino('trabalho_completo_publicado_periodico_boletim_tecnico', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.trabalhoCompletoPublicadoPeriodicoBoletimTecnicoService.update('trabalho_completo_publicado_periodico_boletim_tecnico', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico.reset();
  }
  async submitLivroCapituloVerbetePublicado() {
    const formValue = this.formLivroCapituloVerbetePublicado.getRawValue();
    console.log(formValue);

    if (!this.formLivroCapituloVerbetePublicado.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.livroCapituloVerbetePublicadoService.createEnsino('livro_capitulo_verbete_publicado', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Livro, capítulo de livro ou verbete publicado criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.livroCapituloVerbetePublicadoService.update('livro_capitulo_verbete_publicado', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Livro, capítulo de livro ou verbete publicados atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formLivroCapituloVerbetePublicado.reset();
  }
  async submitTrabalhoCompletoResumoPublicadoApresentadoCongressos() {
    const formValue = this.formTrabalhoCompletoResumoPublicadoApresentadoCongressos.getRawValue();
    console.log(formValue);

    if (!this.formTrabalhoCompletoResumoPublicadoApresentadoCongressos.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.trabalhoCompletoResumoPublicadoApresentadoCongressosService.createEnsino('trabalho_completo_resumo_publicado_apresentado_congressos', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho completo e resumo publicado e/ou apresentado em congressos ou similares criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.trabalhoCompletoResumoPublicadoApresentadoCongressosService.update('trabalho_completo_resumo_publicado_apresentado_congressos', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho completo e resumo publicado e/ou apresentado em congressos ou similares atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formTrabalhoCompletoResumoPublicadoApresentadoCongressos.reset();
  }
  async submitOutraAtividadePesquisaProducaoIntelectual() {
    const formValue = this.formOutraAtividadePesquisaProducaoIntelectual.getRawValue();
    console.log(formValue);

    if (!this.formOutraAtividadePesquisaProducaoIntelectual.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.outraAtividadePesquisaProducaoIntelectualService.createEnsino('outra_atividade_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra atividade de Pesquisa/Produção Intelectual criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.outraAtividadePesquisaProducaoIntelectualService.update('outra_atividade_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra atividade de Pesquisa/Produção Intelectual atualizada com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formOutraAtividadePesquisaProducaoIntelectual.reset();
  }
  async submitCHSemanalAtividadesPesquisa() {
    const formValue = this.formCHSemanalAtividadesPesquisa.getRawValue();
    console.log(formValue);

    if (!this.formCHSemanalAtividadesPesquisa.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.chSemanalAtividadesPesquisaService.createEnsino('ch_semanal_atividades_pesquisa', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Carga Horária semanal de pesquisa criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.chSemanalAtividadesPesquisaService.update('ch_semanal_atividades_pesquisa', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Carga Horária semanal de pesquisa atualizada com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error) {
      console.error(error);
      this._snackbar.open(error as string, 'OK', {
        duration: 5000
      });
    }
    this.formCHSemanalAtividadesPesquisa.reset();
  }
}
