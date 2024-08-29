// tmsui/src/features/offices/hooks/useOfficeApi.js

import { useState, useCallback } from 'react';
import OfficeApi from '../api/OfficeApi';

/**
 * Custom hook to interact with the Office API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete offices, 
 * upload files, download templates, export offices, and import offices,
 * while managing loading and error states.
 */
const useOfficeApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all offices with optional query parameters.
     */
    const fetchOffices = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.getOffices(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch an office by its ID.
     */
    const fetchOfficeById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const office = await OfficeApi.getOfficeById(id);
            return office;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new office.
     */
    const createOffice = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newOffice = await OfficeApi.createOffice(data);
            return newOffice;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing office by its ID.
     */
    const updateOffice = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedOffice = await OfficeApi.updateOffice(id, data);
            return updatedOffice;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate an office by its ID.
     */
    const deactivateOffice = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.deactivateOffice(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete an office by its ID.
     */
    const deleteOffice = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.deleteOffice(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for an office.
     */
    const uploadOfficeImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.uploadOfficeImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the office XLSX template.
     */
    const downloadOfficeTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.downloadOfficeTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export offices to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportOffices = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.exportOffices(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import offices from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importOffices = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await OfficeApi.importOffices(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchOffices,
        fetchOfficeById,
        createOffice,
        updateOffice,
        deactivateOffice,
        deleteOffice,
        uploadOfficeImgOrFile,
        downloadOfficeTemplate,
        exportOffices,
        importOffices,
        loading,
        error,
    };
};

export default useOfficeApi;
