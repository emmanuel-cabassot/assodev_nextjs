import React, { useContext, useState, useEffect } from 'react';
import { Box, Container, CssBaseline, Typography, TextField, Chip, Autocomplete } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import getAllCompetencesReqApi from '../../../../../api/projectDev/competence/getAllCompetences';
import Image from 'next/image';
const FormDataImage = require('form-data');

interface option {
    name: string;
    id:number;
}

export default function ImageStep() {

    // récupère les compétences de la base de données
    useEffect(() => {
        getAllCompetencesReqApi().then((res) => {
            console.log('res', res)
            setCompetencesList(res);

        });
    }, []);

    // récupère les données du context
    const {
        image,
        saveImage,
        imageUrl,
        saveImageUrl,
        competences,
        saveCompetences
    } = useContext(CreateProjectFormContext);

    // useState pour les données du formulaire
    const [imageProject, setImageProject] = useState('') as any;
    const [competencesList, setCompetencesList] = useState([]) as any;
    const [valueCompetencesTags, setValueCompetencesTags] = useState() as any;

    // envoie l'image au serveur et récupère l'url de l'image pour l'afficher
    const handleChangeImage = async (event: any) => {
        const file = event.target.files[0]
        setImageProject(file);
        // setImageURL(URL.createObjectURL(event.target.files[0]));
        const imageToSend = new FormDataImage()
        imageToSend.append('file', file);
        console.log('imageToSend', imageToSend)
        saveImage(imageToSend)
        saveImageUrl(URL.createObjectURL(event.target.files[0]))
    }

    // envoie les compétences au context
    const handleChangeCompetences = ( newValue: object) => {
        console.log('newValue', newValue)
        saveCompetences(newValue)
        console.log('competences', competences)
        // ajout de la new value dans le tableau des compétences

    }
    console.log('competences', competences)

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            {/* Box pour l'image */}
            <Box
                sx={{
                    marginTop: 5,
                    marginBottom: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Image
                </Typography>
                {/* Image */}
                <Image
                    key={imageUrl}
                    src={imageUrl}
                    alt="Picture of the user"
                    width={280}
                    height={180}
                />
                {/* input pour changer l'image */}
                <TextField
                    key="keyimage"
                    margin="normal"
                    fullWidth
                    id="image"
                    label="Change image"
                    name="image"
                    // autoComplete=""
                    autoFocus
                    type={'file'}
                    onChange={handleChangeImage}
                />
            </Box>

            {/* box pour les compétences */}
            <Autocomplete
                key="keyautocomplete"
                multiple
                id="tags-standard"
                value={competences}
                options={competencesList}
                getOptionLabel={(option : any) => option.name}
                defaultValue={[]}
                onChange={(event, newValue) => {
                    handleChangeCompetences(newValue)
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        variant="standard"
                        label="Technos"
                        placeholder="Technos"
                    />  
                )}

            />
        </Container>
    );
}