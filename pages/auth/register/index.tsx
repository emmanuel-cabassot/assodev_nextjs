import Head from 'next/head';
import { Inter } from '@next/font/google';
import AuthRegisterForm from '../../../src/components/auth/auth-register-form';

const inter = Inter({ subsets: ['latin'] })

const Register = ({ data }: { data: any }) => {

  return (
    <>
      <Head>
        <title>Asso Dev</title>
        <meta name="description" content="Cherche et trouve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <AuthRegisterForm />
      
    </>
  );
};

export default Register;