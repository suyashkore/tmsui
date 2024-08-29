// tmsui/src/features/channelpartners/components/ChannelPartnerList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useChannelPartnerApi from '../hooks/useChannelPartnerApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal';

const ChannelPartnerList = () => {
    const navigate = useNavigate();
    const { fetchChannelPartners, deactivateChannelPartner, deleteChannelPartner, downloadChannelPartnerTemplate, exportChannelPartners, importChannelPartners } = useChannelPartnerApi();

    const [channelPartners, setChannelPartners] = useState([]);
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
        const loadChannelPartners = async () => {
            try {
                setLoading(true);

                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                    ...getCombinedFilters(),
                };

                const { data, total: fetchedTotal } = await fetchChannelPartners(queryParams);
                setChannelPartners(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch channel partners:', error);
            } finally {
                setLoading(false);
            }
        };

        loadChannelPartners();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchChannelPartners]);

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
        { field: 'legal_name', headerName: 'Legal Name', flex: 1, minWidth: 150 },
        { field: 'owner1_name', headerName: 'Owner Name', flex: 1, minWidth: 150 },
        { field: 'pincode', headerName: 'Pincode', flex: 0.8, minWidth: 100 },
        { field: 'address', headerName: 'Address', flex: 1.5, minWidth: 200 },
        { field: 'kyc_completed', headerName: 'KYC Completed', flex: 0.8, minWidth: 120, type: 'boolean' },
        { field: 'active', headerName: 'Active', flex: 0.7, minWidth: 100, type: 'boolean' },
        { field: 'status', headerName: 'Status', flex: 0.8, minWidth: 100 },
        { field: 'note', headerName: 'Note', flex: 1.5, minWidth: 200 },
        { field: 'created_by', headerName: 'Created By', flex: 0.8, minWidth: 70 },
        { field: 'updated_by', headerName: 'Updated By', flex: 0.8, minWidth: 70 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 }
    ];

    const handleRowSelection = (selection) => setSelectedRows(selection);

    const handleCreate = () => navigate('/md/ext/org/channelpartners/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/ext/org/channelpartners/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/ext/org/channelpartners/edit/id/${selectedRows[0]}`);

    const reloadChannelPartnerList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchChannelPartners({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters()
            });
            setChannelPartners(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload channel partner list:', error);
        }
    };    

    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the channel partner with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the channel partner with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateChannelPartner(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteChannelPartner(confirmModal.id);
            }
            setConfirmModal(null);
            setSelectedRows([]);
            reloadChannelPartnerList();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    const handleDownloadTemplate = async () => {
        try {
            await downloadChannelPartnerTemplate();
        } catch (error) {
            console.error('Failed to download channel partner template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true);

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadChannelPartnerList();
    };

    const handleExport = async () => {
        try {
            const queryParams = {
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters(),
            };

            await exportChannelPartners(queryParams);
        } catch (error) {
            console.error('Failed to export channel partners:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />
                <DataGrid
                    columns={columns}
                    rows={channelPartners || []}
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
                onImport={importChannelPartners}
                importTitle="Import Channel Partners"
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

export default ChannelPartnerList;
