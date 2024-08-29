// tmsui/src/features/places/components/StationCoverageDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * StationCoverageDetails Component
 * - Displays station coverage details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 *
 * @param {Object} stationCoverage - The station coverage data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit station coverage data in preview mode.
 * @returns {JSX.Element} Rendered StationCoverageDetails component.
 */
const StationCoverageDetails = ({ stationCoverage, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title =
        mode === 'view'
            ? 'Station Coverage Details'
            : mode === 'edit'
            ? 'Preview Edited Station Coverage Details'
            : 'Preview New Station Coverage Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Station Coverage Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{stationCoverage.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{stationCoverage.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Post Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Post Name</Typography>
                        <Typography variant="body2">{stationCoverage.post_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{stationCoverage.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Taluka */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Taluka</Typography>
                        <Typography variant="body2">{stationCoverage.taluka || 'N/A'}</Typography>
                    </Grid>

                    {/* District */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">District</Typography>
                        <Typography variant="body2">{stationCoverage.district || 'N/A'}</Typography>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">State</Typography>
                        <Typography variant="body2">{stationCoverage.state || 'N/A'}</Typography>
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Country</Typography>
                        <Typography variant="body2">{stationCoverage.country || 'N/A'}</Typography>
                    </Grid>

                    {/* Latitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Latitude</Typography>
                        <Typography variant="body2">{stationCoverage.latitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Longitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Longitude</Typography>
                        <Typography variant="body2">{stationCoverage.longitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Servicing Office ID */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Servicing Office ID</Typography>
                        <Typography variant="body2">{stationCoverage.servicing_office_id || 'N/A'}</Typography>
                    </Grid>

                    {/* Service Office TAT */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Service Office TAT</Typography>
                        <Typography variant="body2">{stationCoverage.service_office_tat || 'N/A'}</Typography>
                    </Grid>

                    {/* Servicing Office Distance */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Servicing Office Distance</Typography>
                        <Typography variant="body2">{stationCoverage.servicing_office_dist || 'N/A'}</Typography>
                    </Grid>

                    {/* ODA */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">ODA</Typography>
                        <Typography variant="body2">{stationCoverage.oda ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Active */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{stationCoverage.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                        <Typography variant="body2">{stationCoverage.status || 'N/A'}</Typography>
                    </Grid>

                    {/* Note */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1">Note</Typography>
                        <Typography variant="body2">{stationCoverage.note || 'N/A'}</Typography>
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{stationCoverage.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{stationCoverage.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {stationCoverage.created_at
                                        ? format(new Date(stationCoverage.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {stationCoverage.updated_at
                                        ? format(new Date(stationCoverage.updated_at), 'dd MMM yyyy, hh:mm a')
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

export default StationCoverageDetails;
