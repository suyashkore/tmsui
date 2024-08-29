// tmsui/src/features/fleet/containers/EditVehicle.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import VehicleStepper from '../components/VehicleStepper';
import useVehicleApi from '../hooks/useVehicleApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditVehicle Component
 * - Handles editing vehicle data.
 * - Fetches vehicle data based on the ID and initializes the form in edit mode.
 */
const EditVehicle = () => {
    const { id } = useParams();
    const { fetchVehicleById } = useVehicleApi();
    const [vehicleData, setVehicleData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadVehicleData = async () => {
            try {
                const vehicle = await fetchVehicleById(id);
                setVehicleData(vehicle);
            } catch (err) {
                setError('Failed to load vehicle data');
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
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!vehicleData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading vehicle data...</Typography>
            </Box>
        );
    }

    return (
        <VehicleStepper
            initialVehicleData={vehicleData}
            isEditMode={true}
        />
    );
};

export default EditVehicle;
