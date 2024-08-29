// tmsui/src/features/contracts/hooks/useLoaderRateApi.js

import { useState, useCallback } from 'react';
import LoaderRateApi from '../api/LoaderRateApi';

/**
 * Custom hook to interact with the LoaderRate API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete loader rates,
 * and also handles importing, exporting, and managing loading and error states.
 */
const useLoaderRateApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all loader rates with optional query parameters.
     */
    const fetchLoaderRates = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoaderRateApi.getLoaderRates(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a loader rate by its ID.
     */
    const fetchLoaderRateById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const loaderRate = await LoaderRateApi.getLoaderRateById(id);
            return loaderRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new loader rate.
     */
    const createLoaderRate = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newLoaderRate = await LoaderRateApi.createLoaderRate(data);
            return newLoaderRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing loader rate by its ID.
     */
    const updateLoaderRate = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedLoaderRate = await LoaderRateApi.updateLoaderRate(id, data);
            return updatedLoaderRate;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a loader rate by its ID.
     */
    const deactivateLoaderRate = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoaderRateApi.deactivateLoaderRate(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a loader rate by its ID.
     */
    const deleteLoaderRate = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoaderRateApi.deleteLoaderRate(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import loader rates from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<Object>} The import result details.
     */
    const importLoaderRates = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoaderRateApi.importLoaderRates(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export loader rates to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportLoaderRates = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await LoaderRateApi.exportLoaderRates(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchLoaderRates,
        fetchLoaderRateById,
        createLoaderRate,
        updateLoaderRate,
        deactivateLoaderRate,
        deleteLoaderRate,
        importLoaderRates,
        exportLoaderRates,
        loading,
        error,
    };
};

export default useLoaderRateApi;
