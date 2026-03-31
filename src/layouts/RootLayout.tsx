import React, { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Theme } from '@radix-ui/themes';
import { ToastContainer } from 'react-toastify';
import { HelmetProvider } from 'react-helmet-async';

import '@radix-ui/themes/styles.css';
import 'react-toastify/dist/ReactToastify.css';

import { themeConfig } from '../config/themeConfig';

const RootLayout: React.FC = () => {
  useEffect(() => {
    const theme = (themeConfig.themes as Record<string, Record<string, string>>)[themeConfig.activeTheme];
    if (!theme) {
      return;
    }

    Object.entries(theme).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
    });
  }, []);

  return (
    <HelmetProvider>
      <Theme appearance="inherit" radius="large" scaling="100%">
        {/* Individual pages define their own <main> — no wrapper <main> here */}
        <Suspense fallback={null}>
          <Outlet />
        </Suspense>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop
          closeOnClick
          pauseOnHover
        />
      </Theme>
    </HelmetProvider>
  );
};

export default RootLayout;
