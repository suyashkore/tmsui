// tmsui/src/features/vendors/containers/ViewVendor.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import VendorDetails from '../components/VendorDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useVendorApi from '../hooks/useVendorApi';

/**
 * ViewVendor Container Component
 * - Displays the details of a specific vendor based on the ID passed in the URL.
 */
const ViewVendor = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchVendorById } = useVendorApi();

    const [vendorData, setVendorData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVendorData = async () => {
            try {
                setLoading(true);
                const vendor = await fetchVendorById(id);
                setVendorData(vendor);
            } catch (err) {
                setError(err);
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
                <Typography color="error">{error.message || 'Failed to load vendor data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Vendor Details">
            {vendorData ? (
                <VendorDetails vendor={vendorData} mode="view" />
            ) : (
                <Typography>No vendor data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/ext/org/vendors/list')}
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

export default ViewVendor;
