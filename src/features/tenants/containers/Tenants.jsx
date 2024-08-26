// material-ui
import Grid from '@mui/material/Grid';

// project import
import TenantList from '../components/TenantList';
import { gridSpacing } from 'store/constant';

// ==============================|| COLUMN VISIBILITY DATA GRID ||============================== //

export default function ColumnVisibility() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <TenantList />
            </Grid>
        </Grid>
    );
}
