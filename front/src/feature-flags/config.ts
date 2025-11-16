export interface FeatureFlagConfig {
  name: string;
  defaultValue: boolean;
  description?: string;
}

export const FEATURE_FLAGS = {
  CHANGE_NAME: {
    name: 'Alterar Nome',
    defaultValue: true,
    description: 'Dar permissão para o usuário mudar o nome na aplicação',
  },
} as const satisfies Record<string, FeatureFlagConfig>;
