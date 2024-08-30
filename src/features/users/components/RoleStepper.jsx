// tmsui/src/features/users/components/RoleStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import RoleForm from './RoleForm';
import RoleDetails from './RoleDetails';
import RoleConfirmation from './RoleConfirmation';
import useRoleApi from '../hooks/useRoleApi';
import { Role } from '../models/RoleModel';
import { Typography } from '@mui/material';

/**
 * RoleStepper Component
 * - Manages the multi-step process for creating or editing a role.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {Role} initialRoleData - Initial role data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered RoleStepper component.
 */
const RoleStepper = ({ initialRoleData = new Role(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [roleData, setRoleData] = useState(initialRoleData);
    const [responseMessage, setResponseMessage] = useState('');
    const [apiSuccess, setApiSuccess] = useState(null);
    const [errorResponse, setErrorResponse] = useState(null);
    const { createRole, updateRole } = useRoleApi();
    const [skipPreview, setSkipPreview] = useState(false);

    const steps = ['Data', 'Preview', 'Status'];

    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateRole(roleData.id, roleData);
            } else {
                result = await createRole(roleData);
            }

            const savedRole = Role.fromApiResponse(result);
            setRoleData(savedRole);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Role with ID: ${savedRole.id}`);
            setErrorResponse(null);

            if (skipPreview) {
                setActiveStep(2);
            } else {
                handleNext();
            }
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message);
            setErrorResponse(error);

            if (skipPreview) {
                setActiveStep(2);
            } else {
                handleNext();
            }
        }
    };

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const stepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <RoleForm
                        roleData={roleData}
                        setRoleData={setRoleData}
                        handleNext={handleNext}
                        handleSubmit={(skipPreview) => {
                            setSkipPreview(skipPreview);
                            handleFormSubmit();
                        }}
                        isEditMode={isEditMode}
                    />
                );
            case 1:
                return (
                    <RoleDetails
                        role={roleData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <RoleConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        roleData={roleData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, roleData, apiSuccess, responseMessage, errorResponse, isEditMode]);

    return (
        <Box>
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {stepContent}
        </Box>
    );
};

export default RoleStepper;
