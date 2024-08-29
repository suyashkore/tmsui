// tmsui/src/features/companies/containers/Companies.jsx

import Grid from '@mui/material/Grid';
import CompanyList from '../components/CompanyList';
import { gridSpacing } from 'store/constant';

/**
 * Companies Component
 * - Displays the list of companies in a grid layout.
 */
export default function Companies() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <CompanyList />
            </Grid>
        </Grid>
    );
}
