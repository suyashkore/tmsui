// tmsui/src/features/offices/containers/Offices.jsx

import Grid from '@mui/material/Grid';
import OfficeList from '../components/OfficeList';
import { gridSpacing } from 'store/constant';

// ==============================|| COLUMN VISIBILITY DATA GRID ||============================== //

export default function ColumnVisibility() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <OfficeList />
            </Grid>
        </Grid>
    );
}
