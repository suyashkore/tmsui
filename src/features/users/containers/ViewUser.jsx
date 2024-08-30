// tmsui/src/features/users/containers/ViewUser.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import UserDetails from '../components/UserDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import useUserApi from '../hooks/useUserApi';

/**
 * ViewUser Component
 * - Displays the details of a specific user based on the ID passed in the URL.
 * - Reuses the UserDetails component in "view" mode.
 */
const ViewUser = () => {
    const { id } = useParams(); // Retrieve the user ID from the URL parameters
    const navigate = useNavigate(); // Initialize navigate function for programmatic navigation
    const { fetchUserById } = useUserApi(); // Hook for user-related API operations

    const [userData, setUserData] = useState(null); // Local state to hold the user data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    // Fetch user data by ID when the component mounts or when the ID changes
    useEffect(() => {
        const loadUserData = async () => {
            try {
                setLoading(true);
                const user = await fetchUserById(id); // Fetch user data
                setUserData(user); // Set the user data in state
            } catch (err) {
                setError(err); // Set error state if the API call fails
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadUserData();
        }
    }, [id, fetchUserById]);

    // Handle loading state
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle error state
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error.message || 'Failed to load user data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="User Details">
            {userData ? (
                <UserDetails user={userData} mode="view" />
            ) : (
                <Typography>No user data found</Typography>
            )}
            {/* Navigation button to return to the user list */}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/access/users/list')} // Use navigate function to go back to user list
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

export default ViewUser;
