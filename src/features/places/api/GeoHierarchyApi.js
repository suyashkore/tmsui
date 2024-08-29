import backendApiCall from 'utils/backendApiCall';
import { GeoHierarchy } from '../models/GeoHierarchyModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * GeoHierarchy API - Handles all the backend API calls for geo-hierarchy-related actions.
 */
const GeoHierarchyApi = {
    /**
     * Fetches all geo-hierarchies with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: GeoHierarchy[], total: number }>} The list of geo-hierarchies and the total count.
     */
    async getGeoHierarchies(params = {}) {
        try {
            const response = await backendApiCall.get('/geohierarchies', { params });
            const geoHierarchies = response.data.data.map((item) => GeoHierarchy.fromApiResponse(item));
            return { data: geoHierarchies, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single geo-hierarchy by its ID.
     * @param {number} id - The geo-hierarchy ID.
     * @returns {Promise<GeoHierarchy>} The fetched geo-hierarchy.
     */
    async getGeoHierarchyById(id) {
        try {
            const response = await backendApiCall.get(`/geohierarchies/id/${id}`);
            return GeoHierarchy.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new geo-hierarchy.
     * @param {Object} data - The geo-hierarchy data.
     * @returns {Promise<GeoHierarchy>} The created geo-hierarchy.
     */
    async createGeoHierarchy(data) {
        try {
            const response = await backendApiCall.post('/geohierarchies', data);
            return GeoHierarchy.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing geo-hierarchy by its ID.
     * @param {number} id - The geo-hierarchy ID.
     * @param {Object} data - The updated geo-hierarchy data.
     * @returns {Promise<GeoHierarchy>} The updated geo-hierarchy.
     */
    async updateGeoHierarchy(id, data) {
        try {
            const response = await backendApiCall.put(`/geohierarchies/${id}`, data);
            return GeoHierarchy.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a geo-hierarchy by its ID.
     * @param {number} id - The geo-hierarchy ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateGeoHierarchy(id) {
        try {
            const response = await backendApiCall.patch(`/geohierarchies/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a geo-hierarchy by its ID.
     * @param {number} id - The geo-hierarchy ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteGeoHierarchy(id) {
        try {
            const response = await backendApiCall.delete(`/geohierarchies/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the geo-hierarchy XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadGeoHierarchyTemplate() {
        try {
            const response = await backendApiCall.get('/geohierarchies/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'geo_hierarchy_template.xlsx';

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
     * Exports geo-hierarchies to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like country, state, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportGeoHierarchies(params = {}) {
        try {
            const response = await backendApiCall.get('/geohierarchies/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'geo_hierarchies_export.xlsx';

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
     * Imports geo-hierarchies from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importGeoHierarchies(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/geohierarchies/import/xlsx', formData);
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

export default GeoHierarchyApi;
