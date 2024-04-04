import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { extensao } from 'src/app/core/interfaces/extensao.interface';
import { CrudService } from 'src/app/core/services/crud.service';

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

  form!: FormGroup;

  step: number = 1;

  extensaoId!: number;

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
    private readonly extensaoService: CrudService<extensao>,
    private formBuilder: NonNullableFormBuilder,
    private _snackbar: MatSnackBar,
  ) {
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.initialForm);
    if(!this.isCreate && this.extensao){
      this.extensaoId = Number(this.extensao.id);
      this.fillForm(this.extensao);
    }
  }

  fillForm(extensao: extensao) {
    this.form.patchValue({
      atividadeLetiva_codigoDisciplina: extensao.atividade_letiva.codigo_disciplina,
      atividadeLetiva_nomeDisciplina: extensao.atividade_letiva.nome_disciplina,
      atividadeLetiva_ano: extensao.atividade_letiva.ano,
      atividadeLetiva_semestre: extensao.atividade_letiva.semestre,
      atividadeLetiva_cursoNome: extensao.atividade_letiva.curso.nome,
      atividadeLetiva_cursoCampos_Cidade: extensao.atividade_letiva.curso.campus.cidade,
      atividadeLetiva_cursoCampos_Nome: extensao.atividade_letiva.curso.campus.nome,
      atividadeLetiva_cursoCampos_Diretor: extensao.atividade_letiva.curso.campus.diretor,
      atividadeLetiva_cursoInstituto_Diretor: extensao.atividade_letiva.curso.instituto.diretor,
      atividadeLetiva_cursoInstituto_Nome: extensao.atividade_letiva.curso.instituto.nome,
      atividadeLetiva_cursoInstituto_Sigla: extensao.atividade_letiva.curso.instituto.sigla,
      atividadeLetiva_cursoInstituto_Campus: extensao.atividade_letiva.curso.instituto.campus,
      atividadeLetiva_cursoNivel: extensao.atividade_letiva.curso.nivel,
      atividadeLetiva_cursosigla: extensao.atividade_letiva.curso.sigla,
      atividadeLetiva_docentes_envolvidos: extensao.atividade_letiva.docentes_envolvidos,
      atividadeLetiva_carga_horaria_docentes_envolvidos: extensao.atividade_letiva.carga_horaria_docentes_envolvidos,
      atividadePedagogicaComplementar_ano: extensao.atividade_pedagogica_complementar.ano,
      atividadePedagogicaComplementar_semestre: extensao.atividade_pedagogica_complementar.semestre,
      atividadePedagogicaComplementar_carga_horaria_semanal: extensao.atividade_pedagogica_complementar.carga_horaria_semanal,
      atividadePedagogicaComplementar_docentes_envolvidos: extensao.atividade_pedagogica_complementar.docentes_envolvidos,
      atividadePedagogicaComplementar_carga_horaria_docentes_envolvidos: extensao.atividade_pedagogica_complementar.carga_horaria_docentes_envolvidos,
      orientado_ano: extensao.orientado.ano,
      orientado_semestre: extensao.orientado.semestre,
      orientado_nome: extensao.orientado.nome,
      orientado_matricula: extensao.orientado.matricula,
      orientado_curso: extensao.orientado.curso,
      orientado_tipo: extensao.orientado.tipo,
      orientado_atividade_ano: extensao.orientado.atividade.ano,
      orientado_atividade_semestre: extensao.orientado.atividade.semestre,
      orientado_atividade_carga_horaria: extensao.orientado.atividade.carga_horaria,
      orientado_atividade_tipo: extensao.orientado.atividade.tipo,
      bancaExaminacao_nomeCandidato: extensao.banca_examinacao.nome_candidato,
      bancaExaminacao_tituloTrabalho: extensao.banca_examinacao.titulo_trabalho,
      bancaExaminacao_ies: extensao.banca_examinacao.ies,
      bancaExaminacao_tipo: extensao.banca_examinacao.tipo,
      bancaExaminacao_ano: extensao.banca_examinacao.ano,
      bancaExaminacao_semestre: extensao.banca_examinacao.semestre,
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
        await this.extensaoService.create('extensao',formValue) :
        await this.extensaoService.update('extensao', formValue);
        this._snackbar.open('Relátorio de extensao salvo com sucesso.', 'OK', {
          duration: 5000
        });
      location.reload();
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relátorio de extensao.', 'OK', {
        duration: 5000
      });
    }
  }

}
