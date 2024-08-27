import backendApiCall from 'utils/backendApiCall';
import { Tenant } from '../models/TenantModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';

/**
 * Tenant API - Handles all the backend API calls for tenant-related actions.
 */
const TenantApi = {
    /**
     * Fetches all tenants with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Tenant[], total: number }>} The list of tenants and the total count.
     */
    async getTenants(params = {}) {
        try {
            const response = await backendApiCall.get('/tenants', { params });
            const tenants = response.data.data.map((tenant) => Tenant.fromApiResponse(tenant));
            return { data: tenants, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single tenant by its ID.
     * @param {number} id - The tenant ID.
     * @returns {Promise<Tenant>} The fetched tenant.
     */
    async getTenantById(id) {
        try {
            const response = await backendApiCall.get(`/tenants/id/${id}`);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new tenant.
     * @param {Object} data - The tenant data.
     * @returns {Promise<Tenant>} The created tenant.
     */
    async createTenant(data) {
        try {
            const response = await backendApiCall.post('/tenants', data);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing tenant by its ID.
     * @param {number} id - The tenant ID.
     * @param {Object} data - The updated tenant data.
     * @returns {Promise<Tenant>} The updated tenant.
     */
    async updateTenant(id, data) {
        try {
            const response = await backendApiCall.put(`/tenants/${id}`, data);
            return Tenant.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a tenant by its ID.
     * @param {number} id - The tenant ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateTenant(id) {
        try {
            const response = await backendApiCall.patch(`/tenants/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a tenant by its ID.
     * @param {number} id - The tenant ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteTenant(id) {
        try {
            const response = await backendApiCall.delete(`/tenants/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a tenant.
     * @param {number} id - The tenant ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadTenantFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/tenants/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the tenant XLSX template.
     * @returns {Promise<Blob>} The XLSX file blob.
     */
    async downloadTenantTemplate() {
        try {
            const response = await backendApiCall.get('/tenants/xlsxtemplate', {
                responseType: 'blob' // Ensure response is treated as a file
            });
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    }
};

export default TenantApi;