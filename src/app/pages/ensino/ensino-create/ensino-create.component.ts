import { CrudService } from './../../../core/services/crud.service';
import { DialogData } from './../../radoc/radoc.component';
import { ensino, IatividadeLetiva } from './../../../core/interfaces/ensino.interface';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';

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

  floatLabelControl = 'always' as FloatLabelType;
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

  constructor(
    private readonly ensinoService: CrudService<ensino>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private atividadeLetivaService: CrudService<IatividadeLetiva>,
    private CrudService: CrudService<any>,
  ) {}

  async ngOnInit(){
    this.CrudService.getAll('relatorio_docente').subscribe(result => {
      this.atividadeNAME = result;
    });
    console.log(this.atividadeNAME + 'teste');
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
      }), // Corrigido para utilizar array
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
      this._snackbar.open('Erro ao salvar Relatório de ensino.', 'OK', {
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
  async submitAtividadeLetiva() {
    const formValue = this.formAtividadeLetiva.getRawValue();
    console.log(formValue);

    if (!this.formAtividadeLetiva.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      if (this.isCreate) {
        this.atividadeLetivaService.createEnsino('atividade_letiva', formValue, 'teste');
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeLetivaService.update('atividade_letiva', formValue);
        this._snackbar.open('Relatório de atividade letiva atualizado com sucesso.', 'OK', {
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
