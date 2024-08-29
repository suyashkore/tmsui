// tmsui/src/features/places/containers/CreateStationCoverage.jsx

import React from 'react';
import StationCoverageStepper from '../components/StationCoverageStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateStationCoverage Component
 * - Responsible for initiating the station coverage creation flow using a multi-step wizard.
 * - Wraps the StationCoverageStepper component for a clean layout.
 */
const CreateStationCoverage = () => {
    return (
        <MainCard title="Create Station Coverage">
            {/* The StationCoverageStepper handles the station coverage creation logic */}
            <StationCoverageStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateStationCoverage;
