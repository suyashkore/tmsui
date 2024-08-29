// tmsui/src/features/fleet/hooks/useVehicleApi.js

import { useState, useCallback } from 'react';
import VehicleApi from '../api/VehicleApi';

/**
 * Custom hook to interact with the Vehicle API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete vehicles, 
 * upload files, download templates, export vehicles, and import vehicles,
 * while managing loading and error states.
 */
const useVehicleApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all vehicles with optional query parameters.
     */
    const fetchVehicles = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.getVehicles(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a vehicle by its ID.
     */
    const fetchVehicleById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const vehicle = await VehicleApi.getVehicleById(id);
            return vehicle;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new vehicle.
     */
    const createVehicle = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newVehicle = await VehicleApi.createVehicle(data);
            return newVehicle;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing vehicle by its ID.
     */
    const updateVehicle = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedVehicle = await VehicleApi.updateVehicle(id, data);
            return updatedVehicle;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a vehicle by its ID.
     */
    const deactivateVehicle = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.deactivateVehicle(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a vehicle by its ID.
     */
    const deleteVehicle = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.deleteVehicle(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a vehicle.
     */
    const uploadVehicleImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.uploadVehicleImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the vehicle XLSX template.
     */
    const downloadVehicleTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.downloadVehicleTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export vehicles to an XLSX file.
     * @param {Object} params - Query parameters like active status, etc.
     */
    const exportVehicles = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.exportVehicles(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import vehicles from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importVehicles = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VehicleApi.importVehicles(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchVehicles,
        fetchVehicleById,
        createVehicle,
        updateVehicle,
        deactivateVehicle,
        deleteVehicle,
        uploadVehicleImgOrFile,
        downloadVehicleTemplate,
        exportVehicles,
        importVehicles,
        loading,
        error,
    };
};

export default useVehicleApi;
