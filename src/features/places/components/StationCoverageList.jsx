// tmsui/src/features/places/components/StationCoverageList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useStationCoverageApi from '../hooks/useStationCoverageApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';
import AdvancedFilter from 'features/common/components/AdvancedFilter';
import ImportXlsxModal from 'features/common/components/ImportXlsxModal';

const StationCoverageList = () => {
    const navigate = useNavigate();
    const { fetchStationCoverages, deactivateStationCoverage, deleteStationCoverage, downloadStationCoverageTemplate, exportStationCoverages, importStationCoverages } = useStationCoverageApi();

    const [stationCoverages, setStationCoverages] = useState([]);
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
        const loadStationCoverages = async () => {
            try {
                setLoading(true);

                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                    ...getCombinedFilters(),
                };

                const { data, total: fetchedTotal } = await fetchStationCoverages(queryParams);
                setStationCoverages(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch station coverages:', error);
            } finally {
                setLoading(false);
            }
        };

        loadStationCoverages();
    }, [paginationModel, sortModel, columnFilters, advancedFilters, fetchStationCoverages]);

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
        { field: 'name', headerName: 'Name', flex: 1, minWidth: 150 },
        { field: 'post_name', headerName: 'Post Name', flex: 1, minWidth: 150 },
        { field: 'pincode', headerName: 'Pincode', flex: 1, minWidth: 100 },
        { field: 'taluka', headerName: 'Taluka', flex: 1, minWidth: 150 },
        { field: 'district', headerName: 'District', flex: 1, minWidth: 150 },
        { field: 'state', headerName: 'State', flex: 1, minWidth: 150 },
        { field: 'country', headerName: 'Country', flex: 1, minWidth: 150 },
        { field: 'latitude', headerName: 'Latitude', flex: 1, minWidth: 150 },
        { field: 'longitude', headerName: 'Longitude', flex: 1, minWidth: 150 },
        { field: 'servicing_office_id', headerName: 'Servicing Office ID', flex: 1, minWidth: 150 },
        { field: 'service_office_tat', headerName: 'Service Office TAT', flex: 1, minWidth: 150 },
        { field: 'servicing_office_dist', headerName: 'Servicing Office Distance', flex: 1, minWidth: 150 },
        { field: 'zone', headerName: 'Zone', flex: 1, minWidth: 100 },
        { field: 'route_num', headerName: 'Route Number', flex: 1, minWidth: 100 },
        { field: 'oda', headerName: 'ODA', flex: 1, minWidth: 100 },
        { field: 'active', headerName: 'Active', flex: 1, minWidth: 100 },
        { field: 'status', headerName: 'Status', flex: 1, minWidth: 100 },
        { field: 'note', headerName: 'Note', flex: 1, minWidth: 100 },
        { field: 'created_by', headerName: 'Created By', flex: 1, minWidth: 100 },
        { field: 'updated_by', headerName: 'Updated By', flex: 1, minWidth: 100 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 },
    ];

    const handleRowSelection = (selection) => setSelectedRows(selection);

    const handleCreate = () => navigate('/md/places/stationcoverage/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/places/stationcoverage/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/places/stationcoverage/edit/id/${selectedRows[0]}`);

    const reloadStationCoverageList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchStationCoverages({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters()
            });
            setStationCoverages(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload station coverage list:', error);
        }
    };

    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the station coverage with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the station coverage with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateStationCoverage(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteStationCoverage(confirmModal.id);
            }
            setConfirmModal(null);
            setSelectedRows([]);
            reloadStationCoverageList();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    const handleDownloadTemplate = async () => {
        try {
            await downloadStationCoverageTemplate();
        } catch (error) {
            console.error('Failed to download station coverage template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true);

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadStationCoverageList();
    };

    const handleExport = async () => {
        try {
            const queryParams = {
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
                ...getCombinedFilters(),
            };

            await exportStationCoverages(queryParams);
        } catch (error) {
            console.error('Failed to export station coverages:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <AdvancedFilter onApplyFilters={applyAdvancedFilters} onClearFilters={clearAdvancedFilters} />
                <DataGrid
                    columns={columns}
                    rows={stationCoverages || []}
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
                onImport={importStationCoverages}
                importTitle="Import Station Coverages"
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

export default StationCoverageList;
