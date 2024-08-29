// tmsui/src/features/companies/components/CompanyForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * CompanyForm Component
 * - Handles the form for both creating and editing companies.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} companyData - The current company data to be displayed in the form.
 * @param {Function} setCompanyData - Function to update the company data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered CompanyForm component.
 */
const CompanyForm = ({ companyData, setCompanyData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        code: Yup.string().required('Code is required'),
        address: Yup.string().required('Address is required'),
        cin_num: Yup.string().nullable(),
        email1: Yup.string().email('Enter a valid email').nullable(),
        phone1: Yup.string().nullable(),
        website: Yup.string().nullable(),
        gst_num: Yup.string().nullable(),
        pan_num: Yup.string().nullable(),
        tan_num: Yup.string().nullable(),
        msme_num: Yup.string().nullable(),
        seq_num: Yup.number().nullable(),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: companyData,
        validationSchema,
        onSubmit: (values) => {
            setCompanyData(values);
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
            setCompanyData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                name: true,
                code: true,
                address: true,
                cin_num: true,
                email1: true,
                phone1: true,
                website: true,
                gst_num: true,
                pan_num: true,
                tan_num: true,
                msme_num: true,
                seq_num: true,
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

                {/* CIN Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="cin_num"
                        label="CIN Number"
                        value={formik.values.cin_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.cin_num && Boolean(formik.errors.cin_num)}
                        helperText={formik.touched.cin_num && formik.errors.cin_num}
                    />
                </Grid>

                {/* Email1 Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="email1"
                        label="Email"
                        value={formik.values.email1 || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.email1 && Boolean(formik.errors.email1)}
                        helperText={formik.touched.email1 && formik.errors.email1}
                    />
                </Grid>

                {/* Phone1 Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="phone1"
                        label="Phone"
                        value={formik.values.phone1 || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.phone1 && Boolean(formik.errors.phone1)}
                        helperText={formik.touched.phone1 && formik.errors.phone1}
                    />
                </Grid>

                {/* Website Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="website"
                        label="Website"
                        value={formik.values.website || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.website && Boolean(formik.errors.website)}
                        helperText={formik.touched.website && formik.errors.website}
                    />
                </Grid>

                {/* GST Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="gst_num"
                        label="GST Number"
                        value={formik.values.gst_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.gst_num && Boolean(formik.errors.gst_num)}
                        helperText={formik.touched.gst_num && formik.errors.gst_num}
                    />
                </Grid>

                {/* PAN Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="pan_num"
                        label="PAN Number"
                        value={formik.values.pan_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.pan_num && Boolean(formik.errors.pan_num)}
                        helperText={formik.touched.pan_num && formik.errors.pan_num}
                    />
                </Grid>

                {/* TAN Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="tan_num"
                        label="TAN Number"
                        value={formik.values.tan_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.tan_num && Boolean(formik.errors.tan_num)}
                        helperText={formik.touched.tan_num && formik.errors.tan_num}
                    />
                </Grid>

                {/* MSME Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="msme_num"
                        label="MSME Number"
                        value={formik.values.msme_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.msme_num && Boolean(formik.errors.msme_num)}
                        helperText={formik.touched.msme_num && formik.errors.msme_num}
                    />
                </Grid>

                {/* Sequence Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="seq_num"
                        label="Sequence Number"
                        value={formik.values.seq_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.seq_num && Boolean(formik.errors.seq_num)}
                        helperText={formik.touched.seq_num && formik.errors.seq_num}
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
                        <Button onClick={() => navigate('/md/org/companies/list')} sx={{ my: 3, ml: 1 }}>
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

export default CompanyForm;
