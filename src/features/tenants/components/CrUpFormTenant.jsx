import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// Material-UI imports
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// Project imports
import MainCard from 'ui-component/cards/MainCard';
import InputLabel from 'ui-component/extended/Form/InputLabel';
import { gridSpacing } from 'store/constant';
import LockTwoToneIcon from '@mui/icons-material/LockTwoTone';
import LinkTwoToneIcon from '@mui/icons-material/LinkTwoTone';

// Validation schema using Yup
const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    country: Yup.string().required('Country is required'),
    state: Yup.string().required('State is required'),
    city: Yup.string().required('City is required'),
    pincode: Yup.string().required('Pincode is required'),
    address: Yup.string().required('Address is required'),
    active: Yup.boolean().required('Status is required')
});

const CrUpFormTenant = ({ initialValues, isEditMode, onSubmit }) => {
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        }
    });

    return (
        <MainCard title={isEditMode ? 'Edit Tenant' : 'Create Tenant'}>
            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={2} alignItems="center">
                    {isEditMode && (
                        <>
                            {/* ID Field (Visible in Edit Mode Only) */}
                            <Grid item xs={12} lg={4}>
                                <InputLabel>ID</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formik.values.id}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>Created By</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formik.values.created_by}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>Updated By</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formik.values.updated_by}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>Created At</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formik.values.created_at}
                                />
                            </Grid>
                            <Grid item xs={12} lg={4}>
                                <InputLabel>Updated At</InputLabel>
                                <TextField
                                    fullWidth
                                    disabled
                                    value={formik.values.updated_at}
                                />
                            </Grid>
                        </>
                    )}

                    {/* Name */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>Name</InputLabel>
                        <TextField
                            fullWidth
                            name="name"
                            placeholder="Enter Tenant Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>Country</InputLabel>
                        <TextField
                            fullWidth
                            name="country"
                            placeholder="Enter Country"
                            value={formik.values.country}
                            onChange={formik.handleChange}
                            error={formik.touched.country && Boolean(formik.errors.country)}
                            helperText={formik.touched.country && formik.errors.country}
                        />
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>State</InputLabel>
                        <TextField
                            fullWidth
                            name="state"
                            placeholder="Enter State"
                            value={formik.values.state}
                            onChange={formik.handleChange}
                            error={formik.touched.state && Boolean(formik.errors.state)}
                            helperText={formik.touched.state && formik.errors.state}
                        />
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>City</InputLabel>
                        <TextField
                            fullWidth
                            name="city"
                            placeholder="Enter City"
                            value={formik.values.city}
                            onChange={formik.handleChange}
                            error={formik.touched.city && Boolean(formik.errors.city)}
                            helperText={formik.touched.city && formik.errors.city}
                        />
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>Pincode</InputLabel>
                        <TextField
                            fullWidth
                            name="pincode"
                            placeholder="Enter Pincode"
                            value={formik.values.pincode}
                            onChange={formik.handleChange}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                        />
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12} lg={4}>
                        <InputLabel>Address</InputLabel>
                        <TextField
                            fullWidth
                            name="address"
                            placeholder="Enter Address"
                            value={formik.values.address}
                            onChange={formik.handleChange}
                            error={formik.touched.address && Boolean(formik.errors.address)}
                            helperText={formik.touched.address && formik.errors.address}
                        />
                    </Grid>

                    {/* Active */}
                    <Grid item xs={12} lg={4}>
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

                    {/* Submit Button */}
                    <Grid item xs={12} lg={4}>
                        <Button type="submit" variant="contained" color="primary">
                            {isEditMode ? 'Update Tenant' : 'Create Tenant'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </MainCard>
    );
};

export default CrUpFormTenant;
