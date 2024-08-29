// tmsui/src/features/contracts/containers/ViewLoaderRate.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import LoaderRateDetails from '../components/LoaderRateDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useLoaderRateApi from '../hooks/useLoaderRateApi';

/**
 * ViewLoaderRate Component
 * - Displays the details of a specific loader rate based on the ID passed in the URL.
 * - Reuses the LoaderRateDetails component in "view" mode.
 */
const ViewLoaderRate = () => {
    const { id } = useParams(); // Retrieve the loader rate ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchLoaderRateById } = useLoaderRateApi(); // Hook for loader rate-related API operations

    const [loaderRateData, setLoaderRateData] = useState(null); // Local state to hold the loader rate data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch loader rate data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadLoaderRateData = async () => {
            try {
                setLoading(true);
                const loaderRate = await fetchLoaderRateById(id); // Fetch loader rate data
                setLoaderRateData(loaderRate); // Set the loader rate data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadLoaderRateData();
        }
    }, [id, fetchLoaderRateById]);

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
                <Typography color="error">{error.message || 'Failed to load loader rate data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Loader Rate Details">
            {loaderRateData ? (
                <LoaderRateDetails loaderRate={loaderRateData} mode="view" />
            ) : (
                <Typography>No loader rate data found</Typography>
            )}
            {/* Navigation button to return to the loader rate list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/contracts/loader/list')} // Use navigate function to go back to loader rate list
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

export default ViewLoaderRate;
