/**
 * axios setup to use mock service
 */

import axios from 'axios';
import useAuth from 'hooks/useAuth';

// Function to handle logout
const handleLogout = async () => {
    try {
        const { logout } = useAuth(); // Moved useAuth inside the function
        await logout();
    } catch (err) {
        console.error(err);
    }
};

// Create Axios instance for backend API calls
const backendApiCall = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000/tapi/v1/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// ==============================|| AXIOS - FOR BACKEND SERVICES ||============================== //

backendApiCall.interceptors.request.use(
    async (config) => {
        const jwToken = localStorage.getItem('jwToken');
        if (jwToken && !config.url.includes('/userauth/')) {
            config.headers['Authorization'] = `Bearer ${jwToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Function to handle token removal, user context clearing, and redirection
const handleAuthError = (message) => {
    handleLogout();
    const encodedMessage = encodeURIComponent(message);
    window.location.href = `/?message=${encodedMessage}`;
};

backendApiCall.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            const { status, data } = error.response;
            console.error(data.error);
            switch (status) {
                case 401:
                    switch (data.error) {
                        case 'Token is invalid':
                            handleAuthError('Please relogin. Auth token is invalid.');
                            break;
                        case 'Token has expired':
                            handleAuthError('Please relogin. Auth token has expired.');
                            break;
                        case 'Token is not provided':
                            handleAuthError('Please relogin. Auth token is not provided.');
                            break;
                        default:
                            handleAuthError('Please relogin. Unauthorized - missing or malformed auth token.');
                    }
                    break;
                case 403:
                    switch (data.error) {
                        case 'You do not have permission to perform this action':
                        case 'CheckPrivileges resulted in insufficient privileges':
                        default:
                            console.error('Access denied.');
                    }
                    break;
                default:
                    console.error('An error occurred.');
            }
        }
        return Promise.reject((error.response && error.response.data) || 'Wrong Services');
    }
);

export default backendApiCall;

export const fetcher = async (args) => {
    const [url, config] = Array.isArray(args) ? args : [args];

    const res = await backendApiCall.get(url, { ...config });

    return res.data;
};
