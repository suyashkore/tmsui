// tmsui/src/features/contracts/containers/LoaderRates.jsx

import React from 'react';
import Grid from '@mui/material/Grid';
import LoaderRateList from '../components/LoaderRateList';
import { gridSpacing } from 'store/constant';

// ==============================|| LOADER RATE LIST CONTAINER ||============================== //

const LoaderRates = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <LoaderRateList />
            </Grid>
        </Grid>
    );
};

export default LoaderRates;
