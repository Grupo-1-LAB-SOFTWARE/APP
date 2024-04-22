export interface projetoExtensao {
  numero_doc:               number;
  titulo:                   string;
  funcao:                   string;
  cadastro_propex:          string;
  situacao_atual:           string;
}

export interface estagioExtensao {
  numero_doc:               number;
  area_conhecimento:        string;
  instituicao_ou_local:     string;
  periodo:                  string;
  ch_semanal:               number;
}

export interface atividadeEnsinoNaoFormal {
  numero_doc:                   number;
  atividade:                    string;
  ch_total_primeiro_semestre:   string;
  ch_total_segundo_semestre:    string;
}

export interface outraAtividadeExtensao {
  numero_doc:                   number;
  descricao:                    string;
  ch_total_primeiro_semestre:   string;
  ch_total_segundo_semestre:    string;
}

export interface chSemanalAtividadesExtensao {
  ch_semanal_primeiro_semestre:  number;
  ch_semanal_segundo_semestre:   number;
}

export interface IprojetoExtensao {
  id:                       number;
  numero_doc:               number;
  titulo:                   string;
  funcao:                   string;
  cadastro_propex:          string;
  situacao_atual:           string;
}

export interface IestagioExtensao {
  id:                       number;
  numero_doc:               number;
  area_conhecimento:        string;
  instituicao_ou_local:     string;
  periodo:                  string;
  ch_semanal:               number;
}

export interface IatividadeEnsinoNaoFormal {
  id:                           number;
  numero_doc:                   number;
  atividade:                    string;
  ch_total_primeiro_semestre:   string;
  ch_total_segundo_semestre:    string;
}

export interface IoutraAtividadeExtensao {
  id:                           number;
  numero_doc:                   number;
  descricao:                    string;
  ch_total_primeiro_semestre:   string;
  ch_total_segundo_semestre:    string;
}

export interface IchSemanalAtividadesExtensao {
  id:                            number;
  ch_semanal_primeiro_semestre:  number;
  ch_semanal_segundo_semestre:   number;
}

export interface extensao {
  id: number,

  nome: string,

  projeto_extensao: projetoExtensao,

  estagio_extensao: estagioExtensao,

  atividade_ensino_nao_formal: atividadeEnsinoNaoFormal,

  outra_atividade_extensao: outraAtividadeExtensao,

  ch_semanal_atividades_extensao: chSemanalAtividadesExtensao,
}
