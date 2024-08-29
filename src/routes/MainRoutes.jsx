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

const Companies = Loadable(lazy(() => import('features/companies/containers/Companies')));
const CreateCompany = Loadable(lazy(() => import('features/companies/containers/CreateCompany')));
const EditCompany = Loadable(lazy(() => import('features/companies/containers/EditCompany')));
const ViewCompany = Loadable(lazy(() => import('features/companies/containers/ViewCompany')));

const Offices = Loadable(lazy(() => import('features/offices/containers/Offices')));
const CreateOffice = Loadable(lazy(() => import('features/offices/containers/CreateOffice')));
const EditOffice = Loadable(lazy(() => import('features/offices/containers/EditOffice')));
const ViewOffice = Loadable(lazy(() => import('features/offices/containers/ViewOffice')));

const Customers = Loadable(lazy(() => import('features/customers/containers/Customers')));
const CreateCustomer = Loadable(lazy(() => import('features/customers/containers/CreateCustomer')));
const EditCustomer = Loadable(lazy(() => import('features/customers/containers/EditCustomer')));
const ViewCustomer = Loadable(lazy(() => import('features/customers/containers/ViewCustomer')));

const ChannelPartners = Loadable(lazy(() => import('features/channelpartners/containers/ChannelPartners')));
const CreateChannelPartner = Loadable(lazy(() => import('features/channelpartners/containers/CreateChannelPartner')));
const EditChannelPartner = Loadable(lazy(() => import('features/channelpartners/containers/EditChannelPartner')));
const ViewChannelPartner = Loadable(lazy(() => import('features/channelpartners/containers/ViewChannelPartner')));


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
            element: <ComingSoon key="consignment-booking-lr" deliveryDate="2024-09-06T23:59:59" />
        },
        {
            path: '/consignment/tracker',
            element: <ComingSoon key="consignment-tracker" deliveryDate="2024-10-04T23:59:59" />
        },
        {
            path: '/transit/ewb/list',
            element: <ComingSoon key="transit-ewb" deliveryDate="2024-10-04T23:59:59" />
        },
        {
            path: '/transit/prn/list',
            element: <ComingSoon key="transit-prn" deliveryDate="2024-09-09T23:59:59" />
        },
        {
            path: '/transit/ls/list',
            element: <ComingSoon key="transit-ls" deliveryDate="2024-09-10T23:59:59" />
        },
        {
            path: '/transit/thc/list',
            element: <ComingSoon key="transit-thc" deliveryDate="2024-09-12T23:59:59" />
        },
        {
            path: '/transit/drs/list',
            element: <ComingSoon key="transit-drs" deliveryDate="2024-09-12T23:59:59" />
        },
        {
            path: '/transit/manifest/list',
            element: <ComingSoon key="transit-manifest" deliveryDate="2024-09-13T23:59:59" />
        },
        {
            path: '/transit/lmd/list',
            element: <ComingSoon key="transit-lmd" deliveryDate="2024-09-13T23:59:59" />
        },
        {
            path: '/txn/pod/list',
            element: <ComingSoon key="txn-pod" deliveryDate="2024-09-16T23:59:59" />
        },
        {
            path: '/txn/topay/collection/list',
            element: <ComingSoon key="txn-topay-collection" deliveryDate="2024-09-17T23:59:59" />
        },
        {
            path: '/txn/fv/voucher/list',
            element: <ComingSoon key="txn-fv-voucher" deliveryDate="2024-09-18T23:59:59" />
        },
        {
            path: '/txn/driver/voucher/list',
            element: <ComingSoon key="txn-driver-voucher" deliveryDate="2024-09-19T23:59:59" />
        },
        {
            path: '/txn/loader/expenses/list',
            element: <ComingSoon key="txn-loader-expenses" deliveryDate="2024-09-20T23:59:59" />
        },
        {
            path: '/txn/fuel/log/list',
            element: <ComingSoon key="txn-fuel-log" deliveryDate="2024-09-23T23:59:59" />
        },
        {
            path: '/txn/pod/statement/list',
            element: <ComingSoon key="txn-pod-statement" deliveryDate="2024-09-26T23:59:59" />
        },
        {
            path: '/txn/customer/invoices/list',
            element: <ComingSoon key="txn-customer-invoices" deliveryDate="2024-09-27T23:59:59" />
        },
        {
            path: '/bi/sales-register/list',
            element: <ComingSoon key="bi-sales-register" deliveryDate="2024-09-30T23:59:59" />
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
            element: <Companies />
        },
        {
            path: '/md/org/companies/create',
            element: <CreateCompany />
        },
        {
            path: '/md/org/companies/edit/id/:id',
            element: <EditCompany />
        },
        {
            path: '/md/org/companies/view/id/:id',
            element: <ViewCompany />
        },        
        {
            path: '/md/org/users/privileges/list',
            element: <ComingSoon key="md-org-users-privileges" deliveryDate="2024-10-04T23:59:59" />
        },
        {
            path: '/md/org/users/roles/list',
            element: <ComingSoon key="md-org-users-roles" deliveryDate="2024-10-04T23:59:59" />
        },
        {
            path: '/md/org/users/list',
            element: <ComingSoon key="md-org-users" deliveryDate="2024-10-04T23:59:59" />
        },
        {
            path: '/md/org/offices/list',
            element: <Offices />
        },
        {
            path: '/md/org/offices/create',
            element: <CreateOffice />
        },
        {
            path: '/md/org/offices/edit/id/:id',
            element: <EditOffice />
        },
        {
            path: '/md/org/offices/view/id/:id',
            element: <ViewOffice />
        },        
        {
            path: '/md/ext/org/customers/list',
            element: <Customers />
        },
        {
            path: '/md/ext/org/customers/create',
            element: <CreateCustomer />
        },
        {
            path: '/md/ext/org/customers/edit/id/:id',
            element: <EditCustomer />
        },
        {
            path: '/md/ext/org/customers/view/id/:id',
            element: <ViewCustomer />
        },        
        {
            path: '/md/ext/org/channelpartners/list',
            element: <ChannelPartners />
        },
        {
            path: '/md/ext/org/channelpartners/create',
            element: <CreateChannelPartner />
        },
        {
            path: '/md/ext/org/channelpartners/edit/id/:id',
            element: <EditChannelPartner />
        },
        {
            path: '/md/ext/org/channelpartners/view/id/:id',
            element: <ViewChannelPartner />
        },        
        {
            path: '/md/ext/org/vendors/list',
            element: <ComingSoon key="md-ext-org-vendors" deliveryDate="2024-08-28T23:59:59" />
        },
        {
            path: '/md/fleet/vehicles/list',
            element: <ComingSoon key="md-fleet-vehicles" deliveryDate="2024-08-29T23:59:59" />
        },
        {
            path: '/md/places/geohierarchies/list',
            element: <ComingSoon key="md-places-geohierarchies" deliveryDate="2024-08-30T23:59:59" />
        },
        {
            path: '/md/places/stationcoverage/list',
            element: <ComingSoon key="md-places-stationcoverage" deliveryDate="2024-08-30T23:59:59" />
        },
        {
            path: '/md/contracts/loader/list',
            element: <ComingSoon key="md-contracts-loader" deliveryDate="2024-08-30T23:59:59" />
        },
        {
            path: '/md/contracts/driver/list',
            element: <ComingSoon key="md-contracts-driver" deliveryDate="2024-08-30T23:59:59" />
        },
        {
            path: '/md/contracts/customer/list',
            element: <ComingSoon key="md-contracts-customer" deliveryDate="2024-09-06T23:59:59" />
        },
        {
            path: '/md/contracts/cp/list',
            element: <ComingSoon key="md-contracts-cp" deliveryDate="2024-09-06T23:59:59" />
        },
        {
            path: '/md/contracts/fleetvendor/list',
            element: <ComingSoon key="md-contracts-fleetvendor" deliveryDate="2024-09-06T23:59:59" />
        }
    ]
};

export default MainRoutes;
