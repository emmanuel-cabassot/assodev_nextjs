import '../styles/globals.css';
import '../styles/general.sass';
import type { AppProps } from 'next/app';
import React, { useEffect, useContext } from 'react';
import MainLayout from '../src/components/layout/main-layout';
import { AuthProvider } from '../src/context/authContext';
import { LayoutProvider } from '../src/context/layoutContext';
import { CreateProjectFormProvider } from '../src/context/createProjectFormContext';
import { UserContext, UserProvider } from '../src/context/userContext';

export default function App({ Component, pageProps }: AppProps) {

  

  return (
    <>
    <CreateProjectFormProvider>
      <AuthProvider>
        <LayoutProvider>
        <UserProvider>
          <MainLayout>
            <Component {...pageProps} />
          </MainLayout>
        </UserProvider>
        </LayoutProvider>
      </AuthProvider>
    </CreateProjectFormProvider>
    </>
  );
};