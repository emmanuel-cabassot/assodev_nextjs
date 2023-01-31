import '../styles/globals.css';
import '../styles/general.sass';
import type { AppProps } from 'next/app';
import MainLayout from '../src/components/layout/main-layout';
import { AuthProvider } from '../src/context/authContext';
import React, { useEffect, useContext } from 'react';

import { UserContext, UserProvider } from '../src/context/userContext';

export default function App({ Component, pageProps }: AppProps) {

  

  return (
    <>
      <AuthProvider>
        <UserProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </UserProvider>
      </AuthProvider>
    </>
  );
};