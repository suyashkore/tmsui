// tmsui/src/features/places/hooks/useStationCoverageApi.js

import { useState, useCallback } from 'react';
import StationCoverageApi from '../api/StationCoverageApi';

/**
 * Custom hook to interact with the StationCoverage API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete station coverages, 
 * upload files, download templates, export station coverages, and import station coverages,
 * while managing loading and error states.
 */
const useStationCoverageApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all station coverages with optional query parameters.
     */
    const fetchStationCoverages = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.getStationCoverages(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a station coverage by its ID.
     */
    const fetchStationCoverageById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const stationCoverage = await StationCoverageApi.getStationCoverageById(id);
            return stationCoverage;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new station coverage.
     */
    const createStationCoverage = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newStationCoverage = await StationCoverageApi.createStationCoverage(data);
            return newStationCoverage;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing station coverage by its ID.
     */
    const updateStationCoverage = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedStationCoverage = await StationCoverageApi.updateStationCoverage(id, data);
            return updatedStationCoverage;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a station coverage by its ID.
     */
    const deactivateStationCoverage = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.deactivateStationCoverage(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a station coverage by its ID.
     */
    const deleteStationCoverage = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.deleteStationCoverage(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a station coverage.
     */
    const uploadStationCoverageImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.uploadStationCoverageImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the station coverage XLSX template.
     */
    const downloadStationCoverageTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.downloadStationCoverageTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export station coverages to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportStationCoverages = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.exportStationCoverages(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import station coverages from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importStationCoverages = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await StationCoverageApi.importStationCoverages(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchStationCoverages,
        fetchStationCoverageById,
        createStationCoverage,
        updateStationCoverage,
        deactivateStationCoverage,
        deleteStationCoverage,
        uploadStationCoverageImgOrFile,
        downloadStationCoverageTemplate,
        exportStationCoverages,
        importStationCoverages,
        loading,
        error,
    };
};

export default useStationCoverageApi;
