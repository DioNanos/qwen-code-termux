/**
 * @license
 * Copyright 2025 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */

// TERMUX PATCH: TTS Notification tool for Android/Termux

import { exec } from 'node:child_process';
import { isTermux } from '../utils/termux-detect.js';
import { createDebugLogger } from '../utils/debugLogger.js';
import type { MessageBus } from '../confirmation-bus/message-bus.js';
import {
  BaseDeclarativeTool,
  BaseToolInvocation,
  type ToolResult,
  Kind,
} from './tools.js';
import { ToolNames, ToolDisplayNames } from './tool-names.js';

const debugLogger = createDebugLogger('TTS_NOTIFICATION');

export interface TtsNotificationParams {
  message: string;
}

const MAX_MESSAGE_LENGTH = 200;

const TTS_TOOL_DESCRIPTION = `Speak a notification using text-to-speech on Termux.
Use when a task completes or needs user attention.
Only available on Android/Termux - silently ignored elsewhere.`;

const TTS_SCHEMA = {
  type: 'object',
  properties: {
    message: {
      type: 'string',
      maxLength: MAX_MESSAGE_LENGTH,
      description: 'Message to speak (max 200 chars)',
    },
  },
  required: ['message'],
} as const;

export class TtsNotificationTool extends BaseDeclarativeTool<
  TtsNotificationParams,
  ToolResult
> {
  constructor(_messageBus: MessageBus) {
    super(
      ToolNames.TTS_NOTIFICATION,
      ToolDisplayNames.TTS_NOTIFICATION,
      TTS_TOOL_DESCRIPTION,
      Kind.Other,
      TTS_SCHEMA.properties as Record<string, unknown>,
    );
  }

  protected createInvocation(
    params: TtsNotificationParams,
  ): BaseToolInvocation<TtsNotificationParams, ToolResult> {
    return new TtsNotificationInvocation(params);
  }
}

export class TtsNotificationInvocation extends BaseToolInvocation<
  TtsNotificationParams,
  ToolResult
> {
  constructor(params: TtsNotificationParams) {
    super(params);
  }

  getDescription(): string {
    const msg = this.params.message;
    const truncated = msg.length > 50 ? msg.substring(0, 47) + '...' : msg;
    return `TTS: "${truncated}"`;
  }

  override async getDefaultPermission(): Promise<'allow'> {
    return 'allow';
  }

  async execute(_signal: AbortSignal): Promise<ToolResult> {
    if (!isTermux()) {
      debugLogger.debug('[TTS] Not on Termux, skipping');
      return {
        llmContent: 'TTS not available on this platform',
        returnDisplay: 'TTS: not available',
      };
    }

    const message = this.params.message.trim();
    const escaped = message.replace(/"/g, '\\"');
    const cmd = `echo "${escaped}" | termux-tts-speak`;

    return new Promise<ToolResult>((resolve) => {
      exec(cmd, { timeout: 5000 }, (error, _stdout, _stderr) => {
        if (error) {
          debugLogger.warn('[TTS] Failed:', error.message);
          resolve({
            llmContent: `TTS attempted: "${message}"`,
            returnDisplay: `[TTS] "${message}" (failed)`,
          });
          return;
        }
        debugLogger.debug('[TTS] Spoke:', message);
        resolve({
          llmContent: `TTS: "${message}"`,
          returnDisplay: `[TTS] "${message}"`,
        });
      });
    });
  }
}
