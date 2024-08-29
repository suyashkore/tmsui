// tmsui/src/features/offices/components/OfficeList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useOfficeApi from '../hooks/useOfficeApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal';

const OfficeList = () => {
    const navigate = useNavigate();
    const { fetchOffices, deactivateOffice, deleteOffice, downloadOfficeTemplate, exportOffices, importOffices } = useOfficeApi();

    // State variables for managing offices data, pagination, sorting, and filters
    const [offices, setOffices] = useState([]);
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
     * Function to load offices based on pagination, sorting, and filters.
     */
    useEffect(() => {
        const loadOffices = async () => {
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

                // Fetch offices based on the query parameters
                const { data, total: fetchedTotal } = await fetchOffices(queryParams);
                setOffices(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch offices:', error);
            } finally {
                setLoading(false);
            }
        };

        loadOffices();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchOffices]);

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
        { field: 'code', headerName: 'Code', flex: 0.8, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'company_tag', headerName: 'Company Tag', flex: 1, minWidth: 150 },
        { field: 'o_type', headerName: 'Type', flex: 0.8, minWidth: 100 },
        { field: 'pincode', headerName: 'Pincode', flex: 0.8, minWidth: 100 },
        { field: 'address', headerName: 'Address', flex: 1.5, minWidth: 200 },
        { field: 'latitude', headerName: 'Latitude', flex: 0.8, minWidth: 100 },
        { field: 'longitude', headerName: 'Longitude', flex: 0.8, minWidth: 100 },
        {
            field: 'logo_url',
            headerName: 'Logo',
            flex: 0.7,
            minWidth: 100,
            renderCell: (params) => (
                <img
                    src={params.value ? `${import.meta.env.VITE_BACKEND_API_URL}${params.value}?t=${new Date().getTime()}` : 'path/to/default/image'}
                    alt="logo"
                    style={{ width: '16px', height: '16px' }}
                />
            ),
        },
        { field: 'created_by', headerName: 'Created By', flex: 0.8, minWidth: 70 },
        { field: 'updated_by', headerName: 'Updated By', flex: 0.8, minWidth: 70 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 }
    ];

    // Handle row selection for various actions like view, edit, delete
    const handleRowSelection = (selection) => setSelectedRows(selection);

    // Navigation handlers for create, view, edit actions
    const handleCreate = () => navigate('/md/org/offices/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/org/offices/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/org/offices/edit/id/${selectedRows[0]}`);

    const reloadOfficeList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchOffices({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters() // Combine column and advanced filters if any
            });
            setOffices(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload office list:', error);
        }
    };

    // Handlers for deactivation and deletion with confirmation dialogs
    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the office with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the office with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    // Confirm and execute the action (deactivate or delete)
    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateOffice(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteOffice(confirmModal.id);
            }
            setConfirmModal(null); // Close the modal
            setSelectedRows([]); // Reset selected rows
            reloadOfficeList(); // Refresh the list after the action
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    // Handler for downloading template
    const handleDownloadTemplate = async () => {
        try {
            await downloadOfficeTemplate(); // The updated function in OfficeApi.js handles the download directly
        } catch (error) {
            console.error('Failed to download office template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true); // Open the import modal

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadOfficeList(); // Reload offices after closing the modal
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
            await exportOffices(queryParams);
        } catch (error) {
            console.error('Failed to export offices:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                {/* Advanced Filter component */}
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />

                {/* DataGrid component for office list */}
                <DataGrid
                    columns={columns}
                    rows={offices || []}
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
                onImport={importOffices} // Pass the office import function
                importTitle="Import Offices" // Optional: Customize the title
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

export default OfficeList;
