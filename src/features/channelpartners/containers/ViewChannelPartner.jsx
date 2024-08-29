// tmsui/src/features/channelpartners/containers/ViewChannelPartner.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import ChannelPartnerDetails from '../components/ChannelPartnerDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useChannelPartnerApi from '../hooks/useChannelPartnerApi';

/**
 * ViewChannelPartner Container
 * - Displays the details of a specific channel partner based on the ID passed in the URL.
 * - Reuses the ChannelPartnerDetails component in "view" mode.
 */
const ViewChannelPartner = () => {
    const { id } = useParams(); // Retrieve the channel partner ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchChannelPartnerById } = useChannelPartnerApi(); // Hook for channel partner-related API operations

    const [channelPartnerData, setChannelPartnerData] = useState(null); // Local state to hold the channel partner data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch channel partner data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadChannelPartnerData = async () => {
            try {
                setLoading(true);
                const channelPartner = await fetchChannelPartnerById(id); // Fetch channel partner data
                setChannelPartnerData(channelPartner); // Set the channel partner data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadChannelPartnerData();
        }
    }, [id, fetchChannelPartnerById]);

    // Handle loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error.message || 'Failed to load channel partner data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Channel Partner Details">
            {channelPartnerData ? (
                <ChannelPartnerDetails channelPartner={channelPartnerData} mode="view" />
            ) : (
                <Typography>No channel partner data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/ext/org/channelpartners/list')}
                        variant="contained"
                        color="primary"
                    >
                        OK
                    </Button>
                </AnimateButton>
            </Stack>
        </MainCard>
    );
};

export default ViewChannelPartner;
