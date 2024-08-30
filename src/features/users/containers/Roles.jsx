// tmsui/src/features/users/containers/Roles.jsx

import React from 'react';
import Grid from '@mui/material/Grid';
import RoleList from '../components/RoleList';
import { gridSpacing } from 'store/constant';

/**
 * Roles Component
 * - The main container component that renders the list of roles.
 */
export default function Roles() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <RoleList />
            </Grid>
        </Grid>
    );
}
