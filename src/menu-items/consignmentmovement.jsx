// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconShip
} from '@tabler/icons-react';

// constant
const icons = {
    IconShip
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const consignmentMovement = {
    id: 'consignment-movement',
    title: <FormattedMessage id="consignment-movement" />,
    icon: icons.IconShip,
    type: 'group',
    children: [
       {
            id: 'transit',
            title: <FormattedMessage id="transit" />,
            type: 'collapse',
            icon: icons.IconShip,
            children:[
                {
                    id: 'e-way-bills',
                    title: <FormattedMessage id="e-way-bills" />,
                    type: 'item',
                    link: '/transit/ewb/:view',
                    url: '/transit/ewb/list',
                    breadcrumbs: true
                },
                {
                    id: 'prn',
                    title: <FormattedMessage id="prn" />,
                    type: 'item',
                    link: '/transit/prn/:view',
                    url: '/transit/prn/list',
                    breadcrumbs: true
                },
                {
                    id: 'ls',
                    title: <FormattedMessage id="ls" />,
                    type: 'item',
                    link: '/transit/ls/:view',
                    url: '/transit/ls/list',
                    breadcrumbs: true
                },
                {
                    id: 'thc',
                    title: <FormattedMessage id="thc" />,
                    type: 'item',
                    link: '/transit/thc/:view',
                    url: '/transit/thc/list',
                    breadcrumbs: true
                },
                {
                    id: 'drs',
                    title: <FormattedMessage id="drs" />,
                    type: 'item',
                    link: '/transit/drs/:view',
                    url: '/transit/drs/list',
                    breadcrumbs: true
                },
                {
                    id: 'manifest',
                    title: <FormattedMessage id="manifest" />,
                    type: 'item',
                    link: '/transit/manifest/:view',
                    url: '/transit/manifest/list',
                    breadcrumbs: true
                },
                {
                    id: 'lmd',
                    title: <FormattedMessage id="lmd" />,
                    type: 'item',
                    link: '/transit/lmd/:view',
                    url: '/transit/lmd/list',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default consignmentMovement;
