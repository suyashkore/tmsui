// tmsui/src/features/vendors/components/VendorList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useVendorApi from '../hooks/useVendorApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal';

const VendorList = () => {
    const navigate = useNavigate();
    const { fetchVendors, deactivateVendor, deleteVendor, downloadVendorTemplate, exportVendors, importVendors } = useVendorApi();

    const [vendors, setVendors] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);
    const [columnFilters, setColumnFilters] = useState({});
    const [advancedFilters, setAdvancedFilters] = useState({});
    const [confirmModal, setConfirmModal] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);

    const applyAdvancedFilters = (filterValues) => {
        const cleanedFilters = Object.fromEntries(
            Object.entries(filterValues).filter(([key, value]) => value !== '' && value != null)
        );
        setAdvancedFilters(cleanedFilters);
    };

    const clearAdvancedFilters = () => {
        setAdvancedFilters({});
    };

    const getCombinedFilters = () => {
        return { ...columnFilters, ...advancedFilters };
    };

    useEffect(() => {
        const loadVendors = async () => {
            try {
                setLoading(true);

                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                    ...getCombinedFilters(),
                };

                const { data, total: fetchedTotal } = await fetchVendors(queryParams);
                setVendors(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch vendors:', error);
            } finally {
                setLoading(false);
            }
        };

        loadVendors();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchVendors]);

    const handleColumnFilterChange = (model) => {
        const filterValues = model.items.reduce((acc, item) => {
            if (item.value !== null && item.value !== '') {
                acc[item.field] = item.value;
            }
            return acc;
        }, {});
        setColumnFilters(filterValues);
    };

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
        { field: 'code', headerName: 'Code', flex: 1, minWidth: 150 },
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'v_type', headerName: 'Vendor Type', flex: 1, minWidth: 150 },
        { field: 'mobile', headerName: 'Mobile', flex: 1, minWidth: 150 },
        { field: 'contracting_office_id', headerName: 'Contracting Office ID', flex: 1, minWidth: 150 },
        { field: 'active', headerName: 'Active', flex: 1, minWidth: 100, type: 'boolean' },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 150 },
        { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 100 },
        { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 100 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 },
    ];

    const handleRowSelection = (selection) => setSelectedRows(selection);

    const handleCreate = () => navigate('/md/ext/org/vendors/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/ext/org/vendors/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/ext/org/vendors/edit/id/${selectedRows[0]}`);

    const reloadVendorList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchVendors({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters()
            });
            setVendors(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload vendor list:', error);
        }
    };

    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the vendor with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the vendor with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateVendor(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteVendor(confirmModal.id);
            }
            setConfirmModal(null);
            setSelectedRows([]);
            reloadVendorList();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    const handleDownloadTemplate = async () => {
        try {
            await downloadVendorTemplate();
        } catch (error) {
            console.error('Failed to download vendor template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true);

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadVendorList();
    };

    const handleExport = async () => {
        try {
            const queryParams = {
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters(),
            };

            await exportVendors(queryParams);
        } catch (error) {
            console.error('Failed to export vendors:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />

                <DataGrid
                    columns={columns}
                    rows={vendors || []}
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
                    onFilterModelChange={handleColumnFilterChange}
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
                onImport={importVendors}
                importTitle="Import Vendors"
            />

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

export default VendorList;
