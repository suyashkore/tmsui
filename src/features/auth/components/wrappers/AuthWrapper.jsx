// material-ui
import { styled } from '@mui/material/styles';

// project imports
import { ThemeMode } from 'config';

// ==============================|| AUTHENTICATION WRAPPER ||============================== //

const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.mode === ThemeMode.DARK ? theme.palette.background.default : theme.palette.grey[100],
    minHeight: '100vh'
}));

export default AuthWrapper;
