import React from 'react';
import { Stack, Tooltip, IconButton, useTheme, useMediaQuery } from '@mui/material';
import { IconPencil, IconTrash, IconBan, IconPlus, IconEye, IconFileTypeXls, IconUpload, IconDownload } from '@tabler/icons-react';
import MainCard from 'ui-component/cards/MainCard';

const CustomToolbar = ({
    onView,
    onEdit,
    onDeactivate,
    onDelete,
    hasSelection,
    onCreate,
    onDownloadTemplate,
    onImport,
    onExport,
}) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <MainCard>
        <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent="flex-start"
            sx={{
                flexWrap: isSmallScreen ? 'wrap' : 'nowrap',
                gap: isSmallScreen ? 2 : 1,
            }}
        >
            <Tooltip title="Create New">
                <IconButton color="primary" onClick={onCreate}>
                    <IconPlus />
                </IconButton>
            </Tooltip>
            <Tooltip title="View Selected">
                <span>
                    <IconButton color="primary" onClick={onView} disabled={!hasSelection}>
                        <IconEye />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Edit Selected">
                <span>
                    <IconButton color="primary" onClick={onEdit} disabled={!hasSelection}>
                        <IconPencil />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Deactivate Selected">
                <span>
                    <IconButton color="secondary" onClick={onDeactivate} disabled={!hasSelection}>
                        <IconBan />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Delete Selected">
                <span>
                    <IconButton color="error" onClick={onDelete} disabled={!hasSelection}>
                        <IconTrash />
                    </IconButton>
                </span>
            </Tooltip>
            <Tooltip title="Download Template">
                <IconButton color="primary" onClick={onDownloadTemplate}>
                    <IconFileTypeXls />
                </IconButton>
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
        </Stack>
        </MainCard>
    );
};

export default CustomToolbar;
