// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDatabaseCog,
    IconHierarchy3
} from '@tabler/icons-react';

// constant
const icons = {
    IconDatabaseCog,
    IconHierarchy3
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const masterdata = {
    id: 'masterdata',
    title: <FormattedMessage id="masterdata" />,
    icon: icons.IconDatabaseCog,
    type: 'group',
    children: [
        {
            id: 'organisation',
            title: <FormattedMessage id="organisation" />,
            type: 'collapse',
            icon: icons.IconHierarchy3,
            children: [
                {
                    id: 'tenants',
                    title: <FormattedMessage id="tenants" />,
                    type: 'item',
                    link: '/md/tenants/:view',
                    url: '/md/tenants/list',
                    breadcrumbs: true
                },
                {
                    id: 'companies',
                    title: <FormattedMessage id="companies" />,
                    type: 'item',
                    link: '/md/companies/:view',
                    url: '/md/companies/list',
                    breadcrumbs: true
                },   
                {
                    id: 'privileges',
                    title: <FormattedMessage id="privileges" />,
                    type: 'item',
                    link: '/md/privileges/:view',
                    url: '/md/privileges/list',
                    breadcrumbs: true
                },
                {
                    id: 'roles',
                    title: <FormattedMessage id="roles" />,
                    type: 'item',
                    link: '/md/roles/:view',
                    url: '/md/roles/list',
                    breadcrumbs: true
                }, 
                {
                    id: 'users',
                    title: <FormattedMessage id="users" />,
                    type: 'item',
                    link: '/md/users/:view',
                    url: '/md/users/list',
                    breadcrumbs: true
                },
                {
                    id: 'offices',
                    title: <FormattedMessage id="offices" />,
                    type: 'item',
                    link: '/md/offices/:view',
                    url: '/md/offices/list',
                    breadcrumbs: true
                }        
            ]
        }
    ]
};

export default masterdata;
