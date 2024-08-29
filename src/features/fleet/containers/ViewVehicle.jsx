// tmsui/src/features/fleet/containers/ViewVehicle.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import VehicleDetails from '../components/VehicleDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useVehicleApi from '../hooks/useVehicleApi';

/**
 * ViewVehicle Component
 * - Displays the details of a specific vehicle based on the ID passed in the URL.
 * - Reuses the VehicleDetails component in "view" mode.
 */
const ViewVehicle = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchVehicleById } = useVehicleApi();

    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVehicleData = async () => {
            try {
                setLoading(true);
                const vehicle = await fetchVehicleById(id);
                setVehicleData(vehicle);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadVehicleData();
        }
    }, [id, fetchVehicleById]);

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
                <Typography color="error">{error.message || 'Failed to load vehicle data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Vehicle Details">
            {vehicleData ? (
                <VehicleDetails vehicle={vehicleData} mode="view" />
            ) : (
                <Typography>No vehicle data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/fleet/vehicles/list')}
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

export default ViewVehicle;
