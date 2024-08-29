// tmsui/src/features/offices/components/OfficeForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * OfficeForm Component
 * - Handles the form for both creating and editing offices.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} officeData - The current office data to be displayed in the form.
 * @param {Function} setOfficeData - Function to update the office data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered OfficeForm component.
 */
const OfficeForm = ({ officeData, setOfficeData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        code: Yup.string().required('Code is required'),
        name: Yup.string().required('Name is required'),
        o_type: Yup.string().required('Office Type is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        latitude: Yup.string()
            .required('Latitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Latitude must be a decimal with at least 4 digits after the decimal'),
        longitude: Yup.string()
            .required('Longitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Longitude must be a decimal with at least 4 digits after the decimal'),
        address: Yup.string().required('Address is required'),
        description: Yup.string().nullable()
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: officeData,
        validationSchema,
        onSubmit: (values) => {
            setOfficeData(values);
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
            setOfficeData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                code: true,
                name: true,
                o_type: true,
                pincode: true,
                latitude: true,
                longitude: true,
                address: true,
                description: true,
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {/* Code Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="code"
                        label="Code"
                        value={formik.values.code || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.code && Boolean(formik.errors.code)}
                        helperText={formik.touched.code && formik.errors.code}
                    />
                </Grid>

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

                {/* Office Type Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="o_type"
                        label="Office Type"
                        value={formik.values.o_type || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.o_type && Boolean(formik.errors.o_type)}
                        helperText={formik.touched.o_type && formik.errors.o_type}
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
                        <Button onClick={() => navigate('/md/org/offices/list')} sx={{ my: 3, ml: 1 }}>
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

export default OfficeForm;
