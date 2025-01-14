import { Link } from 'react-router-dom';
import React, { useEffect } from 'react';

// material-ui
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

// project imports
import AuthWrapper from '../components/wrappers/AuthWrapper';
import AuthCardWrapper from '../components/wrappers/AuthCardWrapper';
import AuthLogin from '../components/forms/AuthLogin';
import { Logo64 } from 'ui-component/Logo';
import AuthFooter from 'ui-component/cards/AuthFooter';
import { useDispatch } from 'store';
import { openSnackbar } from 'store/slices/snackbar';

// assets

// ================================|| AUTH - LOGIN ||================================ //

const Login = () => {
    const downMD = useMediaQuery((theme) => theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    useEffect(() => {
        // Retrieve and decode the logout message if it exists
        const message = sessionStorage.getItem('logoutMessage');
        if (message) {
            dispatch(openSnackbar({
                open: true,
                message,
                anchorOrigin: { vertical: 'top', horizontal: 'center' },
                autoHideDuration: 15000
            }));
    
            // Clear the message from sessionStorage after showing it
            sessionStorage.removeItem('logoutMessage');
        }
    }, [dispatch]);

    return (
        <AuthWrapper>
            <Grid container direction="column" justifyContent="flex-end" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12}>
                    <Grid container justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100vh - 68px)' }}>
                        <Grid item sx={{ m: { xs: 1, sm: 3 }, mb: 0 }}>
                            <AuthCardWrapper>
                                <Grid container spacing={2} alignItems="center" justifyContent="center">
                                    <Grid item sx={{ mb: 3 }}>
                                        <Link to="#" aria-label="logo">
                                            <Logo64 />
                                        </Link>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Grid
                                            container
                                            direction={{ xs: 'column-reverse', md: 'row' }}
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <Grid item>
                                                <Stack alignItems="center" justifyContent="center" spacing={1}>
                                                    <Typography color="secondary.main" gutterBottom variant={downMD ? 'h3' : 'h2'}>
                                                        Hi, Welcome to TMS
                                                    </Typography>
                                                    <Typography
                                                        variant="caption"
                                                        fontSize="16px"
                                                        textAlign={{ xs: 'center', md: 'inherit' }}
                                                    >
                                                        Enter your credentials to continue
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <AuthLogin />
                                    </Grid>
                                </Grid>
                            </AuthCardWrapper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </AuthWrapper>
    );
};

export default Login;
