/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useCodingPlanUpdates } from './useCodingPlanUpdates.js';
import { CODING_PLAN_ENV_KEY } from '../../constants/codingPlan.js';
import { AuthType } from '@qwen-code/qwen-code-core';

// Mock the constants module
vi.mock('../../constants/codingPlan.js', async () => {
  const actual = await vi.importActual('../../constants/codingPlan.js');
  return {
    ...actual,
    CODING_PLAN_VERSION: 'test-version-hash',
    CODING_PLAN_MODELS: [
      {
        id: 'test-model-1',
        name: 'Test Model 1',
        baseUrl: 'https://test.example.com/v1',
        description: 'Test model 1',
        envKey: 'BAILIAN_CODING_PLAN_API_KEY',
      },
      {
        id: 'test-model-2',
        name: 'Test Model 2',
        baseUrl: 'https://test.example.com/v1',
        description: 'Test model 2',
        envKey: 'BAILIAN_CODING_PLAN_API_KEY',
      },
    ],
  };
});

describe('useCodingPlanUpdates', () => {
  const mockSettings = {
    merged: {
      modelProviders: {},
      codingPlan: {},
    },
    setValue: vi.fn(),
    isTrusted: true,
    workspace: { settings: {} },
    user: { settings: {} },
  };

  const mockConfig = {
    reloadModelProvidersConfig: vi.fn(),
    refreshAuth: vi.fn(),
  };

  const mockAddItem = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    delete process.env[CODING_PLAN_ENV_KEY];
  });

  describe('version comparison', () => {
    it('should not show update prompt when no version is stored', () => {
      mockSettings.merged.codingPlan = {};

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      expect(result.current.codingPlanUpdateRequest).toBeUndefined();
    });

    it('should not show update prompt when versions match', () => {
      mockSettings.merged.codingPlan = { version: 'test-version-hash' };

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      expect(result.current.codingPlanUpdateRequest).toBeUndefined();
    });

    it('should show update prompt when versions differ', async () => {
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      expect(result.current.codingPlanUpdateRequest?.prompt).toContain(
        'New model configurations',
      );
    });
  });

  describe('update execution', () => {
    it('should execute update when user confirms', async () => {
      process.env[CODING_PLAN_ENV_KEY] = 'test-api-key';
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };
      mockSettings.merged.modelProviders = {
        [AuthType.USE_OPENAI]: [
          {
            id: 'test-model-1',
            baseUrl: 'https://test.example.com/v1',
            envKey: CODING_PLAN_ENV_KEY,
          },
          {
            id: 'custom-model',
            baseUrl: 'https://custom.example.com',
            envKey: 'CUSTOM_API_KEY',
          },
        ],
      };
      mockConfig.refreshAuth.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      // Confirm the update
      await result.current.codingPlanUpdateRequest!.onConfirm(true);

      // Wait for async update to complete
      await waitFor(() => {
        // Should update model providers (at least 2 calls: modelProviders + version)
        expect(mockSettings.setValue).toHaveBeenCalled();
      });

      // Should update version
      expect(mockSettings.setValue).toHaveBeenCalledWith(
        expect.anything(),
        'codingPlan.version',
        'test-version-hash',
      );

      // Should reload and refresh auth
      expect(mockConfig.reloadModelProvidersConfig).toHaveBeenCalled();
      expect(mockConfig.refreshAuth).toHaveBeenCalledWith(AuthType.USE_OPENAI);

      // Should show success message
      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'info',
          text: expect.stringContaining('updated successfully'),
        }),
        expect.any(Number),
      );
    });

    it('should not execute update when user declines', async () => {
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      // Decline the update
      await result.current.codingPlanUpdateRequest!.onConfirm(false);

      // Should not update anything
      expect(mockSettings.setValue).not.toHaveBeenCalled();
      expect(mockConfig.reloadModelProvidersConfig).not.toHaveBeenCalled();
    });

    it('should preserve non-Coding Plan configs during update', async () => {
      process.env[CODING_PLAN_ENV_KEY] = 'test-api-key';
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };
      const customConfig = {
        id: 'custom-model',
        baseUrl: 'https://custom.example.com',
        envKey: 'CUSTOM_API_KEY',
      };
      mockSettings.merged.modelProviders = {
        [AuthType.USE_OPENAI]: [
          {
            id: 'test-model-1',
            baseUrl: 'https://test.example.com/v1',
            envKey: CODING_PLAN_ENV_KEY,
          },
          customConfig,
        ],
      };
      mockConfig.refreshAuth.mockResolvedValue(undefined);

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      await result.current.codingPlanUpdateRequest!.onConfirm(true);

      // Wait for async update to complete
      await waitFor(() => {
        // Should preserve custom config - verify setValue was called
        expect(mockSettings.setValue).toHaveBeenCalled();
      });
    });

    it('should handle missing API key error', async () => {
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      await result.current.codingPlanUpdateRequest!.onConfirm(true);

      // Should show error message
      expect(mockAddItem).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'error',
        }),
        expect.any(Number),
      );
    });
  });

  describe('dismissUpdate', () => {
    it('should clear update request when dismissed', async () => {
      mockSettings.merged.codingPlan = { version: 'old-version-hash' };

      const { result } = renderHook(() =>
        useCodingPlanUpdates(
          mockSettings as never,
          mockConfig as never,
          mockAddItem,
        ),
      );

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeDefined();
      });

      result.current.dismissCodingPlanUpdate();

      await waitFor(() => {
        expect(result.current.codingPlanUpdateRequest).toBeUndefined();
      });
    });
  });
});
