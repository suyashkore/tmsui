// tmsui/src/features/vendors/containers/EditVendor.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VendorStepper from '../components/VendorStepper';
import useVendorApi from '../hooks/useVendorApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditVendor Container Component
 * - This component handles the editing of vendor data.
 * - It fetches vendor data based on the vendor ID provided in the URL and initializes the form in edit mode.
 */
const EditVendor = () => {
    const { id } = useParams();
    const { fetchVendorById } = useVendorApi();
    const [vendorData, setVendorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVendorData = async () => {
            try {
                const vendor = await fetchVendorById(id);
                setVendorData(vendor);
            } catch (err) {
                setError('Failed to load vendor data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadVendorData();
        }
    }, [id, fetchVendorById]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!vendorData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading vendor data...</Typography>
            </Box>
        );
    }

    return (
        <VendorStepper
            initialVendorData={vendorData}
            isEditMode={true}
        />
    );
};

export default EditVendor;
