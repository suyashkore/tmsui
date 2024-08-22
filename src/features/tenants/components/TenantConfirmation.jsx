// tmsui/src/features/tenants/components/TenantConfirmation.jsx

import React from 'react';
import { Grid, Typography, Box, Alert, Stack, Button, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ShowTenant from './ShowTenant';
import AnimateButton from 'ui-component/extended/AnimateButton';
import ApiErrorResponse from '../../common/models/ApiErrorResponse'; // Import the ApiErrorResponse model

// ==============================|| TENANT CONFIRMATION COMPONENT ||============================== //

/**
 * TenantConfirmation Component
 * - Displays the success or error message after the tenant creation API call.
 * - If successful, it shows the details of the created tenant using the ShowTenant component.
 * - Includes an "OK" button that navigates back to the tenant list.
 *
 * @param {string} message - The message returned from the API call (success or error).
 * @param {boolean} apiSuccess - Indicates whether the API call was successful or not.
 * @param {Object} tenantData - The data of the newly created tenant.
 * @param {ApiErrorResponse} errorResponse - The error response object returned from the API call, containing error details.
 * @returns {JSX.Element} A confirmation step displaying the result of the tenant creation process.
 */
const TenantConfirmation = ({ message, apiSuccess, tenantData, errorResponse }) => {
    const navigate = useNavigate(); // Initialize navigate function for redirection

    // Extract field-specific errors from the errorResponse, if available
    const fieldErrors = errorResponse?.errors || null;

    return (
        <Box>
            {/* Display the success or error message */}
            <Alert severity={apiSuccess ? 'success' : 'error'} sx={{ mb: 3 }}>
                {message}
            </Alert>

             {/* Show detailed error messages if present and not empty */}
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
                                    secondary={errors.join(', ')} // Combine multiple errors for the field
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            )}

            {/* If the API call was successful, display the tenant details */}
            {apiSuccess && (
                <Grid container spacing={2} sx={{ mb: 3 }}>
                    <ShowTenant tenant={tenantData} isViewMode={true} />
                </Grid>
            )}

            {/* OK Button to navigate back to tenant list using Stack and AnimateButton */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/org/tenants/list')} // Navigates back to tenants list
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
