// tmsui/src/features/places/components/GeoHierarchyForm.jsx

import React from 'react';
import { Grid, TextField, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * GeoHierarchyForm Component
 * - Handles the form for both creating and editing geo-hierarchies.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} geoHierarchyData - The current geo-hierarchy data to be displayed in the form.
 * @param {Function} setGeoHierarchyData - Function to update the geo-hierarchy data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered GeoHierarchyForm component.
 */
const GeoHierarchyForm = ({ geoHierarchyData, setGeoHierarchyData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        country: Yup.string().required('Country is required'),
        state: Yup.string().required('State is required'),
        district: Yup.string().required('District is required'),
        taluka: Yup.string().required('Taluka is required'),
        po_name: Yup.string().required('Post Office Name is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        po_lat: Yup.string()
            .required('Post Office Latitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Latitude must be a decimal with at least 4 digits after the decimal'),
        po_long: Yup.string()
            .required('Post Office Longitude is required')
            .matches(/^-?\d+(\.\d{4,})$/, 'Longitude must be a decimal with at least 4 digits after the decimal'),
        place: Yup.string().required('Place is required'),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: geoHierarchyData,
        validationSchema,
        onSubmit: (values) => {
            setGeoHierarchyData(values);
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
            setGeoHierarchyData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                country: true,
                state: true,
                district: true,
                taluka: true,
                po_name: true,
                pincode: true,
                po_lat: true,
                po_long: true,
                place: true,
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
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

                {/* Post Office Name Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="po_name"
                        label="Post Office Name"
                        value={formik.values.po_name || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.po_name && Boolean(formik.errors.po_name)}
                        helperText={formik.touched.po_name && formik.errors.po_name}
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

                {/* Post Office Latitude Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="po_lat"
                        label="Post Office Latitude"
                        value={formik.values.po_lat || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.po_lat && Boolean(formik.errors.po_lat)}
                        helperText={formik.touched.po_lat && formik.errors.po_lat}
                    />
                </Grid>

                {/* Post Office Longitude Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="po_long"
                        label="Post Office Longitude"
                        value={formik.values.po_long || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.po_long && Boolean(formik.errors.po_long)}
                        helperText={formik.touched.po_long && formik.errors.po_long}
                    />
                </Grid>

                {/* Place Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="place"
                        label="Place"
                        value={formik.values.place || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.place && Boolean(formik.errors.place)}
                        helperText={formik.touched.place && formik.errors.place}
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
                        <Button onClick={() => navigate('/md/places/geohierarchies/list')} sx={{ my: 3, ml: 1 }}>
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

export default GeoHierarchyForm;
