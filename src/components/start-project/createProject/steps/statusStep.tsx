import React, { useContext } from 'react';
import { FormControl } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';

export default function StatusStep() {
    {/* context */}
    const {
        isOnLineProject,
        saveIsOnLineProject,
        isSearchPersonn,
        saveIsSearchPersonn,
        isComplete,
        VerifyIsCompleteForm
    } = useContext(CreateProjectFormContext);

    {/* is online project? to context */}
    const handleIsOnLineProjectSendToContext = (e: any) => {
        saveIsOnLineProject(!isOnLineProject)
    }

    {/* is search collaborator? to context */}
    const handleIsSearchPersonnSendToContext = (e: any) => {
        saveIsSearchPersonn(!isSearchPersonn)
    }

    {/* is disabled? switchs */}
    const isDisabled = () => {
        VerifyIsCompleteForm()
        if (isComplete)
            return false
        else
            return true
    }

    return (
        <FormControl component="fieldset">
            {/* switchs for public and search collaborator */}
            <FormGroup aria-label="position" row>
                {/* switch for public project */}
                <FormControlLabel
                    disabled={isDisabled()}
                    value={isOnLineProject}
                    control={<Switch color="primary" />}
                    label="Public"
                    labelPlacement="start"
                    onChange={handleIsOnLineProjectSendToContext}
                />
                {/* switch for search collaborator*/}
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