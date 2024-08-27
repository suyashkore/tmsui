import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import TenantForm from './TenantForm';
import TenantDetails from './TenantDetails';
import TenantConfirmation from './TenantConfirmation';
import useTenantApi from '../hooks/useTenantApi';
import { Tenant } from '../models/TenantModel';
import { Typography } from '@mui/material';

/**
 * TenantStepper Component
 * - Manages the multi-step process for creating or editing a tenant.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {Tenant} initialTenantData - Initial tenant data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered TenantStepper component.
 */
const TenantStepper = ({ initialTenantData = new Tenant(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [tenantData, setTenantData] = useState(initialTenantData); // Stores the tenant data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createTenant, updateTenant } = useTenantApi(); // Hooks for API calls
    const navigate = useNavigate();

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            console.log('Submitting the form...');
            let result;
            if (isEditMode) {
                console.log('Edit Mode: Updating Tenant');
                result = await updateTenant(tenantData.id, tenantData);
            } else {
                console.log('Create Mode: Creating New Tenant');
                result = await createTenant(tenantData);
            }

            const savedTenant = Tenant.fromApiResponse(result);
            setTenantData(savedTenant);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Tenant with ID: ${savedTenant.id}`);
            setErrorResponse(null);

            console.log('Tenant Saved Successfully:', savedTenant);
            handleNext(); // Move to the confirmation step
        } catch (error) {
            setApiSuccess(false);
            setResponseMessage(error.message);
            setErrorResponse(error);
            handleNext(); // Move to the confirmation step even on failure
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
        console.log(`Rendering content for step: ${activeStep}`);
        switch (activeStep) {
            case 0:
                return (
                    <TenantForm
                        tenantData={tenantData}
                        setTenantData={setTenantData}
                        handleNext={handleNext}
                        handleSubmit={handleFormSubmit}
                        isEditMode={isEditMode}
                    />
                );
            case 1:
                return (
                    <TenantDetails
                        tenant={tenantData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
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
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, tenantData, apiSuccess, responseMessage, errorResponse, isEditMode]);

    return <div>{stepContent}</div>;
};

export default TenantStepper;
