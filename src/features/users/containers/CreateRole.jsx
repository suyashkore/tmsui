// tmsui/src/features/users/containers/CreateRole.jsx

import React from 'react';
import RoleStepper from '../components/RoleStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateRole Component
 * - Responsible for initiating the role creation flow using a multi-step wizard.
 * - Wraps the RoleStepper component for a clean layout.
 */
const CreateRole = () => {
    return (
        <MainCard title="Create Role">
            <RoleStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateRole;
