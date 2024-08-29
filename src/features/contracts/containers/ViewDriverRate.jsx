// tmsui/src/features/contracts/containers/ViewDriverRate.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import DriverRateDetails from '../components/DriverRateDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useDriverRateApi from '../hooks/useDriverRateApi';

const ViewDriverRate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchDriverRateById } = useDriverRateApi();

    const [driverRateData, setDriverRateData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadDriverRateData = async () => {
            try {
                setLoading(true);
                const driverRate = await fetchDriverRateById(id);
                setDriverRateData(driverRate);
            } catch (err) {
                setError(err);
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
                <Typography color="error">{error.message || 'Failed to load driver rate data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Driver Rate Details">
            {driverRateData ? (
                <DriverRateDetails driverRate={driverRateData} mode="view" />
            ) : (
                <Typography>No driver rate data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/contracts/driver/list')}
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

export default ViewDriverRate;
