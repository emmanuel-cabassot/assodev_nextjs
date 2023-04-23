import { useState, useContext, Fragment, ReactNode } from 'react';
import { CreateProjectFormContext } from '../../../context/createProjectFormContext';
import NameDescriptionStep from './steps/nameDescriptionStep';
import DescriptionStep from './steps/descriptionStep';
import ImageStep from './steps/imageTechStep';
import PreviewStep from './steps/previewStep';
import StatusStep from './steps/statusStep';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';

// Liste des étapes du formulaire
const steps = ['Name / Short description', 'Description', 'Image / Techno', 'Status', 'Review'];

export default function CreateProjectPage() {
  // État pour suivre l'étape active
  const [activeStep, setActiveStep] = useState(0);
  // État pour suivre les étapes ignorées
  const [skipped, setSkipped] = useState(new Set<number>());

  // Utilisation du contexte pour gérer l'état du formulaire
  const {
    isComplete,
    VerifyIsCompleteForm,
    registerProject
  } = useContext(CreateProjectFormContext);

  // Fonction pour afficher le contenu de l'étape en fonction de l'étape active
  const renderStep = (step: number) => {
    switch (step) {
      case 0:
        return <NameDescriptionStep />;
      case 1:
        return <DescriptionStep />;
      case 2:
        return <ImageStep />;
      case 3:
        return <StatusStep />;
      case 4:
        return <PreviewStep />;
      default:
        return null;
    }
  };

  // Fonction pour déterminer si une étape est facultative
  const isStepOptional = (step: number) => {
    return step === 1;
  };

  // Fonction pour vérifier si une étape a été ignorée
  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  // Gestionnaire d'événements pour passer à l'étape suivante
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // Gestionnaire d'événements pour revenir à l'étape précédente
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Gestionnaire d'événements pour ignorer une étape
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // Gestionnaire d'événements pour réinitialiser le formulaire
  const handleReset = () => {
    setActiveStep(0);
  };

  // Gestionnaire d'événements pour cliquer sur une étape spécifique
  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  return (
    // Crée un conteneur pour le formulaire
    <Box sx={{ width: '100%' }}>
      {/* Ajoute un Stepper pour afficher les étapes du formulaire */}
      <Stepper
        activeStep={activeStep}
        sx={{ backgroundColor: 'transparent', marginTop: '20px' }}
      >
        {/* Itère sur les étapes et crée un Step pour chaque étape */}
        {steps.map((label, index) => {
          // Initialise les propriétés de l'étape
          const stepProps: { completed?: boolean } = {};
          // Initialise les propriétés de l'étiquette de l'étape
          const labelProps: {
            optional?: ReactNode;
            onClick?: () => void;
          } = {};
          // Si l'étape est ignorée, indique qu'elle n'est pas terminée
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          // Ajoute un gestionnaire d'événements pour cliquer sur l'étiquette de l'étape
          labelProps.onClick = () => handleStepClick(index);
          return (
            // Crée l'étape avec les propriétés définies 
            // attention completed={false} annule le check de l'étape
            <Step key={label} completed={false} {...stepProps}>
              {/* Crée l'étiquette de l'étape avec les propriétés définies et un style pour le curseur */}
              <StepLabel
                {...labelProps}
                style={{ cursor: 'pointer' }}
              >
                {label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/* Fragment pour encapsuler les éléments suivants */}
      <Fragment>
        {/* Affiche le contenu de l'étape active */}
        <Box sx={{ mt: 2, mb: 1 }}>{renderStep(activeStep)}</Box>
        {/* Crée une zone pour les boutons de navigation */}
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {/* Bouton "Back" pour revenir à l'étape précédente */}
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          {/* Espace flexible entre les boutons */}
          <Box sx={{ flex: '1 1 auto' }} />
          {/* Bouton "Skip" pour ignorer l'étape facultative */}
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          {/* Bouton "Next" pour passer à l'étape suivante ou bouton "Save your project" pour enregistrer le projet */}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={registerProject}>
              Save your project
            </Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}
        </Box>
      </Fragment>
    </Box>
  );
}



