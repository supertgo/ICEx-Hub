export interface FeatureFlagConfig {
  name: string;
  defaultValue: boolean;
  description?: string;
}

export const FEATURE_FLAGS = {
  ALTERAR_NOME: {
    name: 'ALTERAR_NOME',
    defaultValue: true,
    description: 'Dar permissão para o usuário mudar o nome na aplicação',
  },
  PESQUISA: {
    name: 'PESQUISA',
    defaultValue: true,
    description: 'Dar permissão para o usuário mudar o nome na aplicação',
  },
  FILTRAR_POR_DIAS: {
    name: 'FILTRAR_POR_DIAS',
    defaultValue: true,
    description: 'Permite ao usuário filtrar as disciplinas pelos dias',
  },
  LIMPAR_FILTROS: {
    name: 'LIMPAR_FILTROS',
    defaultValue: true,
    description: 'Limpar filtros',
  },
  BLOQUEIA_FILTRO_PERSONALIZADO: {
    name: 'BLOQUEIA_FILTRO_PERSONALIZADO',
    defaultValue: false,
    description: 'Limpar filtros',
  },
} as const satisfies Record<string, FeatureFlagConfig>;

export type FeatureFlagRecord = Record<string, boolean>;
