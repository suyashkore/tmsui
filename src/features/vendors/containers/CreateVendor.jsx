// tmsui/src/features/vendors/containers/CreateVendor.jsx

import React from 'react';
import VendorStepper from '../components/VendorStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateVendor Container Component
 * - Initiates the vendor creation process using a multi-step form.
 */
const CreateVendor = () => {
    return (
        <MainCard title="Create Vendor">
            {/* The VendorStepper handles the vendor creation logic */}
            <VendorStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateVendor;
