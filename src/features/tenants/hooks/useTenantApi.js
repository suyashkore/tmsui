import { useState, useCallback } from 'react';
import TenantApi from '../api/TenantApi';

/**
 * Custom hook to interact with the Tenant API.
 * 
 * This hook provides methods to fetch, create, and update tenants
 * while managing loading and error states.
 */
const useTenantApi = () => {
    // Local state for managing loading and error states
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all tenants with optional query parameters.
     * 
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Tenant[], total: number }>} The list of tenants and the total count.
     */
    const fetchTenants = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null); // Reset error before making the API call
            const response = await TenantApi.getTenants(params);
            return response; // Return the tenant data to the caller
        } catch (err) {
            setError(err); // Set error if the API call fails
            throw err; // Re-throw the error so the caller can handle it
        } finally {
            setLoading(false); // Always stop the loading state after the API call completes
        }
    }, []);

    /**
     * Fetch a tenant by its ID.
     * 
     * @param {number} id - The tenant ID.
     * @returns {Promise<Tenant>} The fetched tenant.
     */
    const fetchTenantById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null); // Reset error before making the API call
            const tenant = await TenantApi.getTenantById(id);
            return tenant; // Return the fetched tenant data to the caller
        } catch (err) {
            setError(err); // Set error if the API call fails
            throw err; // Re-throw the error so the caller can handle it
        } finally {
            setLoading(false); // Always stop the loading state after the API call completes
        }
    }, []);

    /**
     * Create a new tenant.
     * 
     * @param {Object} data - The tenant data to create.
     * @returns {Promise<Tenant>} The created tenant.
     */
    const createTenant = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null); // Reset error before making the API call
            const newTenant = await TenantApi.createTenant(data);
            return newTenant; // Return the created tenant data to the caller
        } catch (err) {
            setError(err); // Set error if the API call fails
            throw err; // Re-throw the error so the caller can handle it
        } finally {
            setLoading(false); // Always stop the loading state after the API call completes
        }
    }, []);

    /**
     * Update an existing tenant by its ID.
     * 
     * @param {number} id - The tenant ID.
     * @param {Object} data - The updated tenant data.
     * @returns {Promise<Tenant>} The updated tenant.
     */
    const updateTenant = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null); // Reset error before making the API call
            const updatedTenant = await TenantApi.updateTenant(id, data);
            return updatedTenant; // Return the updated tenant data to the caller
        } catch (err) {
            setError(err); // Set error if the API call fails
            throw err; // Re-throw the error so the caller can handle it
        } finally {
            setLoading(false); // Always stop the loading state after the API call completes
        }
    }, []);

    return {
        fetchTenants,
        fetchTenantById,
        createTenant,
        updateTenant,
        loading,
        error,
    };
};

export default useTenantApi;
