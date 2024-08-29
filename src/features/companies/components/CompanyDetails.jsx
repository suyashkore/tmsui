// tmsui/src/features/companies/components/CompanyDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useCompanyApi from '../hooks/useCompanyApi';

/**
 * CompanyDetails Component
 * - Displays company details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} company - The company data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit company data in preview mode.
 * @returns {JSX.Element} Rendered CompanyDetails component.
 */
const CompanyDetails = ({ company, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logoUrl, setLogoUrl] = useState(company.logo_url);
    const { uploadCompanyImgOrFile } = useCompanyApi();

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
            const response = await uploadCompanyImgOrFile(company.id, file, urlFieldName);
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
        ? 'Company Details'
        : mode === 'edit'
        ? 'Preview Edited Company Details'
        : 'Preview New Company Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* Company Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{company.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{company.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Code */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Code</Typography>
                        <Typography variant="body2">{company.code || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} sm={6} md={6}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{company.address || 'N/A'}</Typography>
                    </Grid>

                    {/* CIN Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">CIN Number</Typography>
                        <Typography variant="body2">{company.cin_num || 'N/A'}</Typography>
                    </Grid>

                    {/* GST Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">GST Number</Typography>
                        <Typography variant="body2">{company.gst_num || 'N/A'}</Typography>
                    </Grid>

                    {/* PAN Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">PAN Number</Typography>
                        <Typography variant="body2">{company.pan_num || 'N/A'}</Typography>
                    </Grid>

                    {/* TAN Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">TAN Number</Typography>
                        <Typography variant="body2">{company.tan_num || 'N/A'}</Typography>
                    </Grid>

                    {/* MSME Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">MSME Number</Typography>
                        <Typography variant="body2">{company.msme_num || 'N/A'}</Typography>
                    </Grid>

                    {/* Active Status */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{company.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {/* Logo URL with Upload/Change Button */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Logo</Typography>
                        <Typography variant="body2">
                            {logoUrl ? (
                                <img
                                    src={`${import.meta.env.VITE_BACKEND_API_URL}${logoUrl}`}
                                    alt="Company Logo"
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
                                <Typography variant="body2">{company.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{company.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {company.created_at
                                        ? format(new Date(company.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {company.updated_at
                                        ? format(new Date(company.updated_at), 'dd MMM yyyy, hh:mm a')
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
                    uploadTitle="Upload Company Logo"
                    urlFieldName="logo_url"
                />
            </CardContent>
        </Card>
    );
};

export default CompanyDetails;
