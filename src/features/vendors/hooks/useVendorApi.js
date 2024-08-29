// tmsui/src/features/vendors/hooks/useVendorApi.js

import { useState, useCallback } from 'react';
import VendorApi from '../api/VendorApi';

/**
 * Custom hook to interact with the Vendor API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete vendors, 
 * upload files, download templates, export vendors, and import vendors,
 * while managing loading and error states.
 */
const useVendorApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all vendors with optional query parameters.
     */
    const fetchVendors = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.getVendors(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a vendor by its ID.
     */
    const fetchVendorById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const vendor = await VendorApi.getVendorById(id);
            return vendor;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new vendor.
     */
    const createVendor = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newVendor = await VendorApi.createVendor(data);
            return newVendor;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing vendor by its ID.
     */
    const updateVendor = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedVendor = await VendorApi.updateVendor(id, data);
            return updatedVendor;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a vendor by its ID.
     */
    const deactivateVendor = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.deactivateVendor(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a vendor by its ID.
     */
    const deleteVendor = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.deleteVendor(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a vendor.
     */
    const uploadVendorImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.uploadVendorImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the vendor XLSX template.
     */
    const downloadVendorTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.downloadVendorTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export vendors to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportVendors = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.exportVendors(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import vendors from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importVendors = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await VendorApi.importVendors(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchVendors,
        fetchVendorById,
        createVendor,
        updateVendor,
        deactivateVendor,
        deleteVendor,
        uploadVendorImgOrFile,
        downloadVendorTemplate,
        exportVendors,
        importVendors,
        loading,
        error,
    };
};

export default useVendorApi;
