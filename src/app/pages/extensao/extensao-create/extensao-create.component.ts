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
    public dialog: MatDialog
  ) {}

  async ngOnInit(){
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
    });

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
      if (!this.isCreate) {
        await this.projetoExtensaoService.createEnsino('projeto_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Projeto de extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.projetoExtensaoService.update('projeto_extensao', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.estagioExtensaoService.createEnsino('estagio_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Estágio de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.estagioExtensaoService.update('estagio_extensao', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.atividadeEnsinoNaoFormalService.createEnsino('atividade_ensino_nao_formal', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade de Ensino não formal criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeEnsinoNaoFormalService.update('atividade_ensino_nao_formal', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.outraAtividadeExtensaoService.createEnsino('outra_atividade_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra Atividade de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.outraAtividadeExtensaoService.update('outra_atividade_extensao', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.chSemanalAtividadesExtensaoService.createEnsino('ch_semanal_atividades_extensao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('CH Semanal Atividades de Extensão criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.chSemanalAtividadesExtensaoService.update('ch_semanal_atividades_extensao', formValue, this.nomeRelatorio).toPromise();
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
