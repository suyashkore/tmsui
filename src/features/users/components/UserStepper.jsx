// tmsui/src/features/users/components/UserStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import UserForm from './UserForm';
import UserDetails from './UserDetails';
import UserConfirmation from './UserConfirmation';
import useUserApi from '../hooks/useUserApi';
import { User } from '../models/UserModel';
import { Typography } from '@mui/material';

/**
 * UserStepper Component
 * - Manages the multi-step process for creating or editing a user.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {User} initialUserData - Initial user data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered UserStepper component.
 */
const UserStepper = ({ initialUserData = new User(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [userData, setUserData] = useState(initialUserData); // Stores the user data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createUser, updateUser } = useUserApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateUser(userData.id, userData);
            } else {
                result = await createUser(userData);
            }

            const savedUser = User.fromApiResponse(result);
            setUserData(savedUser);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} User with ID: ${savedUser.id}`);
            setErrorResponse(null);

            // If skipPreview is true, directly move to the last step
            if (skipPreview) {
                setActiveStep(2); // Move directly to the confirmation step
            } else {
                handleNext(); // Proceed to the next step as usual
            }
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message);
            setErrorResponse(error);

            // If skipPreview is true, directly move to the last step even if there's an error
            if (skipPreview) {
                setActiveStep(2);
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
                    <UserForm
                        userData={userData}
                        setUserData={setUserData}
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
                    <UserDetails
                        user={userData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <UserConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        userData={userData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, userData, apiSuccess, responseMessage, errorResponse, isEditMode]);

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

export default UserStepper;
