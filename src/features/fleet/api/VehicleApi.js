// tmsui/src/features/fleet/api/VehicleApi.js

import backendApiCall from 'utils/backendApiCall';
import { Vehicle } from '../models/VehicleModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Vehicle API - Handles all the backend API calls for vehicle-related actions.
 */
const VehicleApi = {
    /**
     * Fetches all vehicles with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Vehicle[], total: number }>} The list of vehicles and the total count.
     */
    async getVehicles(params = {}) {
        try {
            const response = await backendApiCall.get('/fleet/vehicles', { params });
            const vehicles = response.data.data.map((vehicle) => Vehicle.fromApiResponse(vehicle));
            return { data: vehicles, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single vehicle by its ID.
     * @param {number} id - The vehicle ID.
     * @returns {Promise<Vehicle>} The fetched vehicle.
     */
    async getVehicleById(id) {
        try {
            const response = await backendApiCall.get(`/fleet/vehicles/id/${id}`);
            return Vehicle.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new vehicle.
     * @param {Object} data - The vehicle data.
     * @returns {Promise<Vehicle>} The created vehicle.
     */
    async createVehicle(data) {
        try {
            const response = await backendApiCall.post('/fleet/vehicles', data);
            return Vehicle.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing vehicle by its ID.
     * @param {number} id - The vehicle ID.
     * @param {Object} data - The updated vehicle data.
     * @returns {Promise<Vehicle>} The updated vehicle.
     */
    async updateVehicle(id, data) {
        try {
            const response = await backendApiCall.put(`/fleet/vehicles/${id}`, data);
            return Vehicle.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a vehicle by its ID.
     * @param {number} id - The vehicle ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateVehicle(id) {
        try {
            const response = await backendApiCall.patch(`/fleet/vehicles/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a vehicle by its ID.
     * @param {number} id - The vehicle ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteVehicle(id) {
        try {
            const response = await backendApiCall.delete(`/fleet/vehicles/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a vehicle.
     * @param {number} id - The vehicle ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadVehicleImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/fleet/vehicles/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the vehicle XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadVehicleTemplate() {
        try {
            const response = await backendApiCall.get('/fleet/vehicles/xlsxtemplate', {
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'vehicle_template.xlsx';

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
     * Exports vehicles to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportVehicles(params = {}) {
        try {
            const response = await backendApiCall.get('/fleet/vehicles/export/xlsx', {
                params,
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'vehicle_export.xlsx';

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
     * Imports vehicles from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importVehicles(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/fleet/vehicles/import/xlsx', formData);
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

export default VehicleApi;
