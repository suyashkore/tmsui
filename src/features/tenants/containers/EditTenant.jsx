import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TenantStepper from '../components/TenantStepper';
import useTenantApi from '../hooks/useTenantApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditTenant Component
 * - This component handles the editing of tenant data.
 * - It fetches tenant data based on the tenant ID provided in the URL and initializes the form in edit mode.
 */
const EditTenant = () => {
    const { id } = useParams(); // Extract tenant ID from the URL parameters
    const { fetchTenantById } = useTenantApi(); // Custom hook to handle tenant API calls
    const [tenantData, setTenantData] = useState(null); // State to store the fetched tenant data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches tenant data when the component mounts or when the tenant ID changes.
     */
    useEffect(() => {
        const loadTenantData = async () => {
            try {
                const tenant = await fetchTenantById(id); // Fetch tenant data by ID
                setTenantData(tenant); // Store the fetched data
            } catch (err) {
                setError('Failed to load tenant data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadTenantData(); // Trigger tenant data fetch if ID is available
        }
    }, [id, fetchTenantById]); // Dependency array ensures this runs when ID or API hook changes

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

    // Ensure the form does not render until tenant data is fully loaded
    if (!tenantData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading tenant data...</Typography>
            </Box>
        );
    }

    return (
        <TenantStepper
            initialTenantData={tenantData} // Pass the fetched tenant data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditTenant;
