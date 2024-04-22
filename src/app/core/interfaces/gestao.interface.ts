export interface atividadeGestaoRepresentacao {
  numero_doc:               number;
  cargo_e_ou_funcao:        string;
  semestre:                 number;
  ch_semanal:               number;
  ato_de_designacao:        string;
  periodo:                  string;
}

export interface qualificacaoDocenteAcademicaProfissional {
  numero_doc:                       number;
  atividades:                       string;
  portaria_e_ou_data_de_realizacao: string;
}

export interface outraInformacao {
  numero_doc:               number;
  atividades:               string;
}

export interface afastamento {
  numero_doc:               number;
  motivacao:                string;
  portaria:                 string;
}

export interface IatividadeGestaoRepresentacao {
  id:                       number;
  numero_doc:               number;
  cargo_e_ou_funcao:        string;
  semestre:                 number;
  ch_semanal:               number;
  ato_de_designacao:        string;
  periodo:                  string;
}

export interface IqualificacaoDocenteAcademicaProfissional {
  id:                               number;
  numero_doc:                       number;
  atividades:                       string;
  portaria_e_ou_data_de_realizacao: string;
}

export interface IoutraInformacao {
  id:                       number;
  numero_doc:               number;
  atividades:               string;
}

export interface Iafastamento {
  id:                       number;
  numero_doc:               number;
  motivacao:                string;
  portaria:                 string;
}

export interface gestao {
  id: number,

  nome: string,

  atividade_gestao_representacao: atividadeGestaoRepresentacao,

  qualificacao_docente_academica_profissional: qualificacaoDocenteAcademicaProfissional,

  outra_informacao: outraInformacao

  afastamento: afastamento
}

