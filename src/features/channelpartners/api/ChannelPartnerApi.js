// tmsui/src/features/channelpartners/api/ChannelPartnerApi.js

import backendApiCall from 'utils/backendApiCall';
import { ChannelPartner } from '../models/ChannelPartnerModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * ChannelPartner API - Handles all the backend API calls for channel partner-related actions.
 */
const ChannelPartnerApi = {
    /**
     * Fetches all channel partners with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: ChannelPartner[], total: number }>} The list of channel partners and the total count.
     */
    async getChannelPartners(params = {}) {
        try {
            const response = await backendApiCall.get('/offices/cpkycs', { params });
            const channelPartners = response.data.data.map((partner) => ChannelPartner.fromApiResponse(partner));
            return { data: channelPartners, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single channel partner by its ID.
     * @param {number} id - The channel partner ID.
     * @returns {Promise<ChannelPartner>} The fetched channel partner.
     */
    async getChannelPartnerById(id) {
        try {
            const response = await backendApiCall.get(`/offices/cpkycs/id/${id}`);
            return ChannelPartner.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new channel partner.
     * @param {Object} data - The channel partner data.
     * @returns {Promise<ChannelPartner>} The created channel partner.
     */
    async createChannelPartner(data) {
        try {
            const response = await backendApiCall.post('/offices/cpkycs', data);
            return ChannelPartner.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing channel partner by its ID.
     * @param {number} id - The channel partner ID.
     * @param {Object} data - The updated channel partner data.
     * @returns {Promise<ChannelPartner>} The updated channel partner.
     */
    async updateChannelPartner(id, data) {
        try {
            const response = await backendApiCall.put(`/offices/cpkycs/${id}`, data);
            return ChannelPartner.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a channel partner by its ID.
     * @param {number} id - The channel partner ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateChannelPartner(id) {
        try {
            const response = await backendApiCall.patch(`/offices/cpkycs/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a channel partner by its ID.
     * @param {number} id - The channel partner ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteChannelPartner(id) {
        try {
            const response = await backendApiCall.delete(`/offices/cpkycs/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a channel partner.
     * @param {number} id - The channel partner ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadChannelPartnerImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/offices/cpkycs/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the channel partner XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadChannelPartnerTemplate() {
        try {
            // Make the API call with `responseType: 'blob'` to treat the response as a file
            const response = await backendApiCall.get('/offices/cpkycs/xlsxtemplate', {
                responseType: 'blob'
            });

            // Normalize headers to handle case insensitivity
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '') // Remove any quotes around the filename
                : 'channel_partner_template.xlsx'; // Fallback filename if not present

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
     * Exports channel partners to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportChannelPartners(params = {}) {
        try {
            // Make the API call with `responseType: 'blob'` to treat the response as a file
            const response = await backendApiCall.get('/offices/cpkycs/export/xlsx', {
                params,
                responseType: 'blob'
            });

            // Normalize headers to handle case insensitivity
            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '') // Remove any quotes around the filename
                : 'channel_partner_export.xlsx'; // Fallback filename if not present

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
     * Imports channel partners from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importChannelPartners(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/offices/cpkycs/import/xlsx', formData);
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

export default ChannelPartnerApi;
