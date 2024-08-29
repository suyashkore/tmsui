// tmsui/src/features/fleet/components/VehicleDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useVehicleApi from '../hooks/useVehicleApi';

/**
 * VehicleDetails Component
 * - Displays vehicle details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} vehicle - The vehicle data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit vehicle data in preview mode.
 * @returns {JSX.Element} Rendered VehicleDetails component.
 */
const VehicleDetails = ({ vehicle, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rcUrl, setRcUrl] = useState(vehicle.rc_url);
    const { uploadVehicleImgOrFile } = useVehicleApi();

    // Function to open the modal
    const handleOpenModal = () => {
        setIsModalOpen(true);
    };

    // Function to close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    // Function to handle file upload
    const handleUpload = async (file, urlFieldName) => {
        try {
            const response = await uploadVehicleImgOrFile(vehicle.id, file, urlFieldName);
            // Append a timestamp to the RC URL to force refresh
            const newRcUrl = `${response[urlFieldName]}?t=${new Date().getTime()}`;
            setRcUrl(newRcUrl); // Update the RC URL after successful upload
            return response;
        } catch (error) {
            throw error;
            // Handle errors if necessary
        }
    };

    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Vehicle Details'
        : mode === 'edit'
        ? 'Preview Edited Vehicle Details'
        : 'Preview New Vehicle Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Vehicle Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{vehicle.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* RC Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">RC Number</Typography>
                        <Typography variant="body2">{vehicle.rc_num || 'N/A'}</Typography>
                    </Grid>

                    {/* Vehicle Ownership */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Vehicle Ownership</Typography>
                        <Typography variant="body2">{vehicle.vehicle_ownership || 'N/A'}</Typography>
                    </Grid>

                    {/* Make */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Make</Typography>
                        <Typography variant="body2">{vehicle.make || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{vehicle.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{vehicle.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                        <Typography variant="body2">{vehicle.status || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{vehicle.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* RC URL with Upload/Change Button */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">RC Document</Typography>
                        <Typography variant="body2">
                            {rcUrl ? (
                                <a href={`${import.meta.env.VITE_BACKEND_API_URL}${rcUrl}`} target="_blank" rel="noopener noreferrer">
                                    View RC Document
                                </a>
                            ) : (
                                (mode === 'edit' || mode === 'view') ? (
                                    <Button onClick={handleOpenModal} sx={{ mt: 1 }}>
                                        Upload
                                    </Button>
                                ) : 'N/A'
                            )}
                        </Typography>
                        {rcUrl && (mode === 'edit' || mode === 'view') && (
                            <Button onClick={handleOpenModal} sx={{ mt: 1 }}>
                                Change
                            </Button>
                        )}
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{vehicle.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{vehicle.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {vehicle.created_at
                                        ? format(new Date(vehicle.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {vehicle.updated_at
                                        ? format(new Date(vehicle.updated_at), 'dd MMM yyyy, hh:mm a')
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

                {/* Modal for Uploading/Changing RC Document */}
                <ImgOrFileUploadModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpload={handleUpload}  // Use the handleUpload function defined above
                    uploadTitle="Upload RC Document"
                    urlFieldName="rc_url"
                />
            </CardContent>
        </Card>
    );
};

export default VehicleDetails;
