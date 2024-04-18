export interface projetoPesquisaProducaoIntelectual {
  numero_doc:               number;
  titulo:                   string;
  funcao:                   string;
  cadastro_proped:          string;
  situacao_atual:           string;
}

export interface trabalhoCompletoPublicadoPeriodicoBoletimTecnico {
  numero_doc:               number;
  descricao:                string;
}

export interface livroCapituloVerbetePublicado {
  numero_doc:               number;
  descricao:                string;
}

export interface trabalhoCompletoResumoPublicadoApresentadoCongressos {
  numero_doc:               number;
  descricao:                string;
}

export interface outraAtividadePesquisaProducaoIntelectual {
  numero_doc:               number;
  descricao:                string;
}

export interface chSemanalAtividadesPesquisa {
  ch_semanal_primeiro_semestre:  number;
  ch_semanal_segundo_semestre:   number;
}

export interface IprojetoPesquisaProducaoIntelectual {
  id:                       number;
  numero_doc:               number;
  titulo:                   string;
  funcao:                   string;
  cadastro_proped:          string;
  situacao_atual:           string;
}

export interface ItrabalhoCompletoPublicadoPeriodicoBoletimTecnico {
  id:                       number;
  numero_doc:               number;
  descricao:                string;
}

export interface IlivroCapituloVerbetePublicado {
  id:                       number;
  numero_doc:               number;
  descricao:                string;
}

export interface ItrabalhoCompletoResumoPublicadoApresentadoCongressos {
  id:                       number;
  numero_doc:               number;
  descricao:                string;
}

export interface IoutraAtividadePesquisaProducaoIntelectual {
  id:                       number;
  numero_doc:               number;
  descricao:                string;
}

export interface IchSemanalAtividadesPesquisa {
  id:                            number;
  ch_semanal_primeiro_semestre:  number;
  ch_semanal_segundo_semestre:   number;
}

export interface pesquisa {
  id: number,

  nome: string,

  projetos_pesquisa_producao_intelectual: projetoPesquisaProducaoIntelectual,

  trabalho_completo_publicado_periodico_boletim_tecnico: trabalhoCompletoPublicadoPeriodicoBoletimTecnico,

  livro_capitulo_verbete_publicado: livroCapituloVerbetePublicado,

  trabalho_completo_resumo_publicado_apresentado_congressos: trabalhoCompletoResumoPublicadoApresentadoCongressos,

  outra_atividade_pesquisa_producao_intelectual: outraAtividadePesquisaProducaoIntelectual,

  ch_semanal_atividades_pesquisa: chSemanalAtividadesPesquisa,
}

