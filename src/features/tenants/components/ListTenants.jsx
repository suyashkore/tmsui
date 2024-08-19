import React from 'react';

// material-ui
import Box from '@mui/material/Box';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';

// project imports
import MainCard from 'ui-component/cards/MainCard';
import { useDispatch, useSelector } from 'store';
import { getTenants } from 'store/slices/tenant';

const ListTenants = () => {
    const dispatch = useDispatch();
    const { tenants, error } = useSelector((state) => state.tenant);
    const [rows, setRows] = React.useState([]);

    // Log the tenants data to ensure it is being fetched correctly
    React.useEffect(() => {
        dispatch(getTenants());
    }, [dispatch]);

    // Log the tenants data structure
    React.useEffect(() => {
        console.log('Tenants Data:', tenants); // Check if the data is populated correctly

        if (tenants && tenants.data) {
            const mappedRows = tenants.data.map((tenant) => ({
                id: tenant.id,
                name: tenant.name,
                country: tenant.country,
                state: tenant.state,
                city: tenant.city,
                address: tenant.address,
                pincode: tenant.pincode,
                description: tenant.description,
            }));

            setRows(mappedRows);
        } else {
            console.log('No tenants data available');
        }
    }, [tenants]);

    // Log any errors that occur
    React.useEffect(() => {
        if (error) {
            console.error('Error fetching tenants:', error);
        }
    }, [error]);

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
                        { field: 'name', headerName: 'Name', width: 200 },
                        { field: 'country', headerName: 'Country', width: 150 },
                        { field: 'state', headerName: 'State', width: 150 },
                        { field: 'city', headerName: 'City', width: 150 },
                        { field: 'address', headerName: 'Address', width: 300 },
                        { field: 'pincode', headerName: 'Pincode', width: 120 },
                        { field: 'description', headerName: 'Description', width: 400 },
                    ]}
                    autoHeight
                    pagination
                    pageSizeOptions={[5, 10, 25]}
                    rowCount={tenants.total || 0} // Set the total row count based on the response
                    paginationMode="server"
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    slots={{ toolbar: GridToolbar }}
                    hideFooterSelectedRowCount
                    onPaginationModelChange={(newPagination) => {
                        dispatch(getTenants(newPagination.page));
                    }}
                />
            </Box>
        </MainCard>
    );
};

export default ListTenants;
