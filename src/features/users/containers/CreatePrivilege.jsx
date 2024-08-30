// tmsui/src/features/users/containers/CreatePrivilege.jsx

import React from 'react';
import PrivilegeStepper from '../components/PrivilegeStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreatePrivilege Container
 * - Initiates the privilege creation process using a multi-step wizard.
 */
const CreatePrivilege = () => {
    return (
        <MainCard title="Create Privilege">
            <PrivilegeStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreatePrivilege;
