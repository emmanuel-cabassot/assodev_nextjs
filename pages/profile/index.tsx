import Head from 'next/head';
import { Inter } from '@next/font/google';
import ProfileIndex from '../../src/components/profile/profile-index';

const inter = Inter({ subsets: ['latin'] })

const Profile = ({ data }: { data: any }) => {

    return (
        <>
            <Head>
                <title>Asso Dev</title>
                <meta name="description" content="Cherche et trouve" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <ProfileIndex />
        </>
    );
};
export default Profile;