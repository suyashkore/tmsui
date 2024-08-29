// tmsui/src/features/customers/components/CustomerConfirmation.jsx

import React from 'react';
import { Grid, Typography, Box, Alert, Stack, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import CustomerDetails from './CustomerDetails';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';

/**
 * CustomerConfirmation Component
 * - This component displays the confirmation step after customer creation or update.
 * - It shows either a success or error message and, in the case of success, displays the details of the customer.
 * 
 * @param {string} message - The message returned from the API call (success or error).
 * @param {boolean} apiSuccess - Indicates whether the API call was successful.
 * @param {Object} customerData - The data of the created or updated customer.
 * @param {ApiErrorResponse} errorResponse - The error response object containing field-specific errors.
 * @returns {JSX.Element} A confirmation screen displaying the result of the customer creation or update process.
 */
const CustomerConfirmation = ({ message, apiSuccess, customerData, errorResponse }) => {
    const navigate = useNavigate(); // Navigation function to redirect the user

    // Extract field-specific errors from the error response, if available
    const fieldErrors = errorResponse?.errors || null;

    return (
        <Box>
            {/* Display the success or error message */}
            <Alert severity={apiSuccess ? 'success' : 'error'} sx={{ mb: 3 }}>
                {message}
            </Alert>

            {/* Display detailed field errors if available */}
            {!apiSuccess && fieldErrors && Object.keys(fieldErrors).length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Please check the following errors:
                    </Typography>
                    <List>
                        {Object.entries(fieldErrors).map(([field, errors]) => (
                            <ListItem key={field} disablePadding>
                                <ListItemText
                                    primary={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize the field name
                                    secondary={errors.join(', ')} // Join multiple errors for the field
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Display customer details if the API call was successful */}
            {apiSuccess && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <CustomerDetails customer={customerData} mode="view" /> {/* Use the view mode for CustomerDetails */}
                </Grid>
            )}

            {/* Navigation button to return to the customer list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/ext/org/customers/list')} // Navigate back to the customer list
                        variant="contained"
                        color="primary"
                    >
                        OK
                    </Button>
                </AnimateButton>
            </Stack>
        </Box>
    );
};

export default CustomerConfirmation;
