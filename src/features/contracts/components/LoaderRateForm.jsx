// tmsui/src/features/contracts/components/LoaderRateForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * LoaderRateForm Component
 * - Handles the form for both creating and editing loader rates.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} loaderRateData - The current loader rate data to be displayed in the form.
 * @param {Function} setLoaderRateData - Function to update the loader rate data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered LoaderRateForm component.
 */
const LoaderRateForm = ({ loaderRateData, setLoaderRateData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        vendor_name: Yup.string().required('Vendor Name is required'),
        default_rate_type: Yup.string().required('Default Rate Type is required'),
        reg_pkg_rate: Yup.number().required('Regular Package Rate is required').min(0, 'Must be greater than or equal to 0'),
        crossing_pkg_rate: Yup.number().required('Crossing Package Rate is required').min(0, 'Must be greater than or equal to 0'),
        reg_weight_rate: Yup.number().required('Regular Weight Rate is required').min(0, 'Must be greater than or equal to 0'),
        crossing_weight_rate: Yup.number().required('Crossing Weight Rate is required').min(0, 'Must be greater than or equal to 0'),
        monthly_sal: Yup.number().required('Monthly Salary is required').min(0, 'Must be greater than or equal to 0'),
        daily_allowance: Yup.number().required('Daily Allowance is required').min(0, 'Must be greater than or equal to 0'),
        daily_wage: Yup.number().required('Daily Wage is required').min(0, 'Must be greater than or equal to 0'),
        overtime_hourly_rate: Yup.number().required('Overtime Hourly Rate is required').min(0, 'Must be greater than or equal to 0'),
        start_date: Yup.date().required('Start Date is required'),
        end_date: Yup.date().required('End Date is required').nullable(),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: loaderRateData,
        validationSchema,
        onSubmit: (values) => {
            setLoaderRateData(values);
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
            setLoaderRateData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                vendor_name: true,
                default_rate_type: true,
                reg_pkg_rate: true,
                crossing_pkg_rate: true,
                reg_weight_rate: true,
                crossing_weight_rate: true,
                monthly_sal: true,
                daily_allowance: true,
                daily_wage: true,
                overtime_hourly_rate: true,
                start_date: true,
                end_date: true,
            });
        }
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
                {/* Vendor Name Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="vendor_name"
                        label="Vendor Name"
                        value={formik.values.vendor_name || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.vendor_name && Boolean(formik.errors.vendor_name)}
                        helperText={formik.touched.vendor_name && formik.errors.vendor_name}
                    />
                </Grid>

                {/* Default Rate Type Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="default_rate_type"
                        label="Default Rate Type"
                        value={formik.values.default_rate_type || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.default_rate_type && Boolean(formik.errors.default_rate_type)}
                        helperText={formik.touched.default_rate_type && formik.errors.default_rate_type}
                    />
                </Grid>

                {/* Regular Package Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="reg_pkg_rate"
                        label="Regular Package Rate"
                        value={formik.values.reg_pkg_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.reg_pkg_rate && Boolean(formik.errors.reg_pkg_rate)}
                        helperText={formik.touched.reg_pkg_rate && formik.errors.reg_pkg_rate}
                    />
                </Grid>

                {/* Crossing Package Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="crossing_pkg_rate"
                        label="Crossing Package Rate"
                        value={formik.values.crossing_pkg_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.crossing_pkg_rate && Boolean(formik.errors.crossing_pkg_rate)}
                        helperText={formik.touched.crossing_pkg_rate && formik.errors.crossing_pkg_rate}
                    />
                </Grid>

                {/* Regular Weight Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="reg_weight_rate"
                        label="Regular Weight Rate"
                        value={formik.values.reg_weight_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.reg_weight_rate && Boolean(formik.errors.reg_weight_rate)}
                        helperText={formik.touched.reg_weight_rate && formik.errors.reg_weight_rate}
                    />
                </Grid>

                {/* Crossing Weight Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="crossing_weight_rate"
                        label="Crossing Weight Rate"
                        value={formik.values.crossing_weight_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.crossing_weight_rate && Boolean(formik.errors.crossing_weight_rate)}
                        helperText={formik.touched.crossing_weight_rate && formik.errors.crossing_weight_rate}
                    />
                </Grid>

                {/* Monthly Salary Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="monthly_sal"
                        label="Monthly Salary"
                        value={formik.values.monthly_sal || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.monthly_sal && Boolean(formik.errors.monthly_sal)}
                        helperText={formik.touched.monthly_sal && formik.errors.monthly_sal}
                    />
                </Grid>

                {/* Daily Allowance Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="daily_allowance"
                        label="Daily Allowance"
                        value={formik.values.daily_allowance || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.daily_allowance && Boolean(formik.errors.daily_allowance)}
                        helperText={formik.touched.daily_allowance && formik.errors.daily_allowance}
                    />
                </Grid>

                {/* Daily Wage Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="daily_wage"
                        label="Daily Wage"
                        value={formik.values.daily_wage || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.daily_wage && Boolean(formik.errors.daily_wage)}
                        helperText={formik.touched.daily_wage && formik.errors.daily_wage}
                    />
                </Grid>

                {/* Overtime Hourly Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="overtime_hourly_rate"
                        label="Overtime Hourly Rate"
                        value={formik.values.overtime_hourly_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.overtime_hourly_rate && Boolean(formik.errors.overtime_hourly_rate)}
                        helperText={formik.touched.overtime_hourly_rate && formik.errors.overtime_hourly_rate}
                    />
                </Grid>

                {/* Start Date Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="start_date"
                        label="Start Date"
                        type="date"
                        value={formik.values.start_date ? format(new Date(formik.values.start_date), 'yyyy-MM-dd') : ''}
                        onChange={formik.handleChange}
                        error={formik.touched.start_date && Boolean(formik.errors.start_date)}
                        helperText={formik.touched.start_date && formik.errors.start_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Grid>

                {/* End Date Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="end_date"
                        label="End Date"
                        type="date"
                        value={formik.values.end_date ? format(new Date(formik.values.end_date), 'yyyy-MM-dd') : ''}
                        onChange={formik.handleChange}
                        error={formik.touched.end_date && Boolean(formik.errors.end_date)}
                        helperText={formik.touched.end_date && formik.errors.end_date}
                        InputLabelProps={{
                            shrink: true,
                        }}
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
                        <Button onClick={() => navigate('/md/contracts/loader/list')} sx={{ my: 3, ml: 1 }}>
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

export default LoaderRateForm;
