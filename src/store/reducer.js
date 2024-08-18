// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import { LOGOUT } from './actions';
import snackbarReducer from './slices/snackbar';
import tenantReducer from './slices/tenant';

// ==============================|| PLACEHOLDER PERSISTED REDUCER ||============================== //

/**
 * A placeholder reducer that serves as a no-op persisted state.
 * This reducer is intentionally kept to maintain the structure of persisted reducers
 * in the application, even when no actual persistence is required.
 * It's primarily used to satisfy configurations that expect a persisted reducer to be present.
 */
const placeholderPersistedReducer = persistReducer(
    {
        key: 'placeholder',
        storage,
        keyPrefix: 'tmsui-'
    },
    (state = {}) => state // No-op reducer function
);

// ==============================|| ROOT REDUCER ||============================== //

const appReducer = combineReducers({
    snackbar: snackbarReducer,
    placeholder: placeholderPersistedReducer, // Placeholder persisted reducer
    tenant: tenantReducer
});

const rootReducer = (state, action) => {
    if (action.type === LOGOUT) {
        // Reset state completely
        state = undefined;
        
        // Optionally clear all persisted data
        Object.keys(localStorage).forEach((key) => {
            if (key.startsWith('persist:')) {
                localStorage.removeItem(key);
            }
        });
    }
    return appReducer(state, action);
};

export default rootReducer;
