import Head from 'next/head';
import { Inter } from '@next/font/google';
import data from './../data/data.json';
import { HomePage } from '../src/components/home/home-page';

const inter = Inter({ subsets: ['latin'] })

const Home = ({ data }: { data: any }) => {
  return (
    <>
      <Head>
        <title>Asso Dev</title>
        <meta name="description" content="Cherche et trouve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage data={data} />
    </>
  );
};

export default Home;

export async function getStaticProps() {
  const { events_categories } = await data;
  return {
    props: {
      data: events_categories,
    },
  };
}