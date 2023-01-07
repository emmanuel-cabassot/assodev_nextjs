import Head from 'next/head';
import { Inter } from '@next/font/google';
import AuthLoginForm from '../../../src/components/auth/auth-login-form';

const inter = Inter({ subsets: ['latin'] })

const Login = ({ data }: { data: any }) => {

  return (
    <>
      <Head>
        <title>Asso Dev</title>
        <meta name="description" content="Cherche et trouve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthLoginForm />
    </>
  );
};

export default Login;