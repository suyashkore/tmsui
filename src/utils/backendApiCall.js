/**
 * axios setup to use mock service
 */

import axios from 'axios';

const backendApiCall = axios.create({ baseURL: import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:8000/tapi/v1/' });

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

backendApiCall.interceptors.request.use(
    async (config) => {
        const jwToken = localStorage.getItem('jwToken');
        if (jwToken) {
            config.headers['Authorization'] = `Bearer ${jwToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

backendApiCall.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401 && !window.location.href.includes('/')) {
            window.location.pathname = '/';
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
