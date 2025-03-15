'use client';

import React, { PropsWithChildren } from 'react';
import GlobalStyles from 'styles/global';
import { SessionProvider } from 'next-auth/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/react-toastify.css';
import { ThemeProvider } from 'styled-components';
import { theme } from 'styles/theme';

export const AppProviders = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider theme={theme}>
      <SessionProvider>
        <GlobalStyles />
        <ToastContainer
          theme="colored"
          autoClose={5000}
          position="bottom-right"
          style={{
            fontSize: '15px',
            fontWeight: 'bold',
            width: 'max-content',
          }}
          hideProgressBar={true}
        />

        {children}
      </SessionProvider>
    </ThemeProvider>
  );
};
