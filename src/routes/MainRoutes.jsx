import { lazy } from 'react';

// project imports
import MainLayout from 'layout/MainLayout';
import ErrorBoundary from './ErrorBoundary';
import Loadable from 'ui-component/Loadable';
import AuthGuard from 'utils/route-guard/AuthGuard';

// dashboard routing
const DashboardDefault = Loadable(lazy(() => import('views/dashboard/ExecutiveSummary')));

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
            element: <DashboardDefault />
        }
    ]
};

export default MainRoutes;
