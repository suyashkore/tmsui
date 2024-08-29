import { useState, useCallback } from 'react';
import GeoHierarchyApi from '../api/GeoHierarchyApi';

/**
 * Custom hook to interact with the GeoHierarchy API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete geo-hierarchies, 
 * download templates, export geo-hierarchies, and import geo-hierarchies,
 * while managing loading and error states.
 */
const useGeoHierarchyApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all geo-hierarchies with optional query parameters.
     */
    const fetchGeoHierarchies = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.getGeoHierarchies(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a geo-hierarchy by its ID.
     */
    const fetchGeoHierarchyById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const geoHierarchy = await GeoHierarchyApi.getGeoHierarchyById(id);
            return geoHierarchy;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new geo-hierarchy.
     */
    const createGeoHierarchy = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newGeoHierarchy = await GeoHierarchyApi.createGeoHierarchy(data);
            return newGeoHierarchy;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing geo-hierarchy by its ID.
     */
    const updateGeoHierarchy = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedGeoHierarchy = await GeoHierarchyApi.updateGeoHierarchy(id, data);
            return updatedGeoHierarchy;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a geo-hierarchy by its ID.
     */
    const deactivateGeoHierarchy = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.deactivateGeoHierarchy(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a geo-hierarchy by its ID.
     */
    const deleteGeoHierarchy = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.deleteGeoHierarchy(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the geo-hierarchy XLSX template.
     */
    const downloadGeoHierarchyTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.downloadGeoHierarchyTemplate();
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export geo-hierarchies to an XLSX file.
     * @param {Object} params - Query parameters like country, state, etc.
     */
    const exportGeoHierarchies = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.exportGeoHierarchies(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import geo-hierarchies from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importGeoHierarchies = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await GeoHierarchyApi.importGeoHierarchies(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchGeoHierarchies,
        fetchGeoHierarchyById,
        createGeoHierarchy,
        updateGeoHierarchy,
        deactivateGeoHierarchy,
        deleteGeoHierarchy,
        downloadGeoHierarchyTemplate,
        exportGeoHierarchies,
        importGeoHierarchies,
        loading,
        error,
    };
};

export default useGeoHierarchyApi;
