import * as React from 'react';
import { NameDescriptionStep } from './steps/nameDescriptionStep';
import { DescriptionStep } from './steps/descriptionStep';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const steps = ['Name / Short description', 'Description', 'Add image?', 'Review', 'Status'];


export default function CreateProjectPage() {
  //qui permet de savoir sur quelle page on est
  const [activeStep, setActiveStep] = React.useState(0);
  // permet de savoir si on a skip une page
  const [skipped, setSkipped] = React.useState(new Set<number>());

  // permet de retourné le contenu de la page en fonction de la page active
  const renderStep = (step : number) => {
    switch (step) {
      case 0:
        return <NameDescriptionStep />;
      case 1:
        return <DescriptionStep />;
      case 2:
        return "3";
      case 3:
        return "4";
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
            optional?: React.ReactNode;
          } = {};
          // if (isStepOptional(index)) {
          //   labelProps.optional = (
          //     <Typography variant="caption">Optional</Typography>
          //   );
          // }
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
      {activeStep === steps.length ? (
        // c'est la page disant que tout est fini 
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
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
            {/* apparition du bouton suivant ou finish */}
            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
