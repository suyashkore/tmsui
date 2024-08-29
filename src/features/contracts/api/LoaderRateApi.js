// tmsui/src/features/contracts/api/LoaderRateApi.js

import backendApiCall from 'utils/backendApiCall';
import { LoaderRate } from '../models/LoaderRateModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';

/**
 * LoaderRate API - Handles all the backend API calls for loader rate-related actions.
 */
const LoaderRateApi = {
    /**
     * Fetches all loader rates with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: LoaderRate[], total: number }>} The list of loader rates and the total count.
     */
    async getLoaderRates(params = {}) {
        try {
            const response = await backendApiCall.get('/contracts/loaderrates', { params });
            const loaderRates = response.data.data.map((rate) => LoaderRate.fromApiResponse(rate));
            return { data: loaderRates, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single loader rate by its ID.
     * @param {number} id - The loader rate ID.
     * @returns {Promise<LoaderRate>} The fetched loader rate.
     */
    async getLoaderRateById(id) {
        try {
            const response = await backendApiCall.get(`/contracts/loaderrates/id/${id}`);
            return LoaderRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new loader rate.
     * @param {Object} data - The loader rate data.
     * @returns {Promise<LoaderRate>} The created loader rate.
     */
    async createLoaderRate(data) {
        try {
            const response = await backendApiCall.post('/contracts/loaderrates', data);
            return LoaderRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing loader rate by its ID.
     * @param {number} id - The loader rate ID.
     * @param {Object} data - The updated loader rate data.
     * @returns {Promise<LoaderRate>} The updated loader rate.
     */
    async updateLoaderRate(id, data) {
        try {
            const response = await backendApiCall.put(`/contracts/loaderrates/${id}`, data);
            return LoaderRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a loader rate by its ID.
     * @param {number} id - The loader rate ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateLoaderRate(id) {
        try {
            const response = await backendApiCall.patch(`/contracts/loaderrates/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a loader rate by its ID.
     * @param {number} id - The loader rate ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteLoaderRate(id) {
        try {
            const response = await backendApiCall.delete(`/contracts/loaderrates/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Imports loader rates from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<Object>} The import result details.
     */
    async importLoaderRates(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/contracts/loaderrates/import/xlsx', formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Exports loader rates to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportLoaderRates(params = {}) {
        try {
            const response = await backendApiCall.get('/contracts/loaderrates/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'loader_rates_export.xlsx';

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    }
};

export default LoaderRateApi;
