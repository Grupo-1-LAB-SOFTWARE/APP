import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestao, IatividadeGestaoRepresentacao, IqualificacaoDocenteAcademicaProfissional, IoutraInformacao, Iafastamento } from 'src/app/core/interfaces/gestao.interface';
import { CrudService } from 'src/app/core/services/crud.service';
import { DialogData } from '../../radoc/radoc.component';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { MatDialog } from '@angular/material/dialog';
import { AtividadeGestaoRepresentacaoDialogComponent } from '../../components/dialogs/gestao/atividade_gestao_representacao-dialog/atividade_gestao_representacao-dialog';
import { AfastamentoDialogComponent } from '../../components/dialogs/gestao/afastamento-dialog/afastamento-dialog';
import { OutraInformacaoDialogComponent } from '../../components/dialogs/gestao/outra_informacao-dialog/outra_informacao-dialog';
import { QualificacaoDocenteAcademicaProfissionalDialogComponent } from '../../components/dialogs/gestao/qualificacao_docente_academica_profissional-dialog/qualificacao_docente_academica_profissional-dialog';

@Component({
  selector: 'app-gestao-create',
  templateUrl: './gestao-create.component.html',
  styleUrls: ['./gestao-create.component.scss']
})
export class GestaoCreateComponent implements OnInit {

  @Input() isCreate!: boolean;

  @Input() gestao: gestao | undefined;

  @Input() gestaoSize: number | undefined;

  floatLabelControl = 'always' as FloatLabelType;
  //forms
  formAtividadeGestaoRepresentacao!: any;
  formQualificacaoDocenteAcademicaProfissional!: any;
  formOutraInformacao!: any;
  formAfastamento!: any;

  step: number = 1;
  atividadeNAME:any | undefined;
  gestaoId!: number;

  dialogData!: DialogData | undefined;
  nomeRelatorio: string = '';
  constructor(
    private readonly gestaoService: CrudService<gestao>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private atividadeGestaoRepresentacaoService: CrudService<IatividadeGestaoRepresentacao>,
    private qualificacaoDocenteAcademicaProfissionalService: CrudService<IqualificacaoDocenteAcademicaProfissional>,
    private outraInformacaoService: CrudService<IoutraInformacao>,
    private afastamentoService: CrudService<Iafastamento>,
    private CrudService: CrudService<any>,
    private sharedDataService: SharedDataService,
    public dialog: MatDialog
  ) {}

  async ngOnInit(){
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
    });

    this.formAtividadeGestaoRepresentacao = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      cargo_e_ou_funcao:['', [Validators.required]],
      semestre:['', [Validators.required]],
      ch_semanal:['', [Validators.required]],
      ato_de_designacao:['', [Validators.required]],
      periodo:['', [Validators.required]],
    });
    this.formQualificacaoDocenteAcademicaProfissional = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      atividades:['',[Validators.required]],
      portaria_e_ou_data_de_realizacao:['',[Validators.required]],
    });
    this.formOutraInformacao = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      atividades:['',[Validators.required]],
    });
    this.formAfastamento = this.formBuilder.group({
      numero_doc:['',[Validators.required]],
      motivacao:['',[Validators.required]],
      portaria:['', [Validators.required]],
    });

    if(!this.isCreate){
      this.gestaoId = Number(this.gestao?.id);
    }
    console.log(this.gestao)
    console.log(this.formBuilder.array([this.formBuilder.control('')]));

  }
  openDialogAtividadeGestaoRepresentacao(){
    const dialogRef = this.dialog.open(AtividadeGestaoRepresentacaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogQualificacaoDocenteAcademicaProfissional(){
    const dialogRef = this.dialog.open(QualificacaoDocenteAcademicaProfissionalDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogOutraInformacao(){
    const dialogRef = this.dialog.open(OutraInformacaoDialogComponent, {
      width: '800px',
      data: {
        nomeRelatorio: this.nomeRelatorio

      }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  openDialogAfastamento(){
    const dialogRef = this.dialog.open(AfastamentoDialogComponent, {
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
    const formValue = this.formAtividadeGestaoRepresentacao.getRawValue();
    if (!this.formAtividadeGestaoRepresentacao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.gestaoService.create('gestao',formValue) :
        await this.gestaoService.update('gestao', formValue);
        this._snackbar.open('Relatório de gestão e outras atividades salvo com sucesso.', 'OK', {
          duration: 5000
        });
      // Evitando o uso de location.reload() para atualizar a interface do usuário
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relatório de gestão e outras atividades.', 'OK', {
        duration: 5000
      });
    }
  }

  //buttonsSubmit
  async submitAtividadeGestaoRepresentacao() {
    const formValue = this.formAtividadeGestaoRepresentacao.getRawValue();
    console.log(formValue);

    if (!this.formAtividadeGestaoRepresentacao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.atividadeGestaoRepresentacaoService.createEnsino('atividade_gestao_representacao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade de Gestão ou Representação criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeGestaoRepresentacaoService.update('atividade_gestao_representacao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Atividade de Gestão ou Representação atualizada com sucesso.', 'OK', {
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
    this.formAtividadeGestaoRepresentacao.reset();
  }
  async submitQualificacaoDocenteAcademicaProfissional() {
    const formValue = this.formQualificacaoDocenteAcademicaProfissional.getRawValue();
    console.log(formValue);

    if (!this.formQualificacaoDocenteAcademicaProfissional.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.qualificacaoDocenteAcademicaProfissionalService.createEnsino('qualificacao_docente_academica_profissional', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Qualificação Acadêmica Profissional ou Outra Atividade criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.qualificacaoDocenteAcademicaProfissionalService.update('qualificacao_docente_academica_profissional', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Qualificação Acadêmica Profissional ou Outra Atividade atualizada com sucesso.', 'OK', {
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
    this.formQualificacaoDocenteAcademicaProfissional.reset();
  }

  async submitOutraInformacao() {
    const formValue = this.formOutraInformacao.getRawValue();
    console.log(formValue);

    if (!this.formOutraInformacao.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.outraInformacaoService.createEnsino('outra_informacao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra Informação criada com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.outraInformacaoService.update('outra_informacao', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Outra Informação atualizada com sucesso.', 'OK', {
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
    this.formOutraInformacao.reset();
  }
  async submitAfastamento() {
    const formValue = this.formAfastamento.getRawValue();
    console.log(formValue);

    if (!this.formAfastamento.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (!this.isCreate) {
        await this.afastamentoService.createEnsino('afastamento', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Afastamento criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.afastamentoService.update('afastamento', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Afastamento atualizado com sucesso.', 'OK', {
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
    this.formAfastamento.reset();
  }
}
