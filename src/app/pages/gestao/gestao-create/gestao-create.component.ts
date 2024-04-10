import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { gestao } from 'src/app/core/interfaces/gestao.interface';
import { CrudService } from 'src/app/core/services/crud.service';

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

  form!: FormGroup;

  step: number = 1;

  gestaoId!: number;

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
    private readonly gestaoService: CrudService<gestao>,
    private formBuilder: NonNullableFormBuilder,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialForm);
    if(!this.isCreate && this.gestao){
      this.gestaoId = Number(this.gestao.id);
      this.fillForm(this.gestao);
    }
  }

  fillForm(gestao: gestao) {
    this.form.patchValue({
      atividadeLetiva_codigoDisciplina: gestao.atividade_letiva.codigo_disciplina,
      atividadeLetiva_nomeDisciplina: gestao.atividade_letiva.nome_disciplina,
      atividadeLetiva_ano: gestao.atividade_letiva.ano,
      atividadeLetiva_semestre: gestao.atividade_letiva.semestre,
      atividadeLetiva_cursoNome: gestao.atividade_letiva.curso.nome,
      atividadeLetiva_cursoCampos_Cidade: gestao.atividade_letiva.curso.campus.cidade,
      atividadeLetiva_cursoCampos_Nome: gestao.atividade_letiva.curso.campus.nome,
      atividadeLetiva_cursoCampos_Diretor: gestao.atividade_letiva.curso.campus.diretor,
      atividadeLetiva_cursoInstituto_Diretor: gestao.atividade_letiva.curso.instituto.diretor,
      atividadeLetiva_cursoInstituto_Nome: gestao.atividade_letiva.curso.instituto.nome,
      atividadeLetiva_cursoInstituto_Sigla: gestao.atividade_letiva.curso.instituto.sigla,
      atividadeLetiva_cursoInstituto_Campus: gestao.atividade_letiva.curso.instituto.campus,
      atividadeLetiva_cursoNivel: gestao.atividade_letiva.curso.nivel,
      atividadeLetiva_cursosigla: gestao.atividade_letiva.curso.sigla,
      atividadeLetiva_docentes_envolvidos: gestao.atividade_letiva.docentes_envolvidos,
      atividadeLetiva_carga_horaria_docentes_envolvidos: gestao.atividade_letiva.carga_horaria_docentes_envolvidos,
      atividadePedagogicaComplementar_ano: gestao.atividade_pedagogica_complementar.ano,
      atividadePedagogicaComplementar_semestre: gestao.atividade_pedagogica_complementar.semestre,
      atividadePedagogicaComplementar_carga_horaria_semanal: gestao.atividade_pedagogica_complementar.carga_horaria_semanal,
      atividadePedagogicaComplementar_docentes_envolvidos: gestao.atividade_pedagogica_complementar.docentes_envolvidos,
      atividadePedagogicaComplementar_carga_horaria_docentes_envolvidos: gestao.atividade_pedagogica_complementar.carga_horaria_docentes_envolvidos,
      orientado_ano: gestao.orientado.ano,
      orientado_semestre: gestao.orientado.semestre,
      orientado_nome: gestao.orientado.nome,
      orientado_matricula: gestao.orientado.matricula,
      orientado_curso: gestao.orientado.curso,
      orientado_tipo: gestao.orientado.tipo,
      orientado_atividade_ano: gestao.orientado.atividade.ano,
      orientado_atividade_semestre: gestao.orientado.atividade.semestre,
      orientado_atividade_carga_horaria: gestao.orientado.atividade.carga_horaria,
      orientado_atividade_tipo: gestao.orientado.atividade.tipo,
      bancaExaminacao_nomeCandidato: gestao.banca_examinacao.nome_candidato,
      bancaExaminacao_tituloTrabalho: gestao.banca_examinacao.titulo_trabalho,
      bancaExaminacao_ies: gestao.banca_examinacao.ies,
      bancaExaminacao_tipo: gestao.banca_examinacao.tipo,
      bancaExaminacao_ano: gestao.banca_examinacao.ano,
      bancaExaminacao_semestre: gestao.banca_examinacao.semestre,
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
        await this.gestaoService.create('gestao',formValue) :
        await this.gestaoService.update('gestao', formValue);
        this._snackbar.open('Relátorio de gestao salvo com sucesso.', 'OK', {
          duration: 5000
        });
      location.reload();
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relátorio de gestao.', 'OK', {
        duration: 5000
      });
    }
  }

}

