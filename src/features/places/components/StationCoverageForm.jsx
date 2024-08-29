// tmsui/src/features/places/components/StationCoverageForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * StationCoverageForm Component
 * - Handles the form for both creating and editing station coverage records.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} stationCoverageData - The current station coverage data to be displayed in the form.
 * @param {Function} setStationCoverageData - Function to update the station coverage data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered StationCoverageForm component.
 */
const StationCoverageForm = ({ stationCoverageData, setStationCoverageData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        post_name: Yup.string().required('Post Name is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        taluka: Yup.string().required('Taluka is required'),
        district: Yup.string().required('District is required'),
        state: Yup.string().required('State is required'),
        country: Yup.string().required('Country is required'),
        latitude: Yup.string()
            .required('Latitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Latitude must be a decimal with at least 4 digits after the decimal'),
        longitude: Yup.string()
            .required('Longitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Longitude must be a decimal with at least 4 digits after the decimal'),
        servicing_office_id: Yup.number().required('Servicing Office ID is required'),
        service_office_tat: Yup.number().required('Service Office TAT is required'),
        servicing_office_dist: Yup.number().required('Servicing Office Distance is required')
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: stationCoverageData,
        validationSchema,
        onSubmit: (values) => {
            setStationCoverageData(values);
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
            setStationCoverageData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                name: true,
                post_name: true,
                pincode: true,
                taluka: true,
                district: true,
                state: true,
                country: true,
                latitude: true,
                longitude: true,
                servicing_office_id: true,
                service_office_tat: true,
                servicing_office_dist: true,
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

                {/* Post Name Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="post_name"
                        label="Post Name"
                        value={formik.values.post_name || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.post_name && Boolean(formik.errors.post_name)}
                        helperText={formik.touched.post_name && formik.errors.post_name}
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

                {/* Taluka Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="taluka"
                        label="Taluka"
                        value={formik.values.taluka || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.taluka && Boolean(formik.errors.taluka)}
                        helperText={formik.touched.taluka && formik.errors.taluka}
                    />
                </Grid>

                {/* District Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="district"
                        label="District"
                        value={formik.values.district || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.district && Boolean(formik.errors.district)}
                        helperText={formik.touched.district && formik.errors.district}
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

                {/* Servicing Office ID Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="servicing_office_id"
                        label="Servicing Office ID"
                        value={formik.values.servicing_office_id || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.servicing_office_id && Boolean(formik.errors.servicing_office_id)}
                        helperText={formik.touched.servicing_office_id && formik.errors.servicing_office_id}
                    />
                </Grid>

                {/* Service Office TAT Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="service_office_tat"
                        label="Service Office TAT"
                        value={formik.values.service_office_tat || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.service_office_tat && Boolean(formik.errors.service_office_tat)}
                        helperText={formik.touched.service_office_tat && formik.errors.service_office_tat}
                    />
                </Grid>

                {/* Servicing Office Distance Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="servicing_office_dist"
                        label="Servicing Office Distance"
                        value={formik.values.servicing_office_dist || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.servicing_office_dist && Boolean(formik.errors.servicing_office_dist)}
                        helperText={formik.touched.servicing_office_dist && formik.errors.servicing_office_dist}
                    />
                </Grid>

                {/* ODA Checkbox */}
                <Grid item xs={12}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={formik.values.oda ?? false}
                                onChange={(event) => formik.setFieldValue('oda', event.target.checked)}
                            />
                        }
                        label="ODA"
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
                                value={formik.values.updated_at ? format(new Date(formik.values.updated_at), 'dd MMM yyyy, hh:mm a') : ''}
                                InputProps={{ readOnly: true }}
                                disabled
                            />
                        </Grid>
                    </>
                )}

                {/* Form Navigation Buttons */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                        <Button onClick={() => navigate('/md/places/stationcoverage/list')} sx={{ my: 3, ml: 1 }}>
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

export default StationCoverageForm;
