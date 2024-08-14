// third-party
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// project imports
import snackbarReducer from './slices/snackbar';

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

const rootReducer = combineReducers({
    snackbar: snackbarReducer,
    placeholder: placeholderPersistedReducer // Placeholder persisted reducer
    
});

export default rootReducer;
