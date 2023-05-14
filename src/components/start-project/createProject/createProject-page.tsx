// Importations nécessaires
import { useState, useContext, Fragment, ReactNode } from 'react';
import { CreateProjectFormContext } from '../../../context/createProjectFormContext';
import { LayoutContext } from '../../../context/layoutContext';
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

// Liste des étapes du formulaire, chaque étape est un objet avec un label et un composant associé
const steps = [
  { label: 'Name / Short description', component: NameDescriptionStep },
  { label: 'Description', component: DescriptionStep },
  { label: 'Image / Techno', component: ImageStep },
  { label: 'Status', component: StatusStep },
  { label: 'Review', component: PreviewStep },
];

// Composant principal
export default function CreateProjectPage() {
  // Gestion des états locaux avec les Hooks useState
  const [activeStep, setActiveStep] = useState(0); // Étape active
  const [skipped, setSkipped] = useState(new Set<number>()); // Étapes ignorées

  // Récupération des fonctions et variables du contexte CreateProjectFormContext
  const { isComplete, VerifyIsCompleteForm, registerProject } = useContext(CreateProjectFormContext);

  // Récupération des hauteurs de l'en-tête et du pied de page du contexte LayoutContext
  const { headerHeight, footerHeight } = useContext(LayoutContext);

  // Calcul de la hauteur maximale du composant en fonction des hauteurs de l'en-tête et du pied de page
  const heightMaxOfComponent = `calc(100vh - ${headerHeight}px - ${footerHeight}px - 120px)`;

  // Rendu de l'étape en fonction de l'étape active
  const renderStep = (step: number) => {
    const StepComponent = steps[step].component; // Récupération du composant correspondant à l'étape
    return <StepComponent height={heightMaxOfComponent} />; // Rendu du composant avec la hauteur maximale en props
  };

  // Détermination si une étape est facultative (ici seulement l'étape 1 est facultative)
  const isStepOptional = (step: number) => step === 1;

  // Vérification si une étape a été ignorée
  const isStepSkipped = (step: number) => skipped.has(step);

  // Passage à l'étape suivante
  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  // Retour à l'étape précédente
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // Ignorer une étape
  // Ignorer une étape
  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // Gérer l'erreur ici si l'étape n'est pas facultative
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  // Réinitialisation des étapes
  const handleReset = () => {
    setActiveStep(0);
  };

  // Gestion du clic sur une étape
  const handleStepClick = (step: number) => {
    setActiveStep(step);
  };

  // Rendu du composant
  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeStep} sx={{ backgroundColor: 'transparent', marginTop: '20px' }}>
        {steps.map((step, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: { optional?: ReactNode; onClick?: () => void; } = {};

          // Si l'étape est ignorée, elle n'est pas marquée comme complétée
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }

          // Gestion du clic sur l'étape
          labelProps.onClick = () => handleStepClick(index);

          return (
            <Step key={step.label} completed={false} {...stepProps}>
              <StepLabel {...labelProps} style={{ cursor: 'pointer' }}>
                {step.label}
              </StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Fragment>
        <Box sx={{ mt: 2, mb: 1 }}>{renderStep(activeStep)}</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
          <Box sx={{ flex: '1 1 auto' }} />
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
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

