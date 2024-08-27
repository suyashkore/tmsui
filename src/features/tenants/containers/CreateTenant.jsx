// tmsui/src/features/tenants/containers/CreateTenant.jsx

import React from 'react';
import TenantStepper from '../components/TenantStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateTenant Component
 * - Responsible for initiating the tenant creation flow using a multi-step wizard.
 * - Wraps the TenantStepper component for a clean layout.
 */
const CreateTenant = () => {
    return (
        <MainCard title="Create Tenant">
            {/* The TenantStepper handles the tenant creation logic */}
            <TenantStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateTenant;
