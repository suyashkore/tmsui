// tmsui/src/features/vendors/components/VendorDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * VendorDetails Component
 * - Displays vendor details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} vendor - The vendor data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit vendor data in preview mode.
 * @returns {JSX.Element} Rendered VendorDetails component.
 */
const VendorDetails = ({ vendor, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Vendor Details'
        : mode === 'edit'
        ? 'Preview Edited Vendor Details'
        : 'Preview New Vendor Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Vendor Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{vendor.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Code */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Code</Typography>
                        <Typography variant="body2">{vendor.code || 'N/A'}</Typography>
                    </Grid>

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{vendor.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Vendor Type */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Vendor Type</Typography>
                        <Typography variant="body2">{vendor.v_type || 'N/A'}</Typography>
                    </Grid>

                    {/* Mobile */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Mobile</Typography>
                        <Typography variant="body2">{vendor.mobile || 'N/A'}</Typography>
                    </Grid>

                    {/* Contracting Office ID */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Contracting Office ID</Typography>
                        <Typography variant="body2">{vendor.contracting_office_id || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{vendor.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Additional Metadata */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{vendor.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{vendor.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {vendor.created_at
                                        ? format(new Date(vendor.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {vendor.updated_at
                                        ? format(new Date(vendor.updated_at), 'dd MMM yyyy, hh:mm a')
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

export default VendorDetails;
