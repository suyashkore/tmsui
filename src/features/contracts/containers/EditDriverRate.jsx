// tmsui/src/features/contracts/containers/EditDriverRate.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import DriverRateStepper from '../components/DriverRateStepper';
import useDriverRateApi from '../hooks/useDriverRateApi';
import { CircularProgress, Box, Typography } from '@mui/material';

const EditDriverRate = () => {
    const { id } = useParams();
    const { fetchDriverRateById } = useDriverRateApi();
    const [driverRateData, setDriverRateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDriverRateData = async () => {
            try {
                const driverRate = await fetchDriverRateById(id);
                setDriverRateData(driverRate);
            } catch (err) {
                setError('Failed to load driver rate data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadDriverRateData();
        }
    }, [id, fetchDriverRateById]);

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

    if (!driverRateData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading driver rate data...</Typography>
            </Box>
        );
    }

    return (
        <DriverRateStepper
            initialDriverRateData={driverRateData}
            isEditMode={true}
        />
    );
};

export default EditDriverRate;
