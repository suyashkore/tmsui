// third-party
import { FormattedMessage } from 'react-intl';

// assets
import {
    IconDatabaseCog,
    IconUsers,
    IconHierarchy3,
    IconBuildings,
    IconTruckDelivery,
    IconMapPins,
    IconContract
} from '@tabler/icons-react';

// constant
const icons = {
    IconDatabaseCog,
    IconUsers,
    IconHierarchy3,
    IconBuildings,
    IconTruckDelivery,
    IconMapPins,
    IconContract
};

// ==============================|| MENU ITEMS - Master Data ||============================== //

const masterdata = {
    id: 'masterdata',
    title: <FormattedMessage id="masterdata" />,
    icon: icons.IconDatabaseCog,
    type: 'group',
    children: [
        {
            id: 'usersaccess',
            title: <FormattedMessage id="usersaccess" />,
            type: 'collapse',
            icon: icons.IconUsers,
            children: [
                {
                    id: 'privileges',
                    title: <FormattedMessage id="privileges" />,
                    type: 'item',
                    link: '/md/org/users/privileges/:view',
                    url: '/md/org/users/privileges/list',
                    breadcrumbs: true
                },
                {
                    id: 'roles',
                    title: <FormattedMessage id="roles" />,
                    type: 'item',
                    link: '/md/org/users/roles/:view',
                    url: '/md/org/users/roles/list',
                    breadcrumbs: true
                }, 
                {
                    id: 'users',
                    title: <FormattedMessage id="users" />,
                    type: 'item',
                    link: '/md/org/users/:view',
                    url: '/md/org/users/list',
                    breadcrumbs: true
                } 
            ]
        },
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
                    link: '/md/org/tenants/:view',
                    url: '/md/org/tenants/list',
                    breadcrumbs: true
                },
                {
                    id: 'companies',
                    title: <FormattedMessage id="companies" />,
                    type: 'item',
                    link: '/md/org/companies/:view',
                    url: '/md/org/companies/list',
                    breadcrumbs: true
                },   
                {
                    id: 'offices',
                    title: <FormattedMessage id="offices" />,
                    type: 'item',
                    link: '/md/org/offices/:view',
                    url: '/md/org/offices/list',
                    breadcrumbs: true
                }        
            ]
        },
        {id: 'ext-organisation',
        title: <FormattedMessage id="ext-organisation" />,
        type: 'collapse',
        icon: icons.IconBuildings,
        children: [
                {
                    id: 'customers',
                    title: <FormattedMessage id="customers" />,
                    type: 'item',
                    link: '/md/ext/org/customers/:view',
                    url: '/md/ext/org/customers/list',
                    breadcrumbs: true
                },
                {
                    id: 'channel-partners',
                    title: <FormattedMessage id="channel-partners" />,
                    type: 'item',
                    link: '/md/ext/org/channelpartners/:view',
                    url: '/md/ext/org/channelpartners/list',
                    breadcrumbs: true
                },   
                {
                    id: 'vendors',
                    title: <FormattedMessage id="vendors" />,
                    type: 'item',
                    link: '/md/ext/org/vendors/:view',
                    url: '/md/ext/org/vendors/list',
                    breadcrumbs: true
                }       
            ]
        },
        {id: 'fleet',
        title: <FormattedMessage id="fleet" />,
        type: 'collapse',
        icon: icons.IconTruckDelivery,
        children: [
                {
                    id: 'vehicles',
                    title: <FormattedMessage id="vehicles" />,
                    type: 'item',
                    link: '/md/fleet/vehicles/:view',
                    url: '/md/fleet/vehicles/list',
                    breadcrumbs: true
                }
            ]
        },
        {id: 'places',
        title: <FormattedMessage id="places" />,
        type: 'collapse',
        icon: icons.IconMapPins,
        children: [
                {
                    id: 'geo-hierarchy',
                    title: <FormattedMessage id="geo-hierarchy" />,
                    type: 'item',
                    link: '/md/places/geohierarchies/:view',
                    url: '/md/places/geohierarchies/list',
                    breadcrumbs: true
                },
                {
                    id: 'station-coverage',
                    title: <FormattedMessage id="station-coverage" />,
                    type: 'item',
                    link: '/md/places/stationcoverage/:view',
                    url: '/md/places/stationcoverage/list',
                    breadcrumbs: true
                }
            ]
        },
        {id: 'contracts',
        title: <FormattedMessage id="contracts" />,
        type: 'collapse',
        icon: icons.IconContract,
        children: [
                {
                    id: 'loader-contract',
                    title: <FormattedMessage id="loader-contract" />,
                    type: 'item',
                    link: '/md/contracts/loader/:view',
                    url: '/md/contracts/loader/list',
                    breadcrumbs: true
                },
                {
                    id: 'driver-contract',
                    title: <FormattedMessage id="driver-contract" />,
                    type: 'item',
                    link: '/md/contracts/driver/:view',
                    url: '/md/contracts/driver/list',
                    breadcrumbs: true
                },
                {
                    id: 'customer-contract',
                    title: <FormattedMessage id="customer-contract" />,
                    type: 'item',
                    link: '/md/contracts/customer/:view',
                    url: '/md/contracts/customer/list',
                    breadcrumbs: true
                },
                {
                    id: 'cp-contract',
                    title: <FormattedMessage id="cp-contract" />,
                    type: 'item',
                    link: '/md/contracts/cp/:view',
                    url: '/md/contracts/cp/list',
                    breadcrumbs: true
                },
                {
                    id: 'fleetvendor-contract',
                    title: <FormattedMessage id="fleetvendor-contract" />,
                    type: 'item',
                    link: '/md/contracts/fleetvendor/:view',
                    url: '/md/contracts/fleetvendor/list',
                    breadcrumbs: true
                }
            ]
        }
    ]
};

export default masterdata;
