// tmsui/src/features/offices/containers/EditOffice.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import OfficeStepper from '../components/OfficeStepper';
import useOfficeApi from '../hooks/useOfficeApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditOffice Component
 * - This component handles the editing of office data.
 * - It fetches office data based on the office ID provided in the URL and initializes the form in edit mode.
 */
const EditOffice = () => {
    const { id } = useParams(); // Extract office ID from the URL parameters
    const { fetchOfficeById } = useOfficeApi(); // Custom hook to handle office API calls
    const [officeData, setOfficeData] = useState(null); // State to store the fetched office data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches office data when the component mounts or when the office ID changes.
     */
    useEffect(() => {
        const loadOfficeData = async () => {
            try {
                const office = await fetchOfficeById(id); // Fetch office data by ID
                setOfficeData(office); // Store the fetched data
            } catch (err) {
                setError('Failed to load office data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadOfficeData(); // Trigger office data fetch if ID is available
        }
    }, [id, fetchOfficeById]); // Dependency array ensures this runs when ID or API hook changes

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

    // Ensure the form does not render until office data is fully loaded
    if (!officeData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading office data...</Typography>
            </Box>
        );
    }

    return (
        <OfficeStepper
            initialOfficeData={officeData} // Pass the fetched office data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditOffice;
