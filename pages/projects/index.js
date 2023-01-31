import Head from 'next/head';
import { Inter } from '@next/font/google';
import data from '../../data/data.json';
import { ProjectPage } from '../../src/components/projects/project-page';
import { allProjectReqApi } from '../../api/projectDev/projects/allProject';

const inter = Inter({ subsets: ['latin'] })

const Projects = ({data}) => {  
  return (
    <>
      <Head>
        <title>Asso Dev</title>
        <meta name="description" content="Cherche et trouve" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ProjectPage data={data}/>
    </>
  );
};

export default Projects;

export async function getStaticProps() {
  const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;
  const response = await fetch(`${urlApiNest}/project`, {
    method: 'GET',
});

    const projectss = await response.json();
   

  return {
    props: {
      data: projectss,
    },
  };
}
