// tmsui/src/features/users/components/UserForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack, Select, MenuItem, InputLabel, FormControl, Chip } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * UserForm Component
 * - Handles the form for both creating and editing users.
 * - Utilizes Formik for form state management and validation.
 *
 * @param {Object} userData - The current user data to be displayed in the form.
 * @param {Function} setUserData - Function to update the user data state.
 * @param {Function} handleNext - Function to proceed to the next step in the form wizard.
 * @param {Function} handleSubmit - Function to handle the submission of the form.
 * @param {Boolean} isEditMode - Determines if the form is in edit mode or create mode.
 * @returns {JSX.Element} The rendered UserForm component.
 */
const UserForm = ({ userData, setUserData, handleNext, handleSubmit, isEditMode }) => {
    const navigate = useNavigate();

    // Validation schema for the form using Yup
    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        login_id: Yup.string().required('Login ID is required'),
        mobile: Yup.string()
            .required('Mobile is required')
            .matches(/^\d{10}$/, 'Mobile must be 10 digits'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        user_type: Yup.string().required('User type is required'),
        role_id: Yup.number().required('Role is required'),
        privileges: Yup.array().min(1, 'At least one privilege is required').required('Privileges are required'),
    });

    // Initialize Formik for managing form state and validation
    const formik = useFormik({
        initialValues: userData,
        validationSchema,
        onSubmit: (values) => {
            setUserData(values);
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
            setUserData(formik.values);
            handleNext(); // Move to the preview step if validation is successful
        } else {
            formik.setTouched({
                name: true,
                login_id: true,
                mobile: true,
                email: true,
                user_type: true,
                role_id: true,
                privileges: true,
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

                {/* Login ID Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="login_id"
                        label="Login ID"
                        value={formik.values.login_id || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.login_id && Boolean(formik.errors.login_id)}
                        helperText={formik.touched.login_id && formik.errors.login_id}
                    />
                </Grid>

                {/* Mobile Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="mobile"
                        label="Mobile"
                        value={formik.values.mobile || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                        helperText={formik.touched.mobile && formik.errors.mobile}
                    />
                </Grid>

                {/* Email Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>

                {/* Secondary Email Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="email2"
                        label="Secondary Email"
                        value={formik.values.email2 || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.email2 && Boolean(formik.errors.email2)}
                        helperText={formik.touched.email2 && formik.errors.email2}
                    />
                </Grid>

                {/* User Type Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="user-type-label">User Type</InputLabel>
                        <Select
                            labelId="user-type-label"
                            name="user_type"
                            value={formik.values.user_type || ''}
                            onChange={formik.handleChange}
                            error={formik.touched.user_type && Boolean(formik.errors.user_type)}
                        >
                            <MenuItem value="SYSTEM">System</MenuItem>
                            <MenuItem value="ADMIN">Admin</MenuItem>
                            <MenuItem value="USER">User</MenuItem>
                        </Select>
                        {formik.touched.user_type && formik.errors.user_type && (
                            <Typography color="error" variant="caption">
                                {formik.errors.user_type}
                            </Typography>
                        )}
                    </FormControl>
                </Grid>

                {/* Role Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="role_name"
                        label="Role"
                        value={formik.values.role_name || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.role_name && Boolean(formik.errors.role_name)}
                        helperText={formik.touched.role_name && formik.errors.role_name}
                    />
                </Grid>

                {/* Privileges Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <FormControl fullWidth>
                        <InputLabel id="privileges-label">Privileges</InputLabel>
                        <Select
                            labelId="privileges-label"
                            name="privileges"
                            multiple
                            value={formik.values.privileges || []}
                            onChange={formik.handleChange}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} />
                                    ))}
                                </Box>
                            )}
                            error={formik.touched.privileges && Boolean(formik.errors.privileges)}
                        >
                            <MenuItem value="SYS_ALL">SYS_ALL</MenuItem>
                            <MenuItem value="TENANT_ALL">TENANT_ALL</MenuItem>
                            <MenuItem value="USER_VIEW">USER_VIEW</MenuItem>
                            <MenuItem value="USER_MANAGE">USER_MANAGE</MenuItem>
                        </Select>
                        {formik.touched.privileges && formik.errors.privileges && (
                            <Typography color="error" variant="caption">
                                {formik.errors.privileges}
                            </Typography>
                        )}
                    </FormControl>
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

                {/* Job Title Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="job_title"
                        label="Job Title"
                        value={formik.values.job_title || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.job_title && Boolean(formik.errors.job_title)}
                        helperText={formik.touched.job_title && formik.errors.job_title}
                    />
                </Grid>

                {/* Department Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="department"
                        label="Department"
                        value={formik.values.department || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.department && Boolean(formik.errors.department)}
                        helperText={formik.touched.department && formik.errors.department}
                    />
                </Grid>

                {/* Aadhaar Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="aadhaar"
                        label="Aadhaar"
                        value={formik.values.aadhaar || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.aadhaar && Boolean(formik.errors.aadhaar)}
                        helperText={formik.touched.aadhaar && formik.errors.aadhaar}
                    />
                </Grid>

                {/* PAN Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="pan"
                        label="PAN"
                        value={formik.values.pan || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.pan && Boolean(formik.errors.pan)}
                        helperText={formik.touched.pan && formik.errors.pan}
                    />
                </Grid>

                {/* EPF UAN Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="epf_uan"
                        label="EPF UAN"
                        value={formik.values.epf_uan || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.epf_uan && Boolean(formik.errors.epf_uan)}
                        helperText={formik.touched.epf_uan && formik.errors.epf_uan}
                    />
                </Grid>

                {/* EPF Number Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="epf_num"
                        label="EPF Number"
                        value={formik.values.epf_num || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.epf_num && Boolean(formik.errors.epf_num)}
                        helperText={formik.touched.epf_num && formik.errors.epf_num}
                    />
                </Grid>

                {/* ESIC Field */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="esic"
                        label="ESIC"
                        value={formik.values.esic || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.esic && Boolean(formik.errors.esic)}
                        helperText={formik.touched.esic && formik.errors.esic}
                    />
                </Grid>

                {/* Remarks Field */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="remarks"
                        label="Remarks"
                        multiline
                        rows={4}
                        value={formik.values.remarks || ''}
                        onChange={formik.handleChange}
                        error={formik.touched.remarks && Boolean(formik.errors.remarks)}
                        helperText={formik.touched.remarks && formik.errors.remarks}
                    />
                </Grid>

                {/* Form Navigation Buttons */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                        <Button onClick={() => navigate('/md/access/users/list')} sx={{ my: 3, ml: 1 }}>
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

export default UserForm;
