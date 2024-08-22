// tmsui/src/features/tenants/components/TenantPreview.jsx

import React from 'react';
import { Grid, Typography, Button, Box, Stack } from '@mui/material';

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// ==============================|| TENANT PREVIEW COMPONENT ||============================== //

/**
 * This component is used in the preview step of the Tenant creation wizard.
 * It shows a read-only view of the tenant data before final submission.
 * Users can go back to edit the form or submit the tenant creation request.
 *
 * @param {Object} tenantData - The data entered by the user for tenant creation.
 * @param {Function} handleBack - Function to go back to the previous step (edit form).
 * @param {Function} handleSubmit - Function to submit the tenant data.
 */
const TenantPreview = ({ tenantData, handleBack, handleSubmit }) => {
    return (
        <Box>
            {/* Header */}
            <Typography variant="h5" gutterBottom>
                Preview Tenant Details
            </Typography>

            {/* Display tenant details in a responsive grid layout */}
            <Grid container spacing={2}>
                {/* Name */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Name</Typography>
                    <Typography variant="body2">{tenantData.name}</Typography>
                </Grid>

                {/* Country */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Country</Typography>
                    <Typography variant="body2">{tenantData.country}</Typography>
                </Grid>

                {/* State */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">State</Typography>
                    <Typography variant="body2">{tenantData.state}</Typography>
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">City</Typography>
                    <Typography variant="body2">{tenantData.city}</Typography>
                </Grid>

                {/* Pincode */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Pincode</Typography>
                    <Typography variant="body2">{tenantData.pincode}</Typography>
                </Grid>

                {/* Address */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Address</Typography>
                    <Typography variant="body2">{tenantData.address}</Typography>
                </Grid>

                {/* Latitude */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Latitude</Typography>
                    <Typography variant="body2">{tenantData.latitude}</Typography>
                </Grid>

                {/* Longitude */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="subtitle1">Longitude</Typography>
                    <Typography variant="body2">{tenantData.longitude}</Typography>
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                    <Typography variant="subtitle1">Description</Typography>
                    <Typography variant="body2">{tenantData.description}</Typography>
                </Grid>

                {/* Active Status */}
                <Grid item xs={12} sm={6}>
                    <Typography variant="subtitle1">Active</Typography>
                    <Typography variant="body2">{tenantData.active ? 'Yes' : 'No'}</Typography>
                </Grid>
            </Grid>

            {/* Navigation Buttons */}
            <Grid item xs={12} sx={{ mt: 3 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <AnimateButton>
                        {/* Back button to return to the edit form */}
                        <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>

                        {/* Create button to submit the data */}
                        <Button variant="contained" onClick={handleSubmit} sx={{ my: 3, ml: 1 }} color="primary">
                            Create
                        </Button>
                    </AnimateButton>
                </Stack>
            </Grid>
        </Box>
    );
};

export default TenantPreview;
