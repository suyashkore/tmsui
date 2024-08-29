// tmsui/src/features/contracts/components/LoaderRateDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * LoaderRateDetails Component
 * - Displays loader rate details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} loaderRate - The loader rate data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit loader rate data in preview mode.
 * @returns {JSX.Element} Rendered LoaderRateDetails component.
 */
const LoaderRateDetails = ({ loaderRate, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Loader Rate Details'
        : mode === 'edit'
        ? 'Preview Edited Loader Rate Details'
        : 'Preview New Loader Rate Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Loader Rate Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{loaderRate.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Vendor Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Vendor Name</Typography>
                        <Typography variant="body2">{loaderRate.vendor_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Default Rate Type */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Default Rate Type</Typography>
                        <Typography variant="body2">{loaderRate.default_rate_type || 'N/A'}</Typography>
                    </Grid>

                    {/* Regular Package Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Regular Package Rate</Typography>
                        <Typography variant="body2">{loaderRate.reg_pkg_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Crossing Package Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Crossing Package Rate</Typography>
                        <Typography variant="body2">{loaderRate.crossing_pkg_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Regular Weight Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Regular Weight Rate</Typography>
                        <Typography variant="body2">{loaderRate.reg_weight_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Crossing Weight Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Crossing Weight Rate</Typography>
                        <Typography variant="body2">{loaderRate.crossing_weight_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Monthly Salary */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Monthly Salary</Typography>
                        <Typography variant="body2">{loaderRate.monthly_sal || 'N/A'}</Typography>
                    </Grid>

                    {/* Daily Allowance */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Daily Allowance</Typography>
                        <Typography variant="body2">{loaderRate.daily_allowance || 'N/A'}</Typography>
                    </Grid>

                    {/* Daily Wage */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Daily Wage</Typography>
                        <Typography variant="body2">{loaderRate.daily_wage || 'N/A'}</Typography>
                    </Grid>

                    {/* Overtime Hourly Rate */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Overtime Hourly Rate</Typography>
                        <Typography variant="body2">{loaderRate.overtime_hourly_rate || 'N/A'}</Typography>
                    </Grid>

                    {/* Start Date */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Start Date</Typography>
                        <Typography variant="body2">
                            {loaderRate.start_date ? format(new Date(loaderRate.start_date), 'dd MMM yyyy') : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* End Date */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">End Date</Typography>
                        <Typography variant="body2">
                            {loaderRate.end_date ? format(new Date(loaderRate.end_date), 'dd MMM yyyy') : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{loaderRate.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                        <Typography variant="body2">{loaderRate.status || 'N/A'}</Typography>
                    </Grid>

                    {/* Note */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Note</Typography>
                        <Typography variant="body2">{loaderRate.note || 'N/A'}</Typography>
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{loaderRate.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{loaderRate.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {loaderRate.created_at
                                        ? format(new Date(loaderRate.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {loaderRate.updated_at
                                        ? format(new Date(loaderRate.updated_at), 'dd MMM yyyy, hh:mm a')
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

export default LoaderRateDetails;
