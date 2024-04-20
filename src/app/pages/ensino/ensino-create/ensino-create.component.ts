import { SupervisaoServiceName } from './../../components/dialogs/ensino/supervisao-academica-dialog/supervisaoName.service';
import { PreceptoriaServiceName } from './../../components/dialogs/ensino/preceptoria-tutoria-dialog/preceptoriaName.service';
import { descricaoServiceName } from './../../components/dialogs/ensino/descricao-orientacao-dialog/descricaoName.service';
import { bancaServiceName } from './../../components/dialogs/ensino/banca-examinadora-dialog/bancaName.service';
import { avDiscenteServiceName } from './../../components/dialogs/ensino/avaliacao-discente-dialog/avDiscenteName.service';
import { avPedagogicaServiceName } from './../../components/dialogs/ensino/atividade-pedagogica-dialog/avPedagogicaName.service';
import { DescricaoOrientacaoDialogComponent } from './../../components/dialogs/ensino/descricao-orientacao-dialog/descricao-orientacao-dialog';
import { atividadePedagogicaComplementar } from './../../../core/interfaces/ensino.interface';
import { CrudService } from './../../../core/services/crud.service';
import { DialogData } from './../../radoc/radoc.component';
import { ensino, IatividadeLetiva, IatividadeOrientacao, IatividadePedagogica, IavaliacaoDiscente, IbancaExaminadora, IdescricaoOrientacao, IpreceptoriaTutoria, IsupervisaoAcademica } from './../../../core/interfaces/ensino.interface';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import {  Router } from '@angular/router';
import { AtividadeLetivaDialogComponent } from '../../components/dialogs/ensino/atividade-letiva-dialog/atividade-letiva-dialog';
import { MatDialog } from '@angular/material/dialog';
import { AtividadePedagogicaDialogComponent } from '../../components/dialogs/ensino/atividade-pedagogica-dialog/atividade-pedagogica-dialog';
import { AtividadeOrientacaoDialogComponent } from '../../components/dialogs/ensino/atividade-orientacao-dialog/atividade-orientacao-dialog';
import { SupervisaoAcademicaDialogComponent } from '../../components/dialogs/ensino/supervisao-academica-dialog/supervisao-academica-dialog';
import { PreceptoriaTutoriaDialogComponent } from '../../components/dialogs/ensino/preceptoria-tutoria-dialog/preceptoria-tutoria-dialog';
import { BancaExaminadoraDialogComponent } from '../../components/dialogs/ensino/banca-examinadora-dialog/banca-examinadora-dialog';
import { AvaliacaoDiscenteDialogComponent } from '../../components/dialogs/ensino/avaliacao-discente-dialog/avaliacao-discente-dialog';
import { SharedDataServiceName } from 'src/app/core/services/shared-dataName.service';
import { avOrientacaoServiceName } from '../../components/dialogs/ensino/atividade-orientacao-dialog/avOrientacaoName.service';

@Component({
  selector: 'app-ensino-create',
  templateUrl: './ensino-create.component.html',
  styleUrls: ['./ensino-create.component.scss']
})
export class EnsinoCreateComponent implements OnInit {

  @Input() isCreate!: boolean;

  @Input() ensino: ensino | undefined;
  atividadeLetiva: IatividadeLetiva | undefined;

  @Input() ensinoSize: number | undefined;

  floatLabelControl = 'auto' as FloatLabelType;
  //forms
  formAtividadeLetiva!: any;
  formAtividadePedagogicaComplementar!: any;
  formAtividadeOrientacao!: any;
  formDescricao_orientacao!: any;
  formsupervisao_academica!: any;
  formPreceptoriaTutoria!: any;
  formBanca_examinadora!: any;
  formAvaliacao_discente!: any;

  step: number = 1;
  atividadeNAME:any | undefined;
  ensinoId!: number;

  dialogData!: DialogData | undefined;
  nomeRelatorio: string = '';

