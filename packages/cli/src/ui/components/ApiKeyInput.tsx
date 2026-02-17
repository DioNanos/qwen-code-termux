/**
 * @license
 * Copyright 2025 Qwen Team
 * SPDX-License-Identifier: Apache-2.0
 */

import type React from 'react';
import { useState } from 'react';
import { Box, Text } from 'ink';
import { TextInput } from './shared/TextInput.js';
import { theme } from '../semantic-colors.js';
import { useKeypress } from '../hooks/useKeypress.js';
import { t } from '../../i18n/index.js';
import Link from 'ink-link';

interface ApiKeyInputProps {
  onSubmit: (apiKey: string) => void;
  onCancel: () => void;
}

const CODING_PLAN_API_KEY_URL =
  'https://bailian.console.aliyun.com/?tab=model#/efm/coding_plan';

export function ApiKeyInput({
  onSubmit,
  onCancel,
}: ApiKeyInputProps): React.JSX.Element {
  const [apiKey, setApiKey] = useState('');
  const [error, setError] = useState<string | null>(null);

  useKeypress(
    (key) => {
      if (key.name === 'escape') {
        onCancel();
      } else if (key.name === 'return') {
        const trimmedKey = apiKey.trim();
        if (!trimmedKey) {
          setError(t('API key cannot be empty.'));
          return;
        }
        onSubmit(trimmedKey);
      }
    },
    { isActive: true },
  );

  return (
    <Box flexDirection="column">
      <Box marginBottom={1}>
        <Text>{t('Please enter your API key:')}</Text>
      </Box>
      <TextInput value={apiKey} onChange={setApiKey} placeholder="sk-sp-..." />
      {error && (
        <Box marginTop={1}>
          <Text color={theme.status.error}>{error}</Text>
        </Box>
      )}
      <Box marginTop={1}>
        <Text>{t('You can get your exclusive Coding Plan API-KEY here:')}</Text>
      </Box>
      <Box marginTop={0}>
        <Link url={CODING_PLAN_API_KEY_URL} fallback={false}>
          <Text color={theme.status.success} underline>
            {CODING_PLAN_API_KEY_URL}
          </Text>
        </Link>
      </Box>
      <Box marginTop={1}>
        <Text color={theme.text.secondary}>
          {t('(Press Enter to submit, Escape to cancel)')}
        </Text>
      </Box>
    </Box>
  );
}
