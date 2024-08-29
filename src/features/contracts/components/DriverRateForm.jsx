// tmsui/src/features/contracts/components/DriverRateForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * DriverRateForm Component
 * - Handles the form for both creating and editing driver rates.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} driverRateData - The current driver rate data to be displayed in the form.
 * @param {Function} setDriverRateData - Function to update the driver rate data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered DriverRateForm component.
 */
const DriverRateForm = ({ driverRateData, setDriverRateData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        vendor_name: Yup.string().required('Vendor Name is required'),
        default_rate_type: Yup.string().required('Default Rate Type is required'),
        daily_rate: Yup.number().required('Daily Rate is required').min(0, 'Value must be greater than or equal to 0'),
        hourly_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        overtime_hourly_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        daily_allowance: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        per_km_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        per_extra_km_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        night_halt_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        per_trip_rate: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        trip_allowance: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        incentive_per_trip: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        monthly_sal: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        monthly_incentive: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        per_trip_penalty_percent: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        per_trip_penalty_fixed_amount: Yup.number().nullable().min(0, 'Value must be greater than or equal to 0'),
        start_date: Yup.date().required('Start Date is required'),
        end_date: Yup.date().nullable()
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: driverRateData,
        validationSchema,
        onSubmit: (values) => {
            setDriverRateData(values);
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
            setDriverRateData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                vendor_name: true,
                default_rate_type: true,
                daily_rate: true,
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

                {/* Daily Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="daily_rate"
                        label="Daily Rate"
                        type="number"
                        value={formik.values.daily_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.daily_rate && Boolean(formik.errors.daily_rate)}
                        helperText={formik.touched.daily_rate && formik.errors.daily_rate}
                    />
                </Grid>

                {/* Hourly Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="hourly_rate"
                        label="Hourly Rate"
                        type="number"
                        value={formik.values.hourly_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.hourly_rate && Boolean(formik.errors.hourly_rate)}
                        helperText={formik.touched.hourly_rate && formik.errors.hourly_rate}
                    />
                </Grid>

                {/* Overtime Hourly Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="overtime_hourly_rate"
                        label="Overtime Hourly Rate"
                        type="number"
                        value={formik.values.overtime_hourly_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.overtime_hourly_rate && Boolean(formik.errors.overtime_hourly_rate)}
                        helperText={formik.touched.overtime_hourly_rate && formik.errors.overtime_hourly_rate}
                    />
                </Grid>

                {/* Daily Allowance Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="daily_allowance"
                        label="Daily Allowance"
                        type="number"
                        value={formik.values.daily_allowance || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.daily_allowance && Boolean(formik.errors.daily_allowance)}
                        helperText={formik.touched.daily_allowance && formik.errors.daily_allowance}
                    />
                </Grid>

                {/* Per Km Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="per_km_rate"
                        label="Per Km Rate"
                        type="number"
                        value={formik.values.per_km_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.per_km_rate && Boolean(formik.errors.per_km_rate)}
                        helperText={formik.touched.per_km_rate && formik.errors.per_km_rate}
                    />
                </Grid>

                {/* Per Extra Km Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="per_extra_km_rate"
                        label="Per Extra Km Rate"
                        type="number"
                        value={formik.values.per_extra_km_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.per_extra_km_rate && Boolean(formik.errors.per_extra_km_rate)}
                        helperText={formik.touched.per_extra_km_rate && formik.errors.per_extra_km_rate}
                    />
                </Grid>

                {/* Night Halt Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="night_halt_rate"
                        label="Night Halt Rate"
                        type="number"
                        value={formik.values.night_halt_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.night_halt_rate && Boolean(formik.errors.night_halt_rate)}
                        helperText={formik.touched.night_halt_rate && formik.errors.night_halt_rate}
                    />
                </Grid>

                {/* Per Trip Rate Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="per_trip_rate"
                        label="Per Trip Rate"
                        type="number"
                        value={formik.values.per_trip_rate || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.per_trip_rate && Boolean(formik.errors.per_trip_rate)}
                        helperText={formik.touched.per_trip_rate && formik.errors.per_trip_rate}
                    />
                </Grid>

                {/* Trip Allowance Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="trip_allowance"
                        label="Trip Allowance"
                        type="number"
                        value={formik.values.trip_allowance || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.trip_allowance && Boolean(formik.errors.trip_allowance)}
                        helperText={formik.touched.trip_allowance && formik.errors.trip_allowance}
                    />
                </Grid>

                {/* Incentive Per Trip Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="incentive_per_trip"
                        label="Incentive Per Trip"
                        type="number"
                        value={formik.values.incentive_per_trip || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.incentive_per_trip && Boolean(formik.errors.incentive_per_trip)}
                        helperText={formik.touched.incentive_per_trip && formik.errors.incentive_per_trip}
                    />
                </Grid>

                {/* Monthly Salary Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="monthly_sal"
                        label="Monthly Salary"
                        type="number"
                        value={formik.values.monthly_sal || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.monthly_sal && Boolean(formik.errors.monthly_sal)}
                        helperText={formik.touched.monthly_sal && formik.errors.monthly_sal}
                    />
                </Grid>

                {/* Monthly Incentive Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="monthly_incentive"
                        label="Monthly Incentive"
                        type="number"
                        value={formik.values.monthly_incentive || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.monthly_incentive && Boolean(formik.errors.monthly_incentive)}
                        helperText={formik.touched.monthly_incentive && formik.errors.monthly_incentive}
                    />
                </Grid>

                {/* Per Trip Penalty Percent Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="per_trip_penalty_percent"
                        label="Per Trip Penalty Percent"
                        type="number"
                        value={formik.values.per_trip_penalty_percent || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.per_trip_penalty_percent && Boolean(formik.errors.per_trip_penalty_percent)}
                        helperText={formik.touched.per_trip_penalty_percent && formik.errors.per_trip_penalty_percent}
                    />
                </Grid>

                {/* Per Trip Penalty Fixed Amount Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="per_trip_penalty_fixed_amount"
                        label="Per Trip Penalty Fixed Amount"
                        type="number"
                        value={formik.values.per_trip_penalty_fixed_amount || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.per_trip_penalty_fixed_amount && Boolean(formik.errors.per_trip_penalty_fixed_amount)}
                        helperText={formik.touched.per_trip_penalty_fixed_amount && formik.errors.per_trip_penalty_fixed_amount}
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

                {/* Form Navigation Buttons */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                        <Button onClick={() => navigate('/md/contracts/driver/list')} sx={{ my: 3, ml: 1 }}>
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

export default DriverRateForm;
