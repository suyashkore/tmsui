// tmsui/src/features/places/containers/StationCoverages.jsx

import React from 'react';
import Grid from '@mui/material/Grid';
import StationCoverageList from '../components/StationCoverageList';
import { gridSpacing } from 'store/constant';

// ==============================|| STATION COVERAGES ||============================== //

const StationCoverages = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <StationCoverageList />
            </Grid>
        </Grid>
    );
};

export default StationCoverages;
