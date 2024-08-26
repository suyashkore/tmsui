import React from 'react';
import { Grid, Typography, Box, Alert, Stack, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TenantDetails from './TenantDetails';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApiErrorResponse from '../../common/models/ApiErrorResponse';

/**
 * TenantConfirmation Component
 * - This component displays the confirmation step after the tenant creation API call.
 * - It shows either a success or error message and, in the case of success, details of the created tenant.
 *
 * @param {string} message - The message returned from the API call (success or error).
 * @param {boolean} apiSuccess - Indicates whether the API call was successful.
 * @param {Object} tenantData - The data of the newly created tenant.
 * @param {ApiErrorResponse} errorResponse - The error response object containing field-specific errors.
 * @returns {JSX.Element} A confirmation screen displaying the result of the tenant creation process.
 */
const TenantConfirmation = ({ message, apiSuccess, tenantData, errorResponse }) => {
    const navigate = useNavigate(); // Initialize the navigation function

    // Extract field-specific errors from the error response, if available
    const fieldErrors = errorResponse?.errors || null;

    return (
        <Box>
            {/* Show the success or error message */}
            <Alert severity={apiSuccess ? 'success' : 'error'} sx={{ mb: 3 }}>
                {message}
            </Alert>

            {/* Show detailed field errors if available */}
            {!apiSuccess && fieldErrors && Object.keys(fieldErrors).length > 0 && (
                <Box sx={{ mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Please check the following errors:
                    </Typography>
                    <List>
                        {Object.entries(fieldErrors).map(([field, errors]) => (
                            <ListItem key={field} disablePadding>
                                <ListItemText
                                    primary={field.charAt(0).toUpperCase() + field.slice(1)} // Capitalize field name
                                    secondary={errors.join(', ')} // Join multiple errors for the field
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* Display the tenant details if the API call was successful */}
            {apiSuccess && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <TenantDetails tenant={tenantData} mode="show" />
                </Grid>
            )}

            {/* Navigation button to return to the tenant list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/org/tenants/list')}
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

export default TenantConfirmation;
