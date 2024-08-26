// tmsui/src/features/tenants/containers/CreateTenant.jsx

import React from 'react';
import TenantStepper from '../components/TenantStepper';
import MainCard from 'ui-component/cards/MainCard';

const CreateTenant = () => {
    return (
        <MainCard title="Create Tenant">
            <TenantStepper />
        </MainCard>
    );
};

export default CreateTenant;
