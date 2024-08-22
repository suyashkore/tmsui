// tmsui/src/features/tenants/containers/CreateTenant.jsx

import React from 'react';
import StepperTenant from '../components/StepperTenant';
import MainCard from 'ui-component/cards/MainCard';

const CreateTenant = () => {
    return (
        <MainCard title="Create Tenant">
            <StepperTenant />
        </MainCard>
    );
};

export default CreateTenant;
