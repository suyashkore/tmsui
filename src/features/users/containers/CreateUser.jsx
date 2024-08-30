// tmsui/src/features/users/containers/CreateUser.jsx

import React from 'react';
import UserStepper from '../components/UserStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateUser Component
 * - Responsible for initiating the user creation flow using a multi-step wizard.
 * - Wraps the UserStepper component for a clean layout.
 */
const CreateUser = () => {
    return (
        <MainCard title="Create User">
            {/* The UserStepper handles the user creation logic */}
            <UserStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateUser;
