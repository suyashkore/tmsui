// third-party
import { createSlice } from '@reduxjs/toolkit';
import backendApiCall from 'utils/backendApiCall';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tenants: [],
    total: 0,
    tenant: null, // Add tenant state for single tenant
    loading: false,
};

const slice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        startLoading(state) {
            state.loading = true;
        },
        stopLoading(state) {
            state.loading = false;
        },
        hasError(state, action) {
            state.error = action.payload;
            state.loading = false;
        },
        getTenantsSuccess(state, action) {
            state.tenants = action.payload;
            state.total = action.payload.total;
            state.loading = false;
        },
        getTenantByIdSuccess(state, action) {
            state.tenant = action.payload;
            state.loading = false;
        },
        createTenantSuccess(state, action) {
            state.tenants.push(action.payload);
            state.loading = false;
        },
        updateTenantSuccess(state, action) {
            const index = state.tenants.findIndex(tenant => tenant.id === action.payload.id);
            if (index !== -1) {
                state.tenants[index] = action.payload;
            }
            state.loading = false;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTenants(params) {
    return async () => {
        try {
            dispatch(slice.actions.startLoading());
            const response = await backendApiCall.get('/tenants', { params });
            dispatch(slice.actions.getTenantsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function getTenantById(id) {
    return async () => {
        try {
            dispatch(slice.actions.startLoading());
            const response = await backendApiCall.get(`/tenants/id/${id}`);
            dispatch(slice.actions.getTenantByIdSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function createTenant(data) {
    return async () => {
        try {
            dispatch(slice.actions.startLoading());
            const response = await backendApiCall.post('/tenants', data);
            dispatch(slice.actions.createTenantSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}

export function updateTenant(id, data) {
    return async () => {
        try {
            dispatch(slice.actions.startLoading());
            const response = await backendApiCall.put(`/tenants/${id}`, data);
            dispatch(slice.actions.updateTenantSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}
