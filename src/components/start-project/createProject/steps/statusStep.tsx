import React, { useContext } from 'react';
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { CreateProjectFormContext } from '../../../../context/createProjectFormContext';
import { FormControlLabel, FormGroup, Switch } from '@mui/material';



export default function StatusStep() {
    const { statusProject, saveStatusProject } = useContext(CreateProjectFormContext);

    const handleStatusSendToContext = (e: any) => {
        saveStatusProject(e.target.value)
    }

    return (
        <FormControl component="fieldset">
            <FormGroup aria-label="position" row>
                <FormControlLabel
                    value="top"
                    control={<Switch color="primary" />}
                    label="Public"
                    labelPlacement="start"
                />
                <FormControlLabel
                    disabled={true}
                    value="collaborator"
                    control={<Switch color="secondary" />}
                    label="search collaborator"
                    labelPlacement="start"
                />
            </FormGroup>
        </FormControl>
    );
}