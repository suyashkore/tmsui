// tmsui/src/features/companies/containers/ViewCompany.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import CompanyDetails from '../components/CompanyDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useCompanyApi from '../hooks/useCompanyApi';

/**
 * ViewCompany Component
 * - Displays the details of a specific company based on the ID passed in the URL.
 * - Reuses the CompanyDetails component in "view" mode.
 */
const ViewCompany = () => {
    const { id } = useParams(); // Retrieve the company ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchCompanyById } = useCompanyApi(); // Hook for company-related API operations

    const [companyData, setCompanyData] = useState(null); // Local state to hold the company data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch company data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadCompanyData = async () => {
            try {
                setLoading(true);
                const company = await fetchCompanyById(id); // Fetch company data
                setCompanyData(company); // Set the company data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadCompanyData();
        }
    }, [id, fetchCompanyById]);

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
                <Typography color="error">{error.message || 'Failed to load company data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Company Details">
            {companyData ? (
                <CompanyDetails company={companyData} mode="view" />
            ) : (
                <Typography>No company data found</Typography>
            )}
            {/* Navigation button to return to the company list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/org/companies/list')} // Use navigate function to go back to company list
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

export default ViewCompany;
