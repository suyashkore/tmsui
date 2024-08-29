// tmsui/src/features/channelpartners/containers/EditChannelPartner.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelPartnerStepper from '../components/ChannelPartnerStepper';
import useChannelPartnerApi from '../hooks/useChannelPartnerApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditChannelPartner Container
 * - Handles the editing of channel partner data.
 * - Fetches channel partner data based on the channel partner ID provided in the URL and initializes the form in edit mode.
 */
const EditChannelPartner = () => {
    const { id } = useParams(); // Extract channel partner ID from the URL parameters
    const { fetchChannelPartnerById } = useChannelPartnerApi(); // Custom hook to handle channel partner API calls
    const [channelPartnerData, setChannelPartnerData] = useState(null); // State to store the fetched channel partner data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    useEffect(() => {
        const loadChannelPartnerData = async () => {
            try {
                const channelPartner = await fetchChannelPartnerById(id); // Fetch channel partner data by ID
                setChannelPartnerData(channelPartner); // Store the fetched data
            } catch (err) {
                setError('Failed to load channel partner data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadChannelPartnerData(); // Trigger channel partner data fetch if ID is available
        }
    }, [id, fetchChannelPartnerById]);

    // Handle the loading state while fetching data
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle any errors during data fetch
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Ensure the form does not render until channel partner data is fully loaded
    if (!channelPartnerData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading channel partner data...</Typography>
            </Box>
        );
    }

    return (
        <ChannelPartnerStepper
            initialChannelPartnerData={channelPartnerData} // Pass the fetched channel partner data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditChannelPartner;
