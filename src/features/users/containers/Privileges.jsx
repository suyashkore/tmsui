// tmsui/src/features/users/containers/Privileges.jsx

import React from 'react';
import Grid from '@mui/material/Grid';
import PrivilegeList from '../components/PrivilegeList';
import { gridSpacing } from 'store/constant';

/**
 * Privileges Container
 * - Displays the list of privileges in a grid layout.
 */
const Privileges = () => {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <PrivilegeList />
            </Grid>
        </Grid>
    );
};

export default Privileges;
