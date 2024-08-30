// tmsui/src/features/users/containers/ViewPrivilege.jsx

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Box, Stack, Button, Typography } from '@mui/material';
import PrivilegeDetails from '../components/PrivilegeDetails';
import MainCard from 'ui-component/cards/MainCard';
import AnimateButton from 'ui-component/extended/AnimateButton';
import usePrivilegeApi from '../hooks/usePrivilegeApi';

/**
 * ViewPrivilege Container
 * - Displays the details of a specific privilege based on the ID passed in the URL.
 */
const ViewPrivilege = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { fetchPrivilegeById } = usePrivilegeApi();

    const [privilegeData, setPrivilegeData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadPrivilegeData = async () => {
            try {
                setLoading(true);
                const privilege = await fetchPrivilegeById(id);
                setPrivilegeData(privilege);
            } catch (err) {
                setError(err);
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
                <Typography color="error">{error.message || 'Failed to load privilege data'}</Typography>
            </Box>
        );
    }

    return (
        <MainCard title="Privilege Details">
            {privilegeData ? (
                <PrivilegeDetails privilege={privilegeData} mode="view" />
            ) : (
                <Typography>No privilege data found</Typography>
            )}
            <Stack direction="row" justifyContent="flex-end" sx={{ mt: 3 }}>
                <AnimateButton>
                    <Button
                        onClick={() => navigate('/md/access/privileges/list')}
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

export default ViewPrivilege;
