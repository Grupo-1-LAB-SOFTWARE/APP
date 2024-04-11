export interface Campus {
  id: number;
  nome: string;
  cidade: string;
  diretor: string;
}

export interface Instituto {
  id: number;
  nome: string;
  sigla: string;
  campus: Campus;
  diretor: string;
}

export interface Curso {
  id: number;
  nome: string;
  sigla: string;
  campus: Campus;
  instituto: Instituto;
  nivel: string
}

export interface atividadeLetiva {
  semestre:                              number;
  codigo_disciplina:                     string;
  nome_disciplina:                       string;
  ano_e_semestre:                        string;
  curso:                                 string;
  nivel:                                 string;
  numero_turmas_teorico:                 number;
  numero_turmas_pratico:                 number;
  ch_turmas_teorico:                     number;
  ch_turmas_pratico:                     number;
  docentes_envolvidos_e_cargas_horarias: { [key: string]: number };
}

export interface atividadePedagogicaComplementar {
  id: number;
  ano: Date;
  semestre: number;
  carga_horaria_semanal: number;
  docentes_envolvidos: string[];
  carga_horaria_docentes_envolvidos: string[];
}

export interface atividadeOrientacao {
  id: number;
  ano: Date;
  semestre: number;
  carga_horaria: number;
  tipo: string;
}

export interface Orientando {
  id:number,
  ano: Date,
  semestre: number,
  nome: string,
  matricula: string,
  curso: string,
  tipo: string,
  atividade: atividadeOrientacao
}

export interface bancaExaminacao {
  id: number,
  nome_candidato: string,
  titulo_trabalho: string,
  ies: string,
  tipo: string,
  ano: number,
  semestre: number,
}

export interface ensino {
  id: number,
  atividade_letiva: atividadeLetiva,
  atividade_pedagogica_complementar: atividadePedagogicaComplementar,
  orientado: Orientando,
  banca_examinacao: bancaExaminacao
}
export interface IatividadeLetiva {
  semestre:                              number;
  codigo_disciplina:                     string;
  nome_disciplina:                       string;
  ano_e_semestre:                        string;
  curso:                                 string;
  nivel:                                 string;
  numero_turmas_teorico:                 number;
  numero_turmas_pratico:                 number;
  ch_turmas_teorico:                     number;
  ch_turmas_pratico:                     number;
  docentes_envolvidos_e_cargas_horarias: DocentesEnvolvidosECargasHorarias;
}

export interface DocentesEnvolvidosECargasHorarias {
  lista: Lista[];
}

export interface Lista {
  nome_docente:  string;
  carga_horaria: number;
}
