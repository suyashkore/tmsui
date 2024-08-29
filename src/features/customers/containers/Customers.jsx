// tmsui/src/features/customers/containers/Customers.jsx

import Grid from '@mui/material/Grid';
import CustomerList from '../components/CustomerList';
import { gridSpacing } from 'store/constant';

/**
 * Customers Component
 * - Main container component for displaying the list of customers.
 */
export default function Customers() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CustomerList />
            </Grid>
        </Grid>
    );
}
