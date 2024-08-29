import backendApiCall from 'utils/backendApiCall';
import { DriverRate } from '../models/DriverRateModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * DriverRate API - Handles all the backend API calls for driver rate-related actions.
 */
const DriverRateApi = {
    /**
     * Fetches all driver rates with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: DriverRate[], total: number }>} The list of driver rates and the total count.
     */
    async getDriverRates(params = {}) {
        try {
            const response = await backendApiCall.get('/contracts/driverrates', { params });
            const driverRates = response.data.data.map((driverRate) => DriverRate.fromApiResponse(driverRate));
            return { data: driverRates, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single driver rate by its ID.
     * @param {number} id - The driver rate ID.
     * @returns {Promise<DriverRate>} The fetched driver rate.
     */
    async getDriverRateById(id) {
        try {
            const response = await backendApiCall.get(`/contracts/driverrates/id/${id}`);
            return DriverRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new driver rate.
     * @param {Object} data - The driver rate data.
     * @returns {Promise<DriverRate>} The created driver rate.
     */
    async createDriverRate(data) {
        try {
            const response = await backendApiCall.post('/contracts/driverrates', data);
            return DriverRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing driver rate by its ID.
     * @param {number} id - The driver rate ID.
     * @param {Object} data - The updated driver rate data.
     * @returns {Promise<DriverRate>} The updated driver rate.
     */
    async updateDriverRate(id, data) {
        try {
            const response = await backendApiCall.put(`/contracts/driverrates/${id}`, data);
            return DriverRate.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a driver rate by its ID.
     * @param {number} id - The driver rate ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateDriverRate(id) {
        try {
            const response = await backendApiCall.patch(`/contracts/driverrates/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a driver rate by its ID.
     * @param {number} id - The driver rate ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteDriverRate(id) {
        try {
            const response = await backendApiCall.delete(`/contracts/driverrates/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a driver rate.
     * @param {number} id - The driver rate ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadDriverRateImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/contracts/driverrates/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the driver rate XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadDriverRateTemplate() {
        try {
            const response = await backendApiCall.get('/contracts/driverrates/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'driverrate_template.xlsx';

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
    },

    /**
     * Exports driver rates to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportDriverRates(params = {}) {
        try {
            const response = await backendApiCall.get('/contracts/driverrates/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'driverrate_export.xlsx';

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
    },

    /**
     * Imports driver rates from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importDriverRates(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/contracts/driverrates/import/xlsx', formData);
            return ImportApiResponse.fromApiResponse(response.data);
        } catch (error) {
            if (error.data) {
                throw ImportApiErrorResponse.fromApiResponse(error);
            } else {
                throw ApiErrorResponse.fromApiResponse(error);
            }
        }
    }
};

export default DriverRateApi;
