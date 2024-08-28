import React, { useState } from 'react';
import { Box, Button, Modal, Typography, CircularProgress, Alert, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ApiErrorResponse from '../models/ApiErrorResponse';

/**
 * ImgOrFileUploadModal Component
 * 
 * This component is used to handle the upload of images or files within a modal window.
 * It manages the file selection, upload process, and displays appropriate messages based on the upload outcome.
 * 
 * Props:
 * - open: Boolean indicating whether the modal is open or closed.
 * - onClose: Function to close the modal.
 * - onUpload: Function to handle the file upload process.
 * - uploadTitle: Title of the upload modal (default: 'Upload Img or File').
 * - urlFieldName: Name of the field to be updated with the file URL (default: 'file_url').
 */
const ImgOrFileUploadModal = ({ open, onClose, onUpload, uploadTitle = 'Upload Img or File', urlFieldName = 'file_url' }) => {
    const [file, setFile] = useState(null); // State to manage the selected file
    const [uploading, setUploading] = useState(false); // State to indicate if the file is being uploaded
    const [uploadResult, setUploadResult] = useState(null); // State to manage the success message after upload
    const [uploadError, setUploadError] = useState(null); // State to manage the error message after upload
    const [fieldErrors, setFieldErrors] = useState({}); // State to manage any field-specific errors returned by the API

    /**
     * Handles the file input change event.
     * Updates the file state with the selected file from the input.
     */
    const handleFileChange = (event) => {
        setFile(event.target.files[0]); // Set the selected file to the state
    };

    /**
     * Handles the upload process.
     * Calls the provided onUpload function with the selected file and the URL field name.
     */
    const handleUpload = async () => {
        if (!file) {
            alert('Please select a file.'); // Alert the user if no file is selected
            return;
        }
    
        setUploading(true); // Start the loading spinner
        setUploadResult(null); // Reset any previous upload result
        setUploadError(null); // Reset any previous upload error
        setFieldErrors({}); // Clear any previous field-specific errors
    
        try {
            const response = await onUpload(file, urlFieldName); // Perform the upload
            setUploadResult(response); // Set the success result if the upload is successful
        } catch (error) {
            if (error instanceof ApiErrorResponse) {
                setUploadError(error); // Set the error state if it's an instance of ApiErrorResponse
                if (error.errors) {
                    setFieldErrors(error.errors); // Set field-specific errors if any are returned
                }
            } else {
                setUploadError(new ApiErrorResponse('An unexpected error occurred.')); // Handle any unexpected errors
            }
        } finally {
            setUploading(false); // Stop the loading spinner
        }
    };

    /**
     * Handles the modal close action.
     * Resets all states related to file upload and calls the onClose function.
     */
    const handleClose = () => {
        setFile(null); // Reset the file state
        setUploadResult(null); // Reset the upload result state
        setUploadError(null); // Reset the upload error state
        setFieldErrors({}); // Reset the field errors state
        onClose(); // Call the onClose function to close the modal
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box
                sx={{
                    p: 4,
                    backgroundColor: 'white',
                    borderRadius: 2,
                    width: '400px',
                    margin: 'auto',
                    marginTop: '10%',
                    position: 'relative',
                }}
            >
                {/* Close button at the top-right corner */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>

                {/* Modal title */}
                <Typography variant="h6" gutterBottom>
                    {uploadTitle}
                </Typography>

                {/* Display loading spinner and message during upload */}
                {uploading ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ ml: 2 }}>Uploading...</Typography>
                    </Box>
                ) : (
                    <>
                        {/* File input for selecting the file to upload */}
                        <input type="file" onChange={handleFileChange} />
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={handleUpload} disabled={!file}>
                                Upload
                            </Button>
                        </Box>
                    </>
                )}

                {/* Display success message after a successful upload */}
                {uploadResult && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="success">
                            File uploaded successfully!
                        </Alert>
                    </Box>
                )}

                {/* Display error message and field-specific errors if the upload fails */}
                {uploadError && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="error">
                            {uploadError.message || 'Upload failed.'}
                        </Alert>
                        {Object.keys(fieldErrors).length > 0 && (
                            <Box sx={{ mt: 2 }}>
                                <Typography variant="h6" gutterBottom>
                                    Please check the following errors:
                                </Typography>
                                <List>
                                    {Object.entries(fieldErrors).map(([field, errors]) => (
                                        <ListItem key={field} disablePadding>
                                            <ListItemText
                                                primary={Array.isArray(errors) ? field.charAt(0).toUpperCase() + field.slice(1) : ""}
                                                secondary={Array.isArray(errors) ? errors.join(', ') : errors}
                                            />
                                        </ListItem>
                                    ))}
                                </List>
                            </Box>
                        )}
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

export default ImgOrFileUploadModal;
