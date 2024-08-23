import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import { DataGrid, GridToolbarColumnsButton } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BlockIcon from '@mui/icons-material/Block';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility'; // New icon for view action
import { IconUpload, IconDownload } from '@tabler/icons-react';
import { useDispatch, useSelector } from 'store';
import { getTenants } from 'store/slices/tenant';
import MainCard from 'ui-component/cards/MainCard';

function CustomToolbar({ onView, onEdit, onDisable, onDelete, hasSelection, onCreate, onImport, onExport }) {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <GridToolbarColumnsButton />

                <Tooltip title="Create New">
                    <IconButton color="primary" onClick={onCreate}>
                        <AddIcon />
                    </IconButton>
                </Tooltip>

                {/* View Action */}
                <Tooltip title="View Selected">
                    <span>
                        <IconButton
                            color="primary"
                            onClick={onView}
                            disabled={!hasSelection}
                        >
                            <VisibilityIcon />
                        </IconButton>
                    </span>
                </Tooltip>

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

                <Tooltip title="Import">
                    <IconButton color="primary" onClick={onImport}>
                        <IconUpload />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Export">
                    <IconButton color="primary" onClick={onExport}>
                        <IconDownload />
                    </IconButton>
                </Tooltip>
            </Box>
        </Box>
    );
}

const ListTenants = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { tenants, total, loading } = useSelector((state) => state.tenant);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);

    useEffect(() => {
        const queryParams = {
            page: paginationModel.page + 1, // Backend expects 1-based page index
            per_page: paginationModel.pageSize,
            sort_by: sortModel[0]?.field || 'updated_at',
            sort_order: sortModel[0]?.sort || 'desc',
        };

        dispatch(getTenants(queryParams));
    }, [dispatch, paginationModel, sortModel]);

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
                    src={params.value ? `http://localhost:8000${params.value}` : 'path/to/default/image'}
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

    const handleCreate = () => {
        navigate('/md/org/tenants/create');
    };

    const handleView = () => {
        if (selectedRows.length === 1) {
            navigate(`/md/org/tenants/view/id/${selectedRows[0]}`);
        } else {
            console.warn('Please select a single row to view.');
        }
    };

    const handleEdit = () => {
        if (selectedRows.length === 1) {
            navigate(`/md/org/tenants/edit/id/${selectedRows[0]}`);
        } else {
            console.warn('Please select a single row to edit.');
        }
    };

    const handleDisable = () => {
        console.log('Disable selected rows:', selectedRows);
    };

    const handleDelete = () => {
        console.log('Delete selected rows:', selectedRows);
    };

    const handleImport = () => {
        console.log('Import tenants data');
    };

    const handleExport = () => {
        console.log('Export tenants data');
    };

    return (
        <MainCard content={false}>
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
                    rows={tenants.data || []} // Make sure rows are passed as an array
                    paginationMode="server"
                    sortingMode="server"
                    filterMode="server"
                    rowCount={total} // This is crucial for server-side pagination
                    loading={loading} 
                    pageSizeOptions={[5, 10, 20]} 
                    pageSize={paginationModel.pageSize}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={setSortModel}
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            onView: handleView, // Pass view handler
                            onEdit: handleEdit,
                            onDisable: handleDisable,
                            onDelete: handleDelete,
                            hasSelection: selectedRows.length > 0,
                            onCreate: handleCreate,
                            onImport: handleImport,
                            onExport: handleExport,
                        },
                    }}
                />
            </Box>
        </MainCard>
    );
};

export default ListTenants;
