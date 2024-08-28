import backendApiCall from 'utils/backendApiCall';
import { Tenant } from '../models/TenantModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';


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
    async uploadTenantImgOrFile(id, file, fieldName) {
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
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadTenantTemplate() {
        try {
            // Make the API call with `responseType: 'blob'` to treat the response as a file
            const response = await backendApiCall.get('/tenants/xlsxtemplate', {
                responseType: 'blob'
            });

            // Normalize headers to handle case insensitivity
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '') // Remove any quotes around the filename
                : 'tenant_template.xlsx'; // Fallback filename if not present

            // Create a URL for the blob and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the correct filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up the DOM after triggering the download
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Exports tenants to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportTenants(params = {}) {
        try {
            // Make the API call with `responseType: 'blob'` to treat the response as a file
            const response = await backendApiCall.get('/tenants/export/xlsx', {
                params,
                responseType: 'blob'
            });

            // Normalize headers to handle case insensitivity
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '') // Remove any quotes around the filename
                : 'tenant_export.xlsx'; // Fallback filename if not present

            // Create a URL for the blob and trigger the download
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename); // Set the correct filename
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link); // Clean up the DOM after triggering the download
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Imports tenants from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importTenants(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/tenants/import/xlsx', formData);
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

export default TenantApi;
