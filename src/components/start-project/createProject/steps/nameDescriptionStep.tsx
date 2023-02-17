import { Box, Container, CssBaseline, Typography, TextField, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { useContext, useState } from 'react';

const theme = createTheme();

export default function NameDescriptionStep() {
    const { name, saveName, shortDescription, saveShortDescription } = useContext(CreateProjectFormContext);

    const handleNameSendToContext = (e: any) => {
        saveName(e.target.value)
    }

    const handleShortDescriptionSendToContext = (e: any) => {
        saveShortDescription(e.target.value)
    }

    return (
        <ThemeProvider theme={theme}>
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
                        Name / Short description
                    </Typography>

                    <TextField
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Name of your project"
                        name="name"
                        value={name}
                        autoFocus
                        onChange={handleNameSendToContext}
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="shortDescription"
                        value={shortDescription}
                        label="Short description"
                        id="shortDescription"
                        onChange={handleShortDescriptionSendToContext}
                    />
                </Box>
            </Container>
        </ThemeProvider>
    );
}