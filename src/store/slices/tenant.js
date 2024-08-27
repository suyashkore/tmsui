// tmsui/src/store/slices/tenant.js

// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import backendApiCall from 'utils/backendApiCall';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import { Tenant } from 'features/tenants/models/TenantModel'; // Import the Tenant model

// Initial State
const initialState = {
    error: null,
    tenants: [], 
    total: 0,
    tenant: null,
    loading: false,
};

// Async Thunks

// Thunk to fetch all tenants with optional query parameters for pagination, sorting, etc.
export const getTenants = createAsyncThunk(
    'tenant/getTenants',
    async (params, { rejectWithValue }) => {
        try {
            console.log('Fetching tenants...');
            const response = await backendApiCall.get('/tenants', { params });
            console.log('Tenants fetched:', response.data.data);
            const tenants = response.data.data.map((tenant) => Tenant.fromApiResponse(tenant));
            return { data: tenants, total: response.data.total };
        } catch (error) {
            console.error('Error fetching tenants:', error);
            const apiErrorResponse = ApiErrorResponse.fromApiResponse(error);
            return rejectWithValue(apiErrorResponse);
        }
    }
);

// Thunk to fetch a single tenant by its ID
export const getTenantById = createAsyncThunk(
    'tenant/getTenantById',
    async (id, { rejectWithValue }) => {
        try {
            console.log(`Fetching tenant by ID: ${id}`);
            const response = await backendApiCall.get(`/tenants/id/${id}`);
            console.log('Tenant fetched:', response.data);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            console.error(`Error fetching tenant by ID: ${id}`, error);
            const apiErrorResponse = ApiErrorResponse.fromApiResponse(error);
            return rejectWithValue(apiErrorResponse);
        }
    }
);

// Thunk to create a new tenant
export const createTenant = createAsyncThunk(
    'tenant/createTenant',
    async (data, { rejectWithValue }) => {
        try {
            console.log('Creating tenant...');
            const response = await backendApiCall.post('/tenants', data);
            console.log('Tenant created:', response.data);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            console.error('Error creating tenant:', error);
            const apiErrorResponse = ApiErrorResponse.fromApiResponse(error);
            return rejectWithValue(apiErrorResponse);
        }
    }
);

// Thunk to update an existing tenant by its ID
export const updateTenant = createAsyncThunk(
    'tenant/updateTenant',
    async ({ id, data }, { rejectWithValue }) => {
        try {
            console.log(`Updating tenant with ID: ${id}`);
            const response = await backendApiCall.put(`/tenants/${id}`, data);
            console.log('Tenant updated:', response.data);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            console.error(`Error updating tenant with ID: ${id}`, error);
            const apiErrorResponse = ApiErrorResponse.fromApiResponse(error);
            return rejectWithValue(apiErrorResponse);
        }
    }
);

// Slice
const slice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle getTenants
            .addCase(getTenants.pending, (state) => {
                console.log('Fetching tenants (pending)...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getTenants.fulfilled, (state, action) => {
                console.log('Tenants fetched successfully (fulfilled)', action.payload);
                state.tenants = action.payload.data || []; 
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getTenants.rejected, (state, action) => {
                console.error('Failed to fetch tenants (rejected)', action.payload);
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to fetch tenants');
            })

            // Handle getTenantById
            .addCase(getTenantById.pending, (state) => {
                console.log('Fetching tenant by ID (pending)...');
                state.loading = true;
                state.error = null;
            })
            .addCase(getTenantById.fulfilled, (state, action) => {
                console.log('Tenant fetched successfully (fulfilled)', action.payload);
                state.tenant = action.payload; 
                state.loading = false;
            })
            .addCase(getTenantById.rejected, (state, action) => {
                console.error('Failed to fetch tenant (rejected)', action.payload);
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to fetch tenant');
            })

            // Handle createTenant
            .addCase(createTenant.pending, (state) => {
                console.log('Creating tenant (pending)...');
                state.loading = true;
                state.error = null;
            })
            .addCase(createTenant.fulfilled, (state, action) => {
                console.log('Tenant created successfully (fulfilled)', action.payload);
                if (Array.isArray(state.tenants)) {
                    state.tenants.push(action.payload); 
                } else {
                    state.tenants = [action.payload];
                }
                state.loading = false;
            })
            .addCase(createTenant.rejected, (state, action) => {
                console.error('Failed to create tenant (rejected)', action.payload);
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to create tenant');
            })

            // Handle updateTenant
            .addCase(updateTenant.pending, (state) => {
                console.log('Updating tenant (pending)...');
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTenant.fulfilled, (state, action) => {
                console.log('Tenant updated successfully (fulfilled)', action.payload);
                const index = state.tenants.findIndex((tenant) => tenant.id === action.payload.id);
                if (index !== -1) {
                    state.tenants[index] = action.payload; 
                }
                state.loading = false;
            })
            .addCase(updateTenant.rejected, (state, action) => {
                console.error('Failed to update tenant (rejected)', action.payload);
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to update tenant');
            });
    }
});

export default slice.reducer;
