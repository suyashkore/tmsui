// tmsui/src/features/offices/api/OfficeApi.js

import backendApiCall from 'utils/backendApiCall';
import { Office } from '../models/OfficeModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Office API - Handles all the backend API calls for office-related actions.
 */
const OfficeApi = {
    /**
     * Fetches all offices with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Office[], total: number }>} The list of offices and the total count.
     */
    async getOffices(params = {}) {
        try {
            const response = await backendApiCall.get('/offices', { params });
            const offices = response.data.data.map((office) => Office.fromApiResponse(office));
            return { data: offices, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single office by its ID.
     * @param {number} id - The office ID.
     * @returns {Promise<Office>} The fetched office.
     */
    async getOfficeById(id) {
        try {
            const response = await backendApiCall.get(`/offices/id/${id}`);
            return Office.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new office.
     * @param {Object} data - The office data.
     * @returns {Promise<Office>} The created office.
     */
    async createOffice(data) {
        try {
            const response = await backendApiCall.post('/offices', data);
            return Office.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing office by its ID.
     * @param {number} id - The office ID.
     * @param {Object} data - The updated office data.
     * @returns {Promise<Office>} The updated office.
     */
    async updateOffice(id, data) {
        try {
            const response = await backendApiCall.put(`/offices/${id}`, data);
            return Office.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates an office by its ID.
     * @param {number} id - The office ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateOffice(id) {
        try {
            const response = await backendApiCall.patch(`/offices/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes an office by its ID.
     * @param {number} id - The office ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteOffice(id) {
        try {
            const response = await backendApiCall.delete(`/offices/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for an office.
     * @param {number} id - The office ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadOfficeImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/offices/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the office XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadOfficeTemplate() {
        try {
            const response = await backendApiCall.get('/offices/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'office_template.xlsx';

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
     * Exports offices to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportOffices(params = {}) {
        try {
            const response = await backendApiCall.get('/offices/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'office_export.xlsx';

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
     * Imports offices from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importOffices(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/offices/import/xlsx', formData);
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

export default OfficeApi;
