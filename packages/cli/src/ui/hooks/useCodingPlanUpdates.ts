/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { useCallback, useEffect, useState } from 'react';
import type { Config, ModelProvidersConfig } from '@qwen-code/qwen-code-core';
import { AuthType } from '@qwen-code/qwen-code-core';
import type { LoadedSettings } from '../../config/settings.js';
import { getPersistScopeForModelSelection } from '../../config/modelProvidersScope.js';
import {
  CODING_PLAN_MODELS,
  CODING_PLAN_ENV_KEY,
  CODING_PLAN_VERSION,
} from '../../constants/codingPlan.js';
import { t } from '../../i18n/index.js';

export interface CodingPlanUpdateRequest {
  prompt: string;
  onConfirm: (confirmed: boolean) => void;
}

/**
 * Checks if a config is a Coding Plan configuration by matching baseUrl and envKey.
 * This ensures only configs from the Coding Plan provider are identified.
 */
function isCodingPlanConfig(config: {
  baseUrl?: string;
  envKey?: string;
}): boolean {
  return (
    config.envKey === CODING_PLAN_ENV_KEY &&
    CODING_PLAN_MODELS.some((template) => template.baseUrl === config.baseUrl)
  );
}

/**
 * Hook for detecting and handling Coding Plan template updates.
 * Compares the persisted version with the current template version
 * and prompts the user to update if they differ.
 */
export function useCodingPlanUpdates(
  settings: LoadedSettings,
  config: Config,
  addItem: (
    item: { type: 'info' | 'error' | 'warning'; text: string },
    timestamp: number,
  ) => void,
) {
  const [updateRequest, setUpdateRequest] = useState<
    CodingPlanUpdateRequest | undefined
  >();

  /**
   * Execute the Coding Plan configuration update.
   * Removes old Coding Plan configs and replaces them with new ones from the template.
   */
  const executeUpdate = useCallback(async () => {
    try {
      const persistScope = getPersistScopeForModelSelection(settings);

      // Get current configs
      const currentConfigs =
        (
          settings.merged.modelProviders as
            | Record<string, Array<Record<string, unknown>>>
            | undefined
        )?.[AuthType.USE_OPENAI] || [];

      // Filter out Coding Plan configs (keep user custom configs)
      const nonCodingPlanConfigs = currentConfigs.filter(
        (cfg) =>
          !isCodingPlanConfig({
            baseUrl: cfg['baseUrl'] as string | undefined,
            envKey: cfg['envKey'] as string | undefined,
          }),
      );

      // Generate new configs from template with the stored API key
      const apiKey = process.env[CODING_PLAN_ENV_KEY];
      if (!apiKey) {
        throw new Error(
          t(
            'Coding Plan API key not found. Please re-authenticate with Coding Plan.',
          ),
        );
      }

      const newConfigs = CODING_PLAN_MODELS.map((templateConfig) => ({
        ...templateConfig,
        envKey: CODING_PLAN_ENV_KEY,
      }));

      // Combine: new Coding Plan configs at the front, user configs preserved
      const updatedConfigs = [
        ...newConfigs,
        ...(nonCodingPlanConfigs as Array<Record<string, unknown>>),
      ] as Array<Record<string, unknown>>;

      // Persist updated model providers
      settings.setValue(
        persistScope,
        `modelProviders.${AuthType.USE_OPENAI}`,
        updatedConfigs,
      );

      // Update the version
      settings.setValue(
        persistScope,
        'codingPlan.version',
        CODING_PLAN_VERSION,
      );

      // Hot-reload model providers configuration
      const updatedModelProviders = {
        ...(settings.merged.modelProviders as
          | Record<string, unknown>
          | undefined),
        [AuthType.USE_OPENAI]: updatedConfigs,
      };
      config.reloadModelProvidersConfig(
        updatedModelProviders as unknown as ModelProvidersConfig,
      );

      // Refresh auth with the new configuration
      await config.refreshAuth(AuthType.USE_OPENAI);

      addItem(
        {
          type: 'info',
          text: t(
            'Coding Plan configuration updated successfully. New models are now available.',
          ),
        },
        Date.now(),
      );

      return true;
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      addItem(
        {
          type: 'error',
          text: t('Failed to update Coding Plan configuration: {{message}}', {
            message: errorMessage,
          }),
        },
        Date.now(),
      );
      return false;
    }
  }, [settings, config, addItem]);

  /**
   * Check for version mismatch and prompt user for update if needed.
   */
  const checkForUpdates = useCallback(() => {
    const savedVersion = (
      settings.merged as { codingPlan?: { version?: string } }
    ).codingPlan?.version;

    // If no version is stored, user hasn't used Coding Plan yet - skip check
    if (!savedVersion) {
      return;
    }

    // If versions match, no update needed
    if (savedVersion === CODING_PLAN_VERSION) {
      return;
    }

    // Version mismatch - prompt user for update
    setUpdateRequest({
      prompt: t(
        'New model configurations are available for Bailian Coding Plan. Update now?',
      ),
      onConfirm: async (confirmed: boolean) => {
        setUpdateRequest(undefined);
        if (confirmed) {
          await executeUpdate();
        }
      },
    });
  }, [settings, executeUpdate]);

  // Check for updates on mount
  useEffect(() => {
    checkForUpdates();
  }, [checkForUpdates]);

  const dismissCodingPlanUpdate = useCallback(() => {
    setUpdateRequest(undefined);
  }, []);

  return {
    codingPlanUpdateRequest: updateRequest,
    dismissCodingPlanUpdate,
  };
}
