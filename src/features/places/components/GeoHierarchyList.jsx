// tmsui/src/features/places/components/GeoHierarchyList.jsx

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import MainCard from 'ui-component/cards/MainCard';
import useGeoHierarchyApi from '../hooks/useGeoHierarchyApi';
import CustomToolbar from 'features/common/components/CustomToolbar';
import ConfirmDialog from 'features/common/components/ConfirmDialog';

const GeoHierarchyList = () => {
    const navigate = useNavigate();
    const { fetchGeoHierarchies, deactivateGeoHierarchy, deleteGeoHierarchy, downloadGeoHierarchyTemplate, exportGeoHierarchies, importGeoHierarchies } = useGeoHierarchyApi();

    const [geoHierarchies, setGeoHierarchies] = useState([]);
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const [selectedRows, setSelectedRows] = useState([]);
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [sortModel, setSortModel] = useState([]);
    const [confirmModal, setConfirmModal] = useState(null);
    const [importModalOpen, setImportModalOpen] = useState(false);

    useEffect(() => {
        const loadGeoHierarchies = async () => {
            try {
                setLoading(true);

                const queryParams = {
                    page: paginationModel.page + 1,
                    per_page: paginationModel.pageSize,
                    sort_by: sortModel[0]?.field || 'updated_at',
                    sort_order: sortModel[0]?.sort || 'desc',
                };

                const { data, total: fetchedTotal } = await fetchGeoHierarchies(queryParams);
                setGeoHierarchies(data);
                setTotal(fetchedTotal);
            } catch (error) {
                console.error('Failed to fetch geo-hierarchies:', error);
            } finally {
                setLoading(false);
            }
        };

        loadGeoHierarchies();
    }, [paginationModel, sortModel, fetchGeoHierarchies]);

    const columns = [
        { field: 'id', headerName: 'ID', flex: 0.5, minWidth: 70 },
        { field: 'country', headerName: 'Country', flex: 1, minWidth: 150 },
        { field: 'state', headerName: 'State', flex: 1, minWidth: 150 },
        { field: 'district', headerName: 'District', flex: 1, minWidth: 150 },
        { field: 'taluka', headerName: 'Taluka', flex: 1, minWidth: 150 },
        { field: 'po_name', headerName: 'Post Office Name', flex: 1.5, minWidth: 200 },
        { field: 'pincode', headerName: 'Pincode', flex: 0.8, minWidth: 100 },
        { field: 'po_lat', headerName: 'Post Office Latitude', flex: 1, minWidth: 150 },
        { field: 'po_long', headerName: 'Post Office Longitude', flex: 1, minWidth: 150 },
        { field: 'created_at', headerName: 'Created At', flex: 1, minWidth: 180 },
        { field: 'updated_at', headerName: 'Updated At', flex: 1, minWidth: 180 }
    ];

    const handleRowSelection = (selection) => setSelectedRows(selection);

    const handleCreate = () => navigate('/md/places/geohierarchies/create');
    const handleView = () => selectedRows.length === 1 && navigate(`/md/places/geohierarchies/view/id/${selectedRows[0]}`);
    const handleEdit = () => selectedRows.length === 1 && navigate(`/md/places/geohierarchies/edit/id/${selectedRows[0]}`);

    const reloadGeoHierarchyList = async () => {
        try {
            const { data, total: fetchedTotal } = await fetchGeoHierarchies({
                page: paginationModel.page + 1,
                per_page: paginationModel.pageSize,
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
            });
            setGeoHierarchies(data);
            setTotal(fetchedTotal);
        } catch (error) {
            console.error('Failed to reload geo-hierarchy list:', error);
        }
    };

    const handleDeactivate = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'deactivate',
                id: selectedRows[0],
                message: `Are you sure you want to deactivate the geo-hierarchy with ID ${selectedRows[0]}?`,
            });
        }
    };

    const handleDelete = () => {
        if (selectedRows.length === 1) {
            setConfirmModal({
                action: 'delete',
                id: selectedRows[0],
                message: `Are you sure you want to delete the geo-hierarchy with ID ${selectedRows[0]}? This action cannot be undone.`,
            });
        }
    };

    const confirmAction = async () => {
        try {
            if (confirmModal.action === 'deactivate') {
                await deactivateGeoHierarchy(confirmModal.id);
            } else if (confirmModal.action === 'delete') {
                await deleteGeoHierarchy(confirmModal.id);
            }
            setConfirmModal(null);
            setSelectedRows([]);
            reloadGeoHierarchyList();
        } catch (error) {
            console.error('Action failed:', error);
        }
    };

    const handleCloseModal = () => setConfirmModal(null);

    const handleDownloadTemplate = async () => {
        try {
            await downloadGeoHierarchyTemplate();
        } catch (error) {
            console.error('Failed to download geo-hierarchy template:', error);
        }
    };

    const handleImport = () => setImportModalOpen(true);

    const handleImportModalClose = () => {
        setImportModalOpen(false);
        reloadGeoHierarchyList();
    };

    const handleExport = async () => {
        try {
            const queryParams = {
                sort_by: sortModel[0]?.field || 'updated_at',
                sort_order: sortModel[0]?.sort || 'desc',
            };
            await exportGeoHierarchies(queryParams);
        } catch (error) {
            console.error('Failed to export geo-hierarchies:', error);
        }
    };

    return (
        <MainCard content={false}>
            <Box sx={{ width: '100%' }}>
                <DataGrid
                    columns={columns}
                    rows={geoHierarchies || []}
                    paginationMode="server"
                    sortingMode="server"
                    rowCount={total}
                    loading={loading}
                    pageSizeOptions={[5, 10, 20]}
                    pageSize={paginationModel.pageSize}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    onSortModelChange={setSortModel}
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

export default GeoHierarchyList;
