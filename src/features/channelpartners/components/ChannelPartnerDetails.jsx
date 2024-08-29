// tmsui/src/features/channelpartners/components/ChannelPartnerDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useChannelPartnerApi from '../hooks/useChannelPartnerApi';

/**
 * ChannelPartnerDetails Component
 * - Displays channel partner details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} channelPartner - The channel partner data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit channel partner data in preview mode.
 * @returns {JSX.Element} Rendered ChannelPartnerDetails component.
 */
const ChannelPartnerDetails = ({ channelPartner, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [photoUrl, setPhotoUrl] = useState(channelPartner.photo1_url);
    const { uploadChannelPartnerImgOrFile } = useChannelPartnerApi();

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
            const response = await uploadChannelPartnerImgOrFile(channelPartner.id, file, urlFieldName);
            // Append a timestamp to the photo URL to force refresh
            const newPhotoUrl = `${response[urlFieldName]}?t=${new Date().getTime()}`;
            setPhotoUrl(newPhotoUrl); // Update the photo URL after successful upload
            return response;
        } catch (error) {
            throw error;
            // Handle errors if necessary
        }
    };

    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'Channel Partner Details'
        : mode === 'edit'
        ? 'Preview Edited Channel Partner Details'
        : 'Preview New Channel Partner Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Channel Partner Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{channelPartner.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Legal Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Legal Name</Typography>
                        <Typography variant="body2">{channelPartner.legal_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Owner 1 Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Owner 1 Name</Typography>
                        <Typography variant="body2">{channelPartner.owner1_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{channelPartner.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{channelPartner.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Status</Typography>
                        <Typography variant="body2">{channelPartner.status || 'N/A'}</Typography>
                    </Grid>

                    {/* KYC Completed */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">KYC Completed</Typography>
                        <Typography variant="body2">{channelPartner.kyc_completed ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Note */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Note</Typography>
                        <Typography variant="body2">{channelPartner.note || 'N/A'}</Typography>
                    </Grid>

                    {/* Photo URL with Upload/Change Button */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Photo</Typography>
                        <Typography variant="body2">
                            {photoUrl ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_API_URL}${photoUrl}`}
                                    alt="Owner 1 Photo"
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
                        {photoUrl && (mode === 'edit' || mode === 'view') && (
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
                                <Typography variant="body2">{channelPartner.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{channelPartner.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {channelPartner.created_at
                                        ? format(new Date(channelPartner.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {channelPartner.updated_at
                                        ? format(new Date(channelPartner.updated_at), 'dd MMM yyyy, hh:mm a')
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

                {/* Modal for Uploading/Changing Photo */}
                <ImgOrFileUploadModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpload={handleUpload}  // Use the handleUpload function defined above
                    uploadTitle="Upload Owner 1 Photo"
                    urlFieldName="photo1_url"
                />
            </CardContent>
        </Card>
    );
};

export default ChannelPartnerDetails;
