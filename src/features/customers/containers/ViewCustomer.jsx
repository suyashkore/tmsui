// tmsui/src/features/customers/containers/ViewCustomer.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import CustomerDetails from '../components/CustomerDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useCustomerApi from '../hooks/useCustomerApi';

/**
 * ViewCustomer Component
 * - Displays the details of a specific customer based on the ID passed in the URL.
 * - Reuses the CustomerDetails component in "view" mode.
 */
const ViewCustomer = () => {
    const { id } = useParams(); // Retrieve the customer ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchCustomerById } = useCustomerApi(); // Hook for customer-related API operations

    const [customerData, setCustomerData] = useState(null); // Local state to hold the customer data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch customer data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadCustomerData = async () => {
            try {
                setLoading(true);
                const customer = await fetchCustomerById(id); // Fetch customer data
                setCustomerData(customer); // Set the customer data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCustomerData();
        }
    }, [id, fetchCustomerById]);

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
                <Typography color="error">{error.message || 'Failed to load customer data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Customer Details">
            {customerData ? (
                <CustomerDetails customer={customerData} mode="view" />
            ) : (
                <Typography>No customer data found</Typography>
            )}
            {/* Navigation button to return to the customer list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/ext/org/customers/list')} // Use navigate function to go back to customer list
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

export default ViewCustomer;
