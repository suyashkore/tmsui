// tmsui/src/features/places/components/GeoHierarchyDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * GeoHierarchyDetails Component
 * - Displays geo-hierarchy details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} geoHierarchy - The geo-hierarchy data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit geo-hierarchy data in preview mode.
 * @returns {JSX.Element} Rendered GeoHierarchyDetails component.
 */
const GeoHierarchyDetails = ({ geoHierarchy, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Geo-Hierarchy Details'
        : mode === 'edit'
        ? 'Preview Edited Geo-Hierarchy Details'
        : 'Preview New Geo-Hierarchy Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Geo-Hierarchy Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{geoHierarchy.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Country */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Country</Typography>
                        <Typography variant="body2">{geoHierarchy.country || 'N/A'}</Typography>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">State</Typography>
                        <Typography variant="body2">{geoHierarchy.state || 'N/A'}</Typography>
                    </Grid>

                    {/* District */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">District</Typography>
                        <Typography variant="body2">{geoHierarchy.district || 'N/A'}</Typography>
                    </Grid>

                    {/* Taluka */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Taluka</Typography>
                        <Typography variant="body2">{geoHierarchy.taluka || 'N/A'}</Typography>
                    </Grid>

                    {/* Post Office Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Post Office Name</Typography>
                        <Typography variant="body2">{geoHierarchy.po_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{geoHierarchy.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Post Office Latitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Post Office Latitude</Typography>
                        <Typography variant="body2">{geoHierarchy.po_lat || 'N/A'}</Typography>
                    </Grid>

                    {/* Post Office Longitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Post Office Longitude</Typography>
                        <Typography variant="body2">{geoHierarchy.po_long || 'N/A'}</Typography>
                    </Grid>

                    {/* Place */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Place</Typography>
                        <Typography variant="body2">{geoHierarchy.place || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{geoHierarchy.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{geoHierarchy.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{geoHierarchy.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {geoHierarchy.created_at
                                        ? format(new Date(geoHierarchy.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {geoHierarchy.updated_at
                                        ? format(new Date(geoHierarchy.updated_at), 'dd MMM yyyy, hh:mm a')
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

export default GeoHierarchyDetails;
