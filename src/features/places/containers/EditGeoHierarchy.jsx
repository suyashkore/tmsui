// tmsui/src/features/places/containers/EditGeoHierarchy.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import GeoHierarchyStepper from '../components/GeoHierarchyStepper';
import useGeoHierarchyApi from '../hooks/useGeoHierarchyApi';
import { CircularProgress, Box, Typography } from '@mui/material';

const EditGeoHierarchy = () => {
    const { id } = useParams();
    const { fetchGeoHierarchyById } = useGeoHierarchyApi();
    const [geoHierarchyData, setGeoHierarchyData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadGeoHierarchyData = async () => {
            try {
                const geoHierarchy = await fetchGeoHierarchyById(id);
                setGeoHierarchyData(geoHierarchy);
            } catch (err) {
                setError('Failed to load geo-hierarchy data');
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
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!geoHierarchyData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading geo-hierarchy data...</Typography>
            </Box>
        );
    }

    return (
        <GeoHierarchyStepper
            initialGeoHierarchyData={geoHierarchyData}
            isEditMode={true}
        />
    );
};

export default EditGeoHierarchy;
