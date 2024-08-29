// tmsui/src/features/contracts/components/DriverRateDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * DriverRateDetails Component
 * - Displays driver rate details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} driverRate - The driver rate data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit driver rate data in preview mode.
 * @returns {JSX.Element} Rendered DriverRateDetails component.
 */
const DriverRateDetails = ({ driverRate, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Driver Rate Details'
        : mode === 'edit'
        ? 'Preview Edited Driver Rate Details'
        : 'Preview New Driver Rate Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Driver Rate Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{driverRate.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Vendor Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Vendor Name</Typography>
                        <Typography variant="body2">{driverRate.vendor_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Default Rate Type */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Default Rate Type</Typography>
                        <Typography variant="body2">{driverRate.default_rate_type || 'N/A'}</Typography>
                    </Grid>

                    {/* Daily Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Daily Rate</Typography>
                        <Typography variant="body2">{driverRate.daily_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Hourly Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Hourly Rate</Typography>
                        <Typography variant="body2">{driverRate.hourly_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Overtime Hourly Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Overtime Hourly Rate</Typography>
                        <Typography variant="body2">{driverRate.overtime_hourly_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{driverRate.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                        <Typography variant="body2">{driverRate.status || 'N/A'}</Typography>
                    </Grid>

                    {/* Start Date */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Start Date</Typography>
                        <Typography variant="body2">
                            {driverRate.start_date
                                ? format(new Date(driverRate.start_date), 'dd MMM yyyy')
                                : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* End Date */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">End Date</Typography>
                        <Typography variant="body2">
                            {driverRate.end_date
                                ? format(new Date(driverRate.end_date), 'dd MMM yyyy')
                                : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Note */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1">Note</Typography>
                        <Typography variant="body2">{driverRate.note || 'N/A'}</Typography>
                    </Grid>

                    {/* Created By */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Created By</Typography>
                            <Typography variant="body2">{driverRate.created_by || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Updated By */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Updated By</Typography>
                            <Typography variant="body2">{driverRate.updated_by || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Created At */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Created At</Typography>
                            <Typography variant="body2">
                                {driverRate.created_at
                                    ? format(new Date(driverRate.created_at), 'dd MMM yyyy, hh:mm a')
                                    : 'N/A'}
                            </Typography>
                        </Grid>
                    )}

                    {/* Updated At */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">Updated At</Typography>
                            <Typography variant="body2">
                                {driverRate.updated_at
                                    ? format(new Date(driverRate.updated_at), 'dd MMM yyyy, hh:mm a')
                                    : 'N/A'}
                            </Typography>
                        </Grid>
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

export default DriverRateDetails;
