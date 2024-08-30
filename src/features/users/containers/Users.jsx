// tmsui/src/features/users/containers/Users.jsx

// material-ui
import Grid from '@mui/material/Grid';

// project import
import UserList from '../components/UserList';
import { gridSpacing } from 'store/constant';

// ==============================|| USERS LIST CONTAINER ||============================== //

export default function Users() {
    return (
        <Grid container spacing={gridSpacing}>
            <Grid item xs={12}>
                <UserList />
            </Grid>
        </Grid>
    );
}
