// tmsui/src/features/companies/containers/CreateCompany.jsx

import React from 'react';
import CompanyStepper from '../components/CompanyStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateCompany Component
 * - Responsible for initiating the company creation flow using a multi-step wizard.
 * - Wraps the CompanyStepper component for a clean layout.
 */
const CreateCompany = () => {
    return (
        <MainCard title="Create Company">
            <CompanyStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateCompany;
