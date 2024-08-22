import React from 'react';
import { Grid, Typography, Card, CardContent } from '@mui/material';
import { format } from 'date-fns';

const ShowTenant = ({ tenant, isViewMode }) => {
    return (
        <Card sx={{ maxWidth: '100%', p: 2 }}>
            <CardContent>
                <Grid container spacing={2}>
                    {/* Tenant ID */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">ID</Typography>
                        <Typography variant="body2">{tenant.id || 'N/A'}</Typography>
                    </Grid>
                    
                    {/* Name */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Name</Typography>
                        <Typography variant="body2">{tenant.name}</Typography>
                    </Grid>

                    {/* Country */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Country</Typography>
                        <Typography variant="body2">{tenant.country || 'N/A'}</Typography>
                    </Grid>

                    {/* State */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">State</Typography>
                        <Typography variant="body2">{tenant.state || 'N/A'}</Typography>
                    </Grid>

                    {/* City */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">City</Typography>
                        <Typography variant="body2">{tenant.city || 'N/A'}</Typography>
                    </Grid>

                    {/* Pincode */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Pincode</Typography>
                        <Typography variant="body2">{tenant.pincode || 'N/A'}</Typography>
                    </Grid>

                    {/* Latitude */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Latitude</Typography>
                        <Typography variant="body2">{tenant.latitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Longitude */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Longitude</Typography>
                        <Typography variant="body2">{tenant.longitude || 'N/A'}</Typography>
                    </Grid>

                    {/* Address */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Address</Typography>
                        <Typography variant="body2">{tenant.address || 'N/A'}</Typography>
                    </Grid>

                    {/* Description */}
                    <Grid item xs={12}>
                        <Typography variant="subtitle1">Description</Typography>
                        <Typography variant="body2">{tenant.description || 'N/A'}</Typography>
                    </Grid>

                    {/* Active */}
                    <Grid item xs={12} sm={4}>
                        <Typography variant="subtitle1">Active</Typography>
                        <Typography variant="body2">{tenant.active ? 'Yes' : 'No'}</Typography>
                    </Grid>

                    {isViewMode && (
                        <>
                            {/* Created By */}
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Created By</Typography>
                                <Typography variant="body2">{tenant.created_by || 'N/A'}</Typography>
                            </Grid>

                            {/* Updated By */}
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Updated By</Typography>
                                <Typography variant="body2">{tenant.updated_by || 'N/A'}</Typography>
                            </Grid>

                            {/* Created At */}
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Created At</Typography>
                                <Typography variant="body2">
                                    {tenant.created_at ? format(new Date(tenant.created_at), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                                </Typography>
                            </Grid>

                            {/* Updated At */}
                            <Grid item xs={12} sm={4}>
                                <Typography variant="subtitle1">Updated At</Typography>
                                <Typography variant="body2">
                                    {tenant.updated_at ? format(new Date(tenant.updated_at), 'dd MMM yyyy, hh:mm a') : 'N/A'}
                                </Typography>
                            </Grid>
                        </>
                    )}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ShowTenant;
