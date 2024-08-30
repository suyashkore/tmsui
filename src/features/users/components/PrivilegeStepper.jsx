// tmsui/src/features/users/components/PrivilegeStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import PrivilegeForm from './PrivilegeForm';
import PrivilegeDetails from './PrivilegeDetails';
import PrivilegeConfirmation from './PrivilegeConfirmation';
import usePrivilegeApi from '../hooks/usePrivilegeApi';
import { Privilege } from '../models/PrivilegeModel';
import { Typography } from '@mui/material';

/**
 * PrivilegeStepper Component
 * - Manages the multi-step process for creating or editing a privilege.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {Privilege} initialPrivilegeData - Initial privilege data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered PrivilegeStepper component.
 */
const PrivilegeStepper = ({ initialPrivilegeData = new Privilege(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [privilegeData, setPrivilegeData] = useState(initialPrivilegeData); // Stores the privilege data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createPrivilege, updatePrivilege } = usePrivilegeApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updatePrivilege(privilegeData.id, privilegeData);
            } else {
                result = await createPrivilege(privilegeData);
            }

            const savedPrivilege = Privilege.fromApiResponse(result);
            setPrivilegeData(savedPrivilege);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Privilege with ID: ${savedPrivilege.id}`);
            setErrorResponse(null);

            if (skipPreview) {
                setActiveStep(2); // Move directly to the confirmation step
            } else {
                handleNext(); // Proceed to the next step as usual
            }
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message);
            setErrorResponse(error);

            if (skipPreview) {
                setActiveStep(2); // Move directly to the confirmation step even if there's an error
            } else {
                handleNext(); // Proceed to the next step as usual
            }
        }
    };

    /**
     * Advances to the next step in the stepper.
     */
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    /**
     * Goes back to the previous step in the stepper.
     */
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    /**
     * Determines which content to render based on the current step.
     */
    const stepContent = useMemo(() => {
        switch (activeStep) {
            case 0:
                return (
                    <PrivilegeForm
                        privilegeData={privilegeData}
                        setPrivilegeData={setPrivilegeData}
                        handleNext={handleNext}
                        handleSubmit={(skipPreview) => {
                            setSkipPreview(skipPreview); // Control whether to skip the preview step
                            handleFormSubmit();
                        }}
                        isEditMode={isEditMode}
                    />
                );
            case 1:
                return (
                    <PrivilegeDetails
                        privilege={privilegeData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <PrivilegeConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        privilegeData={privilegeData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, privilegeData, apiSuccess, responseMessage, errorResponse, isEditMode]);

    return (
        <Box>
            {/* Stepper component to display steps */}
            <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>

            {/* Render the step content */}
            {stepContent}
        </Box>
    );
};

export default PrivilegeStepper;
