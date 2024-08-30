// tmsui/src/features/users/containers/EditPrivilege.jsx

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PrivilegeStepper from '../components/PrivilegeStepper';
import usePrivilegeApi from '../hooks/usePrivilegeApi';
import { CircularProgress, Box, Typography } from '@mui/material';

/**
 * EditPrivilege Container
 * - Handles the editing of privilege data.
 */
const EditPrivilege = () => {
    const { id } = useParams();
    const { fetchPrivilegeById } = usePrivilegeApi();
    const [privilegeData, setPrivilegeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPrivilegeData = async () => {
            try {
                const privilege = await fetchPrivilegeById(id);
                setPrivilegeData(privilege);
            } catch (err) {
                setError('Failed to load privilege data');
            } finally {
                setLoading(false);
            }
        };

        if (id) {
            loadPrivilegeData();
        }
    }, [id, fetchPrivilegeById]);

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

    if (!privilegeData) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography>Loading privilege data...</Typography>
            </Box>
        );
    }

    return (
        <PrivilegeStepper
            initialPrivilegeData={privilegeData}
            isEditMode={true}
        />
    );
};

export default EditPrivilege;
