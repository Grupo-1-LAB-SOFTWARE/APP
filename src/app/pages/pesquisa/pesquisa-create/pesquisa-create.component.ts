import { chSemanalAtividadePesquisaName } from './../../components/dialogs/pesquisa/ch-semanal-atividades-pesquisa-dialog/chSemanalAtividadePesquisaName.service';
import { livroCapituloVerbetePublicadoName } from './../../components/dialogs/pesquisa/livro-capitulo-verbete-publicado-dialog/livroCapituloVerbetePublicadoName.service';
import { outraAtividadePesquisaName } from './../../components/dialogs/pesquisa/outra-atividade-pesquisa-dialog/outraAtividadePesquisaName.service';
import { projetoPesquisaName } from './../../components/dialogs/pesquisa/projeto-pesquisa-dialog/projetoPesquisaName.service';
import { trabalhoPublicadoName } from './../../components/dialogs/pesquisa/trabalho-publicado-dialog/trabalhoPublicadoName.service';
import { trabalhoResumoName } from './../../components/dialogs/pesquisa/trabalho-resumo-dialog/trabalhoResumoName.service';
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
import { SharedDataServiceName } from 'src/app/core/services/shared-dataName.service';
import { HttpErrorResponse } from '@angular/common/http';
import {  Router } from '@angular/router';

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

  projetoPesquisaId: any;
  trabalhoCompletoPublicadoId: any;
  livroCapituloVerbeteId: any;
  trabalhoCompletoResumoId: any;
  outraAtividadePesquisaId: any;
  chSemanalAtividadesPesquisaId: any;
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
    private sharedDataServiceName: SharedDataServiceName,
    private chSemanalAtividadePesquisaName: chSemanalAtividadePesquisaName,
    private livroCapituloVerbetePublicadoName: livroCapituloVerbetePublicadoName,
    private outraAtividadePesquisaName: outraAtividadePesquisaName,
    private projetoPesquisaName: projetoPesquisaName,
    private trabalhoPublicadoName: trabalhoPublicadoName,
    private trabalhoResumoName: trabalhoResumoName,
    public dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit(){
    this.projetoPesquisaName.projetoPesquisa$.subscribe(id => {
      this.projetoPesquisaId = id;
      this.carregarDadosDoBackendProjetoPesquisa()

    })
    this.trabalhoPublicadoName.trabalhoPublicado$.subscribe(id => {
      this.trabalhoCompletoPublicadoId = id;
      this.carregarDadosDoBackendTrabalhoCompletoPublicado()

    })
    this.livroCapituloVerbetePublicadoName.livroCapituloVerbetePublicado$.subscribe(id => {
      this.livroCapituloVerbeteId = id;
      this.carregarDadosDoBackendLivroCapituloVerbete()

    })
    this.trabalhoResumoName.trabalhoResumo$.subscribe(id => {
      this.trabalhoCompletoResumoId = id;
      this.carregarDadosDoBackendTrabalhoCompletoResumo()

    })
    this.outraAtividadePesquisaName.outraAtividadePesquisa$.subscribe(id => {
      this.outraAtividadePesquisaId = id;
      this.carregarDadosDoBackendOutraAtividadePesquisa()

    })
    this.chSemanalAtividadePesquisaName.chSemanalAtividadePesquisa$.subscribe(id => {
      this.chSemanalAtividadesPesquisaId = id;
      this.carregarDadosDoBackendCHSemanalAtividadesPesquisa()

    })
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
  carregarDadosDoBackendProjetoPesquisa() {
    this.CrudService.getOneEnsino('projeto_pesquisa_producao_intelectual', this.nomeRelatorio,this.projetoPesquisaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formProjetoPesquisaProducaoIntelectual.patchValue({
        numero_doc: dados.numero_doc,
        titulo: dados.titulo,
        funcao: dados.funcao,
        cadastro_proped: dados.cadastro_proped,
        situacao_atual: dados.situacao_atual,

      });
    });
  }

  carregarDadosDoBackendTrabalhoCompletoPublicado() {
    this.CrudService.getOneEnsino('trabalho_completo_publicado_periodico_boletim_tecnico', this.nomeRelatorio,this.trabalhoCompletoPublicadoId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formTrabalhoCompletoPublicadoPeriodicoBoletimTecnico.patchValue({
        numero_doc: dados.numero_doc,
        descricao: dados.descricao,

      });
    });
  }

  carregarDadosDoBackendLivroCapituloVerbete() {
    this.CrudService.getOneEnsino('livro_capitulo_verbete_publicado', this.nomeRelatorio,this.livroCapituloVerbeteId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formLivroCapituloVerbetePublicado.patchValue({
        numero_doc: dados.numero_doc,
        descricao: dados.descricao,

      });
    });
  }

  carregarDadosDoBackendTrabalhoCompletoResumo() {
    this.CrudService.getOneEnsino('trabalho_completo_resumo_publicado_apresentado_congressos', this.nomeRelatorio,this.trabalhoCompletoResumoId).subscribe((dados: any) => {
      console.log(this.nomeRelatorio + this.trabalhoCompletoPublicadoId)
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formTrabalhoCompletoResumoPublicadoApresentadoCongressos.patchValue({
        numero_doc: dados.numero_doc,
        descricao: dados.descricao,

      });
    });
  }

  carregarDadosDoBackendOutraAtividadePesquisa() {
    this.CrudService.getOneEnsino('outra_atividade_pesquisa_producao_intelectual', this.nomeRelatorio,this.outraAtividadePesquisaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formOutraAtividadePesquisaProducaoIntelectual.patchValue({
        numero_doc: dados.numero_doc,
        descricao: dados.descricao,

      });
    });
  }

  carregarDadosDoBackendCHSemanalAtividadesPesquisa() {
    this.CrudService.getOneEnsino('ch_semanal_atividades_pesquisa', this.nomeRelatorio,this.chSemanalAtividadesPesquisaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formCHSemanalAtividadesPesquisa.patchValue({
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,

      });
    });
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
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.projetoPesquisaId == 0) {
        await this.projetoPesquisaProducaoIntelectualService.createEnsino('projeto_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Projeto de pesquisa ou de produção intelectual criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.projetoPesquisaProducaoIntelectualService.updateEnsino('projeto_pesquisa_producao_intelectual', formValue ,this.nomeRelatorio, this.projetoPesquisaId).toPromise();

        this._snackbar.open('Projeto de pesquisa ou de produção intelectual atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.trabalhoCompletoPublicadoId == 0) {
        await this.trabalhoCompletoPublicadoPeriodicoBoletimTecnicoService.createEnsino('trabalho_completo_publicado_periodico_boletim_tecnico', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {

        await this.trabalhoCompletoPublicadoPeriodicoBoletimTecnicoService.updateEnsino('trabalho_completo_publicado_periodico_boletim_tecnico', formValue ,this.nomeRelatorio, this.trabalhoCompletoPublicadoId).toPromise();

        this._snackbar.open('Trabalho atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.livroCapituloVerbeteId == 0) {
        await this.livroCapituloVerbetePublicadoService.createEnsino('livro_capitulo_verbete_publicado', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Livro, capítulo de livro ou verbete publicado criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.livroCapituloVerbetePublicadoService.updateEnsino('livro_capitulo_verbete_publicado', formValue ,this.nomeRelatorio, this.livroCapituloVerbeteId).toPromise();

        this._snackbar.open('Livro, capítulo de livro ou verbete publicados atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.trabalhoCompletoResumoId == 0) {
        await this.trabalhoCompletoResumoPublicadoApresentadoCongressosService.createEnsino('trabalho_completo_resumo_publicado_apresentado_congressos', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Trabalho completo e resumo publicado e/ou apresentado em congressos ou similares criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.trabalhoCompletoResumoPublicadoApresentadoCongressosService.updateEnsino('trabalho_completo_resumo_publicado_apresentado_congressos', formValue ,this.nomeRelatorio, this.trabalhoCompletoResumoId).toPromise();

        this._snackbar.open('Trabalho completo e resumo publicado e/ou apresentado em congressos ou similares atualizado com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.outraAtividadePesquisaId == 0) {
        await this.outraAtividadePesquisaProducaoIntelectualService.createEnsino('outra_atividade_pesquisa_producao_intelectual', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra atividade de Pesquisa/Produção Intelectual criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.outraAtividadePesquisaProducaoIntelectualService.updateEnsino('outra_atividade_pesquisa_producao_intelectual', formValue ,this.nomeRelatorio, this.outraAtividadePesquisaId).toPromise();

        this._snackbar.open('Outra atividade de Pesquisa/Produção Intelectual atualizada com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    } catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

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
      if (this.chSemanalAtividadesPesquisaId == 0) {
        await this.chSemanalAtividadesPesquisaService.createEnsino('ch_semanal_atividades_pesquisa', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Carga Horária semanal de pesquisa criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.chSemanalAtividadesPesquisaService.updateEnsino('ch_semanal_atividades_pesquisa', formValue ,this.nomeRelatorio, this.chSemanalAtividadesPesquisaId).toPromise();

        this._snackbar.open('Carga Horária semanal de pesquisa atualizada com sucesso.', 'OK', {
          duration: 5000
        });
      }
      // Aqui você pode atualizar a interface do usuário sem recarregar a página
    }  catch (error: any) {
      console.error(error);
      this._snackbar.open(error.error.bad_request || error.error , 'OK', {

      });
    }
    this.formCHSemanalAtividadesPesquisa.reset();
  }
}
