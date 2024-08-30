// tmsui/src/features/users/containers/ViewRole.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import RoleDetails from '../components/RoleDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useRoleApi from '../hooks/useRoleApi';

/**
 * ViewRole Component
 * - Displays the details of a specific role based on the ID passed in the URL.
 * - Reuses the RoleDetails component in "view" mode.
 */
const ViewRole = () => {
    const { id } = useParams(); // Retrieve the role ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchRoleById } = useRoleApi(); // Hook for role-related API operations

    const [roleData, setRoleData] = useState(null); // Local state to hold the role data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        const loadRoleData = async () => {
            try {
                setLoading(true);
                const role = await fetchRoleById(id); // Fetch role data
                setRoleData(role); // Set the role data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadRoleData();
        }
    }, [id, fetchRoleById]);

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error.message || 'Failed to load role data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Role Details">
            {roleData ? (
                <RoleDetails role={roleData} mode="view" />
            ) : (
                <Typography>No role data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/access/roles/list')} // Use navigate function to go back to role list
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

export default ViewRole;
