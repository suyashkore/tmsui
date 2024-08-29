// tmsui/src/features/offices/containers/CreateOffice.jsx

import React from 'react';
import OfficeStepper from '../components/OfficeStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateOffice Component
 * - Responsible for initiating the office creation flow using a multi-step wizard.
 * - Wraps the OfficeStepper component for a clean layout.
 */
const CreateOffice = () => {
    return (
        <MainCard title="Create Office">
            {/* The OfficeStepper handles the office creation logic */}
            <OfficeStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateOffice;
