// tmsui/src/features/vendors/containers/Vendors.jsx

import Grid from '@mui/material/Grid';
import VendorList from '../components/VendorList';
import { gridSpacing } from 'store/constant';

/**
 * Vendors Container Component
 * - Displays a list of vendors using the VendorList component.
 */
export default function Vendors() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <VendorList />
            </Grid>
        </Grid>
    );
}
