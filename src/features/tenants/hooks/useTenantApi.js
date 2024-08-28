import { useState, useCallback } from 'react';
import TenantApi from '../api/TenantApi';

/**
 * Custom hook to interact with the Tenant API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete tenants, 
 * upload files, download templates, export tenants, and import tenants,
 * while managing loading and error states.
 */
const useTenantApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all tenants with optional query parameters.
     */
    const fetchTenants = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.getTenants(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a tenant by its ID.
     */
    const fetchTenantById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const tenant = await TenantApi.getTenantById(id);
            return tenant;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new tenant.
     */
    const createTenant = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newTenant = await TenantApi.createTenant(data);
            return newTenant;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing tenant by its ID.
     */
    const updateTenant = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedTenant = await TenantApi.updateTenant(id, data);
            return updatedTenant;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a tenant by its ID.
     */
    const deactivateTenant = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.deactivateTenant(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a tenant by its ID.
     */
    const deleteTenant = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.deleteTenant(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a tenant.
     */
    const uploadTenantImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.uploadTenantImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the tenant XLSX template.
     */
    const downloadTenantTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.downloadTenantTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export tenants to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportTenants = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.exportTenants(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import tenants from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importTenants = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await TenantApi.importTenants(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchTenants,
        fetchTenantById,
        createTenant,
        updateTenant,
        deactivateTenant,
        deleteTenant,
        uploadTenantImgOrFile,
        downloadTenantTemplate,
        exportTenants, // Added export function
        importTenants, // Added import function
        loading,
        error,
    };
};

export default useTenantApi;
