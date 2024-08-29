// tmsui/src/features/places/containers/ViewStationCoverage.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import StationCoverageDetails from '../components/StationCoverageDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useStationCoverageApi from '../hooks/useStationCoverageApi';

/**
 * ViewStationCoverage Component
 * - Displays the details of a specific station coverage based on the ID passed in the URL.
 * - Reuses the StationCoverageDetails component in "view" mode.
 */
const ViewStationCoverage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchStationCoverageById } = useStationCoverageApi();

    const [stationCoverageData, setStationCoverageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadStationCoverageData = async () => {
            try {
                setLoading(true);
                const stationCoverage = await fetchStationCoverageById(id);
                setStationCoverageData(stationCoverage);
            } catch (err) {
                setError(err);
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
                <Typography color="error">{error.message || 'Failed to load station coverage data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Station Coverage Details">
            {stationCoverageData ? (
                <StationCoverageDetails stationCoverage={stationCoverageData} mode="view" />
            ) : (
                <Typography>No station coverage data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/places/stationcoverage/list')}
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

export default ViewStationCoverage;
