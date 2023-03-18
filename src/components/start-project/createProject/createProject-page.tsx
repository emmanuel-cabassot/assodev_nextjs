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


const steps = ['Name / Short description', 'Description', 'Image / Techno', 'Status', 'Review' ];


export default function CreateProjectPage() {
  // permet de savoir sur quelle page on est
  const [activeStep, setActiveStep] = useState(0);
  // permet de savoir si on a skip une page
  const [skipped, setSkipped] = useState(new Set<number>());

  // import du context de la création de projet
  const {
    isComplete,
    VerifyIsCompleteForm,
    registerProject
  } = useContext(CreateProjectFormContext);

  // permet de retourné le contenu de la page en fonction de la page active
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

  const isStepOptional = (step: number) => {
    return step === 1;
  };

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper
        activeStep={activeStep}
        sx={{ backgroundColor: 'transparent', marginTop: '20px' }}
      >
        {steps.map((label, index) => {
          const stepProps: { completed?: boolean } = {};
          const labelProps: {
            optional?: ReactNode;
          } = {};
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper >
      <Fragment>
        {/* le contenu de la page, c'est la que l'on va mettre les formulaires */}
        <Box sx={{ mt: 2, mb: 1 }}>{renderStep(activeStep)}</Box>
        <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
          {/* C'est le bouton back */}
          <Button
            color="inherit"
            disabled={activeStep === 0}
            onClick={handleBack}
            sx={{ mr: 1 }}
          >
            Back
          </Button>
          {/* permet de mettre un espace entre les deux boutons */}
          <Box sx={{ flex: '1 1 auto' }} />
          {/* C'est le skip */}
          {isStepOptional(activeStep) && (
            <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
              Skip
            </Button>
          )}
          {/* apparition du bouton suivant ou save your project */}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={registerProject} > Save your project</Button>
          ) : (
            <Button onClick={handleNext}>Next</Button>
          )}

        </Box>
      </Fragment>
    </Box>
  );
}
