// tmsui/src/features/contracts/containers/CreateLoaderRate.jsx

import React from 'react';
import LoaderRateStepper from '../components/LoaderRateStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateLoaderRate Component
 * - Responsible for initiating the loader rate creation flow using a multi-step wizard.
 * - Wraps the LoaderRateStepper component for a clean layout.
 */
const CreateLoaderRate = () => {
    return (
        <MainCard title="Create Loader Rate">
            {/* The LoaderRateStepper handles the loader rate creation logic */}
            <LoaderRateStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateLoaderRate;
