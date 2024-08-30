// tmsui/src/features/users/containers/EditUser.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UserStepper from '../components/UserStepper';
import useUserApi from '../hooks/useUserApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditUser Component
 * - This component handles the editing of user data.
 * - It fetches user data based on the user ID provided in the URL and initializes the form in edit mode.
 */
const EditUser = () => {
    const { id } = useParams(); // Extract user ID from the URL parameters
    const { fetchUserById } = useUserApi(); // Custom hook to handle user API calls
    const [userData, setUserData] = useState(null); // State to store the fetched user data
    const [loading, setLoading] = useState(true); // State to manage loading status
    const [error, setError] = useState(null); // State to handle any errors

    /**
     * useEffect Hook
     * - Fetches user data when the component mounts or when the user ID changes.
     */
    useEffect(() => {
        const loadUserData = async () => {
            try {
                const user = await fetchUserById(id); // Fetch user data by ID
                setUserData(user); // Store the fetched data
            } catch (err) {
                setError('Failed to load user data'); // Handle any errors during fetch
            } finally {
                setLoading(false); // Ensure loading state is disabled after data is fetched
            }
        };

        if (id) {
            loadUserData(); // Trigger user data fetch if ID is available
        }
    }, [id, fetchUserById]); // Dependency array ensures this runs when ID or API hook changes

    // Handle the loading state while fetching data
    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle any errors during data fetch
    if (error) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    // Ensure the form does not render until user data is fully loaded
    if (!userData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading user data...</Typography>
            </Box>
        );
    }

    return (
        <UserStepper
            initialUserData={userData} // Pass the fetched user data as the initial form values
            isEditMode={true} // Indicate that the form is in edit mode
        />
    );
};

export default EditUser;
