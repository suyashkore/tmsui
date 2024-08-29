// tmsui/src/features/companies/components/CompanyStepper.jsx

import React, { useState, useMemo } from 'react';
import { Stepper, Step, StepLabel, Box } from '@mui/material';
import CompanyForm from './CompanyForm';
import CompanyDetails from './CompanyDetails';
import CompanyConfirmation from './CompanyConfirmation';
import useCompanyApi from '../hooks/useCompanyApi';
import { Company } from '../models/CompanyModel';
import { Typography } from '@mui/material';

/**
 * CompanyStepper Component
 * - Manages the multi-step process for creating or editing a company.
 * - Handles the flow of steps, form submission, and API calls.
 * 
 * @param {Company} initialCompanyData - Initial company data for edit mode.
 * @param {boolean} isEditMode - Indicates whether the form is in edit or create mode.
 * @returns {JSX.Element} The rendered CompanyStepper component.
 */
const CompanyStepper = ({ initialCompanyData = new Company(), isEditMode = false }) => {
    const [activeStep, setActiveStep] = useState(0); // Tracks the current step in the stepper
    const [companyData, setCompanyData] = useState(initialCompanyData); // Stores the company data being created or edited
    const [responseMessage, setResponseMessage] = useState(''); // Stores the API response message for display
    const [apiSuccess, setApiSuccess] = useState(null); // Tracks the success or failure of the API call
    const [errorResponse, setErrorResponse] = useState(null); // Stores any error responses from the API

    const { createCompany, updateCompany } = useCompanyApi(); // Hooks for API calls
    const [skipPreview, setSkipPreview] = useState(false); // Flag to control skipping the preview step

    const steps = ['Data', 'Preview', 'Status']; // Step labels

    /**
     * Handles form submission based on the mode (create or edit).
     */
    const handleFormSubmit = async () => {
        try {
            let result;
            if (isEditMode) {
                result = await updateCompany(companyData.id, companyData);
            } else {
                result = await createCompany(companyData);
            }

            const savedCompany = Company.fromApiResponse(result);
            setCompanyData(savedCompany);
            setApiSuccess(true);
            setResponseMessage(`Successfully ${isEditMode ? 'updated' : 'created'} Company with ID: ${savedCompany.id}`);
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
                    <CompanyForm
                        companyData={companyData}
                        setCompanyData={setCompanyData}
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
                    <CompanyDetails
                        company={companyData}
                        mode={isEditMode ? 'edit' : 'create'}
                        handleBack={handleBack}
                        handleSubmit={handleFormSubmit}
                    />
                );
            case 2:
                return (
                    <CompanyConfirmation
                        message={responseMessage}
                        apiSuccess={apiSuccess}
                        companyData={companyData}
                        errorResponse={errorResponse}
                    />
                );
            default:
                return <Typography variant="body1">Unknown step</Typography>;
        }
    }, [activeStep, companyData, apiSuccess, responseMessage, errorResponse, isEditMode]);

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

export default CompanyStepper;
