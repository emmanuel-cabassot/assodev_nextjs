import React, { useState, useEffect } from 'react';
import { allProjectReqApi } from '../../api/projectDev/projects/allProject';
import ProjectsIndex from '../../src/components/projects/projectsIndex';


const ProjectsPage = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        async function getProjects() {
            const getProjects = await allProjectReqApi()
            setProjects(getProjects)
        }
        getProjects();

    }, []);

    return (
        <div>
            <h1>Projects</h1>
            <ProjectsIndex projects={projects} />


        </div>
    );
};

export default ProjectsPage;