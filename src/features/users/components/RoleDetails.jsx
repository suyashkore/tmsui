// tmsui/src/features/users/components/RoleDetails.jsx

import React, { useState } from 'react';
import { Grid, Typography, Card, CardContent, Button, Stack, List, ListItem, ListItemText } from '@mui/material';
import { format } from 'date-fns';
import ImgOrFileUploadModal from 'features/common/components/ImgOrFileUploadModal';
import useRoleApi from '../hooks/useRoleApi';

/**
 * RoleDetails Component
 * - Displays role details based on the provided mode: "view", "create", or "edit".
 * - The layout and interactions adapt based on the mode.
 * 
 * @param {Object} role - The role data to display.
 * @param {String} mode - The mode of the component: "view", "create", or "edit".
 * @param {Function} handleBack - Function to navigate back in preview mode.
 * @param {Function} handleSubmit - Function to submit role data in preview mode.
 * @returns {JSX.Element} Rendered RoleDetails component.
 */
const RoleDetails = ({ role, mode = 'view', handleBack, handleSubmit }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { uploadRoleImgOrFile } = useRoleApi();

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
            const response = await uploadRoleImgOrFile(role.id, file, urlFieldName);
            // Refresh logic for uploaded files, if needed
            return response;
        } catch (error) {
            throw error;
        }
    };

    const title = mode === 'view'
        ? 'Role Details'
        : mode === 'edit'
            ? 'Preview Edited Role Details'
            : 'Preview New Role Details';

    return (
        <Card sx={{ maxWidth: '100%', p: mode === 'preview' ? 0 : 2 }}>
            <CardContent>
                <Typography variant="h5" gutterBottom>
                    {title}
                </Typography>
            </CardContent>

            <CardContent>
                <Grid container spacing={2}>
                    {(mode === 'edit' || mode === 'view') && (
                        <Grid item xs={12} sm={6} md={3}>
                            <Typography variant="subtitle1">ID</Typography>
                            <Typography variant="body2">{role.id || 'N/A'}</Typography>
                        </Grid>
                    )}

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{role.name || 'N/A'}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{role.description || 'N/A'}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Created By</Typography>
                        <Typography variant="body2">{role.created_by || 'N/A'}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Updated By</Typography>
                        <Typography variant="body2">{role.updated_by || 'N/A'}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Created At</Typography>
                        <Typography variant="body2">
                            {role.created_at
                                ? format(new Date(role.created_at), 'dd MMM yyyy, hh:mm a')
                                : 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} md={3}>
                        <Typography variant="subtitle1">Updated At</Typography>
                        <Typography variant="body2">
                            {role.updated_at
                                ? format(new Date(role.updated_at), 'dd MMM yyyy, hh:mm a')
                                : 'N/A'}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="h6" gutterBottom>
                            Privileges
                        </Typography>
                        <List dense>
                            {role.privileges.map((privilege) => (
                                <ListItem key={privilege.id}>
                                    <ListItemText
                                        primary={privilege.name}
                                        secondary={privilege.description}
                                    />
                                </ListItem>
                            ))}
                        </List>
                    </Grid>

                    {(mode === 'create' || mode === 'edit') && (
                        <Grid item xs={12} sx={{ mt: 3 }}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
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
                </Grid>

                <ImgOrFileUploadModal
                    open={isModalOpen}
                    onClose={handleCloseModal}
                    onUpload={handleUpload}
                    uploadTitle="Upload Role Document"
                    urlFieldName="document_url"
                />
            </CardContent>
        </Card>
    );
};

export default RoleDetails;
