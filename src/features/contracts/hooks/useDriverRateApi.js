import { useState, useCallback } from 'react';
import DriverRateApi from '../api/DriverRateApi';

/**
 * Custom hook to interact with the DriverRate API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete driver rates, 
 * upload files, download templates, export driver rates, and import driver rates,
 * while managing loading and error states.
 */
const useDriverRateApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all driver rates with optional query parameters.
     */
    const fetchDriverRates = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.getDriverRates(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a driver rate by its ID.
     */
    const fetchDriverRateById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const driverRate = await DriverRateApi.getDriverRateById(id);
            return driverRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new driver rate.
     */
    const createDriverRate = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newDriverRate = await DriverRateApi.createDriverRate(data);
            return newDriverRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing driver rate by its ID.
     */
    const updateDriverRate = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedDriverRate = await DriverRateApi.updateDriverRate(id, data);
            return updatedDriverRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a driver rate by its ID.
     */
    const deactivateDriverRate = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.deactivateDriverRate(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a driver rate by its ID.
     */
    const deleteDriverRate = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.deleteDriverRate(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a driver rate.
     */
    const uploadDriverRateImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.uploadDriverRateImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the driver rate XLSX template.
     */
    const downloadDriverRateTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.downloadDriverRateTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export driver rates to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportDriverRates = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.exportDriverRates(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import driver rates from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importDriverRates = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await DriverRateApi.importDriverRates(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchDriverRates,
        fetchDriverRateById,
        createDriverRate,
        updateDriverRate,
        deactivateDriverRate,
        deleteDriverRate,
        uploadDriverRateImgOrFile,
        downloadDriverRateTemplate,
        exportDriverRates,
        importDriverRates,
        loading,
        error,
    };
};

export default useDriverRateApi;
