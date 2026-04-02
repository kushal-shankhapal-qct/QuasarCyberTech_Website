import { ViteReactSSG } from 'vite-react-ssg';

import { routes } from './App';
import './styles.css';

const patchBrowserLogging = () => {
  const BROWSER_NOISE_PATTERN = /(chrome-extension:|moz-extension:|safari-extension:|ERR_BLOCKED_BY_CLIENT)/i;

  const isSameOriginAssetSource = (source?: string): boolean => {
    if (!source) return false;
    if (BROWSER_NOISE_PATTERN.test(source)) return false;

    try {
      const url = new URL(source, window.location.href);
      return url.origin === window.location.origin && /\/assets\/.*\.js$/i.test(url.pathname);
    } catch {
      return false;
    }
  };

  const shouldRedirectTo404 = (value: unknown): boolean => {
    const text = typeof value === 'string'
      ? value
      : value instanceof Error
        ? `${value.message} ${value.stack || ''}`
        : JSON.stringify(value || '');

    if (BROWSER_NOISE_PATTERN.test(text)) {
      return false;
    }

    return (
      /Unexpected token\s*</i.test(text) ||
      /<!DOCTYPE\s+html/i.test(text) ||
      /Minified React error #418/i.test(text)
    );
  };

  const redirectTo404 = () => {
    if (window.location.pathname === '/404') return;
    window.location.assign('/404');
  };

  const postToParent = (level: string, ...args: any[]): void => {
    if (window.parent !== window) {
      window.parent.postMessage(
        {
          type: 'iframe-console',
          level,
          args,
        },
        '*',
      );
    }
  };

  window.onerror = function (message, source, lineno, colno, error) {
    const blob = `${String(message || '')} ${String(error?.message || '')}`;
    if (isSameOriginAssetSource(source) && shouldRedirectTo404(blob)) {
      redirectTo404();
    }

    postToParent('error', '[Meku_Error_Caught]', {
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
    });
  };

  window.onunhandledrejection = function (event) {
    const reasonText = typeof event.reason === 'string'
      ? event.reason
      : `${event.reason?.message || ''} ${event.reason?.stack || ''}`;

    const hasSameOriginBundleInStack =
      reasonText.includes(window.location.origin) && /\/assets\/.*\.js/i.test(reasonText);

    if (hasSameOriginBundleInStack && shouldRedirectTo404(event.reason)) {
      redirectTo404();
    }

    postToParent('error', '[Meku_Error_Caught]', { reason: event.reason });
  };

  (['log', 'warn', 'info', 'error'] as const).forEach((level) => {
    const original = console[level];
    console[level] = (...args: any[]) => {
      postToParent(level, ...args);
      original(...args);
    };
  });
};

export const createRoot = ViteReactSSG(
  {
    routes,
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true,
    },
  },
  ({ isClient }) => {
    if (isClient) {
      patchBrowserLogging();
    }
  },
  {
    rootContainer: '#root',
    transformState(state) {
      return state;
    },
  },
);
