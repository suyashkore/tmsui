// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { IconDashboard } from '@tabler/icons-react';

const icons = {
    IconDashboard: IconDashboard
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: 'dashboard',
    title: <FormattedMessage id="dashboard" />,
    icon: icons.IconDashboard,
    type: 'group',
    children: [
        {
            id: 'exec-summary',
            title: <FormattedMessage id="exec-summary" />,
            type: 'item',
            url: '/dashboard/execsummary',
            icon: icons.IconDashboard,
            breadcrumbs: true
        }
    ]
};

export default dashboard;
