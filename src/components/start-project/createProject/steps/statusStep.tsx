import React, { useContext } from 'react';
import { FormControl, Grid, ListItem, ListItemText, List, Tooltip, IconButton } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { Switch, Typography, Box, Container } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

interface StatusStepProps {
  height: number | string;
}

const StatusStep: React.FC<StatusStepProps> = ({ height }) => {
  const {
    isOnLineProject,
    saveIsOnLineProject,
    isSearchPersonn,
    saveIsSearchPersonn,
    isComplete,
    VerifyIsCompleteForm,
    missingInformation,
  } = useContext(CreateProjectFormContext);

  const handleIsOnLineProjectSendToContext = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveIsOnLineProject(!isOnLineProject);
  };

  const handleIsSearchPersonnSendToContext = (e: React.ChangeEvent<HTMLInputElement>) => {
    saveIsSearchPersonn(!isSearchPersonn);
  };

  const isDisabled = () => {
    VerifyIsCompleteForm();
    return !isComplete;
  };

  const getMissingInformation = () => {
    const missingInfo : any = missingInformation();
    const missingInfoMessage = missingInfo.map((info: any )=> `${info.message}`).join(', ');
    return `Pour publier votre projet ou rechercher des collaborateurs, vous devez fournir les informations suivantes : ${missingInfoMessage}`;
  };

  return (
    <Container
      maxWidth="md"
      sx={{
        minHeight: height,
        padding: '2em',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'stretch',
        }}
      >
        <FormControl component="fieldset">
          <Typography variant="h6" gutterBottom>
            Options du projet
          </Typography>
          <List>
            <ListItem disableGutters>
              <ListItemText
                primary="Public"
                secondary="Le projet sera en ligne et visible par tous."
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: 1, color: isDisabled() ? 'grey' : 'inherit' }}>
                  {isComplete && isOnLineProject ? 'En ligne' : 'Hors ligne'}                
                </Typography>
                <Tooltip title={isDisabled() ? getMissingInformation() : ''} sx={{ fontSize: '1.5em' }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={isComplete && isOnLineProject}
                      onChange={handleIsOnLineProjectSendToContext}
                      disabled={isDisabled()}
                    />
                  </span>
                </Tooltip>
                {!isComplete && (
                  <Tooltip title={getMissingInformation()} sx={{ fontSize: '1.5em' }}>
                    <IconButton size="small">
                      <InfoIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </ListItem>
            <ListItem disableGutters>
              <ListItemText
                primary="Recherche de collaborateurs"
                secondary="Activez cette option si vous recherchez des collaborateurs pour votre projet."
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: 1, color: isDisabled() ? 'grey' : 'inherit' }}>
                  {isComplete && isSearchPersonn ? 'Oui' : 'Non'}                  
                </Typography>
                <Tooltip title={isDisabled() ? getMissingInformation() : ''} sx={{ fontSize: '1.5em' }}>
                  <span>
                    <Switch
                      color="primary"
                      checked={isComplete && isSearchPersonn}
                      onChange={handleIsSearchPersonnSendToContext}
                      disabled={isDisabled()}
                    />
                  </span>
                </Tooltip>
                {!isComplete && (
                  <Tooltip title={getMissingInformation()} sx={{ fontSize: '1.5em' }}>
                    <IconButton size="small">
                      <InfoIcon fontSize="inherit" />
                    </IconButton>
                  </Tooltip>
                )}
              </Box>
            </ListItem>
          </List>
        </FormControl>
      </Box>
    </Container>
  );
};

export default StatusStep;
