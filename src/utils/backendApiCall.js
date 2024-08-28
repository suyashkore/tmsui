/**
 * axios setup to use backend and mock service
 */
import axios from 'axios';
import { store } from 'store';
import { LOGOUT } from 'store/actions';
import { openSnackbar } from 'store/slices/snackbar';

// Function to handle logout and cleanup
const cleanupAndLogout = (message) => {
    // Store the message in sessionStorage to persist across refreshes
    sessionStorage.setItem('logoutMessage', message);

    // Perform the usual cleanup and logout
    localStorage.removeItem('jwToken');
    store.dispatch({ type: LOGOUT });

    // Redirect to the login page
    window.location.href = `${import.meta.env.VITE_UI_APP_CONTEXT_ROOT_URL}/`;
};

// Create Axios instance for backend API calls
const backendApiCall = axios.create({
    baseURL: `${import.meta.env.VITE_BACKEND_API_URL}${import.meta.env.VITE_BACKEND_API_BASE_NAME}` || 'http://localhost:8000/tapi/v1/',
});

// ==============================|| AXIOS - FOR BACKEND SERVICES ||============================== //

backendApiCall.interceptors.request.use(
    (config) => {
        const jwToken = localStorage.getItem('jwToken');
        if (jwToken && !config.url.includes('/userauth/')) {
            config.headers['Authorization'] = `Bearer ${jwToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

backendApiCall.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            const errorMessage = data.error || 'An error occurred';

            switch (status) {
                case 401:
                    cleanupAndLogout(errorMessage);
                    break;
                case 403:
                    store.dispatch(openSnackbar({
                        open: true,
                        message: errorMessage,
                        anchorOrigin: { vertical: 'top', horizontal: 'center' }, // Set the position to top-center
                        autoHideDuration: 15000 // Set the duration to 15 seconds
                    }));
                    break;
                default:
                    console.error(errorMessage);
            }
        } else {
            // Handle non-API errors like network issues or server unavailability
            store.dispatch(openSnackbar({
                open: true,
                message: 'Network error: Please check your connection or try again later.',
                anchorOrigin: { vertical: 'top', horizontal: 'center' }, // Set the position to top-center
                autoHideDuration: 15000 // Set the duration to 15 seconds
            }));
        }
        return Promise.reject(error.response && error.response.data ? error.response.data : 'Wrong Services');
    }
);

export default backendApiCall;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];
    const res = await backendApiCall.get(url, { ...config });
    return res.data;
};
