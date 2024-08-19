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
            path: '/md/tenants/list',
            element: <Tenants />
        },
        {
            path: '/md/tenants/create',
            element: <CreateTenant />
        },
        {
            path: '/md/tenants/edit/id/:id',
            element: <EditTenant />
        },
        {
            path: '/md/tenants/view/id/:id',
            element: <ViewTenant />
        },
        {
            path: '/md/companies/list',
            element: <ComingSoon />
        },
        {
            path: '/md/privileges/list',
            element: <ComingSoon />
        },
        {
            path: '/md/roles/list',
            element: <ComingSoon />
        },
        {
            path: '/md/users/list',
            element: <ComingSoon />
        },
        {
            path: '/md/offices/list',
            element: <ComingSoon />
        }
    ]
};

export default MainRoutes;
