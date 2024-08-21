// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconReport
} from '@tabler/icons-react';

// constant
const icons = {
    IconReport
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const businessIntelligence = {
    id: 'business-intelligence',
    title: <FormattedMessage id="business-intelligence" />,
    icon: icons.IconReport,
    type: 'group',
    children: [
       {
            id: 'reports-insights',
            title: <FormattedMessage id="reports-insights" />,
            type: 'collapse',
            icon: icons.IconReport,
            children:[
                {
                    id: 'sales-register',
                    title: <FormattedMessage id="sales-register" />,
                    type: 'item',
                    link: '/bi/sales-register/:view',
                    url: '/bi/sales-register/list',
                    breadcrumbs: true
                }  
            ]
        }
    ]
};

export default businessIntelligence;
