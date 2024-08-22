// tmsui/src/features/tenants/components/StepperTenant.jsx

import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import TenantForm from '../components/TenantForm';
import TenantPreview from '../components/TenantPreview';
import TenantConfirmation from '../components/TenantConfirmation';
import { useDispatch } from 'store';
import { createTenant } from 'store/slices/tenant';
import { Tenant } from '../models/TenantModel';
import ApiErrorResponse from '../../common/models/ApiErrorResponse'; // Import the ApiErrorResponse model

// Define the steps for the wizard
const steps = ['Data', 'Preview', 'Status'];

/**
 * StepperTenant Component - Handles the form wizard flow for creating a tenant.
 */
const StepperTenant = () => {
    // State to track the current active step in the wizard
    const [activeStep, setActiveStep] = useState(0);

    // State to hold the tenant data using the Tenant model
    const [tenantData, setTenantData] = useState(new Tenant());

    // State to hold the response message after API submission
    const [responseMessage, setResponseMessage] = useState('');

    // State to track the success or failure of the API call
    const [apiSuccess, setApiSuccess] = useState(null);

    // State to store the error response for detailed error display using the ApiErrorResponse model
    const [errorResponse, setErrorResponse] = useState(null);

    // Initialize the Redux dispatch function
    const dispatch = useDispatch();

    /**
     * Move to the next step in the wizard.
     */
    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    /**
     * Move to the previous step in the wizard.
     */
    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    /**
     * Handle form submission and API call for creating a tenant.
     */
    const handleSubmit = async () => {
        try {
            // Dispatch the createTenant action and handle success or failure
            const result = await dispatch(createTenant(tenantData)).unwrap();
            const createdTenant = Tenant.fromApiResponse(result); // Convert the API response to the Tenant model
            setTenantData(createdTenant); // Update tenantData with the response
            setApiSuccess(true);
            setResponseMessage(`Successfully created Tenant with ID: ${createdTenant.id}`);
            setErrorResponse(null); // Clear any previous errors
            handleNext(); // Move to the Confirmation step
        } catch (error) {
            setApiSuccess(false);
            console.log('Raw Error Response:', error);
            setResponseMessage(error.message); // The message is already accessible from the parsed `ApiErrorResponse`
            setErrorResponse(error); // The error is already an instance of `ApiErrorResponse`
            handleNext(); // Move to the Confirmation step even on failure
        }
    };

    /**
     * Get the content to display based on the current step.
     * @param {number} step - The current step index.
     * @returns JSX.Element
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
                    <TenantPreview
                        tenantData={tenantData}
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
                        errorResponse={errorResponse} // Pass the error response to TenantConfirmation
                    />
                );
            default:
                return 'Unknown step';
        }
    };

    return (
        <Box sx={{ width: '100%' }}>
            {/* Stepper component to show the progress through the steps */}
            <Stepper activeStep={activeStep} sx={{ mb: 3 }}>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            {/* Render the content based on the current step */}
            <Box>{getStepContent(activeStep)}</Box>
        </Box>
    );
};

export default StepperTenant;
