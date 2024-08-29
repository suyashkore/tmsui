// tmsui/src/features/places/containers/EditStationCoverage.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import StationCoverageStepper from '../components/StationCoverageStepper';
import useStationCoverageApi from '../hooks/useStationCoverageApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditStationCoverage Component
 * - This component handles the editing of station coverage data.
 * - It fetches station coverage data based on the station coverage ID provided in the URL and initializes the form in edit mode.
 */
const EditStationCoverage = () => {
    const { id } = useParams();
    const { fetchStationCoverageById } = useStationCoverageApi();
    const [stationCoverageData, setStationCoverageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStationCoverageData = async () => {
            try {
                const stationCoverage = await fetchStationCoverageById(id);
                setStationCoverageData(stationCoverage);
            } catch (err) {
                setError('Failed to load station coverage data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadStationCoverageData();
        }
    }, [id, fetchStationCoverageById]);

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

    if (!stationCoverageData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading station coverage data...</Typography>
            </Box>
        );
    }

    return (
        <StationCoverageStepper
            initialStationCoverageData={stationCoverageData}
            isEditMode={true}
        />
    );
};

export default EditStationCoverage;
