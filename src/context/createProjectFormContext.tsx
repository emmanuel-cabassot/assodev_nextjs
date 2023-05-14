import { createContext, useState, ReactNode } from 'react';
import AddProjectReqApi from '../../api/projectDev/projects/addProject';
import AddImageReqApi from '../../api/projectDev/projects/addImage';
import AddCompetenceToProjectReqApi from '../../api/projectDev/project-competence/addCompetenceToProject';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export const CreateProjectFormContext = createContext({
    name: '' as string,
    saveName: (name: any) => { },
    shortDescription: '',
    saveShortDescription: (shortDescription: any) => { },
    description: '',
    saveDescription: (description: any) => { },
    image: 'image null',
    saveImage: (image: any) => { },
    imageUrl: '',
    saveImageUrl: (imageUrl: any) => { },
    competences: [],
    saveCompetences: (competences: any) => { },
    isOnLineProject: false,
    saveIsOnLineProject: (statusProject: boolean) => { },
    isSearchPersonn: false,
    saveIsSearchPersonn: (statusSearchPersonn: boolean) => { },
    VerifyIsCompleteForm: () => { },
    isComplete: false,
    registerProject: () => { },
    missingInformation: () => { },
});

export const CreateProjectFormProvider = ({ children }: { children: ReactNode }) => {
    const [name, setName] = useState('');
    const [shortDescription, setShortDescription] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState('image null');
    const [imageUrl, setImageUrl] = useState(`${urlApiNest}/project/project-image/switch3415c855-02fc-4371-9154-730beeb60595.png`);
    const [competences, setCompetences] = useState([]) as any;
    const [isOnLineProject, setIsOnLineProject] = useState(false);
    const [isSearchPersonn, setIsSearchPersonn] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const saveName = (name: any) => {
        setName(name);
    };

    const saveShortDescription = (shortDescription: any) => {
        setShortDescription(shortDescription);
    };

    const saveDescription = (description: any) => {
        setDescription(description);
    };

    const saveImage = (image: any) => {
        setImage(image);
    };

    const saveImageUrl = (imageUrl: any) => {
        setImageUrl(imageUrl);
    };

    const saveCompetences = (competences: any) => {
        setCompetences(competences);
    };

    const saveIsOnLineProject = (statusProject: any) => {
        setIsOnLineProject(statusProject);
    };

    const saveIsSearchPersonn = (statusSearchPersonn: any) => {
        setIsSearchPersonn(statusSearchPersonn);
    };

    const VerifyIsCompleteForm = () => {
        if (name != '' && shortDescription != '' && description.replace(/<(.|\n)*?>/g, '').trim().length !== 0) {
            setIsComplete(true);
        }
        else {
            setIsComplete(false);
        }
    };

    // retourne un tableau clef valeur avec en clef le nom du champ et en valeur le message d'erreur
    const missingInformation = () => {
        let missingInformation = [];
        if (name == '') {
            missingInformation.push({ name: 'name', message: 'Le nom du projet' });
        }
        if (shortDescription == '') {
            missingInformation.push({ name: 'shortDescription', message: 'La description courte du projet' });
        }
        if (description.replace(/<(.|\n)*?>/g, '').trim().length === 0) {
            missingInformation.push({ name: 'description', message: 'La description du projet' });
        }
        return missingInformation;
    };



    // methode qui enregistre le projet dans la base de donnée
    const registerProject = async () => {
        // recuperation des données du formulaire pour les formater
        let formDataProject = {
            name: name,
            shortDescription: shortDescription,
            description: description,
            isOnLineProject: isOnLineProject,
            isSearchPersonn: isSearchPersonn,
            competences: competences,
            age: 22
        }
        // requete qui envoie les données au serveur
        const newProject = await AddProjectReqApi(JSON.stringify(formDataProject));
        if (newProject) {
            if (imageUrl !== `${urlApiNest}/project/project-image/switch3415c855-02fc-4371-9154-730beeb60595.png`) {
                const imageToBdd = await AddImageReqApi(image, newProject.id)
                //return  imageToBdd;
            }
            if (competences) {
                console.log('on rentre dans competences')
                competences.map(async (competence: any) => {
                    const newCompetence = await AddCompetenceToProjectReqApi(competence, newProject.id);

                    //return newCompetence;
                })
            }
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
        competences,
        saveCompetences,
        isOnLineProject,
        saveIsOnLineProject,
        isSearchPersonn,
        saveIsSearchPersonn,
        isComplete,
        VerifyIsCompleteForm,
        registerProject,
        missingInformation
    };
    return (
        <CreateProjectFormContext.Provider value={context}>
            {children}
        </CreateProjectFormContext.Provider>
    );
};