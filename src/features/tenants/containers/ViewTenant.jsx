// tmsui/src/features/tenants/containers/ViewTenant.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import TenantDetails from '../components/TenantDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useTenantApi from '../hooks/useTenantApi';

/**
 * ViewTenant Component
 * - Displays the details of a specific tenant based on the ID passed in the URL.
 * - Reuses the TenantDetails component in "view" mode.
 */
const ViewTenant = () => {
    const { id } = useParams(); // Retrieve the tenant ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchTenantById } = useTenantApi(); // Hook for tenant-related API operations

    const [tenantData, setTenantData] = useState(null); // Local state to hold the tenant data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch tenant data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadTenantData = async () => {
            try {
                setLoading(true);
                const tenant = await fetchTenantById(id); // Fetch tenant data
                setTenantData(tenant); // Set the tenant data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadTenantData();
        }
    }, [id, fetchTenantById]);

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
                <Typography color="error">{error.message || 'Failed to load tenant data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Tenant Details">
            {tenantData ? (
                <TenantDetails tenant={tenantData} mode="view" />
            ) : (
                <Typography>No tenant data found</Typography>
            )}
            {/* Navigation button to return to the tenant list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/org/tenants/list')} // Use navigate function to go back to tenant list
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

export default ViewTenant;
