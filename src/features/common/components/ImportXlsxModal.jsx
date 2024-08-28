import React, { useState } from 'react';
import { Box, Button, Modal, Typography, CircularProgress, Alert, IconButton, List, ListItem, ListItemText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImportApiResponse from '../models/ImportApiResponse';
import ImportApiErrorResponse from '../models/ImportApiErrorResponse';
import ApiErrorResponse from '../models/ApiErrorResponse';

const ImportXlsxModal = ({ open, onClose, onImport, importTitle = 'Import Data' }) => {
    // State hooks to manage file, importing status, import result, and errors
    const [file, setFile] = useState(null);
    const [importing, setImporting] = useState(false);
    const [importResult, setImportResult] = useState(null);
    const [importError, setImportError] = useState(null);
    const [fieldErrors, setFieldErrors] = useState({});

    // Handle file selection
    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    // Handle the import process
    const handleImport = async () => {
        if (!file) {
            alert('Please select a file.');
            return;
        }

        setImporting(true);
        setImportResult(null);
        setImportError(null);
        setFieldErrors({});

        try {
            // Call the import function passed as a prop
            const response = await onImport(file);
            setImportResult(response);
        } catch (error) {
            if (error instanceof ImportApiErrorResponse || error instanceof ApiErrorResponse) {
                setImportError(error);
                if (error.errors) {
                    setFieldErrors(error.errors); // Set field-specific errors if available
                }
            } else {
                setImportError(new ApiErrorResponse('An unexpected error occurred.'));
            }
        } finally {
            setImporting(false);
        }
    };

    // Handle modal close and reset state
    const handleClose = () => {
        setFile(null);
        setImportResult(null);
        setImportError(null);
        setFieldErrors({});
        onClose();
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
                {/* Close Icon */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                    onClick={handleClose}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" gutterBottom>
                    {importTitle}
                </Typography>

                {importing ? (
                    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <CircularProgress />
                        <Typography variant="body2" sx={{ ml: 2 }}>Importing...</Typography>
                    </Box>
                ) : (
                    <>
                        <input type="file" onChange={handleFileChange} />
                        <Box sx={{ mt: 2 }}>
                            <Button variant="contained" onClick={handleImport} disabled={!file}>
                                Start Import
                            </Button>
                        </Box>
                    </>
                )}

                {/* Display import results */}
                {importResult && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity={importResult.success ? 'success' : 'error'}>
                            {importResult.success
                                ? `${importResult.message} (${importResult.importedCount} record${importResult.importedCount > 1 ? 's' : ''}).`
                                : importResult.message}
                        </Alert>
                        {importResult.errors.length > 0 && (
                            <Box sx={{ mt: 1 }}>
                                <Typography variant="body2">Errors:</Typography>
                                <ul>
                                    {importResult.errors.map((error, index) => (
                                        <li key={index}>
                                            <Typography variant="body2" color="error">
                                                {error}
                                            </Typography>
                                        </li>
                                    ))}
                                </ul>
                            </Box>
                        )}
                    </Box>
                )}

                {/* Display import errors */}
                {importError && (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="error">
                            {importError.message || 'Import failed.'}
                        </Alert>
                        {/* Display detailed field errors if available */}
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

export default ImportXlsxModal;
