// tmsui/src/features/fleet/containers/Vehicles.jsx

import Grid from '@mui/material/Grid';
import VehicleList from '../components/VehicleList';
import { gridSpacing } from 'store/constant';

/**
 * Vehicles Component
 * - Responsible for rendering the list of vehicles.
 */
export default function Vehicles() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <VehicleList />
            </Grid>
        </Grid>
    );
}
