// tmsui/src/features/companies/components/CompanyList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useCompanyApi from '../hooks/useCompanyApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal'; // Import the common modal

/**
 * CompanyList Component
 * - Displays a list of companies with filtering, sorting, and pagination features.
 * - Provides actions for creating, viewing, editing, deactivating, and deleting companies.
 */
const CompanyList = () => {
    const navigate = useNavigate();
    const { fetchCompanies, deactivateCompany, deleteCompany, downloadCompanyTemplate, exportCompanies, importCompanies } = useCompanyApi();

    // State variables for managing companies data, pagination, sorting, and filters
    const [companies, setCompanies] = useState([]);
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
     * Function to load companies based on pagination, sorting, and filters.
     */
    useEffect(() => {
        const loadCompanies = async () => {
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

                // Fetch companies based on the query parameters
                const { data, total: fetchedTotal } = await fetchCompanies(queryParams);
                setCompanies(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch companies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadCompanies();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchCompanies]);

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
        { field: 'code', headerName: 'Code', flex: 1, minWidth: 100 },
        { field: 'name', headerName: 'Name', flex: 1.5, minWidth: 150 },
        { field: 'address', headerName: 'Address', flex: 2, minWidth: 200 },
        { field: 'cin_num', headerName: 'CIN Number', flex: 1, minWidth: 150 },
        { field: 'pan_num', headerName: 'PAN Number', flex: 1, minWidth: 150 },
        { field: 'gst_num', headerName: 'GST Number', flex: 1, minWidth: 150 },
        { field: 'created_by', headerName: 'Created By', flex: 0.8, minWidth: 70 },
        { field: 'updated_by', headerName: 'Updated By', flex: 0.8, minWidth: 70 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 }
    ];

    // Handle row selection for various actions like view, edit, delete
    const handleRowSelection = (selection) => setSelectedRows(selection);

    // Navigation handlers for create, view, edit actions
    const handleCreate = () => navigate('/md/org/companies/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/org/companies/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/org/companies/edit/id/${selectedRows[0]}`);

    const reloadCompanyList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchCompanies({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters() // Combine column and advanced filters if any
            });
            setCompanies(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload company list:', error);
        }
    };    

    // Handlers for deactivation and deletion with confirmation dialogs
    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the company with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the company with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    // Confirm and execute the action (deactivate or delete)
    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateCompany(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteCompany(confirmModal.id);
            }
            setConfirmModal(null); // Close the modal
            setSelectedRows([]); // Reset selected rows
            reloadCompanyList(); // Refresh the list after the action
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    // Handler for downloading template
    const handleDownloadTemplate = async () => {
        try {
            await downloadCompanyTemplate(); // The updated function in CompanyApi.js handles the download directly
        } catch (error) {
            console.error('Failed to download company template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true); // Open the import modal

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadCompanyList(); // Reload companies after closing the modal
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
            await exportCompanies(queryParams);
        } catch (error) {
            console.error('Failed to export companies:', error);
        }
    };    

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                {/* Advanced Filter component */}
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />
                
                {/* DataGrid component for company list */}
                <DataGrid
                    columns={columns}
                    rows={companies || []}
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
                onImport={importCompanies} // Pass the company import function
                importTitle="Import Companies" // Optional: Customize the title
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

export default CompanyList;
