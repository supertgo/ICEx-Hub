import { getAxiosFeatureFlagClient } from 'src/boot/axios';
import type { FeatureFlagConfig } from './config';

interface FeatureFlagResponse {
  data: {
    id: string;
    name: string;
    description: string;
    enabled: boolean;
    createdAt: string;
    updatedAt: string;
    targetUser?: {
      id: string;
      featureFlagId: string;
      userId: string;
      enabled: boolean;
    };
  };
}

export class FeatureFlagClient {
  static async isEnabled(
    flag: FeatureFlagConfig,
    appUserId?: string,
  ): Promise<boolean> {
    try {
      const params = new URLSearchParams({
        featureFlagName: flag.name,
      });

      if (appUserId) {
        params.append('appUserId', appUserId);
      }

      const response =
        await getAxiosFeatureFlagClient().get<FeatureFlagResponse>(
          `feature-flag/client?${params.toString()}`,
        );

      if (response.data.data.targetUser) {
        return response.data.data.targetUser.enabled;
      }

      return response.data.data.enabled;
    } catch (error) {
      console.warn(
        `Feature flag "${flag.name}" check failed, using default value: ${flag.defaultValue}`,
        error,
      );
      return flag.defaultValue;
    }
  }
}
