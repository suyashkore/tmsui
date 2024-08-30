// tmsui/src/features/users/components/UserList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useUserApi from '../hooks/useUserApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal'; // Import the common modal

const UserList = () => {
    const navigate = useNavigate();
    const { fetchUsers, deactivateUser, deleteUser, downloadUserTemplate, exportUsers, importUsers } = useUserApi();

    // State variables for managing users data, pagination, sorting, and filters
    const [users, setUsers] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);
    const [columnFilters, setColumnFilters] = useState({});
    const [advancedFilters, setAdvancedFilters] = useState({});
    const [confirmModal, setConfirmModal] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);

    /**
     * Function to apply filters from the AdvancedFilter component.
     * @param {Object} filterValues - The filter values from the AdvancedFilter component.
     */
    const applyAdvancedFilters = (filterValues) => {
        const cleanedFilters = Object.fromEntries(
            Object.entries(filterValues).filter(([key, value]) => value !== '' && value != null)
        );
        setAdvancedFilters(cleanedFilters);
    };

    /**
     * Function to clear advanced filters.
     */
    const clearAdvancedFilters = () => {
        setAdvancedFilters({});
    };

    /**
     * Function to combine column filters and advanced filters for the API query.
     * @returns {Object} - The combined filters.
     */
    const getCombinedFilters = () => {
        return { ...columnFilters, ...advancedFilters };
    };

    /**
     * Function to load users based on pagination, sorting, and filters.
     */
    useEffect(() => {
        const loadUsers = async () => {
            try {
                setLoading(true);

                // Prepare query parameters by combining pagination, sorting, and filters
                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                    ...getCombinedFilters(), // Combine both column filters and advanced filters
                };

                // Fetch users based on the query parameters
                const { data, total: fetchedTotal } = await fetchUsers(queryParams);
                setUsers(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        loadUsers();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchUsers]);

    /**
     * Function to handle changes in column filters from the DataGrid component.
     * @param {Object} model - The filter model from DataGrid.
     */
    const handleColumnFilterChange = (model) => {
        const filterValues = model.items.reduce((acc, item) => {
            if (item.value !== null && item.value !== '') {
                acc[item.field] = item.value;
            }
            return acc;
        }, {});
        setColumnFilters(filterValues);
    };

    // Define the columns for the DataGrid
    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'login_id', headerName: 'Login ID', flex: 1, minWidth: 150 },
        { field: 'mobile', headerName: 'Mobile', flex: 0.8, minWidth: 120 },
        { field: 'email', headerName: 'Email', flex: 1.2, minWidth: 200 },
        { field: 'user_type', headerName: 'User Type', flex: 0.8, minWidth: 120 },
        { field: 'role_name', headerName: 'Role', flex: 1, minWidth: 150 },
        { field: 'privileges', headerName: 'Privileges', flex: 2, minWidth: 200, renderCell: (params) => params.value.join(', ') },
        { field: 'job_title', headerName: 'Job Title', flex: 1, minWidth: 150 },
        { field: 'department', headerName: 'Department', flex: 1, minWidth: 150 },
        { field: 'aadhaar', headerName: 'Aadhaar', flex: 1, minWidth: 150 },
        { field: 'pan', headerName: 'PAN', flex: 1, minWidth: 150 },
        { field: 'epf_uan', headerName: 'EPF UAN', flex: 1, minWidth: 150 },
        { field: 'epf_num', headerName: 'EPF Number', flex: 1, minWidth: 150 },
        { field: 'esic', headerName: 'ESIC', flex: 1, minWidth: 150 },
        { field: 'last_login', headerName: 'Last Login', flex: 1.2, minWidth: 180 },
        { field: 'last_password_reset', headerName: 'Last Password Reset', flex: 1.2, minWidth: 180 },
        { field: 'failed_login_attempts', headerName: 'Failed Logins', flex: 0.8, minWidth: 100 },
        { field: 'active', headerName: 'Active', flex: 0.8, minWidth: 100 },
        { field: 'remarks', headerName: 'Remarks', flex: 1.5, minWidth: 250 },
        { field: 'created_by', headerName: 'Created By', flex: 0.8, minWidth: 100 },
        { field: 'updated_by', headerName: 'Updated By', flex: 0.8, minWidth: 100 },
        { field: 'created_at', headerName: 'Created At', flex: 1.2, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1.2, minWidth: 180 },
    ];

    // Handle row selection for various actions like view, edit, delete
    const handleRowSelection = (selection) => setSelectedRows(selection);

    // Navigation handlers for create, view, edit actions
    const handleCreate = () => navigate('/md/access/users/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/access/users/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/access/users/edit/id/${selectedRows[0]}`);

    const reloadUserList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchUsers({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters() // Combine column and advanced filters if any
            });
            setUsers(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload user list:', error);
        }
    };

    // Handlers for deactivation and deletion with confirmation dialogs
    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the user with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the user with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    // Confirm and execute the action (deactivate or delete)
    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateUser(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteUser(confirmModal.id);
            }
            setConfirmModal(null); // Close the modal
            setSelectedRows([]); // Reset selected rows
            reloadUserList(); // Refresh the list after the action
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    // Handler for downloading template
    const handleDownloadTemplate = async () => {
        try {
            await downloadUserTemplate(); // The updated function in UserApi.js handles the download directly
        } catch (error) {
            console.error('Failed to download user template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true); // Open the import modal

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadUserList(); // Reload users after closing the modal
    };

    const handleExport = async () => {
        try {
            // Gather all current query parameters for export
            const queryParams = {
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters(), // Combine column filters and advanced filters
            };

            // Call the export function with the current query parameters
            await exportUsers(queryParams);
        } catch (error) {
            console.error('Failed to export users:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                {/* Advanced Filter component */}
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />

                {/* DataGrid component for user list */}
                <DataGrid
                    columns={columns}
                    rows={users || []}
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
                    onFilterModelChange={handleColumnFilterChange} // Handle column filter changes
                    checkboxSelection
                    onRowSelectionModelChange={handleRowSelection}
                    slots={{ toolbar: CustomToolbar }}
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

            <ImportXlsxModal
                open={importModalOpen}
                onClose={handleImportModalClose}
                onImport={importUsers} // Pass the user import function
                importTitle="Import Users" // Optional: Customize the title
            />

            {/* Confirmation Dialog for actions */}
            {confirmModal && (
                <ConfirmDialog
                    open={!!confirmModal}
                    message={confirmModal.message}
                    onConfirm={confirmAction}
                    onClose={handleCloseModal}
                />
            )}
        </MainCard>
    );
};

export default UserList;
