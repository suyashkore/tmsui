// tmsui/src/features/places/components/StationCoverageStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box, Typography } from '@mui/material';
import StationCoverageForm from './StationCoverageForm';
import StationCoverageDetails from './StationCoverageDetails';
import StationCoverageConfirmation from './StationCoverageConfirmation';
import useStationCoverageApi from '../hooks/useStationCoverageApi';
import { StationCoverage } from '../models/StationCoverageModel';

/**
 * StationCoverageStepper Component
 * - Manages the multi-step process for creating or editing a station coverage.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {StationCoverage} initialStationCoverageData - Initial station coverage data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered StationCoverageStepper component.
 */
const StationCoverageStepper = ({ initialStationCoverageData = new StationCoverage(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [stationCoverageData, setStationCoverageData] = useState(initialStationCoverageData); // Stores the station coverage data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createStationCoverage, updateStationCoverage } = useStationCoverageApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateStationCoverage(stationCoverageData.id, stationCoverageData);
            } else {
                result = await createStationCoverage(stationCoverageData);
            }

            const savedStationCoverage = StationCoverage.fromApiResponse(result);
            setStationCoverageData(savedStationCoverage);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Station Coverage with ID: ${savedStationCoverage.id}`);
            setErrorResponse(null);

            if (skipPreview) {
                setActiveStep(2); // Move directly to the confirmation step if preview is skipped
            } else {
                handleNext(); // Proceed to the next step as usual
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
                    <StationCoverageForm
                        stationCoverageData={stationCoverageData}
                        setStationCoverageData={setStationCoverageData}
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
                    <StationCoverageDetails
                        stationCoverage={stationCoverageData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <StationCoverageConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        stationCoverageData={stationCoverageData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, stationCoverageData, apiSuccess, responseMessage, errorResponse, isEditMode]);

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

export default StationCoverageStepper;
