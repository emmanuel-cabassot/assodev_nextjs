import React, { useContext, useState } from 'react';
import { Box, Container, CssBaseline, Typography, TextField, Button, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { AuthContext } from '../../../../context/authContext';
import Image from 'next/image';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import PersonAddDisabledOutlinedIcon from '@mui/icons-material/PersonAddDisabledOutlined';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export default function PreviewStep() {
    const {
        name,
        shortDescription,
        description,
        image,
        imageUrl,
        competences,
        isOnLineProject,
        isSearchPersonn
    } = useContext(CreateProjectFormContext);
    const { user } = useContext(AuthContext);

    return (

        <Box display="flex">
            {/* CARD DU PROJET */}
            <Card sx={{ maxWidth: 345, m: 3 }} key="1" >
                <CardHeader
                    avatar={
                        <Avatar
                            key="11"
                            src={`${urlApiNest}/user/profile-image/${user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png"}`}
                            aria-label="recipe">
                        </Avatar>
                    }
                    action={
                        <IconButton disabled>
                            {
                                isSearchPersonn ?
                                    <PersonSearchIcon style={{ color: "green" }} /> : <PersonAddDisabledOutlinedIcon />
                            }
                        </IconButton>
                    }
                    title={name}
                    subheader="now"
                />
                <CardMedia
                    component="img"
                    height="194"
                    image={`${imageUrl}`}
                    alt="Image du projet"
                />
                <CardContent>
                    {/* description du projet */}
                    <Typography variant="body2" color="text.secondary">
                        {shortDescription}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paddingTop="15px">
                        Technos
                    </Typography>
                    {/* compétences du projet */}
                    <Typography variant="body2" color="text.secondary">
                        {competences.map((competence: any) => {
                            console.log('competence', competence)
                            return (
                                <Chip
                                    label={competence.name}
                                    sx={{ m: 0.5 }}
                                />
                            )
                        })}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paddingTop="15px">
                        Team
                    </Typography>
                    {/* avatar des membres de l'équipe */}
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                            key="1122"
                            src={`${urlApiNest}/user/profile-image/${user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png"}`}
                            aria-label="recipe">
                        </Avatar>
                    </Box>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                </CardActions>
            </Card>


            {/* DETAIL DU PROJET */}
            <Box sx={{ display: 'flex', flexDirection: 'column', m: 3, width: 700 }}>
                {/* titre du projet */}
                <Typography variant="h5" component="div" gutterBottom>
                    {name}
                </Typography>
                {/* image du projet */}
                <Image src={`${imageUrl}`} alt="Image du projet" width={700} height={400} />
                {/* compétences du projet */}
                <Typography variant="body2" color="text.secondary" paddingTop="15px">
                    Technos
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {competences.map((competence: any) => {
                        console.log('competence', competence)
                        return (
                            <Chip
                                label={competence.name}
                                sx={{ m: 0.5 }}
                            />
                        )
                    })}
                </Typography>
                {/* Avatar du créateur */}
                <Typography variant="body2" color="text.secondary" paddingTop="15px">
                        Members
                    </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>

                    <Avatar
                        key="1122"
                        src={`${urlApiNest}/user/profile-image/${user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png"}`}
                        aria-label="recipe">
                    </Avatar>
                </Box>
                {/* is search collaborator */}
                <Typography variant="body2" color="text.secondary" paddingTop="15px">
                    search collaborator
                    {isSearchPersonn ?  <PersonSearchIcon style={{ color: "green" }} />  : <PersonAddDisabledOutlinedIcon />}
                </Typography>
                {/* description du projet */}
                <Typography variant="body2" color="text.secondary" paddingTop="15px">
                    Description
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {React.createElement('div', { dangerouslySetInnerHTML: { __html: description } })}
                </Typography>
            </Box>
        </Box>
    );
}