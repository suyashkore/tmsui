// tmsui/src/features/fleet/containers/CreateVehicle.jsx

import React from 'react';
import VehicleStepper from '../components/VehicleStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateVehicle Component
 * - Responsible for initiating the vehicle creation flow using a multi-step wizard.
 * - Wraps the VehicleStepper component for a clean layout.
 */
const CreateVehicle = () => {
    return (
        <MainCard title="Create Vehicle">
            <VehicleStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateVehicle;
