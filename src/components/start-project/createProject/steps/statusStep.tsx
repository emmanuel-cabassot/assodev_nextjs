import React, { useContext } from 'react';
import {  FormControl } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export default function StatusStep() {
    const { isOnLineProject, saveIsOnLineProject, isSearchPersonn, saveIsSearchPersonn, isComplete, VerifyIsCompleteForm } = useContext(CreateProjectFormContext);

    const handleIsOnLineProjectSendToContext = (e: any) => {
        saveIsOnLineProject(!isOnLineProject)
    }

    const handleIsSearchPersonnSendToContext = (e: any) => {
        saveIsSearchPersonn(!isSearchPersonn)
    }

    const isDisabled = () => {
        VerifyIsCompleteForm()
        if (isComplete)
            return false
        else
            return true
    }

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    disabled={isDisabled()}
                    value={isOnLineProject}
                    control={<Switch color="primary"/>}
                    label="Public"
                    labelPlacement="start"
                    onChange={handleIsOnLineProjectSendToContext}
                />
                <FormControlLabel
                    disabled={!isComplete}
                    value={isSearchPersonn}
                    control={<Switch color="secondary" />}
                    label="search collaborator"
                    labelPlacement="start"
                    onChange={handleIsSearchPersonnSendToContext}
                />
            </FormGroup>
        </FormControl>
    );
}