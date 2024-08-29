// tmsui/src/features/places/components/GeoHierarchyStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import GeoHierarchyForm from './GeoHierarchyForm';
import GeoHierarchyDetails from './GeoHierarchyDetails';
import GeoHierarchyConfirmation from './GeoHierarchyConfirmation';
import useGeoHierarchyApi from '../hooks/useGeoHierarchyApi';
import { GeoHierarchy } from '../models/GeoHierarchyModel';
import { Typography } from '@mui/material';

/**
 * GeoHierarchyStepper Component
 * - Manages the multi-step process for creating or editing a geo-hierarchy.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {GeoHierarchy} initialGeoHierarchyData - Initial geo-hierarchy data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered GeoHierarchyStepper component.
 */
const GeoHierarchyStepper = ({ initialGeoHierarchyData = new GeoHierarchy(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [geoHierarchyData, setGeoHierarchyData] = useState(initialGeoHierarchyData); // Stores the geo-hierarchy data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createGeoHierarchy, updateGeoHierarchy } = useGeoHierarchyApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateGeoHierarchy(geoHierarchyData.id, geoHierarchyData);
            } else {
                result = await createGeoHierarchy(geoHierarchyData);
            }

            const savedGeoHierarchy = GeoHierarchy.fromApiResponse(result);
            setGeoHierarchyData(savedGeoHierarchy);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Geo-Hierarchy with ID: ${savedGeoHierarchy.id}`);
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
                    <GeoHierarchyForm
                        geoHierarchyData={geoHierarchyData}
                        setGeoHierarchyData={setGeoHierarchyData}
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
                    <GeoHierarchyDetails
                        geoHierarchy={geoHierarchyData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <GeoHierarchyConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        geoHierarchyData={geoHierarchyData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, geoHierarchyData, apiSuccess, responseMessage, errorResponse, isEditMode]);

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

export default GeoHierarchyStepper;
