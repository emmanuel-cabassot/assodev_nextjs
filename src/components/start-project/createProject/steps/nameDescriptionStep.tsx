import { Box, Container, Typography, TextField, FormHelperText, CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { useContext } from 'react';
import { LayoutContext } from '../../../../context/layoutContext';

const theme = createTheme();

interface IProps {
    height: string;
}

export default function NameDescriptionStep({ height }: IProps) {
    const { name, saveName, shortDescription, saveShortDescription, VerifyIsCompleteForm } = useContext(CreateProjectFormContext);
    const { headerHeight, footerHeight, stepperHeight } = useContext(LayoutContext);

    const handleNameSendToContext = (e: React.ChangeEvent<HTMLInputElement>) => {
        saveName(e.target.value);
        VerifyIsCompleteForm();
    }

    const handleShortDescriptionSendToContext = (e: React.ChangeEvent<HTMLInputElement>) => {
        saveShortDescription(e.target.value);
        VerifyIsCompleteForm();
    }

    return (
        <ThemeProvider theme={theme}>
            <Container
                maxWidth="md"
                sx={{
                    minHeight: height,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '2rem',
                }}
            >
                <CssBaseline />
                <Typography variant="h6" component="h2" color="textPrimary" sx={{ marginBottom: '1rem' }}>
                    Nom / Description courte
                </Typography>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="name"
                        label="Nom de votre projet"
                        name="name"
                        value={name}
                        autoFocus
                        onChange={handleNameSendToContext}
                        sx={{ width: '50%' }}
                    />
                    <FormHelperText>Le nom de votre projet doit être concis et descriptif.</FormHelperText>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        name="shortDescription"
                        value={shortDescription}
                        label="Description courte"
                        id="shortDescription"
                        onChange={handleShortDescriptionSendToContext}
                    />
                    <FormHelperText>La description courte sera utilisée pour la carte de votre projet. Limitez-vous à 60 caractères.</FormHelperText>
                </Box>
            </Container>
        </ThemeProvider>
    );
}
