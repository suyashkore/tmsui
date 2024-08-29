// tmsui/src/features/customers/containers/EditCustomer.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerStepper from '../components/CustomerStepper';
import useCustomerApi from '../hooks/useCustomerApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditCustomer Component
 * - This component handles the editing of customer data.
 * - It fetches customer data based on the customer ID provided in the URL and initializes the form in edit mode.
 */
const EditCustomer = () => {
    const { id } = useParams(); // Extract customer ID from the URL parameters
    const { fetchCustomerById } = useCustomerApi(); // Custom hook to handle customer API calls
    const [customerData, setCustomerData] = useState(null); // State to store the fetched customer data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches customer data when the component mounts or when the customer ID changes.
     */
    useEffect(() => {
        const loadCustomerData = async () => {
            try {
                const customer = await fetchCustomerById(id); // Fetch customer data by ID
                setCustomerData(customer); // Store the fetched data
            } catch (err) {
                setError('Failed to load customer data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadCustomerData(); // Trigger customer data fetch if ID is available
        }
    }, [id, fetchCustomerById]); // Dependency array ensures this runs when ID or API hook changes

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

    // Ensure the form does not render until customer data is fully loaded
    if (!customerData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading customer data...</Typography>
            </Box>
        );
    }

    return (
        <CustomerStepper
            initialCustomerData={customerData} // Pass the fetched customer data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditCustomer;
