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

const Vendors = Loadable(lazy(() => import('features/vendors/containers/Vendors')));
const CreateVendor = Loadable(lazy(() => import('features/vendors/containers/CreateVendor')));
const EditVendor = Loadable(lazy(() => import('features/vendors/containers/EditVendor')));
const ViewVendor = Loadable(lazy(() => import('features/vendors/containers/ViewVendor')));

const Vehicles = Loadable(lazy(() => import('features/fleet/containers/Vehicles')));
const CreateVehicle = Loadable(lazy(() => import('features/fleet/containers/CreateVehicle')));
const EditVehicle = Loadable(lazy(() => import('features/fleet/containers/EditVehicle')));
const ViewVehicle = Loadable(lazy(() => import('features/fleet/containers/ViewVehicle')));

const GeoHierarchies = Loadable(lazy(() => import('features/places/containers/GeoHierarchies')));
const CreateGeoHierarchy = Loadable(lazy(() => import('features/places/containers/CreateGeoHierarchy')));
const EditGeoHierarchy = Loadable(lazy(() => import('features/places/containers/EditGeoHierarchy')));
const ViewGeoHierarchy = Loadable(lazy(() => import('features/places/containers/ViewGeoHierarchy')));

const StationCoverages = Loadable(lazy(() => import('features/places/containers/StationCoverages')));
const CreateStationCoverage = Loadable(lazy(() => import('features/places/containers/CreateStationCoverage')));
const EditStationCoverage = Loadable(lazy(() => import('features/places/containers/EditStationCoverage')));
const ViewStationCoverage = Loadable(lazy(() => import('features/places/containers/ViewStationCoverage')));

const LoaderRates = Loadable(lazy(() => import('features/contracts/containers/LoaderRates')));
const CreateLoaderRate = Loadable(lazy(() => import('features/contracts/containers/CreateLoaderRate')));
const EditLoaderRate = Loadable(lazy(() => import('features/contracts/containers/EditLoaderRate')));
const ViewLoaderRate = Loadable(lazy(() => import('features/contracts/containers/ViewLoaderRate')));

const DriverRates = Loadable(lazy(() => import('features/contracts/containers/DriverRates')));
const CreateDriverRate = Loadable(lazy(() => import('features/contracts/containers/CreateDriverRate')));
const EditDriverRate = Loadable(lazy(() => import('features/contracts/containers/EditDriverRate')));
const ViewDriverRate = Loadable(lazy(() => import('features/contracts/containers/ViewDriverRate')));

const Users = Loadable(lazy(() => import('features/users/containers/Users')));
const CreateUser = Loadable(lazy(() => import('features/users/containers/CreateUser')));
const EditUser = Loadable(lazy(() => import('features/users/containers/EditUser')));
const ViewUser = Loadable(lazy(() => import('features/users/containers/ViewUser')));

const Privileges = Loadable(lazy(() => import('features/users/containers/Privileges')));
const CreatePrivilege = Loadable(lazy(() => import('features/users/containers/CreatePrivilege')));
const EditPrivilege = Loadable(lazy(() => import('features/users/containers/EditPrivilege')));
const ViewPrivilege = Loadable(lazy(() => import('features/users/containers/ViewPrivilege')));

const Roles = Loadable(lazy(() => import('features/users/containers/Roles')));
const CreateRole = Loadable(lazy(() => import('features/users/containers/CreateRole')));
const EditRole = Loadable(lazy(() => import('features/users/containers/EditRole')));
const ViewRole = Loadable(lazy(() => import('features/users/containers/ViewRole')));

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
            path: '/md/access/privileges/list',
            element: <Privileges />
        },
        {
            path: '/md/access/privileges/create',
            element: <CreatePrivilege />
        },
        {
            path: '/md/access/privileges/edit/id/:id',
            element: <EditPrivilege />
        },
        {
            path: '/md/access/privileges/view/id/:id',
            element: <ViewPrivilege />
        },        
        {
            path: '/md/access/roles/list',
            element: <Roles />
        },
        {
            path: '/md/access/roles/create',
            element: <CreateRole />
        },
        {
            path: '/md/access/roles/edit/id/:id',
            element: <EditRole />
        },
        {
            path: '/md/access/roles/view/id/:id',
            element: <ViewRole />
        },
        {
            path: '/md/access/users/list',
            element: <Users />
        },
        {
            path: '/md/access/users/create',
            element: <CreateUser />
        },
        {
            path: '/md/access/users/edit/id/:id',
            element: <EditUser />
        },
        {
            path: '/md/access/users/view/id/:id',
            element: <ViewUser />
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
            element: <Vendors />
        },
        {
            path: '/md/ext/org/vendors/create',
            element: <CreateVendor />
        },
        {
            path: '/md/ext/org/vendors/edit/id/:id',
            element: <EditVendor />
        },
        {
            path: '/md/ext/org/vendors/view/id/:id',
            element: <ViewVendor />
        },        
        {
            path: '/md/fleet/vehicles/list',
            element: <Vehicles />
        },
        {
            path: '/md/fleet/vehicles/create',
            element: <CreateVehicle />
        },
        {
            path: '/md/fleet/vehicles/edit/id/:id',
            element: <EditVehicle />
        },
        {
            path: '/md/fleet/vehicles/view/id/:id',
            element: <ViewVehicle />
        },        
        {
            path: '/md/places/geohierarchies/list',
            element: <GeoHierarchies />
        },
        {
            path: '/md/places/geohierarchies/create',
            element: <CreateGeoHierarchy />
        },
        {
            path: '/md/places/geohierarchies/edit/id/:id',
            element: <EditGeoHierarchy />
        },
        {
            path: '/md/places/geohierarchies/view/id/:id',
            element: <ViewGeoHierarchy />
        },        
        {
            path: '/md/places/stationcoverage/list',
            element: <StationCoverages />
        },
        {
            path: '/md/places/stationcoverage/create',
            element: <CreateStationCoverage />
        },
        {
            path: '/md/places/stationcoverage/edit/id/:id',
            element: <EditStationCoverage />
        },
        {
            path: '/md/places/stationcoverage/view/id/:id',
            element: <ViewStationCoverage />
        },        
        {
            path: '/md/contracts/loader/list',
            element: <LoaderRates />
        },
        {
            path: '/md/contracts/loader/create',
            element: <CreateLoaderRate />
        },
        {
            path: '/md/contracts/loader/edit/id/:id',
            element: <EditLoaderRate />
        },
        {
            path: '/md/contracts/loader/view/id/:id',
            element: <ViewLoaderRate />
        },        
        {
            path: '/md/contracts/driver/list',
            element: <DriverRates />
        },
        {
            path: '/md/contracts/driver/create',
            element: <CreateDriverRate />
        },
        {
            path: '/md/contracts/driver/edit/id/:id',
            element: <EditDriverRate />
        },
        {
            path: '/md/contracts/driver/view/id/:id',
            element: <ViewDriverRate />
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
