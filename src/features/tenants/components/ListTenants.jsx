import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridToolbarColumnsButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';


import { useDispatch, useSelector } from 'store';
import { getTenants } from 'store/slices/tenant';
import MainCard from 'ui-component/cards/MainCard';

// Custom Toolbar Component
function CustomToolbar({ onEdit, onDisable, onDelete, hasSelection }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GridToolbarColumnsButton />

                {/* Edit Action */}
                <Tooltip title="Edit Selected">
                    <span>
                        <IconButton
                            color="primary"
                            onClick={onEdit}
                            disabled={!hasSelection}
                        >
                            <EditIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                {/* Disable Action */}
                <Tooltip title="Disable Selected">
                    <span>
                        <IconButton
                            color="secondary"
                            onClick={onDisable}
                            disabled={!hasSelection}
                        >
                            <BlockIcon />
                        </IconButton>
                    </span>
                </Tooltip>

                {/* Delete Action */}
                <Tooltip title="Delete Selected">
                    <span>
                        <IconButton
                            color="error"
                            onClick={onDelete}
                            disabled={!hasSelection}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </span>
                </Tooltip>
            </Box>
        </Box>
    );
}

const ListTenants = () => {
    const dispatch = useDispatch();
    const { tenants, total, loading } = useSelector((state) => state.tenant);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({
        name: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        active: '',
    });

    useEffect(() => {
        const queryParams = {
            page: paginationModel.page + 1,
            per_page: paginationModel.pageSize,
            sort_by: sortModel[0]?.field || 'updated_at',
            sort_order: sortModel[0]?.sort || 'desc',
            ...filterModel,
        };

        dispatch(getTenants(queryParams));
    }, [dispatch, paginationModel, sortModel, filterModel]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'name', headerName: 'Name', width: 150 },
        { field: 'country', headerName: 'Country', width: 100 },
        { field: 'state', headerName: 'State', width: 100 },
        { field: 'city', headerName: 'City', width: 100 },
        { field: 'pincode', headerName: 'Pincode', width: 100 },
        { field: 'address', headerName: 'Address', width: 200 },
        { field: 'latitude', headerName: 'Latitude', width: 100 },
        { field: 'longitude', headerName: 'Longitude', width: 100 },
        { field: 'description', headerName: 'Description', width: 300 },
        {
            field: 'logo_url',
            headerName: 'Logo',
            width: 100,
            renderCell: (params) => (
                <img
                    src={`http://localhost:8000${params.value}`}
                    alt="logo"
                    style={{ width: '16px', height: '16px' }}
                />
            )
        },
        { field: 'created_by', headerName: 'Created By', width: 70 },
        { field: 'updated_by', headerName: 'Updated By', width: 70 },
        { field: 'created_at', headerName: 'Created At', width: 180 },
        { field: 'updated_at', headerName: 'Updated At', width: 180 },
    ];

    const handleRowSelection = (selection) => {
        setSelectedRows(selection);
    };

    const handleEdit = () => {
        console.log('Edit selected rows:', selectedRows);
    };

    const handleDisable = () => {
        console.log('Disable selected rows:', selectedRows);
    };

    const handleDelete = () => {
        console.log('Delete selected rows:', selectedRows);
    };

    return (
        <MainCard
            content={false}
        >
            <Box sx={{ 
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
                            bgcolor: 'primary.main'
                        }
                    }
                }
            }}>
                <DataGrid
                    columns={columns}
                    rows={tenants.data || []} // Ensure the rows are passed as an array
                    paginationMode="server"
                    sortingMode="server"
                    filterMode="server"
                    rowCount={total} // This is crucial for server-side pagination
                    loading={loading}
                    pageSize={paginationModel.pageSize}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={setSortModel}
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    slots={{
                        toolbar: CustomToolbar, // Use the custom toolbar
                    }}
                    slotProps={{
                        toolbar: {
                            onEdit: handleEdit,
                            onDisable: handleDisable,
                            onDelete: handleDelete,
                            hasSelection: selectedRows.length > 0,
                        },
                    }}
                />
            </Box>
        </MainCard>
    );
};

export default ListTenants;
