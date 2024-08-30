// tmsui/src/features/users/containers/EditRole.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import RoleStepper from '../components/RoleStepper';
import useRoleApi from '../hooks/useRoleApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditRole Component
 * - This component handles the editing of role data.
 * - It fetches role data based on the role ID provided in the URL and initializes the form in edit mode.
 */
const EditRole = () => {
    const { id } = useParams(); // Extract role ID from the URL parameters
    const { fetchRoleById } = useRoleApi(); // Custom hook to handle role API calls
    const [roleData, setRoleData] = useState(null); // State to store the fetched role data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    useEffect(() => {
        const loadRoleData = async () => {
            try {
                const role = await fetchRoleById(id); // Fetch role data by ID
                setRoleData(role); // Store the fetched data
            } catch (err) {
                setError('Failed to load role data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadRoleData(); // Trigger role data fetch if ID is available
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
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!roleData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading role data...</Typography>
            </Box>
        );
    }

    return (
        <RoleStepper
            initialRoleData={roleData} // Pass the fetched role data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditRole;
