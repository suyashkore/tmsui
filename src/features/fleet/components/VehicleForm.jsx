// tmsui/src/features/fleet/components/VehicleForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * VehicleForm Component
 * - Handles the form for both creating and editing vehicles.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} vehicleData - The current vehicle data to be displayed in the form.
 * @param {Function} setVehicleData - Function to update the vehicle data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered VehicleForm component.
 */
const VehicleForm = ({ vehicleData, setVehicleData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        rc_num: Yup.string().required('RC Number is required'),
        vehicle_ownership: Yup.string().required('Vehicle Ownership is required'),
        make: Yup.string().required('Make is required'),
        pincode: Yup.string()
            .required('Pincode is required')
            .matches(/^\d{6}$/, 'Pincode must be 6 digits'),
        address: Yup.string().required('Address is required'),
        active: Yup.boolean(),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: vehicleData,
        validationSchema,
        onSubmit: (values) => {
            setVehicleData(values);
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
            setVehicleData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                rc_num: true,
                vehicle_ownership: true,
                make: true,
                pincode: true,
                address: true,
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {/* RC Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="rc_num"
                        label="RC Number"
                        value={formik.values.rc_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.rc_num && Boolean(formik.errors.rc_num)}
                        helperText={formik.touched.rc_num && formik.errors.rc_num}
                    />
                </Grid>

                {/* Vehicle Ownership Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="vehicle_ownership"
                        label="Vehicle Ownership"
                        value={formik.values.vehicle_ownership || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.vehicle_ownership && Boolean(formik.errors.vehicle_ownership)}
                        helperText={formik.touched.vehicle_ownership && formik.errors.vehicle_ownership}
                    />
                </Grid>

                {/* Make Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="make"
                        label="Make"
                        value={formik.values.make || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.make && Boolean(formik.errors.make)}
                        helperText={formik.touched.make && formik.errors.make}
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
                        <Button onClick={() => navigate('/md/fleet/vehicles/list')} sx={{ my: 3, ml: 1 }}>
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

export default VehicleForm;
