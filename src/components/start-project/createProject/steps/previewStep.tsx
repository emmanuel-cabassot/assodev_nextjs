import React, { useContext, useState } from 'react';
import { Box, Container, CssBaseline, Typography, TextField, Button, Card, CardHeader, CardMedia, CardContent, CardActions, IconButton, Avatar, Chip } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { AuthContext } from '../../../../context/authContext';

const urlApiNest = process.env.NEXT_PUBLIC_NEXT_APP_API_URL;

export default function PreviewStep() {
    const { 
        name,
        shortDescription,
        description,
        image,
        imageUrl,
        competences,
     } = useContext(CreateProjectFormContext);
    const { user } = useContext(AuthContext);

    return (

        <Box display="flex">
            {/* card du projet */}
            <Card sx={{ maxWidth: 345, m: 3 }} key="1" >
                <CardHeader
                    avatar={
                        <Avatar
                            key="11"
                            src={`${urlApiNest}/user/profile-image/${user?.profileImage ? user?.profileImage : "tux_love_windowsd6d93104-a8f5-48c7-b882-f72f204b85cb.png"}`}
                            aria-label="recipe">
                        </Avatar>
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
        </Box>
    );
}