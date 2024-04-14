import { atividadePedagogicaComplementar } from './../../../core/interfaces/pesquisa.interface';
import { CrudService } from './../../../core/services/crud.service';
import { DialogData } from './../../radoc/radoc.component';
import { ensino, IatividadeLetiva, IatividadeOrientacao, IatividadePedagogica, IavaliacaoDiscente, IbancaExaminadora, IdescricaoOrientacao, IpreceptoriaTutoria, IsupervisaoAcademica } from './../../../core/interfaces/ensino.interface';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { SharedDataService } from 'src/app/core/services/shared-data.service';
import { ActivatedRoute } from '@angular/router';

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
  nomeRelatorio: string = '';
  constructor(
    private readonly ensinoService: CrudService<ensino>,
    private readonly formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
    private atividadeLetivaService: CrudService<IatividadeLetiva>,
    private atividadePedagogicaService: CrudService<IatividadePedagogica>,
    private atividadeOrientacaoService: CrudService<IatividadeOrientacao>,
    private descricaoOrientacaoService: CrudService<IdescricaoOrientacao>,
    private supervisaoAcademicaService: CrudService<IsupervisaoAcademica>,
    private preceptoriaTutoriaService: CrudService<IpreceptoriaTutoria>,
    private bancaExaminadoraService: CrudService<IbancaExaminadora>,
    private avaliacaoDiscenteService: CrudService<IavaliacaoDiscente>,
    private CrudService: CrudService<any>,
    private sharedDataService: SharedDataService,
  ) {}

  async ngOnInit(){
    this.sharedDataService.nomeRelatorio$.subscribe(nome => {
      this.nomeRelatorio = nome;
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
  //buttonsSubmit
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
      if (!this.isCreate) {
        await this.atividadeLetivaService.createEnsino('atividade_letiva', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeLetivaService.update('atividade_letiva', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.atividadePedagogicaService.createEnsino('atividade_pedagogica_complementar', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadePedagogicaService.update('atividade_pedagogica_complementar', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.descricaoOrientacaoService.createEnsino('descricao_orientacao_coorientacao_academica', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.descricaoOrientacaoService.update('descricao_orientacao_coorientacao_academica', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.atividadeOrientacaoService.createEnsino('atividade_orientacao_supervisao_preceptoria_tutoria', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.atividadeOrientacaoService.update('atividade_orientacao_supervisao_preceptoria_tutoria', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.supervisaoAcademicaService.createEnsino('supervisao_academica', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.supervisaoAcademicaService.update('supervisao_academica', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.preceptoriaTutoriaService.createEnsino('preceptoria_tutoria_residencia', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.preceptoriaTutoriaService.update('preceptoria_tutoria_residencia', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.bancaExaminadoraService.createEnsino('banca_examinadora', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.bancaExaminadoraService.update('banca_examinadora', formValue, this.nomeRelatorio).toPromise();
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
      if (!this.isCreate) {
        await this.avaliacaoDiscenteService.createEnsino('avaliacao_discente', formValue, this.nomeRelatorio).toPromise();
        this._snackbar.open('Relatório de atividade letiva criado com sucesso.', 'OK', {
          duration: 5000
        });
      } else {
        await this.avaliacaoDiscenteService.update('avaliacao_discente', formValue, this.nomeRelatorio).toPromise();
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
