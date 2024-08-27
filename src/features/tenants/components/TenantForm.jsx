import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * TenantForm Component
 * - Handles the form for both creating and editing tenants.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} tenantData - The current tenant data to be displayed in the form.
 * @param {Function} setTenantData - Function to update the tenant data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered TenantForm component.
 */
const TenantForm = ({ tenantData, setTenantData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        address: Yup.string().required('Address is required'),
        latitude: Yup.string()
            .required('Latitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Latitude must be a decimal with at least 4 digits after the decimal'),
        longitude: Yup.string()
            .required('Longitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Longitude must be a decimal with at least 4 digits after the decimal'),
        description: Yup.string().nullable()
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: tenantData,
        validationSchema,
        onSubmit: (values) => {
            setTenantData(values);
            handleSubmit(true); // Call the handleSubmit function with true to skip the preview step
        },
    });

    /**
     * Handle the preview action before submission.
     * - Validates the form before proceeding to the preview step.
     */
    const handlePreview = async () => {
        const isValid = await formik.validateForm();
        if (Object.keys(isValid).length === 0) {
            setTenantData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                name: true,
                country: true,
                state: true,
                city: true,
                pincode: true,
                address: true,
                latitude: true,
                longitude: true,
                description: true,
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {/* Name Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={formik.values.name || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                {/* Country Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="country"
                        label="Country"
                        value={formik.values.country || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />
                </Grid>

                {/* State Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="state"
                        label="State"
                        value={formik.values.state || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid>

                {/* City Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="city"
                        label="City"
                        value={formik.values.city || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>

                {/* Pincode Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="pincode"
                        label="Pincode"
                        value={formik.values.pincode || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid>

                {/* Address Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={formik.values.address || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

                {/* Latitude Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="latitude"
                        label="Latitude"
                        value={formik.values.latitude || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                        helperText={formik.touched.latitude && formik.errors.latitude}
                    />
                </Grid>

                {/* Longitude Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="longitude"
                        label="Longitude"
                        value={formik.values.longitude || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                        helperText={formik.touched.longitude && formik.errors.longitude}
                    />
                </Grid>

                {/* Description Field */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={formik.values.description || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.description && Boolean(formik.errors.description)}
                        helperText={formik.touched.description && formik.errors.description}
                    />
                </Grid>

                {/* Active Checkbox */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.active ?? false}
                                onChange={(event) => formik.setFieldValue('active', event.target.checked)}
                            />
                        }
                        label="Active"
                    />
                </Grid>

                {/* Additional Fields for Edit Mode */}
                {isEditMode && (
                    <>
                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                name="id"
                                label="ID"
                                value={formik.values.id || ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                name="created_by"
                                label="Created By"
                                value={formik.values.created_by || ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                name="updated_by"
                                label="Updated By"
                                value={formik.values.updated_by || ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                name="created_at"
                                label="Created At"
                                value={formik.values.created_at ? format(new Date(formik.values.created_at), 'dd MMM yyyy, hh:mm a') : ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>
                            <TextField
                                fullWidth
                                name="updated_at"
                                label="Updated At"
                                value={formik.values.created_at ? format(new Date(formik.values.updated_at), 'dd MMM yyyy, hh:mm a') : ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>
                    </>
                )}

                {/* Form Navigation Buttons */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                        <Button onClick={() => navigate('/md/org/tenants/list')} sx={{ my: 3, ml: 1 }}>
                            Back
                        </Button>
                        <Stack direction="row" spacing={2}>
                            <AnimateButton>
                                <Button variant="outlined" sx={{ my: 3, ml: 1 }} onClick={handlePreview}>
                                    Preview
                                </Button>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    sx={{ my: 3, ml: 1 }}
                                    color="primary"
                                    onClick={() => formik.handleSubmit(true)} // Trigger form submit and skip preview
                                >
                                    {isEditMode ? 'Update' : 'Create'}
                                </Button>
                            </AnimateButton>
                        </Stack>
                    </Stack>
                </Grid>
            </Grid>
        </form>
    );
};

export default TenantForm;
