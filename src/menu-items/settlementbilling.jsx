// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconMoodDollar
} from '@tabler/icons-react';

// constant
const icons = {
    IconMoodDollar
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const settlementBilling = {
    id: 'settlement-billing',
    title: <FormattedMessage id="settlement-billing" />,
    icon: icons.IconMoodDollar,
    type: 'group',
    children: [
       {
            id: 'closure-transactions',
            title: <FormattedMessage id="closure-transactions" />,
            type: 'collapse',
            icon: icons.IconMoodDollar,
            children:[
                {
                    id: 'pod',
                    title: <FormattedMessage id="pod" />,
                    type: 'item',
                    link: '/txn/pod/:view',
                    url: '/txn/pod/list',
                    breadcrumbs: true
                },
                {
                    id: 'topay-collection',
                    title: <FormattedMessage id="topay-collection" />,
                    type: 'item',
                    link: '/txn/topay/collection/:view',
                    url: '/txn/topay/collection/list',
                    breadcrumbs: true
                },
                {
                    id: 'fv-voucher',
                    title: <FormattedMessage id="fv-voucher" />,
                    type: 'item',
                    link: '/txn/fv/voucher/:view',
                    url: '/txn/fv/voucher/list',
                    breadcrumbs: true
                },
                {
                    id: 'driver-voucher',
                    title: <FormattedMessage id="driver-voucher" />,
                    type: 'item',
                    link: '/txn/driver/voucher/:view',
                    url: '/txn/driver/voucher/list',
                    breadcrumbs: true
                },
                {
                    id: 'loader-expenses',
                    title: <FormattedMessage id="loader-expenses" />,
                    type: 'item',
                    link: '/txn/loader/expenses/:view',
                    url: '/txn/loader/expenses/list',
                    breadcrumbs: true
                },
                {
                    id: 'fuel-log',
                    title: <FormattedMessage id="fuel-log" />,
                    type: 'item',
                    link: '/txn/fuel/log/:view',
                    url: '/txn/fuel/log/list',
                    breadcrumbs: true
                },
               
                {
                    id: 'pod-stmt',
                    title: <FormattedMessage id="pod-stmt" />,
                    type: 'item',
                    link: '/txn/pod/statement/:view',
                    url: '/txn/pod/statement/list',
                    breadcrumbs: true
                },
                {
                    id: 'cust-invoices',
                    title: <FormattedMessage id="cust-invoices" />,
                    type: 'item',
                    link: '/txn/customer/invoices/:view',
                    url: '/txn/customer/invoices/list',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default settlementBilling;
