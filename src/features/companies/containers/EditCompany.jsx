// tmsui/src/features/companies/containers/EditCompany.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CompanyStepper from '../components/CompanyStepper';
import useCompanyApi from '../hooks/useCompanyApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditCompany Component
 * - This component handles the editing of company data.
 * - It fetches company data based on the company ID provided in the URL and initializes the form in edit mode.
 */
const EditCompany = () => {
    const { id } = useParams(); // Extract company ID from the URL parameters
    const { fetchCompanyById } = useCompanyApi(); // Custom hook to handle company API calls
    const [companyData, setCompanyData] = useState(null); // State to store the fetched company data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches company data when the component mounts or when the company ID changes.
     */
    useEffect(() => {
        const loadCompanyData = async () => {
            try {
                const company = await fetchCompanyById(id); // Fetch company data by ID
                setCompanyData(company); // Store the fetched data
            } catch (err) {
                setError('Failed to load company data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadCompanyData(); // Trigger company data fetch if ID is available
        }
    }, [id, fetchCompanyById]); // Dependency array ensures this runs when ID or API hook changes

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

    // Ensure the form does not render until company data is fully loaded
    if (!companyData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading company data...</Typography>
            </Box>
        );
    }

    return (
        <CompanyStepper
            initialCompanyData={companyData} // Pass the fetched company data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditCompany;
