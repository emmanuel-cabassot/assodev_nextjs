import React, { useContext, useState } from 'react';
import { Box, Container, CssBaseline, Typography, TextField, Button } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import Image from 'next/image';
const FormDataImage = require('form-data');

export default function ImageStep() {
    const { image, saveImage, imageUrl, saveImageUrl } = useContext(CreateProjectFormContext);
    //const { user } = useContext(AuthContext);

    const [imageProject, setImageProject] = useState('') as any;
    // const [imageURL, setImageURL] = useState('');
    // const avatar = user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png";

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

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Image
                </Typography>
                <Image
                    src={imageUrl}
                    alt="Picture of the user"
                    width={280}
                    height={180}
                />
                <TextField
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
        </Container>
    );
}