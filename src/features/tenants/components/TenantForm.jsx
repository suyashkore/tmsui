// tmsui/src/features/tenants/components/TenantForm.jsx

import React from 'react';
import { Grid, TextField, Checkbox, FormControlLabel, Button, Stack } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

// project imports
import AnimateButton from 'ui-component/extended/AnimateButton';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().required('Pincode is required'),//.matches(/^\d{6}$/, 'Pincode must be 6 digits'),
    address: Yup.string().required('Address is required'),
    latitude: Yup.string().required('Latitude is required'),
    longitude: Yup.string().required('Longitude is required'),
    description: Yup.string()
});

const TenantForm = ({ tenantData, setTenantData, handleNext, handleSubmit }) => {
    const navigate = useNavigate(); // Initialize navigate function for redirection

    const formik = useFormik({
        initialValues: tenantData,
        validationSchema,
        onSubmit: (values) => {
            setTenantData(values);
            handleSubmit();
        }
    });

    const handlePreview = async () => {
        const isValid = await formik.validateForm();
        if (Object.keys(isValid).length === 0) {
            setTenantData(formik.values);
            handleNext(); // Move to the Preview step if validation is successful
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
                {/* Name */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="name"
                        label="Name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.name && Boolean(formik.errors.name)}
                        helperText={formik.touched.name && formik.errors.name}
                    />
                </Grid>

                {/* Country */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="country"
                        label="Country"
                        value={formik.values.country}
                        onChange={formik.handleChange}
                        error={formik.touched.country && Boolean(formik.errors.country)}
                        helperText={formik.touched.country && formik.errors.country}
                    />
                </Grid>

                {/* State */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="state"
                        label="State"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        error={formik.touched.state && Boolean(formik.errors.state)}
                        helperText={formik.touched.state && formik.errors.state}
                    />
                </Grid>

                {/* City */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="city"
                        label="City"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        error={formik.touched.city && Boolean(formik.errors.city)}
                        helperText={formik.touched.city && formik.errors.city}
                    />
                </Grid>

                {/* Pincode */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="pincode"
                        label="Pincode"
                        value={formik.values.pincode}
                        onChange={formik.handleChange}
                        error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                        helperText={formik.touched.pincode && formik.errors.pincode}
                    />
                </Grid>

                {/* Address */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="address"
                        label="Address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        error={formik.touched.address && Boolean(formik.errors.address)}
                        helperText={formik.touched.address && formik.errors.address}
                    />
                </Grid>

                {/* Latitude */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="latitude"
                        label="Latitude"
                        value={formik.values.latitude}
                        onChange={formik.handleChange}
                        error={formik.touched.latitude && Boolean(formik.errors.latitude)}
                        helperText={formik.touched.latitude && formik.errors.latitude}
                    />
                </Grid>

                {/* Longitude */}
                <Grid item xs={12} sm={6} md={3}>
                    <TextField
                        fullWidth
                        name="longitude"
                        label="Longitude"
                        value={formik.values.longitude}
                        onChange={formik.handleChange}
                        error={formik.touched.longitude && Boolean(formik.errors.longitude)}
                        helperText={formik.touched.longitude && formik.errors.longitude}
                    />
                </Grid>

                {/* Description */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={formik.values.description}
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
                                checked={formik.values.active}
                                onChange={(event) => formik.setFieldValue('active', event.target.checked)}
                            />
                        }
                        label="Active"
                    />
                </Grid>

                {/* Navigation Links and Buttons */}
                <Grid item xs={12}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 3 }}>
                        <Button
                            onClick={() => navigate('/md/org/tenants/list')} // Navigates back to tenants list
                            sx={{ my: 3, ml: 1 }}
                        >
                            Back
                        </Button>
                        <Stack direction="row" spacing={2}>
                            <AnimateButton>
                                <Button variant="outlined" sx={{ my: 3, ml: 1 }} onClick={handlePreview}>
                                    Preview
                                </Button>
                                <Button type="submit" variant="contained" sx={{ my: 3, ml: 1 }} color="primary">
                                    Create
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
