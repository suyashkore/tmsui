// tmsui/src/features/offices/components/OfficeDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useOfficeApi from '../hooks/useOfficeApi';

/**
 * OfficeDetails Component
 * - Displays office details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} office - The office data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit office data in preview mode.
 * @returns {JSX.Element} Rendered OfficeDetails component.
 */
const OfficeDetails = ({ office, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState(office.logo_url);
    const { uploadOfficeImgOrFile } = useOfficeApi();

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
            const response = await uploadOfficeImgOrFile(office.id, file, urlFieldName);
            // Append a timestamp to the logo URL to force refresh
            const newLogoUrl = `${response[urlFieldName]}?t=${new Date().getTime()}`;
            setLogoUrl(newLogoUrl); // Update the logo URL after successful upload
            return response;
        } catch (error) {
            throw error;
            // Handle errors if necessary
        }
    };

    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Office Details'
        : mode === 'edit'
        ? 'Preview Edited Office Details'
        : 'Preview New Office Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Office Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{office.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Code */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Code</Typography>
                        <Typography variant="body2">{office.code || 'N/A'}</Typography>
                    </Grid>

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{office.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Office Type */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Office Type</Typography>
                        <Typography variant="body2">{office.o_type || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{office.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{office.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Latitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Latitude</Typography>
                        <Typography variant="body2">{office.latitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Longitude */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Longitude</Typography>
                        <Typography variant="body2">{office.longitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{office.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Logo URL with Upload/Change Button */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Logo</Typography>
                        <Typography variant="body2">
                            {logoUrl ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_API_URL}${logoUrl}`}
                                    alt="Office Logo"
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            ) : (
                                (mode === 'edit' || mode === 'view') ? (
                                    <Button onClick={handleOpenModal} sx={{ mt: 1 }}>
                                        Upload
                                    </Button>
                                ) : 'N/A'
                            )}
                        </Typography>
                        {logoUrl && (mode === 'edit' || mode === 'view') && (
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
                                <Typography variant="body2">{office.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{office.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {office.created_at
                                        ? format(new Date(office.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {office.updated_at
                                        ? format(new Date(office.updated_at), 'dd MMM yyyy, hh:mm a')
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

                {/* Modal for Uploading/Changing Logo */}
                <ImgOrFileUploadModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpload={handleUpload}  // Use the handleUpload function defined above
                    uploadTitle="Upload Office Logo"
                    urlFieldName="logo_url"
                />
            </CardContent>
        </Card>
    );
};

export default OfficeDetails;