// tmsui/src/features/users/components/RoleForm.jsx

import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, TextField, Typography, Autocomplete, Checkbox, FormControlLabel } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import usePrivilegeApi from '../hooks/usePrivilegeApi';

const RoleForm = ({ roleData, onFormChange, onIsLastStepChange }) => {
    const [privileges, setPrivileges] = useState([]);
    const { fetchPrivileges } = usePrivilegeApi();

    useEffect(() => {
        const loadPrivileges = async () => {
            try {
                const response = await fetchPrivileges();
                setPrivileges(response.data);
            } catch (error) {
                console.error('Failed to load privileges:', error);
            }
        };
        loadPrivileges();
    }, [fetchPrivileges]);

    const formik = useFormik({
        initialValues: {
            name: roleData.name || '',
            description: roleData.description || '',
            privileges: roleData.privileges || [],
            active: roleData.active !== undefined ? roleData.active : true,
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Role name is required'),
            description: Yup.string().required('Description is required'),
            privileges: Yup.array().min(1, 'At least one privilege is required'),
        }),
        onSubmit: (values) => {
            onFormChange(values);
            onIsLastStepChange(true);
        },
    });

    useEffect(() => {
        onIsLastStepChange(formik.isValid);
    }, [formik.isValid, onIsLastStepChange]);

    const handlePrivilegeChange = (event, value) => {
        formik.setFieldValue('privileges', value);
    };

    return (
        <form onSubmit={formik.handleSubmit}>
            <Box sx={{ mt: 2 }}>
                <Typography variant="h6">Role Information</Typography>
                <Grid container spacing={2} sx={{ mt: 2 }}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="name"
                            name="name"
                            label="Role Name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            id="description"
                            name="description"
                            label="Description"
                            value={formik.values.description}
                            onChange={formik.handleChange}
                            error={formik.touched.description && Boolean(formik.errors.description)}
                            helperText={formik.touched.description && formik.errors.description}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            multiple
                            id="privileges"
                            options={privileges}
                            getOptionLabel={(option) => option.name}
                            value={formik.values.privileges}
                            onChange={handlePrivilegeChange}
                            filterSelectedOptions
                            renderInput={(params) => (
                                <TextField
                                    {...params}
                                    label="Privileges"
                                    placeholder="Select Privileges"
                                    error={formik.touched.privileges && Boolean(formik.errors.privileges)}
                                    helperText={formik.touched.privileges && formik.errors.privileges}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={formik.values.active}
                                    onChange={(event) => formik.setFieldValue('active', event.target.checked)}
                                    name="active"
                                    color="primary"
                                />
                            }
                            label="Active"
                        />
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                    <Button color="primary" variant="contained" type="submit">
                        Next
                    </Button>
                </Box>
            </Box>
        </form>
    );
};

export default RoleForm;