  AtividadeLetivaId: any;
  AtividadePedagogicaId: any;
  AtividadeOrientacaoId: any;
  AtividadeDiscenteId: any;
  bancaId: any;
  descricaoId: any;
  preceptoriaId: any;
  supervisaoId: any;
  constructor(
    private readonly ensinoService: CrudService<ensino>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private atividadeLetivaService: CrudService<IatividadeLetiva>,
    private atividadePedagogicaService: CrudService<any>,
    private atividadeOrientacaoService: CrudService<any>,
    private descricaoOrientacaoService: CrudService<any>,
    private supervisaoAcademicaService: CrudService<any>,
    private preceptoriaTutoriaService: CrudService<any>,
    private bancaExaminadoraService: CrudService<any>,
    private avaliacaoDiscenteService: CrudService<any>,
    private crudService: CrudService<any>,
    private sharedDataService: SharedDataService,
    private sharedDataServiceName: SharedDataServiceName,
    private avPedagogicaServiceName: avPedagogicaServiceName,
    private avOrientacaoServiceName: avOrientacaoServiceName,
    private avDiscenteServiceName: avDiscenteServiceName,
    private bancaServiceName: bancaServiceName,
    private descricaoServiceName: descricaoServiceName,
    private PreceptoriaServiceName: PreceptoriaServiceName,
    private SupervisaoServiceName: SupervisaoServiceName,
    public dialog: MatDialog,
    private router: Router
  ) {}

