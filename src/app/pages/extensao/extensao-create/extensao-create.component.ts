import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { extensao, IprojetoExtensao, IestagioExtensao, IatividadeEnsinoNaoFormal, IoutraAtividadeExtensao, IchSemanalAtividadesExtensao } from 'src/app/core/interfaces/extensao.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { DialogData } from '../../radoc/radoc.component';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { ProjetoExtensaoDialogComponent } from '../../components/dialogs/extensao/projeto-extensao-dialog/projeto-extensao-dialog';
import { EstagioExtensaoDialogComponent } from '../../components/dialogs/extensao/estagio-extensao-dialog/estagio-extensao-dialog';
import { OutraAtividadeExtensaoDialogComponent } from '../../components/dialogs/extensao/outra-atividade-extensao-dialog/outra-atividade-extensao-dialog';
import { AtividadeEnsinoNaoFormalDialogComponent } from '../../components/dialogs/extensao/atividade-ensino-nao-formal-dialog/atividade-ensino-nao-formal-dialog';
import { CHSemanalAtividadesExtensaoDialogComponent } from '../../components/dialogs/extensao/ch-semanal-atividades-extensao-dialog/ch-semanal-atividades-extensao-dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjetoExtensaoServiceName } from '../../components/dialogs/extensao/projeto-extensao-dialog/projetoExtensao.service';
import { OutraAtividadeExtensaoServiceName } from '../../components/dialogs/extensao/outra-atividade-extensao-dialog/outraAtividadeExtensao.service';
import { EstagioExtensaoServiceName } from '../../components/dialogs/extensao/estagio-extensao-dialog/estagioExtensao.service';
import { CHSemanalExtensaoServiceName } from '../../components/dialogs/extensao/ch-semanal-atividades-extensao-dialog/chSemanalExtensaoName.service';
import { AtividadeNaoFormalServiceName } from '../../components/dialogs/extensao/atividade-ensino-nao-formal-dialog/atividadeNaoFormalName.service';

@Component({
  selector: 'app-extensao-create',
  templateUrl: './extensao-create.component.html',
  styleUrls: ['./extensao-create.component.scss']
})
export class ExtensaoCreateComponent implements OnInit {

  @Input() isCreate!: boolean;

  @Input() extensao: extensao | undefined;

  @Input() extensaoSize: number | undefined;

  floatLabelControl = 'always' as FloatLabelType;
  //forms
  formProjetoExtensao!: any;
  formEstagioExtensao!: any;
  formOutraAtividadeExtensao!: any;
  formAtividadeEnsinoNaoFormal!: any;
  formCHSemanalAtividadesExtensao!: any;

  step: number = 1;
  atividadeNAME:any | undefined;
  extensaoId!: number;

  dialogData!: DialogData | undefined;
  nomeRelatorio: string = '';

  ProjetoExtensaoId: any;
  EstagioExtensaoId: any;
  OutraAtividadeExtensaoId: any;
  AtividadeNaoFormalId: any;
  CHSemanalId: any;

  constructor(
    private readonly extensaoService: CrudService<extensao>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private projetoExtensaoService: CrudService<IprojetoExtensao>,
    private estagioExtensaoService: CrudService<IestagioExtensao>,
    private atividadeEnsinoNaoFormalService: CrudService<IatividadeEnsinoNaoFormal>,
    private outraAtividadeExtensaoService: CrudService<IoutraAtividadeExtensao>,
    private chSemanalAtividadesExtensaoService: CrudService<IchSemanalAtividadesExtensao>,
    private CrudService: CrudService<any>,
    private sharedDataService: SharedDataService,
    private ProjetoExtensaoServiceName: ProjetoExtensaoServiceName,
    private OutraAtividadeExtensaoServiceName: OutraAtividadeExtensaoServiceName,
    private EstagioExtensaoServiceName: EstagioExtensaoServiceName,
    private CHSemanalExtensaoServiceName: CHSemanalExtensaoServiceName,
    private AtividadeNaoFormalServiceName: AtividadeNaoFormalServiceName,
    public dialog: MatDialog
  ) {}

