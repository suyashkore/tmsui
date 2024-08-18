// third-party
import { createSlice } from '@reduxjs/toolkit';

// project imports
import backendApiCall from 'utils/backendApiCall';
import { dispatch } from '../index';

// ----------------------------------------------------------------------

const initialState = {
    error: null,
    tenants: [],
};

const slice = createSlice({
    name: 'tenant',
    initialState,
    reducers: {
        // HAS ERROR
        hasError(state, action) {
            state.error = action.payload;
        },
        // GET TENANTS
        getTenantsSuccess(state, action) {
            state.customers = action.payload;
        }
    }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function getTenants() {
    return async () => {
        try {
            const response = await backendApiCall.get('/tenants');
            dispatch(slice.actions.getTenantsSuccess(response.data));
        } catch (error) {
            dispatch(slice.actions.hasError(error));
        }
    };
}