import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useTenantApi from '../hooks/useTenantApi';
import CustomToolbar from '/src/features/common/components/CustomToolbar';
import ConfirmDialog from '/src/features/common/components/ConfirmDialog';

const TenantList = () => {
    const navigate = useNavigate();
    const { fetchTenants, deactivateTenant, deleteTenant, downloadTenantTemplate, uploadTenantFile } = useTenantApi();
    const [tenants, setTenants] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);
    const [filterModel, setFilterModel] = useState({ items: [] });
    const [confirmModal, setConfirmModal] = useState(null);

    useEffect(() => {
        const loadTenants = async () => {
            try {
                setLoading(true);
                const filters = filterModel.items.reduce((acc, filterItem) => {
                    if (filterItem.value) {
                        acc[filterItem.field] = filterItem.value;
                    }
                    return acc;
                }, {});
    
                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                    ...filters,
                };
    
                const { data, total: fetchedTotal } = await fetchTenants(queryParams);
                setTenants(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch tenants:', error);
            } finally {
                setLoading(false);
            }
        };
    
        loadTenants();
    }, [paginationModel, sortModel, filterModel, fetchTenants]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'country', headerName: 'Country', flex: 0.8, minWidth: 100 },
        { field: 'state', headerName: 'State', flex: 0.8, minWidth: 100 },
        { field: 'city', headerName: 'City', flex: 0.8, minWidth: 100 },
        { field: 'pincode', headerName: 'Pincode', flex: 0.8, minWidth: 100 },
        { field: 'address', headerName: 'Address', flex: 1.5, minWidth: 200 },
        { field: 'latitude', headerName: 'Latitude', flex: 0.8, minWidth: 100 },
        { field: 'longitude', headerName: 'Longitude', flex: 0.8, minWidth: 100 },
        { field: 'description', headerName: 'Description', flex: 2, minWidth: 300 },
        {
            field: 'logo_url',
            headerName: 'Logo',
            flex: 0.7,
            minWidth: 100,
            renderCell: (params) => (
                <img
                    src={params.value ? `${import.meta.env.VITE_BACKEND_API_URL}${params.value}` : 'path/to/default/image'}
                    alt="logo"
                    style={{ width: '16px', height: '16px' }}
                />
            ),
        },
        { field: 'created_by', headerName: 'Created By', flex: 0.8, minWidth: 70 },
        { field: 'updated_by', headerName: 'Updated By', flex: 0.8, minWidth: 70 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 },
    ];

    // Handle row selection
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

    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the tenant with ID ${selectedRows[0]}?`,
            });
        } else {
            console.warn('Please select a single row to deactivate.');
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the tenant with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        } else {
            console.warn('Please select a single row to delete.');
        }
    };

    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                const response = await deactivateTenant(confirmModal.id);
                console.log(`Tenant with ID ${confirmModal.id} deactivated successfully.`, response);
            } else if (confirmModal.action === 'delete') {
                const response = await deleteTenant(confirmModal.id);
                console.log(`Tenant with ID ${confirmModal.id} deleted successfully.`, response);
            }
            setConfirmModal(null); // Close the modal
            setSelectedRows([]); // Reset selected rows
            // Refresh the list after the action
            const { data, total: fetchedTotal } = await fetchTenants({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
            });
            setTenants(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => {
        setConfirmModal(null);
    };

    const handleDownloadTemplate = async () => {
        try {
            const response = await downloadTenantTemplate();
            const url = window.URL.createObjectURL(new Blob([response]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'tenant_template.xlsx'); // Use a specific file name
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Failed to download tenant template:', error);
        }
    };

    const handleImport = async () => {
        console.log('Import tenants data');
    };

    const handleExport = async () => {
        console.log('Export tenants data');
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={tenants || []}
                    paginationMode="server"
                    sortingMode="server"
                    filterMode="server"
                    rowCount={total}
                    loading={loading}
                    pageSizeOptions={[5, 10, 20]}
                    pageSize={paginationModel.pageSize}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={setSortModel}
                    onFilterModelChange={(newFilterModel) => setFilterModel(newFilterModel)}
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    slots={{
                        toolbar: CustomToolbar,
                    }}
                    slotProps={{
                        toolbar: {
                            onView: handleView,
                            onEdit: handleEdit,
                            onDeactivate: handleDeactivate,
                            onDelete: handleDelete,
                            hasSelection: selectedRows.length > 0,
                            onCreate: handleCreate,
                            onDownloadTemplate: handleDownloadTemplate,
                            onImport: handleImport,
                            onExport: handleExport,
                        },
                    }}
                />
            </Box>
            {confirmModal && (
                <ConfirmDialog
                    open={Boolean(confirmModal)}
                    onClose={handleCloseModal}
                    onConfirm={confirmAction}
                    title="Confirmation"
                    message={confirmModal.message}
                />
            )}
        </MainCard>
    );
};

export default TenantList;
