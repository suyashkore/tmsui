// tmsui/src/features/customers/components/CustomerForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * CustomerForm Component
 * - Handles the form for both creating and editing customers.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} customerData - The current customer data to be displayed in the form.
 * @param {Function} setCustomerData - Function to update the customer data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered CustomerForm component.
 */
const CustomerForm = ({ customerData, setCustomerData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        code: Yup.string().required('Code is required'),
        name: Yup.string().required('Name is required'),
        c_type: Yup.string().required('Customer Type is required'),
        city: Yup.string().required('City is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        billing_mobile: Yup.string()
            .required('Billing Mobile is required')
            .matches(/^\d{10}$/, 'Billing Mobile must be 10 digits'),
        billing_email: Yup.string()
            .required('Billing Email is required')
            .email('Invalid email address'),
        billing_address: Yup.string().required('Billing Address is required'),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: customerData,
        validationSchema,
        onSubmit: (values) => {
            setCustomerData(values);
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
            setCustomerData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                code: true,
                name: true,
                c_type: true,
                city: true,
                pincode: true,
                billing_mobile: true,
                billing_email: true,
                billing_address: true,
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

                {/* Customer Type Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="c_type"
                        label="Customer Type"
                        value={formik.values.c_type || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.c_type && Boolean(formik.errors.c_type)}
                        helperText={formik.touched.c_type && formik.errors.c_type}
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

                {/* Billing Mobile Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="billing_mobile"
                        label="Billing Mobile"
                        value={formik.values.billing_mobile || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.billing_mobile && Boolean(formik.errors.billing_mobile)}
                        helperText={formik.touched.billing_mobile && formik.errors.billing_mobile}
                    />
                </Grid>

                {/* Billing Email Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="billing_email"
                        label="Billing Email"
                        value={formik.values.billing_email || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.billing_email && Boolean(formik.errors.billing_email)}
                        helperText={formik.touched.billing_email && formik.errors.billing_email}
                    />
                </Grid>

                {/* Billing Address Field */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="billing_address"
                        label="Billing Address"
                        multiline
                        rows={4}
                        value={formik.values.billing_address || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.billing_address && Boolean(formik.errors.billing_address)}
                        helperText={formik.touched.billing_address && formik.errors.billing_address}
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
                        <Button onClick={() => navigate('/md/ext/org/customers/list')} sx={{ my: 3, ml: 1 }}>
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

export default CustomerForm;
