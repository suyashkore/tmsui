// tmsui/src/features/offices/containers/ViewOffice.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import OfficeDetails from '../components/OfficeDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useOfficeApi from '../hooks/useOfficeApi';

/**
 * ViewOffice Component
 * - Displays the details of a specific office based on the ID passed in the URL.
 * - Reuses the OfficeDetails component in "view" mode.
 */
const ViewOffice = () => {
    const { id } = useParams(); // Retrieve the office ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchOfficeById } = useOfficeApi(); // Hook for office-related API operations

    const [officeData, setOfficeData] = useState(null); // Local state to hold the office data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch office data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadOfficeData = async () => {
            try {
                setLoading(true);
                const office = await fetchOfficeById(id); // Fetch office data
                setOfficeData(office); // Set the office data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadOfficeData();
        }
    }, [id, fetchOfficeById]);

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
                <Typography color="error">{error.message || 'Failed to load office data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Office Details">
            {officeData ? (
                <OfficeDetails office={officeData} mode="view" />
            ) : (
                <Typography>No office data found</Typography>
            )}
            {/* Navigation button to return to the office list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/org/offices/list')} // Use navigate function to go back to office list
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

export default ViewOffice;
