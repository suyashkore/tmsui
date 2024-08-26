// tmsui/src/store/slices/tenant.js

// third-party
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import backendApiCall from 'utils/backendApiCall';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import { Tenant } from 'features/tenants/models/TenantModel'; // Import the Tenant model

// ----------------------------------------------------------------------
// Initial State: This defines the default state for the tenant slice.
// - error: Holds any errors that occur during the async operations.
// - tenants: Stores the list of all tenants fetched from the API.
// - total: Stores the total count of tenants, useful for pagination.
// - tenant: Stores the details of a single tenant when fetched by ID.
// - loading: A boolean flag to indicate when an async operation is in progress.
// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tenants: [], // Ensure this remains an array
    total: 0,
    tenant: null,
    loading: false,
};

// ----------------------------------------------------------------------
// Async Thunks: These handle the asynchronous actions like API requests.
// Thunks are generated using createAsyncThunk, which allows us to dispatch
// async actions and handle responses or errors easily.
// ----------------------------------------------------------------------

// Thunk to fetch all tenants with optional query parameters for pagination, sorting, etc.
export const getTenants = createAsyncThunk(
    'tenant/getTenants',
    async (params, { rejectWithValue }) => {
        try {
            const response = await backendApiCall.get('/tenants', { params });
            // Convert each tenant to the Tenant model
            const tenants = response.data.data.map((tenant) => Tenant.fromApiResponse(tenant));
            return { data: tenants, total: response.data.total };
        } catch (error) {
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
            const response = await backendApiCall.get(`/tenants/id/${id}`);
            // Convert the fetched tenant to the Tenant model
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
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
            const response = await backendApiCall.post('/tenants', data);
            // Convert the created tenant to the Tenant model
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
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
            const response = await backendApiCall.put(`/tenants/${id}`, data);
            // Convert the updated tenant to the Tenant model
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            const apiErrorResponse = ApiErrorResponse.fromApiResponse(error);
            return rejectWithValue(apiErrorResponse);
        }
    }
);

// ----------------------------------------------------------------------
// Slice: The slice combines the reducers and actions. It uses createSlice,
// which allows us to write "mutative" logic that is actually immutable thanks to Immer.js.
// ----------------------------------------------------------------------

const slice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        // Add any synchronous actions here if needed
    },
    extraReducers: (builder) => {
        builder
            // Handle getTenants
            .addCase(getTenants.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTenants.fulfilled, (state, action) => {
                state.tenants = action.payload.data || []; // Ensure this remains an array
                state.total = action.payload.total;
                state.loading = false;
            })
            .addCase(getTenants.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to fetch tenants');
            })

            // Handle getTenantById
            .addCase(getTenantById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getTenantById.fulfilled, (state, action) => {
                state.tenant = action.payload; // The payload is already a Tenant instance
                state.loading = false;
            })
            .addCase(getTenantById.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to fetch tenant');
            })

            // Handle createTenant
            .addCase(createTenant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTenant.fulfilled, (state, action) => {
                // Ensure the state.tenants remains an array
                if (Array.isArray(state.tenants)) {
                    state.tenants.push(action.payload); // The payload is already a Tenant instance
                } else {
                    state.tenants = [action.payload]; // Reassign as a new array if it's not already an array
                }
                state.loading = false;
            })
            .addCase(createTenant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to create tenant');
            })

            // Handle updateTenant
            .addCase(updateTenant.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateTenant.fulfilled, (state, action) => {
                const index = state.tenants.findIndex((tenant) => tenant.id === action.payload.id);
                if (index !== -1) {
                    state.tenants[index] = action.payload; // The payload is already a Tenant instance
                }
                state.loading = false;
            })
            .addCase(updateTenant.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload || new ApiErrorResponse('Failed to update tenant');
            });
    }
});

// Export the reducer to be used in the store setup
export default slice.reducer;
