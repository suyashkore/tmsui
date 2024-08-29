// tmsui/src/features/vendors/api/VendorApi.js

import backendApiCall from 'utils/backendApiCall';
import { Vendor } from '../models/VendorModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Vendor API - Handles all the backend API calls for vendor-related actions.
 */
const VendorApi = {
    /**
     * Fetches all vendors with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Vendor[], total: number }>} The list of vendors and the total count.
     */
    async getVendors(params = {}) {
        try {
            const response = await backendApiCall.get('/vendors', { params });
            const vendors = response.data.data.map((vendor) => Vendor.fromApiResponse(vendor));
            return { data: vendors, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single vendor by its ID.
     * @param {number} id - The vendor ID.
     * @returns {Promise<Vendor>} The fetched vendor.
     */
    async getVendorById(id) {
        try {
            const response = await backendApiCall.get(`/vendors/id/${id}`);
            return Vendor.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new vendor.
     * @param {Object} data - The vendor data.
     * @returns {Promise<Vendor>} The created vendor.
     */
    async createVendor(data) {
        try {
            const response = await backendApiCall.post('/vendors', data);
            return Vendor.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing vendor by its ID.
     * @param {number} id - The vendor ID.
     * @param {Object} data - The updated vendor data.
     * @returns {Promise<Vendor>} The updated vendor.
     */
    async updateVendor(id, data) {
        try {
            const response = await backendApiCall.put(`/vendors/${id}`, data);
            return Vendor.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a vendor by its ID.
     * @param {number} id - The vendor ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateVendor(id) {
        try {
            const response = await backendApiCall.patch(`/vendors/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a vendor by its ID.
     * @param {number} id - The vendor ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteVendor(id) {
        try {
            const response = await backendApiCall.delete(`/vendors/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a vendor.
     * @param {number} id - The vendor ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadVendorImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/vendors/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the vendor XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadVendorTemplate() {
        try {
            const response = await backendApiCall.get('/vendors/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'vendor_template.xlsx';

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
     * Exports vendors to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportVendors(params = {}) {
        try {
            const response = await backendApiCall.get('/vendors/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'vendor_export.xlsx';

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
     * Imports vendors from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importVendors(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/vendors/import/xlsx', formData);
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

export default VendorApi;
