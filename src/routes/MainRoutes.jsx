import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const ExecSummary = Loadable(lazy(() => import('features/dashboard/execsummary/containers/ExecSummary')));

const ComingSoon = Loadable(lazy(() => import('features/maintenance/containers/ComingSoon')));


const Tenants = Loadable(lazy(() => import('features/tenants/containers/Tenants')));

const CreateTenant = Loadable(lazy(() => import('features/tenants/containers/CreateTenant')));

const EditTenant = Loadable(lazy(() => import('features/tenants/containers/EditTenant')));

const ViewTenant = Loadable(lazy(() => import('features/tenants/containers/ViewTenant')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: (
        <AuthGuard>
            <MainLayout />
        </AuthGuard>
    ),
    children: [
        {
            path: '/dashboard/execsummary',
            element: <ExecSummary />
        },
        {
            path: '/consignment/booking/lr/list',
            element: <ComingSoon />
        },
        {
            path: '/consignment/tracker',
            element: <ComingSoon />
        },
        {
            path: '/transit/ewb/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/prn/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/ls/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/thc/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/drs/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/manifest/list',
            element: <ComingSoon />
        },
        {
            path: '/transit/lmd/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/pod/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/topay/collection/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/fv/voucher/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/driver/voucher/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/loader/expenses/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/fuel/log/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/pod/statement/list',
            element: <ComingSoon />
        },
        {
            path: '/txn/customer/invoices/list',
            element: <ComingSoon />
        },
        {
            path: '/bi/sales-register/list',
            element: <ComingSoon />
        },
        {
            path: '/md/org/tenants/list',
            element: <Tenants />
        },
        {
            path: '/md/org/tenants/create',
            element: <CreateTenant />
        },
        {
            path: '/md/org/tenants/edit/id/:id',
            element: <EditTenant />
        },
        {
            path: '/md/org/tenants/view/id/:id',
            element: <ViewTenant />
        },
        {
            path: '/md/org/companies/list',
            element: <ComingSoon />
        },
        {
            path: '/md/org/users/privileges/list',
            element: <ComingSoon />
        },
        {
            path: '/md/org/users/roles/list',
            element: <ComingSoon />
        },
        {
            path: '/md/org/users/list',
            element: <ComingSoon />
        },
        {
            path: '/md/org/offices/list',
            element: <ComingSoon />
        },
        {
            path: '/md/ext/org/customers/list',
            element: <ComingSoon />
        },
        {
            path: '/md/ext/org/channelpartners/list',
            element: <ComingSoon />
        },
        {
            path: '/md/ext/org/vendors/list',
            element: <ComingSoon />
        },
        {
            path: '/md/fleet/vehicles/list',
            element: <ComingSoon />
        },
        {
            path: '/md/places/geohierarchies/list',
            element: <ComingSoon />
        },
        {
            path: '/md/places/stationcoverage/list',
            element: <ComingSoon />
        },
        {
            path: '/md/contracts/loader/list',
            element: <ComingSoon />
        },
        {
            path: '/md/contracts/driver/list',
            element: <ComingSoon />
        },
        {
            path: '/md/contracts/customer/list',
            element: <ComingSoon />
        },
        {
            path: '/md/contracts/cp/list',
            element: <ComingSoon />
        },
        {
            path: '/md/contracts/fleetvendor/list',
            element: <ComingSoon />
        }
    ]
};

export default MainRoutes;
