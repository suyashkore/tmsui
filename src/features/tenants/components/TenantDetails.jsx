import React from 'react';
import { Grid, Typography, Card, CardContent, Box, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * TenantDetails Component
 * - A unified component that can display tenant details in both "preview" and "show" modes.
 * - Features a 4-column layout for desktop, adjusting to fewer columns for smaller devices.
 * 
 * @param {Object} tenant - The tenant data to display.
 * @param {String} mode - The mode of the component, either "preview" or "show".
 * @param {Function} handleBack - Optional function to go back to the previous step in preview mode.
 * @param {Function} handleSubmit - Optional function to submit the tenant data in preview mode.
 */
const TenantDetails = ({ tenant, mode = 'show', handleBack, handleSubmit }) => {
    const isPreviewMode = mode === 'preview';

    return (
        <Card sx={{ maxWidth: '100%', p: isPreviewMode ? 0 : 2 }}>
            {!isPreviewMode && (
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                        Tenant Details
                    </Typography>
                </CardContent>
            )}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only if in show mode */}
                    {!isPreviewMode && (
                        <Grid item xs={12} sm={6} md={3} lg={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{tenant.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{tenant.name}</Typography>
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Country</Typography>
                        <Typography variant="body2">{tenant.country || 'N/A'}</Typography>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">State</Typography>
                        <Typography variant="body2">{tenant.state || 'N/A'}</Typography>
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">City</Typography>
                        <Typography variant="body2">{tenant.city || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{tenant.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{tenant.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Latitude */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Latitude</Typography>
                        <Typography variant="body2">{tenant.latitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Longitude */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Longitude</Typography>
                        <Typography variant="body2">{tenant.longitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{tenant.description || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{tenant.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Logo URL */}
                    <Grid item xs={12} sm={6} md={3} lg={3}>
                        <Typography variant="subtitle1">Logo</Typography>
                        <Typography variant="body2">
                            {tenant.logo_url ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_API_URL}${tenant.logo_url}`}
                                    alt="Tenant Logo"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            ) : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Conditionally render metadata fields only in show mode */}
                    {!isPreviewMode && (
                        <>
                            {/* Created By */}
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{tenant.created_by || 'N/A'}</Typography>
                            </Grid>

                            {/* Updated By */}
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{tenant.updated_by || 'N/A'}</Typography>
                            </Grid>

                            {/* Created At */}
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {tenant.created_at ? format(new Date(tenant.created_at), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                                </Typography>
                            </Grid>

                            {/* Updated At */}
                            <Grid item xs={12} sm={6} md={3} lg={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {tenant.updated_at ? format(new Date(tenant.updated_at), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>

                {/* Navigation Buttons only for preview mode */}
                {isPreviewMode && (
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
                )}
            </CardContent>
        </Card>
    );
};

export default TenantDetails;
