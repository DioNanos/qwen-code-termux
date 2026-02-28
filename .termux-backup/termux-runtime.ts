/**
 * Termux runtime patches for Android/Node compatibility.
 */

declare global {
  interface Uint8ArrayConstructor {
    fromBase64?: (base64: string, options?: unknown) => Uint8Array;
  }
  interface Uint8Array {
    toBase64?: (options?: unknown) => string;
  }
}

// Uint8Array base64 polyfill for Node versions missing it (e.g., Node 22/24 with web-tree-sitter).
if (typeof Uint8Array.fromBase64 !== 'function') {
  Uint8Array.fromBase64 = (base64: string) => {
    const buf = Buffer.from(base64, 'base64');
    return new Uint8Array(buf.buffer, buf.byteOffset, buf.byteLength);
  };
}

if (typeof Uint8Array.prototype.toBase64 !== 'function') {
  Uint8Array.prototype.toBase64 = function () {
    return Buffer.from(this).toString('base64');
  };
}

if (process.platform === 'android') {
  if (process.env['PREFIX'] && !process.env['TERMUX__PREFIX']) {
    process.env['TERMUX__PREFIX'] = process.env['PREFIX'];
  }

  // Suppress noisy punycode deprecation warnings on Android.
  const origEmit = process.emit.bind(process);
  process.emit = ((...args: Parameters<typeof process.emit>) => {
    const name = args[0] as string | symbol;
    const warning = args[1] as { name?: string; message?: string } | undefined;
    if (name === 'warning') {
      if (
        warning?.name === 'DeprecationWarning' &&
        warning.message?.includes('punycode')
      ) {
        return false;
      }
    }
    return origEmit(...args);
  }) as typeof process.emit;
}

export {};
