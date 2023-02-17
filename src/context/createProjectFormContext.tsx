import React, { createContext, useState, useEffect } from 'react';
import Router from 'next/router';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const CreateProjectFormContext = createContext({
    name: '' as string,
    saveName: (name: any) => { },
    shortDescription: '',
    saveShortDescription: (shortDescription: any) => { },
    description: '',
    saveDescription: (description: any) => { },
    image: {},
    saveImage: (image: any) => { },
    imageUrl: '',
    saveImageUrl: (imageUrl: any) => { },
    statusProject: '',
    saveStatusProject: (statusProject: any) => { },
    isComplete: false,
    registerProject: (formData: any, image: any) => { },

});

export const CreateProjectFormProvider = ({ children }: { children: React.ReactNode }) => {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState({});
    const [imageUrl, setImageUrl] = useState(`${urlApiNest}/project/project-image/switch3415c855-02fc-4371-9154-730beeb60595.png`);
    const [statusProject, setStatusProject] = useState('');
    const [isComplete, setIsComplete] = useState(false);

    const saveName = (name: any) => {
        console.log('name du context', name);
        setName(name);
    };

    const saveShortDescription = (shortDescription: any) => {
        console.log('short descripiton du context', shortDescription);
        setShortDescription(shortDescription);
    };

    const saveDescription = (description: any) => {
        console.log('description du context', description);
        setDescription(description);
    };

    const saveImage = (image: any) => {
        console.log('image du context', image);
        setImage(image);
    };

    const saveImageUrl = (imageUrl: any) => {
        console.log('image url du context', imageUrl);
        setImageUrl(imageUrl);
    };

    const saveStatusProject = (statusProject: any) => {
        console.log('status du context', statusProject);
        setStatusProject(statusProject);
    };
    
    const isCompleteForm = () => {
        if (name && shortDescription !== '') {
            setIsComplete(true);
        }
    }

    const registerProject = async (formData: any, image: any) => {
        const formDataProject = new FormData();
        formDataProject.append('name', formData.name);
        formDataProject.append('shortDescription', formData.shortDescription);
        formDataProject.append('description', formData.description);
        formDataProject.append('image', image);
        formDataProject.append('statusProject', formData.statusProject);
        formDataProject.append('userId', '1');
        const response = await fetch('http://localhost:3000/api/project', {
            method: 'POST',
            body: formDataProject,
        });
        const data = await response.json();
        if (data) {
            setIsComplete(true);
            Router.push('/projects');
        }
    };

    const context = {
        name,
        saveName,
        shortDescription,
        saveShortDescription,
        description,
        saveDescription,
        image,
        saveImage,
        imageUrl,
        saveImageUrl,
        statusProject,
        saveStatusProject,
        isComplete,
        registerProject,
    };
    return (
        <CreateProjectFormContext.Provider value={context}>
            {children}
        </CreateProjectFormContext.Provider>
    );
};