// material-ui
import Grid from '@mui/material/Grid';

// project import
import TenantsList from '../components/TenantsList';
import { gridSpacing } from 'store/constant';

// ==============================|| COLUMN VISIBILITY DATA GRID ||============================== //

export default function ColumnVisibility() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <TenantsList />
            </Grid>
        </Grid>
    );
}
