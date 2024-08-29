// tmsui/src/features/contracts/containers/CreateDriverRate.jsx

import React from 'react';
import DriverRateStepper from '../components/DriverRateStepper';
import MainCard from 'ui-component/cards/MainCard';

const CreateDriverRate = () => {
    return (
        <MainCard title="Create Driver Rate">
            <DriverRateStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateDriverRate;
