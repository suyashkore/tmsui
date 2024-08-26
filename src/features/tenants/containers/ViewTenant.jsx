import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import { useDispatch, useSelector } from 'store';
import { getTenantById } from 'store/slices/tenant';
import TenantDetails from '../components/TenantDetails'; // Import the reusable TenantDetails component
import MainCard from 'ui-component/cards/MainCard';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';

import AnimateButton from 'ui-component/extended/AnimateButton';

/**
 * ViewTenant Component
 * - This component is responsible for displaying the details of a specific tenant.
 * - The tenant details are fetched based on the ID passed in the URL parameters.
 */
const ViewTenant = () => {
  const { id } = useParams(); // Retrieve the tenant ID from the URL parameters
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
  const { tenant, loading } = useSelector((state) => state.tenant); // Access tenant data and loading state from the Redux store
  const [tenantData, setTenantData] = useState(null); // Local state to hold the tenant data

  // Fetch tenant data by ID when the component mounts or when the ID changes
  useEffect(() => {
    if (id) {
      dispatch(getTenantById(id));
    }
  }, [dispatch, id]);

  // Update tenantData when the tenant state in Redux is updated
  useEffect(() => {
    if (tenant && tenant.id === Number(id)) {
      setTenantData(tenant);
    }
  }, [tenant, id]);

  // Render a loading indicator while the tenant data is being fetched
  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <MainCard title="Tenant Details">
      {tenantData ? (
        // Reuse the TenantDetails component in "show" mode to display tenant information
        <TenantDetails tenant={tenantData} mode="show" />
      ) : (
        // Display a message if no tenant data is found
        <Typography>No tenant data found</Typography>
      )}
      {/* Navigation button to return to the tenant list */}
      <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
        <AnimateButton>
          <Button
            onClick={() => navigate('/md/org/tenants/list')} // Use navigate function to go back to tenant list
            variant="contained"
            color="primary"
          >
            OK
          </Button>
        </AnimateButton>
      </Stack>
    </MainCard>
  );
};

export default ViewTenant;
