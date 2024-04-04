import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { ensino } from 'src/app/core/interfaces/ensino.interface';
import { CrudService } from 'src/app/core/services/crud.service';

@Component({
  selector: 'app-ensino-create',
  templateUrl: './ensino-create.component.html',
  styleUrls: ['./ensino-create.component.scss']
})
export class EnsinoCreateComponent implements OnInit {

  @Input() isCreate!: boolean;

  @Input() ensino: ensino | undefined;

  @Input() ensinoSize: number | undefined;

  floatLabelControl = 'always' as FloatLabelType;

  form!: FormGroup;

  step: number = 1;

  ensinoId!: number;

  initialForm = {
    atividadeLetiva_codigoDisciplina: ['', [Validators.required]],
    atividadeLetiva_nomeDisciplina: ['', [Validators.required]],
    atividadeLetiva_ano: ['', [Validators.required]],
    atividadeLetiva_semestre: ['', [Validators.required]],
    atividadeLetiva_cursoNome: ['', [Validators.required]],
    atividadeLetiva_cursoCampos_Cidade: ['', [Validators.required]],
    atividadeLetiva_cursoCampos_Nome: ['', [Validators.required]],
    atividadeLetiva_cursoCampos_Diretor: ['', [Validators.required]],
    atividadeLetiva_cursoInstituto_Diretor: ['', [Validators.required]],
    atividadeLetiva_cursoInstituto_Nome: ['', [Validators.required]],
    atividadeLetiva_cursoInstituto_Sigla: ['', [Validators.required]],
    atividadeLetiva_cursoNivel: ['', [Validators.required]],
    atividadeLetiva_cursosigla: ['', [Validators.required]],
    atividadeLetiva_docentes_envolvidos: ['', [Validators.required]],
    atividadeLetiva_carga_horaria_docentes_envolvidos: ['', [Validators.required]],
    atividadePedagogicaComplementar_ano: ['', [Validators.required]],
    atividadePedagogicaComplementar_semestre: ['', [Validators.required]],
    atividadePedagogicaComplementar_carga_horaria_semanal: ['', [Validators.required]],
    atividadePedagogicaComplementar_docentes_envolvidos: ['', [Validators.required]],
    atividadePedagogicaComplementar_carga_horaria_docentes_envolvidos: ['', [Validators.required]],
    orientado_semestre: ['', [Validators.required]],
    orientado_nome: ['', [Validators.required]],
    orientado_matricula: ['', [Validators.required]],
    orientado_atividade_carga_horaria: [''],
    orientado_atividade_tipo: ['', [Validators.required]],
    bancaExaminacao_nomeCandidato: ['', [Validators.required]],
    bancaExaminacao_tituloTrabalho: ['', [Validators.required]],
    bancaExaminacao_ies: ['', [Validators.required]],
    bancaExaminacao_tipo: ['', [Validators.required]],
    bancaExaminacao_ano: ['', [Validators.required]],
    bancaExaminacao_semestre: ['', [Validators.required]],
  }

  constructor(
    private readonly ensinoService: CrudService<ensino>,
    private formBuilder: NonNullableFormBuilder,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialForm);
    if(!this.isCreate && this.ensino){
      this.ensinoId = Number(this.ensino.id);
      this.fillForm(this.ensino);
    }
  }

  fillForm(ensino: ensino) {
    this.form.patchValue({
      atividadeLetiva_codigoDisciplina: ensino.atividade_letiva.codigo_disciplina,
      atividadeLetiva_nomeDisciplina: ensino.atividade_letiva.nome_disciplina,
      atividadeLetiva_ano: ensino.atividade_letiva.ano,
      atividadeLetiva_semestre: ensino.atividade_letiva.semestre,
      atividadeLetiva_cursoNome: ensino.atividade_letiva.curso.nome,
      atividadeLetiva_cursoCampos_Cidade: ensino.atividade_letiva.curso.campus.cidade,
      atividadeLetiva_cursoCampos_Nome: ensino.atividade_letiva.curso.campus.nome,
      atividadeLetiva_cursoCampos_Diretor: ensino.atividade_letiva.curso.campus.diretor,
      atividadeLetiva_cursoInstituto_Diretor: ensino.atividade_letiva.curso.instituto.diretor,
      atividadeLetiva_cursoInstituto_Nome: ensino.atividade_letiva.curso.instituto.nome,
      atividadeLetiva_cursoInstituto_Sigla: ensino.atividade_letiva.curso.instituto.sigla,
      atividadeLetiva_cursoInstituto_Campus: ensino.atividade_letiva.curso.instituto.campus,
      atividadeLetiva_cursoNivel: ensino.atividade_letiva.curso.nivel,
      atividadeLetiva_cursosigla: ensino.atividade_letiva.curso.sigla,
      atividadeLetiva_docentes_envolvidos: ensino.atividade_letiva.docentes_envolvidos,
      atividadeLetiva_carga_horaria_docentes_envolvidos: ensino.atividade_letiva.carga_horaria_docentes_envolvidos,
      atividadePedagogicaComplementar_ano: ensino.atividade_pedagogica_complementar.ano,
      atividadePedagogicaComplementar_semestre: ensino.atividade_pedagogica_complementar.semestre,
      atividadePedagogicaComplementar_carga_horaria_semanal: ensino.atividade_pedagogica_complementar.carga_horaria_semanal,
      atividadePedagogicaComplementar_docentes_envolvidos: ensino.atividade_pedagogica_complementar.docentes_envolvidos,
      atividadePedagogicaComplementar_carga_horaria_docentes_envolvidos: ensino.atividade_pedagogica_complementar.carga_horaria_docentes_envolvidos,
      orientado_ano: ensino.orientado.ano,
      orientado_semestre: ensino.orientado.semestre,
      orientado_nome: ensino.orientado.nome,
      orientado_matricula: ensino.orientado.matricula,
      orientado_curso: ensino.orientado.curso,
      orientado_tipo: ensino.orientado.tipo,
      orientado_atividade_ano: ensino.orientado.atividade.ano,
      orientado_atividade_semestre: ensino.orientado.atividade.semestre,
      orientado_atividade_carga_horaria: ensino.orientado.atividade.carga_horaria,
      orientado_atividade_tipo: ensino.orientado.atividade.tipo,
      bancaExaminacao_nomeCandidato: ensino.banca_examinacao.nome_candidato,
      bancaExaminacao_tituloTrabalho: ensino.banca_examinacao.titulo_trabalho,
      bancaExaminacao_ies: ensino.banca_examinacao.ies,
      bancaExaminacao_tipo: ensino.banca_examinacao.tipo,
      bancaExaminacao_ano: ensino.banca_examinacao.ano,
      bancaExaminacao_semestre: ensino.banca_examinacao.semestre,
    })
  }

  goBack() {
    if (this.step > 1) {
      this.step--;
    }
  }

  goNext() {
    if (this.step < 5) {
      this.step++;
    }
  }

  async submit() {
    const formValue = this.form.getRawValue();
    if (!this.form.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.ensinoService.create('ensino',formValue) :
        await this.ensinoService.update('ensino', formValue);
        this._snackbar.open('Relátorio de ensino salvo com sucesso.', 'OK', {
          duration: 5000
        });
      location.reload();
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relátorio de ensino.', 'OK', {
        duration: 5000
      });
    }
  }

}
