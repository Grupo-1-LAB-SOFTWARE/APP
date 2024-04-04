import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatSnackBar } from '@angular/material/snack-bar';
import { pesquisa } from 'src/app/core/interfaces/pesquisa.interface';
import { CrudService } from 'src/app/core/services/crud.service';

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

  form!: FormGroup;

  step: number = 1;

  pesquisaId!: number;

  initForm() {
    this.form = this.formBuilder.group({
      atividadeLetiva_codigoDisciplina: ['', [Validators.required]],
      atividadeLetiva_nomeDisciplina: this.formBuilder.array([]),
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
    });
  }

  constructor(
    private readonly pesquisaService: CrudService<pesquisa>,
    private formBuilder: FormBuilder,
    private _snackbar: MatSnackBar,
  ) {
  }


  ngOnInit(): void {
    this.initForm();

    if (!this.isCreate && this.pesquisa) {
      this.pesquisaId = Number(this.pesquisa.id);
      this.fillForm(this.pesquisa);
    }
  }

  fillForm(pesquisa: pesquisa) {
    this.form.patchValue({
      atividadeLetiva_codigoDisciplina: pesquisa.atividade_letiva.codigo_disciplina,
      atividadeLetiva_nomeDisciplina: pesquisa.atividade_letiva.nome_disciplina,
      atividadeLetiva_ano: pesquisa.atividade_letiva.ano,
      atividadeLetiva_semestre: pesquisa.atividade_letiva.semestre,
      atividadeLetiva_cursoNome: pesquisa.atividade_letiva.curso.nome,
      atividadeLetiva_cursoCampos_Cidade: pesquisa.atividade_letiva.curso.campus.cidade,
      atividadeLetiva_cursoCampos_Nome: pesquisa.atividade_letiva.curso.campus.nome,
      atividadeLetiva_cursoCampos_Diretor: pesquisa.atividade_letiva.curso.campus.diretor,
      atividadeLetiva_cursoInstituto_Diretor: pesquisa.atividade_letiva.curso.instituto.diretor,
      atividadeLetiva_cursoInstituto_Nome: pesquisa.atividade_letiva.curso.instituto.nome,
      atividadeLetiva_cursoInstituto_Sigla: pesquisa.atividade_letiva.curso.instituto.sigla,
      atividadeLetiva_cursoInstituto_Campus: pesquisa.atividade_letiva.curso.instituto.campus,
      atividadeLetiva_cursoNivel: pesquisa.atividade_letiva.curso.nivel,
      atividadeLetiva_cursosigla: pesquisa.atividade_letiva.curso.sigla,
      atividadeLetiva_docentes_envolvidos: pesquisa.atividade_letiva.docentes_envolvidos,
      atividadeLetiva_carga_horaria_docentes_envolvidos: pesquisa.atividade_letiva.carga_horaria_docentes_envolvidos,
      atividadePedagogicaComplementar_ano: pesquisa.atividade_pedagogica_complementar.ano,
      atividadePedagogicaComplementar_semestre: pesquisa.atividade_pedagogica_complementar.semestre,
      atividadePedagogicaComplementar_carga_horaria_semanal: pesquisa.atividade_pedagogica_complementar.carga_horaria_semanal,
      atividadePedagogicaComplementar_docentes_envolvidos: pesquisa.atividade_pedagogica_complementar.docentes_envolvidos,
      atividadePedagogicaComplementar_carga_horaria_docentes_envolvidos: pesquisa.atividade_pedagogica_complementar.carga_horaria_docentes_envolvidos,
      orientado_ano: pesquisa.orientado.ano,
      orientado_semestre: pesquisa.orientado.semestre,
      orientado_nome: pesquisa.orientado.nome,
      orientado_matricula: pesquisa.orientado.matricula,
      orientado_curso: pesquisa.orientado.curso,
      orientado_tipo: pesquisa.orientado.tipo,
      orientado_atividade_ano: pesquisa.orientado.atividade.ano,
      orientado_atividade_semestre: pesquisa.orientado.atividade.semestre,
      orientado_atividade_carga_horaria: pesquisa.orientado.atividade.carga_horaria,
      orientado_atividade_tipo: pesquisa.orientado.atividade.tipo,
      bancaExaminacao_nomeCandidato: pesquisa.banca_examinacao.nome_candidato,
      bancaExaminacao_tituloTrabalho: pesquisa.banca_examinacao.titulo_trabalho,
      bancaExaminacao_ies: pesquisa.banca_examinacao.ies,
      bancaExaminacao_tipo: pesquisa.banca_examinacao.tipo,
      bancaExaminacao_ano: pesquisa.banca_examinacao.ano,
      bancaExaminacao_semestre: pesquisa.banca_examinacao.semestre,


    })
  }

  adicionardisciplina() {
    const creds = this.form.get('atividadeLetiva_nomeDisciplina') as FormArray;
    creds.push(this.formBuilder.group({
      atividadeLetiva_nomeDisciplina: '',
    }));
    console.log(creds)
  }

  removeNomeDisciplina( index : any) {
    const control = this.form.get('atividadeLetiva_nomeDisciplina') as FormArray;
    control.removeAt(index);
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
    console.log(this.form.getRawValue())
    const formValue = this.form.getRawValue();
    if (!this.form.valid) {
      this._snackbar.open('Preencha todos os campos.', 'OK', {
        duration: 5000
      });
      return;
    }

    try {
      this.isCreate ?
        await this.pesquisaService.create('pesquisa',formValue) :
        await this.pesquisaService.update('pesquisa',this.pesquisaId, formValue);
        this._snackbar.open('Relátorio de pesquisa salvo com sucesso.', 'OK', {
          duration: 5000
        });
      location.reload();
    } catch (error) {
      console.error(error);
      this._snackbar.open('Erro ao salvar Relátorio de pesquisa.', 'OK', {
        duration: 5000
      });
    }
    console.log(formValue)
  }

}


