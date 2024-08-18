import React from 'react'; // <-- Add this import

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getTenants } from 'store/slices/tenant';

const TenantsList = () => {
    const dispatch = useDispatch();
    const { tenants } = useSelector((state) => state.tenant);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        dispatch(getTenants());
    }, [dispatch]);

    React.useEffect(() => {
        setRows(tenants);
    }, [tenants]);

    return (
        <MainCard content={false} title="Search Tenants">
            <Box
                sx={{
                    width: '100%',
                    '& .MuiDataGrid-root': {
                        '& .MuiDataGrid-toolbarContainer': {
                            pl: 3,
                            pr: 2,
                            pt: 2,
                            '& .MuiButton-root': {
                                p: 1,
                                color: 'common.white',
                                borderRadius: 1.5,
                                bgcolor: 'primary.main',
                            },
                        },
                    },
                }}
            >
                <DataGrid
                    rows={rows}
                    columns={[
                        { field: 'id', headerName: 'ID', width: 70 },
                        { field: 'name', headerName: 'Name', width: 150 },
                        // Add more columns as needed
                    ]}
                    autoHeight
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    hideFooterSelectedRowCount
                />
            </Box>
        </MainCard>
    );
};

export default TenantsList;