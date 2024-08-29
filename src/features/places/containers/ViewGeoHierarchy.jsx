// tmsui/src/features/places/containers/ViewGeoHierarchy.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import GeoHierarchyDetails from '../components/GeoHierarchyDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useGeoHierarchyApi from '../hooks/useGeoHierarchyApi';

const ViewGeoHierarchy = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchGeoHierarchyById } = useGeoHierarchyApi();

    const [geoHierarchyData, setGeoHierarchyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGeoHierarchyData = async () => {
            try {
                setLoading(true);
                const geoHierarchy = await fetchGeoHierarchyById(id);
                setGeoHierarchyData(geoHierarchy);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadGeoHierarchyData();
        }
    }, [id, fetchGeoHierarchyById]);

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
                <Typography color="error">{error.message || 'Failed to load geo-hierarchy data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="GeoHierarchy Details">
            {geoHierarchyData ? (
                <GeoHierarchyDetails geoHierarchy={geoHierarchyData} mode="view" />
            ) : (
                <Typography>No geo-hierarchy data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/places/geohierarchies/list')}
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

export default ViewGeoHierarchy;
