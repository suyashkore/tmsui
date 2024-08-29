// tmsui/src/features/channelpartners/containers/CreateChannelPartner.jsx

import React from 'react';
import ChannelPartnerStepper from '../components/ChannelPartnerStepper';
import MainCard from 'ui-component/cards/MainCard';

/**
 * CreateChannelPartner Container
 * - This container initiates the channel partner creation flow using a multi-step wizard.
 * - Wraps the ChannelPartnerStepper component for a clean layout.
 */
const CreateChannelPartner = () => {
    return (
        <MainCard title="Create Channel Partner">
            <ChannelPartnerStepper isEditMode={false} />
        </MainCard>
    );
};

export default CreateChannelPartner;
