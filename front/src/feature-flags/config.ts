export interface FeatureFlagConfig {
  name: string;
  id: string;
  defaultValue: boolean;
  description?: string;
}

export const FEATURE_FLAGS = {
  CHANGE_NAME: {
    name: 'Alterar Nome',
    id: '71d7b92f-98c2-4252-b654-cf5453362b3e',
    defaultValue: true,
    description: 'Dar permissão para o usuário mudar o nome na aplicação',
  },
} as const satisfies Record<string, FeatureFlagConfig>;
