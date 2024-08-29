// tmsui/src/features/contracts/containers/DriverRates.jsx

import Grid from '@mui/material/Grid';
import DriverRateList from '../components/DriverRateList';
import { gridSpacing } from 'store/constant';

const DriverRates = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <DriverRateList />
            </Grid>
        </Grid>
    );
};

export default DriverRates;
