// tmsui/src/features/tenants/components/TenantDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * TenantDetails Component
 * - Displays tenant details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} tenant - The tenant data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit tenant data in preview mode.
 * @returns {JSX.Element} Rendered TenantDetails component.
 */
const TenantDetails = ({ tenant, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Tenant Details'
        : mode === 'edit'
        ? 'Review Edited Tenant Details'
        : 'Review New Tenant Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Tenant Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{tenant.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{tenant.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Country</Typography>
                        <Typography variant="body2">{tenant.country || 'N/A'}</Typography>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">State</Typography>
                        <Typography variant="body2">{tenant.state || 'N/A'}</Typography>
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">City</Typography>
                        <Typography variant="body2">{tenant.city || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{tenant.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{tenant.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Latitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Latitude</Typography>
                        <Typography variant="body2">{tenant.latitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Longitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Longitude</Typography>
                        <Typography variant="body2">{tenant.longitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{tenant.description || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{tenant.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Logo URL */}
                    <Grid item xs={12} sm={6} md={3}>
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

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{tenant.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{tenant.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {tenant.created_at
                                        ? format(new Date(tenant.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {tenant.updated_at
                                        ? format(new Date(tenant.updated_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>

                {/* Action Buttons for preview or edit mode */}
                {(mode === 'create' || mode === 'edit') && (
                    <Grid item xs={12} sx={{ mt: 3 }}>
                        <Stack direction="row" justifyContent="space-between" alignItems="center">
                            {/* Back Button for preview mode */}
                            <Button onClick={handleBack} sx={{ my: 3, ml: 1 }}>
                                Back
                            </Button>

                            <Stack direction="row" spacing={2}>
                                <AnimateButton>
                                    {/* Submit or Update Button */}
                                    <Button
                                        variant="contained"
                                        onClick={handleSubmit}
                                        sx={{ my: 3, ml: 1 }}
                                        color="primary"
                                    >
                                        {mode === 'edit' ? 'Update' : 'Create'}
                                    </Button>
                                </AnimateButton>
                            </Stack>
                        </Stack>
                    </Grid>
                )}
            </CardContent>
        </Card>
    );
};

export default TenantDetails;
