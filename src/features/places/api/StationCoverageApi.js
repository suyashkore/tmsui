// tmsui/src/features/places/api/StationCoverageApi.js

import backendApiCall from 'utils/backendApiCall';
import { StationCoverage } from '../models/StationCoverageModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * StationCoverage API - Handles all the backend API calls for station coverage-related actions.
 */
const StationCoverageApi = {
    /**
     * Fetches all station coverages with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: StationCoverage[], total: number }>} The list of station coverages and the total count.
     */
    async getStationCoverages(params = {}) {
        try {
            const response = await backendApiCall.get('/stationcoverages', { params });
            const stationCoverages = response.data.data.map((stationCoverage) =>
                StationCoverage.fromApiResponse(stationCoverage)
            );
            return { data: stationCoverages, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single station coverage by its ID.
     * @param {number} id - The station coverage ID.
     * @returns {Promise<StationCoverage>} The fetched station coverage.
     */
    async getStationCoverageById(id) {
        try {
            const response = await backendApiCall.get(`/stationcoverages/id/${id}`);
            return StationCoverage.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new station coverage.
     * @param {Object} data - The station coverage data.
     * @returns {Promise<StationCoverage>} The created station coverage.
     */
    async createStationCoverage(data) {
        try {
            const response = await backendApiCall.post('/stationcoverages', data);
            return StationCoverage.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing station coverage by its ID.
     * @param {number} id - The station coverage ID.
     * @param {Object} data - The updated station coverage data.
     * @returns {Promise<StationCoverage>} The updated station coverage.
     */
    async updateStationCoverage(id, data) {
        try {
            const response = await backendApiCall.put(`/stationcoverages/${id}`, data);
            return StationCoverage.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a station coverage by its ID.
     * @param {number} id - The station coverage ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateStationCoverage(id) {
        try {
            const response = await backendApiCall.patch(`/stationcoverages/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a station coverage by its ID.
     * @param {number} id - The station coverage ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteStationCoverage(id) {
        try {
            const response = await backendApiCall.delete(`/stationcoverages/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the station coverage XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadStationCoverageTemplate() {
        try {
            const response = await backendApiCall.get('/stationcoverages/xlsxtemplate', {
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'station_coverage_template.xlsx';

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
     * Exports station coverages to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportStationCoverages(params = {}) {
        try {
            const response = await backendApiCall.get('/stationcoverages/export/xlsx', {
                params,
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'station_coverage_export.xlsx';

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
     * Imports station coverages from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importStationCoverages(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/stationcoverages/import/xlsx', formData);
            return ImportApiResponse.fromApiResponse(response.data);
        } catch (error) {
            if (error.data) {
                throw ImportApiErrorResponse.fromApiResponse(error);
            } else {
                throw ApiErrorResponse.fromApiResponse(error);
            }
        }
    },
};

export default StationCoverageApi;