  async ngOnInit(){
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
    });
    this.ProjetoExtensaoServiceName.ProjetoExtensao$.subscribe(id => {
      this.ProjetoExtensaoId = id;
      this.carregarDadosDoBackendProjetoExtensao()

    })
    this.EstagioExtensaoServiceName.EstagioExtensao$.subscribe(id => {
      this.EstagioExtensaoId = id;
      this.carregarDadosDoBackendEstagioExtensao()

    })
    this.OutraAtividadeExtensaoServiceName.OutraAtividadeExtensao$.subscribe(id => {
      this.OutraAtividadeExtensaoId = id;
      this.carregarDadosDoBackendOutraAtividadeExtensao()

    })
    this.AtividadeNaoFormalServiceName.AtividadeNaoFormal$.subscribe(id => {
      this.AtividadeNaoFormalId = id;
      this.carregarDadosDoBackendAtividadeNaoFormal()

    })
    this.CHSemanalExtensaoServiceName.CHSemanalExtensao$.subscribe(id => {
      this.CHSemanalId = id;
      this.carregarDadosDoBackendCHSemanalExtensao()

    })

    this.formProjetoExtensao = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      titulo:['', [Validators.required]],
      funcao:['', [Validators.required]],
      cadastro_proex:['', [Validators.required]],
      situacao_atual:['', [Validators.required]],
    });
    this.formEstagioExtensao = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      area_conhecimento:['',[Validators.required]],
      instituicao_ou_local:['',[Validators.required]],
      periodo:['',[Validators.required]],
      ch_semanal:['',[Validators.required]],
    });
    this.formOutraAtividadeExtensao = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      atividade:['',[Validators.required]],
      ch_total_primeiro_semestre:['',[Validators.required]],
      ch_total_segundo_semestre:['',[Validators.required]],
    });
    this.formAtividadeEnsinoNaoFormal = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      atividade:['',[Validators.required]],
      ch_total_primeiro_semestre:['',[Validators.required]],
      ch_total_segundo_semestre:['',[Validators.required]],
    });
    this.formCHSemanalAtividadesExtensao = this.formBuilder.group({
      ch_semanal_primeiro_semestre:['',[Validators.required]],
      ch_semanal_segundo_semestre:['',[Validators.required]],
    });

    if(!this.isCreate){
      this.extensaoId = Number(this.extensao?.id);
    }
    console.log(this.extensao)
    console.log(this.formBuilder.array([this.formBuilder.control('')]));
  }
  carregarDadosDoBackendProjetoExtensao() {
    this.CrudService.getOneEnsino('projeto_extensao', this.nomeRelatorio,this.ProjetoExtensaoId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      console.log('atividade_pedagogica_complementar/'+ this.nomeRelatorio +'/'+this.ProjetoExtensaoId)
      this.formProjetoExtensao.patchValue({
        numero_doc: dados.numero_doc,
        titulo: dados.titulo,
        funcao: dados.funcao,
        cadastro_proex: dados.cadastro_proex,
        situacao_atual: dados.situacao_atual,
      });
    });
  }
  carregarDadosDoBackendEstagioExtensao() {
    this.CrudService.getOneEnsino('estagio_extensao', this.nomeRelatorio,this.EstagioExtensaoId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      console.log('atividade_pedagogica_complementar/'+ this.nomeRelatorio +'/'+this.EstagioExtensaoId)
      this.formEstagioExtensao.patchValue({
        numero_doc: dados.numero_doc,
        area_conhecimento: dados.area_conhecimento,
        instituicao_ou_local: dados.instituicao_ou_local,
        periodo: dados.periodo,
        ch_semanal: dados.ch_semanal,
      });
    });
  }
  carregarDadosDoBackendAtividadeNaoFormal() {
    this.CrudService.getOneEnsino('atividade_ensino_nao_formal', this.nomeRelatorio,this.AtividadeNaoFormalId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      console.log('atividade_pedagogica_complementar/'+ this.nomeRelatorio +'/'+this.AtividadeNaoFormalId)
      this.formAtividadeEnsinoNaoFormal.patchValue({
        numero_doc: dados.numero_doc,
        atividade: dados.atividade,
        ch_total_primeiro_semestre: dados.ch_total_primeiro_semestre,
        ch_total_segundo_semestre: dados.ch_total_segundo_semestre,
      });
    });
  }
  carregarDadosDoBackendOutraAtividadeExtensao() {
    this.CrudService.getOneEnsino('outra_atividade_extensao', this.nomeRelatorio,this.OutraAtividadeExtensaoId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      console.log('atividade_pedagogica_complementar/'+ this.nomeRelatorio +'/'+this.OutraAtividadeExtensaoId)
      this.formOutraAtividadeExtensao.patchValue({
        numero_doc: dados.numero_doc,
        atividade: dados.atividade,
        ch_total_primeiro_semestre: dados.ch_total_primeiro_semestre,
        ch_total_segundo_semestre: dados.ch_total_segundo_semestre,
      });
    });
  }
  carregarDadosDoBackendCHSemanalExtensao() {
    this.CrudService.getOneEnsino('ch_semanal_atividades_extensao', this.nomeRelatorio,this.CHSemanalId).subscribe((dados: any) => {
      // Preencha os campos do formulário com os dados recebidos do backend
      console.log('atividade_pedagogica_complementar/'+ this.nomeRelatorio +'/'+this.CHSemanalId)
      this.formCHSemanalAtividadesExtensao.patchValue({
        ch_semanal_primeiro_semestre: dados.ch_semanal_primeiro_semestre,
        ch_semanal_segundo_semestre: dados.ch_semanal_segundo_semestre,
      });
    });
  }
    
  openDialogProjetoExtensao(){
    const dialogRef = this.dialog.open(ProjetoExtensaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogEstagioExtensao(){
    const dialogRef = this.dialog.open(EstagioExtensaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAtividadeEnsinoNaoFormal(){
    const dialogRef = this.dialog.open(AtividadeEnsinoNaoFormalDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogOutraAtividadeExtensao(){
    const dialogRef = this.dialog.open(OutraAtividadeExtensaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAtividadeEnsinoNaoFormall(){
    const dialogRef = this.dialog.open(AtividadeEnsinoNaoFormalDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogCHSemanalAtividadesExtensao(){
    const dialogRef = this.dialog.open(CHSemanalAtividadesExtensaoDialogComponent, {
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
    const formValue = this.formProjetoExtensao.getRawValue();
    if (!this.formProjetoExtensao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.extensaoService.create('extensao',formValue) :
        await this.extensaoService.update('extensao', formValue);
        this._snackbar.open('Relatório de extensão salvo com sucesso.', 'OK', {
          duration: 5000
        });
      // Evitando o uso de location.reload() para atualizar a interface do usuário
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relatório de extensão.', 'OK', {
        duration: 5000
      });
    }
  }

  //buttonsSubmit
  async submitProjetoExtensao() {
    const formValue = this.formProjetoExtensao.getRawValue();
    console.log(formValue);

    if (!this.formProjetoExtensao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.ProjetoExtensaoId == 0) {
        await this.projetoExtensaoService.createEnsino('projeto_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Projeto de extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.projetoExtensaoService.updateEnsino('projeto_extensao', formValue, this.nomeRelatorio, this.ProjetoExtensaoId).toPromise();
        this._snackbar.open('Projeto de extensão atualizado com sucesso.', 'OK', {
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
    this.formProjetoExtensao.reset();
  }
  async submitEstagioExtensao() {
    const formValue = this.formEstagioExtensao.getRawValue();
    console.log(formValue);

    if (!this.formEstagioExtensao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.EstagioExtensaoId == 0) {
        await this.estagioExtensaoService.createEnsino('estagio_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Estágio de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.estagioExtensaoService.updateEnsino('estagio_extensao', formValue, this.nomeRelatorio, this.EstagioExtensaoId).toPromise();
        this._snackbar.open('Estágio de Extensão atualizado com sucesso.', 'OK', {
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
    this.formEstagioExtensao.reset();
  }
  async submitAtividadeEnsinoNaoFormal() {
    const formValue = this.formAtividadeEnsinoNaoFormal.getRawValue();
    console.log(formValue);

    if (!this.formAtividadeEnsinoNaoFormal.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.AtividadeNaoFormalId == 0) {
        await this.atividadeEnsinoNaoFormalService.createEnsino('atividade_ensino_nao_formal', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade de Ensino não formal criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeEnsinoNaoFormalService.updateEnsino('atividade_ensino_nao_formal', formValue, this.nomeRelatorio, this.AtividadeNaoFormalId).toPromise();
        this._snackbar.open('Atividade de Ensino não formal atualizada com sucesso.', 'OK', {
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
    this.formAtividadeEnsinoNaoFormal.reset();
  }
  async submitOutraAtividadeExtensao() {
    const formValue = this.formOutraAtividadeExtensao.getRawValue();
    console.log(formValue);

    if (!this.formOutraAtividadeExtensao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.OutraAtividadeExtensaoId == 0) {
        await this.outraAtividadeExtensaoService.createEnsino('outra_atividade_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra Atividade de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.outraAtividadeExtensaoService.updateEnsino('outra_atividade_extensao', formValue, this.nomeRelatorio, this.OutraAtividadeExtensaoId).toPromise();
        this._snackbar.open('Outra Atividade de Extensão atualizado com sucesso.', 'OK', {
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
    this.formOutraAtividadeExtensao.reset();
  }
  async submitCHSemanalAtividadesExtensao() {
    const formValue = this.formCHSemanalAtividadesExtensao.getRawValue();
    console.log(formValue);

    if (!this.formCHSemanalAtividadesExtensao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.CHSemanalId == 0) {
        await this.chSemanalAtividadesExtensaoService.createEnsino('ch_semanal_atividades_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('CH Semanal Atividades de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.chSemanalAtividadesExtensaoService.updateEnsino('ch_semanal_atividades_extensao', formValue, this.nomeRelatorio, this.CHSemanalId).toPromise();
        this._snackbar.open('CH Semanal Atividades de Extensão atualizado com sucesso.', 'OK', {
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
    this.formCHSemanalAtividadesExtensao.reset();
  }
}
