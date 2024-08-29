// tmsui/src/features/customers/containers/CreateCustomer.jsx

import React from 'react';
import CustomerStepper from '../components/CustomerStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateCustomer Component
 * - Responsible for initiating the customer creation flow using a multi-step wizard.
 * - Wraps the CustomerStepper component for a clean layout.
 */
const CreateCustomer = () => {
    return (
        <MainCard title="Create Customer">
            {/* The CustomerStepper handles the customer creation logic */}
            <CustomerStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateCustomer;
