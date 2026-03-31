import { ViteReactSSG } from 'vite-react-ssg';
import { HelmetProvider } from 'react-helmet-async';

import { routes } from './App';
import './styles.css';

const patchBrowserLogging = () => {
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
    postToParent('error', '[Meku_Error_Caught]', {
      message,
      source,
      lineno,
      colno,
      stack: error?.stack,
    });
  };

  window.onunhandledrejection = function (event) {
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
  ({ isClient, app }) => {
    // Wrap the entire app in HelmetProvider for react-helmet-async to work
    // during both SSG pre-rendering and client hydration
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
