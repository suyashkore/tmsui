// tmsui/src/features/users/components/PrivilegeDetails.jsx

import React from 'react';
import { Grid, Typography, Card, CardContent, Stack, Button } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * PrivilegeDetails Component
 * - Displays privilege details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} privilege - The privilege data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit privilege data in preview mode.
 * @returns {JSX.Element} Rendered PrivilegeDetails component.
 */
const PrivilegeDetails = ({ privilege, mode = 'view', handleBack, handleSubmit }) => {
    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Privilege Details'
        : mode === 'edit'
        ? 'Preview Edited Privilege Details'
        : 'Preview New Privilege Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Privilege Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Privilege Name */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle1">Privilege Name</Typography>
                        <Typography variant="body2">{privilege.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12} sm={6} md={4}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{privilege.description || 'N/A'}</Typography>
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1">ID</Typography>
                                <Typography variant="body2">{privilege.id || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{privilege.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{privilege.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {privilege.created_at
                                        ? format(new Date(privilege.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={4}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {privilege.updated_at
                                        ? format(new Date(privilege.updated_at), 'dd MMM yyyy, hh:mm a')
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

export default PrivilegeDetails;
