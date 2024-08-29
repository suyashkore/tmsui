// tmsui/src/features/contracts/containers/EditLoaderRate.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoaderRateStepper from '../components/LoaderRateStepper';
import useLoaderRateApi from '../hooks/useLoaderRateApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditLoaderRate Component
 * - This component handles the editing of loader rate data.
 * - It fetches loader rate data based on the loader rate ID provided in the URL and initializes the form in edit mode.
 */
const EditLoaderRate = () => {
    const { id } = useParams(); // Extract loader rate ID from the URL parameters
    const { fetchLoaderRateById } = useLoaderRateApi(); // Custom hook to handle loader rate API calls
    const [loaderRateData, setLoaderRateData] = useState(null); // State to store the fetched loader rate data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches loader rate data when the component mounts or when the loader rate ID changes.
     */
    useEffect(() => {
        const loadLoaderRateData = async () => {
            try {
                const loaderRate = await fetchLoaderRateById(id); // Fetch loader rate data by ID
                setLoaderRateData(loaderRate); // Store the fetched data
            } catch (err) {
                setError('Failed to load loader rate data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadLoaderRateData(); // Trigger loader rate data fetch if ID is available
        }
    }, [id, fetchLoaderRateById]); // Dependency array ensures this runs when ID or API hook changes

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

    // Ensure the form does not render until loader rate data is fully loaded
    if (!loaderRateData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading loader rate data...</Typography>
            </Box>
        );
    }

    return (
        <LoaderRateStepper
            initialLoaderRateData={loaderRateData} // Pass the fetched loader rate data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditLoaderRate;
