import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import TenantForm from './TenantForm';
import TenantDetails from './TenantDetails';
import TenantConfirmation from './TenantConfirmation';
import { useDispatch } from 'store';
import { createTenant } from 'store/slices/tenant';
import { Tenant } from '../models/TenantModel';
import ApiErrorResponse from '../../common/models/ApiErrorResponse';

/**
 * StepperTenant Component
 * - This component manages the multi-step wizard flow for tenant creation.
 * - Steps include data entry, preview, and confirmation.
 */
const TenantStepper = () => {
    const [activeStep, setActiveStep] = useState(0); // Track the current active step
    const [tenantData, setTenantData] = useState(new Tenant()); // Store tenant data
    const [responseMessage, setResponseMessage] = useState(''); // Store API response messages
    const [apiSuccess, setApiSuccess] = useState(null); // Track the success/failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Store error responses from the API

    const dispatch = useDispatch();

    /**
     * Proceed to the next step in the wizard.
     */
    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    /**
     * Go back to the previous step in the wizard.
     */
    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    /**
     * Submit the tenant data to the backend API.
     */
    const handleSubmit = async () => {
        try {
            // Dispatch the createTenant action and handle the response
            const result = await dispatch(createTenant(tenantData)).unwrap();
            const createdTenant = Tenant.fromApiResponse(result); // Parse the response into the Tenant model
            setTenantData(createdTenant);
            setApiSuccess(true);
            setResponseMessage(`Successfully created Tenant with ID: ${createdTenant.id}`);
            setErrorResponse(null); // Clear any previous errors
            handleNext(); // Move to the confirmation step
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message); // Set the error message from the response
            setErrorResponse(error); // Store the error response for detailed error display
            handleNext(); // Move to the confirmation step even on failure
        }
    };

    /**
     * Render the content for each step in the wizard.
     * @param {number} step - The current step index.
     * @returns {JSX.Element} - The content to display for the current step.
     */
    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return (
                    <TenantForm
                        tenantData={tenantData}
                        setTenantData={setTenantData}
                        handleNext={handleNext}
                        handleSubmit={handleSubmit}
                    />
                );
            case 1:
                return (
                    <TenantDetails
                        tenant={tenantData}
                        mode="preview"
                        handleBack={handleBack}
                        handleSubmit={handleSubmit}
                    />
                );
            case 2:
                return (
                    <TenantConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        tenantData={tenantData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Stepper UI to show progress through the steps */}
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {['Data', 'Preview', 'Status'].map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* Render the content based on the current active step */}
            <Box>{getStepContent(activeStep)}</Box>
        </Box>
    );
};

export default TenantStepper;
