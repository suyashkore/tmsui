import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'store';
import { getTenantById } from 'store/slices/tenant';
import ShowTenant from '../components/ShowTenant';
import MainCard from 'ui-component/cards/MainCard';
import { CircularProgress, Box, Typography } from '@mui/material'; // Import Typography

const ViewTenant = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { tenant, loading } = useSelector((state) => state.tenant);
  const [tenantData, setTenantData] = useState(null);

  useEffect(() => {
    if (id) {
      dispatch(getTenantById(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (tenant && tenant.id === Number(id)) {
      setTenantData(tenant);
    }
  }, [tenant, id]);

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
        <ShowTenant tenant={tenantData} isViewMode={true} />
      ) : (
        <Typography>No tenant data found</Typography> // This is where Typography is needed
      )}
    </MainCard>
  );
};

export default ViewTenant;
