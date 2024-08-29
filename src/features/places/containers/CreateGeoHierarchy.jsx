// tmsui/src/features/places/containers/CreateGeoHierarchy.jsx

import React from 'react';
import GeoHierarchyStepper from '../components/GeoHierarchyStepper';
import MainCard from 'ui-component/cards/MainCard';

const CreateGeoHierarchy = () => {
    return (
        <MainCard title="Create GeoHierarchy">
            <GeoHierarchyStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateGeoHierarchy;