  async ngOnInit(){
    this.sharedDataServiceName.nomeRelatorio$.subscribe(name => {
      this.AtividadeLetivaId = name;
      this.carregarDadosDoBackendAtividadeLetiva()

    })
    this.avPedagogicaServiceName.avPedagogica$.subscribe(id => {
      this.AtividadePedagogicaId = id;
      this.carregarDadosDoBackendAtividadePedagogica()

    })
    this.avOrientacaoServiceName.avOrientacao$.subscribe(id => {
      this.AtividadeOrientacaoId = id;
      this.carregarDadosDoBackendAtividadeOrientacao()

    })
    this.avDiscenteServiceName.avDiscente$.subscribe(id => {
      this.AtividadeDiscenteId = id;
      this.carregarDadosDoBackendAvaliacaoDiscente()

    })
    this.bancaServiceName.banca$.subscribe(id => {
      this.bancaId = id;
      this.carregarDadosDoBackendBancaExaminadora()

    })
    this.SupervisaoServiceName.Supervisao$.subscribe(id => {
      this.supervisaoId = id;
      this.carregarDadosDoBackendSupervisaoAcademica()

    })
    this.PreceptoriaServiceName.preceptoria$.subscribe(id => {
      this.preceptoriaId = id;
      this.carregarDadosDoBackendPreceptoriaPreceptoria()

    })
    this.descricaoServiceName.descricao$.subscribe(id => {
      this.descricaoId = id;
      this.carregarDadosDoBackendDescricaoOrientacao()

    })
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
      console.log(this.nomeRelatorio + "teste nome relatorio");
    });

    this.formAtividadeLetiva = this.formBuilder.group({
      semestre:['',[Validators.required]],
      codigo_disciplina:['',[Validators.required]],
      nome_disciplina:['',[Validators.required]],
      ano_e_semestre:['',[Validators.required]],
      curso:['',[Validators.required]],
      nivel:['',[Validators.required]],
      numero_turmas_teorico:['',[Validators.required]],
      numero_turmas_pratico:['',[Validators.required]],
      ch_turmas_teorico:['',[Validators.required]],
      ch_turmas_pratico:['',[Validators.required]],
      docentes_envolvidos_e_cargas_horarias: this.formBuilder.group({
        lista: this.formBuilder.array([this.createFormGroup()])
      }),
    });
    this.formAtividadePedagogicaComplementar = this.formBuilder.group({
      semestre: ['', [Validators.required]],
      ch_semanal_graduacao: ['', [Validators.required]],
      ch_semanal_pos_graduacao: ['', [Validators.required]],
    })
      //atidadePedagogicaComplementar
    this.formAtividadeOrientacao = this.formBuilder.group({
      semestre: ['', [Validators.required]],
      ch_semanal_orientacao: ['', [Validators.required]],
      ch_semanal_coorientacao: ['', [Validators.required]],
      ch_semanal_supervisao: [''],
      ch_semanal_preceptoria_e_ou_tutoria: ['', [Validators.required]],
    })
    //Descrição Orientacao
    this.formDescricao_orientacao = this.formBuilder.group({
      numero_doc: ['', [Validators.required]],
      nome_e_ou_matricula_discente: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      ch_semanal_primeiro_semestre: ['', [Validators.required]],
      ch_semanal_segundo_semestre: ['', [Validators.required]],
    })
    //SupervisaoAcademica
    this.formsupervisao_academica = this.formBuilder.group({
      numero_doc: ['', [Validators.required]],
      nome_e_ou_matricula_discente: ['', [Validators.required]],
      curso: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      nivel: ['', [Validators.required]],
      ch_semanal_primeiro_semestre: ['', [Validators.required]],
      ch_semanal_segundo_semestre: ['', [Validators.required]],
    })
    //PreceptoriaTutoria
    this.formPreceptoriaTutoria = this.formBuilder.group({
      numero_doc: ['', [Validators.required]],
      nome_e_ou_matricula_discente: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      ch_semanal_primeiro_semestre: ['', [Validators.required]],
      ch_semanal_segundo_semestre: ['', [Validators.required]],
    })
    //BancaExaminadora
    this.formBanca_examinadora = this.formBuilder.group({
      numero_doc: ['', [Validators.required]],
      nome_candidato: ['', [Validators.required]],
      titulo_trabalho: ['', [Validators.required]],
      ies: ['', [Validators.required]],
      tipo: ['', [Validators.required]],
      ch_semanal_primeiro_semestre: ['', [Validators.required]],
      ch_semanal_segundo_semestre: ['', [Validators.required]],
    })
    //AvaliacaoDiscente
    this.formAvaliacao_discente = this.formBuilder.group({
      numero_doc_primeiro_semestre: ['', [Validators.required]],
      nota_primeiro_semestre: ['', [Validators.required]],
      codigo_turma_primeiro_semestre: ['', [Validators.required]],
      numero_doc_segundo_semestre: ['', [Validators.required]],
      nota_segundo_semestre: ['', [Validators.required]],
      codigo_turma_segundo_semestre: ['', [Validators.required]],
    })

    if(!this.isCreate){
      this.ensinoId = Number(this.ensino?.id);
    }
    console.log(this.ensino)
    console.log(this.atividadeLetiva)
    console.log(this.formBuilder.array([this.formBuilder.control('')]));

  }
  carregarDadosDoBackendAtividadeLetiva() {
    this.crudService.getOneEnsino('atividade_letiva', this.nomeRelatorio,this.AtividadeLetivaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formAtividadeLetiva.patchValue({
        semestre: dados.semestre,
        codigo_disciplina: dados.codigo_disciplina,
        nome_disciplina: dados.nome_disciplina,
        ano_e_semestre: dados.ano_e_semestre,
        curso: dados.curso,
        nivel: dados.nivel,
        numero_turmas_teorico: dados.numero_turmas_teorico,
        numero_turmas_pratico: dados.numero_turmas_pratico,
        ch_turmas_teorico: dados.ch_turmas_teorico,
        ch_turmas_pratico: dados.ch_turmas_pratico,
      });

      // Para preencher os docentes envolvidos e suas cargas horárias
      const docentesCargas = dados.docentes_envolvidos_e_cargas_horarias.lista.map((docente: any) => {
        return this.formBuilder.group({
          nome_docente: docente.nome_docente,
          carga_horaria: docente.carga_horaria
        });
      });

      // Remova os controles anteriores antes de adicionar os novos
      const lista = this.formAtividadeLetiva.get('docentes_envolvidos_e_cargas_horarias.lista') as FormArray;
      lista.clear();

      // Adicione os novos controles ao FormArray
      docentesCargas.forEach((control: any) => {
        lista.push(control);
      });
    });
  }

  carregarDadosDoBackendAtividadePedagogica() {
    this.crudService.getOneEnsino('atividade_pedagogica_complementar', this.nomeRelatorio,this.AtividadePedagogicaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formAtividadePedagogicaComplementar.patchValue({
        semestre: dados.semestre,
        ch_semanal_graduacao: dados.ch_semanal_graduacao,
        ch_semanal_pos_graduacao: dados.ch_semanal_pos_graduacao,

      });
    });
  }

  carregarDadosDoBackendAtividadeOrientacao() {
    this.crudService.getOneEnsino('atividade_orientacao_supervisao_preceptoria_tutoria', this.nomeRelatorio,this.AtividadeOrientacaoId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formAtividadeOrientacao.patchValue({
        semestre: dados.semestre,
        ch_semanal_orientacao: dados.ch_semanal_orientacao,
        ch_semanal_coorientacao: dados.ch_semanal_coorientacao,
        ch_semanal_supervisao: dados.ch_semanal_supervisao,
        ch_semanal_preceptoria_e_ou_tutoria: dados.ch_semanal_preceptoria_e_ou_tutoria,
      });
    });
  }

  carregarDadosDoBackendDescricaoOrientacao() {
    this.crudService.getOneEnsino('descricao_orientacao_coorientacao_academica', this.nomeRelatorio,this.AtividadeOrientacaoId).subscribe((dados: any) => {
      this.formDescricao_orientacao.patchValue({
        numero_doc: dados.numero_doc,
        nome_e_ou_matricula_discente: dados.nome_e_ou_matricula_discente,
        curso: dados.curso,
        tipo: dados.tipo,
        nivel: dados.nivel,
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,
      });
    });
  }

  carregarDadosDoBackendSupervisaoAcademica() {
    this.crudService.getOneEnsino('supervisao_academica', this.nomeRelatorio,this.supervisaoId).subscribe((dados: any) => {
      this.formsupervisao_academica.patchValue({
        numero_doc: dados.numero_doc,
        nome_e_ou_matricula_discente: dados.nome_e_ou_matricula_discente,
        curso: dados.curso,
        tipo: dados.tipo,
        nivel: dados.nivel,
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,
      });
    });
  }

  carregarDadosDoBackendPreceptoriaPreceptoria() {
    this.crudService.getOneEnsino('preceptoria_tutoria_residencia', this.nomeRelatorio,this.preceptoriaId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formPreceptoriaTutoria.patchValue({
        numero_doc: dados.numero_doc,
        nome_e_ou_matricula_discente: dados.nome_e_ou_matricula_discente,
        tipo: dados.tipo,
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,
      });
    });
  }

  carregarDadosDoBackendBancaExaminadora() {
    this.crudService.getOneEnsino('banca_examinadora', this.nomeRelatorio,this.bancaId).subscribe((dados: any) => {
      this.formBanca_examinadora.patchValue({
        numero_doc: dados.numero_doc,
        nome_candidato: dados.nome_candidato,
        titulo_trabalho: dados.titulo_trabalho,
        ies: dados.ies,
        tipo: dados.tipo,
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,
      });
    });
  }


  carregarDadosDoBackendAvaliacaoDiscente() {
    this.crudService.getOneEnsino('avaliacao_discente', this.nomeRelatorio,this.AtividadeDiscenteId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      this.formAvaliacao_discente.patchValue({
        numero_doc_primeiro_semestre: dados.numero_doc_primeiro_semestre,
        nota_primeiro_semestre: dados.nota_primeiro_semestre,
        codigo_turma_primeiro_semestre: dados.codigo_turma_primeiro_semestre,
        numero_doc_segundo_semestre: dados.numero_doc_segundo_semestre,
        nota_segundo_semestre: dados.nota_segundo_semestre,
        codigo_turma_segundo_semestre: dados.codigo_turma_segundo_semestre,
      });
    });
  }

  openDialogAtividadeLetiva() {
    const dialogRef = this.dialog.open(AtividadeLetivaDialogComponent, {
      width: '800px',
      data: {

        nomeRelatorio: this.nomeRelatorio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAtividadePedagogica(){
    const dialogRef = this.dialog.open(AtividadePedagogicaDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAtividadeOrientacao(){
    const dialogRef = this.dialog.open(AtividadeOrientacaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogDescricaoOrientacao(){
    const dialogRef = this.dialog.open(DescricaoOrientacaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogSupervisaoAcademica(){
    const dialogRef = this.dialog.open(SupervisaoAcademicaDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogPreceptoriaTutoria(){
    const dialogRef = this.dialog.open(PreceptoriaTutoriaDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogBancaExaminadora(){
    const dialogRef = this.dialog.open(BancaExaminadoraDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAvaliacaoDiscente(){
    const dialogRef = this.dialog.open(AvaliacaoDiscenteDialogComponent, {
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
    const formValue = this.formAtividadeLetiva.getRawValue();
    if (!this.formAtividadeLetiva.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.ensinoService.create('ensino',formValue) :
        await this.ensinoService.update('ensino', formValue);
        this._snackbar.open('Relatório de ensino salvo com sucesso.', 'OK', {
          duration: 5000
        });
      // Evitando o uso de location.reload() para atualizar a interface do usuário
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar relatório de ensino.', 'OK', {
        duration: 5000
      });
    }
  }

  createFormGroup() {
    return this.formBuilder.group({
      nome_docente: ['',[Validators.required]],
      carga_horaria: ['',[Validators.required]],
    });
  }
  addlista() {
    this.lista.push(this.createFormGroup())
    console.log(this.formAtividadeLetiva.value);
  }
  get lista(): FormArray {
    return this.formAtividadeLetiva.get('docentes_envolvidos_e_cargas_horarias.lista') as FormArray;
  }

  removerDocente(index: number): void {
    this.lista.removeAt(index);
  }
  //buttonsSubmit
  async submitAtividadeLetiva() {
    const formValue = this.formAtividadeLetiva.getRawValue();
    console.log(formValue);
    formValue.nome_disciplina = formValue.nome_disciplina.toUpperCase();

    if (!this.formAtividadeLetiva.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.AtividadeLetivaId == 0) { // Verifique se é uma criação
        await this.atividadeLetivaService.createEnsino('atividade_letiva', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade letiva criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else { // Se não for uma criação, é uma atualização
        await this.atividadeLetivaService.updateEnsino('atividade_letiva', formValue, this.nomeRelatorio, this.AtividadeLetivaId).toPromise();
        this._snackbar.open('Atividade letiva atualizada com sucesso.', 'OK', {
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
    this.formAtividadeLetiva.reset();
  }
  async submitAtividadePedagogica() {
    const formValue = this.formAtividadePedagogicaComplementar.getRawValue();
    console.log(formValue);

    if (!this.formAtividadePedagogicaComplementar.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.AtividadePedagogicaId == 0) {
        await this.atividadePedagogicaService.createEnsino('atividade_pedagogica_complementar', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade pedagógica criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadePedagogicaService.updateEnsino('atividade_pedagogica_complementar', formValue, this.nomeRelatorio, this.AtividadePedagogicaId).toPromise();
        this._snackbar.open('Atividade pedagógica atualizada com sucesso.', 'OK', {
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
    this.formAtividadePedagogicaComplementar.reset();
  }
  async submitDescricaoOrientacao() {
    const formValue = this.formDescricao_orientacao.getRawValue();
    console.log(formValue);

    if (!this.formDescricao_orientacao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.descricaoId == 0) {
        await this.descricaoOrientacaoService.createEnsino('descricao_orientacao_coorientacao_academica', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Descrição criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.descricaoOrientacaoService.updateEnsino('descricao_orientacao_coorientacao_academica', formValue, this.nomeRelatorio, this.descricaoId).toPromise();
        this._snackbar.open('Descriação atualizada com sucesso.', 'OK', {
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
    this.formDescricao_orientacao.reset();
  }
  async submitAtividadeOrientacao() {
    const formValue = this.formAtividadeOrientacao.getRawValue();
    console.log(formValue);

    if (!this.formAtividadeOrientacao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.AtividadeOrientacaoId == 0) {
        await this.atividadeOrientacaoService.createEnsino('atividade_orientacao_supervisao_preceptoria_tutoria', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade de orientação/supervisão criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeOrientacaoService.updateEnsino('atividade_orientacao_supervisao_preceptoria_tutoria', formValue, this.nomeRelatorio, this.AtividadeOrientacaoId).toPromise();
        this._snackbar.open('Atividade de orientação/supervisão atualizada com sucesso.', 'OK', {
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
    this.formAtividadeOrientacao.reset();
  }
  async submitSupervisaoAcacademica() {
    const formValue = this.formsupervisao_academica.getRawValue();
    console.log(formValue);

    if (!this.formsupervisao_academica.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.supervisaoId == 0) {
        await this.supervisaoAcademicaService.createEnsino('supervisao_academica', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Supervisão acadêmica criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.supervisaoAcademicaService.updateEnsino('supervisao_academica', formValue, this.nomeRelatorio, this.supervisaoId).toPromise();
        this._snackbar.open('Supervisão acadêmica atualizada com sucesso.', 'OK', {
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
    this.formsupervisao_academica.reset();
  }
  async submitPreceptoriaTutoria() {
    const formValue = this.formPreceptoriaTutoria.getRawValue();
    console.log(formValue);

    if (!this.formPreceptoriaTutoria.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.preceptoriaId == 0) {
        await this.preceptoriaTutoriaService.createEnsino('preceptoria_tutoria_residencia', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Preceptoria e/ou tutoria de residência criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.preceptoriaTutoriaService.updateEnsino('preceptoria_tutoria_residencia', formValue, this.nomeRelatorio, this.preceptoriaId).toPromise();
        this._snackbar.open('Preceptoria e/ou tutoria de residência atualizada com sucesso.', 'OK', {
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
    this.formPreceptoriaTutoria.reset();
  }
  async submitBancaExaminadora() {
    const formValue = this.formBanca_examinadora.getRawValue();
    console.log(formValue);

    if (!this.formBanca_examinadora.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.bancaId == 0) {
        await this.bancaExaminadoraService.createEnsino('banca_examinadora', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Banca Examinadora criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.bancaExaminadoraService.updateEnsino('banca_examinadora', formValue,this.nomeRelatorio, this.bancaId).toPromise();
        this._snackbar.open('Banca Examinadora atualizada com sucesso.', 'OK', {
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
    this.formBanca_examinadora.reset();
  }
  async submitAvaliacaoDiscente() {
    const formValue = this.formAvaliacao_discente.getRawValue();
    console.log(formValue);

    if (!this.formAvaliacao_discente.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.AtividadeDiscenteId == 0) {
        await this.avaliacaoDiscenteService.createEnsino('avaliacao_discente', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Avaliação de Discente criada com sucesso.', 'OK', {
          duration: 5000
        });
        this.formAvaliacao_discente.reset();
      } else {
        await this.avaliacaoDiscenteService.updateEnsino('avaliacao_discente', formValue,this.nomeRelatorio, this.AtividadeDiscenteId).toPromise();
        this._snackbar.open('Avaliação de Discente atualizada com sucesso.', 'OK', {
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
  }
}
