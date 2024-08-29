// tmsui/src/features/contracts/components/DriverRateStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import DriverRateForm from './DriverRateForm';
import DriverRateDetails from './DriverRateDetails';
import DriverRateConfirmation from './DriverRateConfirmation';
import useDriverRateApi from '../hooks/useDriverRateApi';
import { DriverRate } from '../models/DriverRateModel';
import { Typography } from '@mui/material';

/**
 * DriverRateStepper Component
 * - Manages the multi-step process for creating or editing a driver rate.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {DriverRate} initialDriverRateData - Initial driver rate data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered DriverRateStepper component.
 */
const DriverRateStepper = ({ initialDriverRateData = new DriverRate(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [driverRateData, setDriverRateData] = useState(initialDriverRateData); // Stores the driver rate data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createDriverRate, updateDriverRate } = useDriverRateApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateDriverRate(driverRateData.id, driverRateData);
            } else {
                result = await createDriverRate(driverRateData);
            }

            const savedDriverRate = DriverRate.fromApiResponse(result);
            setDriverRateData(savedDriverRate);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Driver Rate with ID: ${savedDriverRate.id}`);
            setErrorResponse(null);

            if (skipPreview) {
                setActiveStep(2); // Move directly to the confirmation step if skipping preview
            } else {
                handleNext();
            }
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message);
            setErrorResponse(error);

            if (skipPreview) {
                setActiveStep(2); // Move to confirmation even if there's an error
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
                    <DriverRateForm
                        driverRateData={driverRateData}
                        setDriverRateData={setDriverRateData}
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
                    <DriverRateDetails
                        driverRate={driverRateData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <DriverRateConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        driverRateData={driverRateData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, driverRateData, apiSuccess, responseMessage, errorResponse, isEditMode]);

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

export default DriverRateStepper;
