import { Box, Container, CssBaseline, Typography, TextField } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';


const theme = createTheme();

export function NameDescriptionStep() {
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
                        // autoComplete=""
                        autoFocus
                    />
                    <TextField
                        margin="normal"
                        fullWidth
                        name="shortDescription"
                        label="Short description"
                        id="shortDescription"
                        // autoComplete="current-password"
                    />
                </Box>
            </Container>
        </ThemeProvider>


    );
}