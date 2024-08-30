// tmsui/src/features/users/components/UserDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack } from '@mui/material';
import { format } from 'date-fns';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useUserApi from '../hooks/useUserApi';

/**
 * UserDetails Component
 * - Displays user details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} user - The user data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit user data in preview mode.
 * @returns {JSX.Element} Rendered UserDetails component.
 */
const UserDetails = ({ user, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState(user.profile_pic_url);
    const { uploadUserImgOrFile } = useUserApi();

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
            const response = await uploadUserImgOrFile(user.id, file, urlFieldName);
            // Append a timestamp to the profile pic URL to force refresh
            const newProfilePicUrl = `${response[urlFieldName]}?t=${new Date().getTime()}`;
            setProfilePicUrl(newProfilePicUrl); // Update the profile pic URL after successful upload
            return response;
        } catch (error) {
            throw error;
        }
    };

    // Determine the title based on the mode
    const title = mode === 'view'
        ? 'User Details'
        : mode === 'edit'
        ? 'Preview Edited User Details'
        : 'Preview New User Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            {/* Header Section */}
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            {/* User Details Section */}
            <CardContent>
                <Grid container spacing={2}>
                    {/* Conditionally render the ID field only in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{user.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    {/* Name */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{user.name || 'N/A'}</Typography>
                    </Grid>

                    {/* Login ID */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Login ID</Typography>
                        <Typography variant="body2">{user.login_id || 'N/A'}</Typography>
                    </Grid>

                    {/* Mobile */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Mobile</Typography>
                        <Typography variant="body2">{user.mobile || 'N/A'}</Typography>
                    </Grid>

                    {/* Email */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Email</Typography>
                        <Typography variant="body2">{user.email || 'N/A'}</Typography>
                    </Grid>

                    {/* User Type */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">User Type</Typography>
                        <Typography variant="body2">{user.user_type || 'N/A'}</Typography>
                    </Grid>

                    {/* Role */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Role</Typography>
                        <Typography variant="body2">{user.role_name || 'N/A'}</Typography>
                    </Grid>

                    {/* Privileges */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Privileges</Typography>
                        <Typography variant="body2">
                            {user.privileges ? user.privileges.join(', ') : 'N/A'}
                        </Typography>
                    </Grid>

                    {/* Job Title */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Job Title</Typography>
                        <Typography variant="body2">{user.job_title || 'N/A'}</Typography>
                    </Grid>

                    {/* Department */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Department</Typography>
                        <Typography variant="body2">{user.department || 'N/A'}</Typography>
                    </Grid>

                    {/* Aadhaar */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Aadhaar</Typography>
                        <Typography variant="body2">{user.aadhaar || 'N/A'}</Typography>
                    </Grid>

                    {/* PAN */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">PAN</Typography>
                        <Typography variant="body2">{user.pan || 'N/A'}</Typography>
                    </Grid>

                    {/* EPF UAN */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">EPF UAN</Typography>
                        <Typography variant="body2">{user.epf_uan || 'N/A'}</Typography>
                    </Grid>

                    {/* EPF Number */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">EPF Number</Typography>
                        <Typography variant="body2">{user.epf_num || 'N/A'}</Typography>
                    </Grid>

                    {/* ESIC */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">ESIC</Typography>
                        <Typography variant="body2">{user.esic || 'N/A'}</Typography>
                    </Grid>

                    {/* Profile Pic URL with Upload/Change Button */}
                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Profile Picture</Typography>
                        <Typography variant="body2">
                            {profilePicUrl ? (
                                <img
                                    src={profilePicUrl}
                                    alt="Profile"
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
                        {profilePicUrl && (mode === 'edit' || mode === 'view') && (
                            <Button onClick={handleOpenModal} sx={{ mt: 1 }}>
                                Change
                            </Button>
                        )}
                    </Grid>

                    {/* Remarks */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Remarks</Typography>
                        <Typography variant="body2">{user.remarks || 'N/A'}</Typography>
                    </Grid>

                    {/* Conditionally render metadata fields in edit or view mode */}
                    {(mode === 'edit' || mode === 'view') && (
                        <>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{user.created_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{user.updated_by || 'N/A'}</Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {user.created_at
                                        ? format(new Date(user.created_at), 'dd MMM yyyy, hh:mm a')
                                        : 'N/A'}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} sm={6} md={3}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {user.updated_at
                                        ? format(new Date(user.updated_at), 'dd MMM yyyy, hh:mm a')
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
                                <Button
                                    variant="contained"
                                    onClick={handleSubmit}
                                    sx={{ my: 3, ml: 1 }}
                                    color="primary"
                                >
                                    {mode === 'edit' ? 'Update' : 'Create'}
                                </Button>
                            </Stack>
                        </Stack>
                    </Grid>
                )}

                {/* Modal for Uploading/Changing Profile Picture */}
                <ImgOrFileUploadModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpload={handleUpload}  // Use the handleUpload function defined above
                    uploadTitle="Upload Profile Picture"
                    urlFieldName="profile_pic_url"
                />
            </CardContent>
        </Card>
    );
};

export default UserDetails;
