import React from 'react';
import { Grid, Typography, Card, CardContent, Avatar, Divider } from '@mui/material';
import { format } from 'date-fns';

const ViewTenantComponent = ({ tenant, isViewMode }) => {
  return (
    <Card sx={{ maxWidth: '100%', p: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4" component="div">
              {tenant.name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Country</Typography>
            <Typography variant="body2">{tenant.country}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">State</Typography>
            <Typography variant="body2">{tenant.state}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">City</Typography>
            <Typography variant="body2">{tenant.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Pincode</Typography>
            <Typography variant="body2">{tenant.pincode}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Latitude</Typography>
            <Typography variant="body2">{tenant.latitude}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Longitude</Typography>
            <Typography variant="body2">{tenant.longitude}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Address</Typography>
            <Typography variant="body2">{tenant.address}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="subtitle1">Description</Typography>
            <Typography variant="body2">{tenant.description}</Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="subtitle1">Active</Typography>
            <Typography variant="body2">{tenant.active ? 'Yes' : 'No'}</Typography>
          </Grid>
          {isViewMode && (
            <>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Created By</Typography>
                <Typography variant="body2">{tenant.created_by}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Updated By</Typography>
                <Typography variant="body2">{tenant.updated_by}</Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Created At</Typography>
                <Typography variant="body2">
                  {format(new Date(tenant.created_at), 'dd MMM yyyy, hh:mm a')}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="subtitle1">Updated At</Typography>
                <Typography variant="body2">
                  {format(new Date(tenant.updated_at), 'dd MMM yyyy, hh:mm a')}
                </Typography>
              </Grid>
            </>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ViewTenantComponent;