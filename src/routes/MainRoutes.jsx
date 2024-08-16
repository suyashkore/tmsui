import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const ExecSummary = Loadable(lazy(() => import('features/dashboard/execsummary/containers/ExecSummary')));

const ComingSoon = Loadable(lazy(() => import('features/maintenance/containers/ComingSoon')));
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
            element: <ComingSoon />
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
