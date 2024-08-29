// tmsui/src/features/places/containers/GeoHierarchies.jsx

import React from 'react';
import Grid from '@mui/material/Grid';
import GeoHierarchyList from '../components/GeoHierarchyList';
import { gridSpacing } from 'store/constant';

const GeoHierarchies = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <GeoHierarchyList />
            </Grid>
        </Grid>
    );
};

export default GeoHierarchies;
