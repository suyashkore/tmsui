// tmsui/src/features/customers/hooks/useCustomerApi.js

import { useState, useCallback } from 'react';
import CustomerApi from '../api/CustomerApi';

/**
 * Custom hook to interact with the Customer API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete customers,
 * upload files, download templates, export customers, and import customers,
 * while managing loading and error states.
 */
const useCustomerApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all customers with optional query parameters.
     */
    const fetchCustomers = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.getCustomers(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a customer by its ID.
     */
    const fetchCustomerById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const customer = await CustomerApi.getCustomerById(id);
            return customer;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new customer.
     */
    const createCustomer = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newCustomer = await CustomerApi.createCustomer(data);
            return newCustomer;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing customer by its ID.
     */
    const updateCustomer = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedCustomer = await CustomerApi.updateCustomer(id, data);
            return updatedCustomer;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a customer by its ID.
     */
    const deactivateCustomer = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.deactivateCustomer(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a customer by its ID.
     */
    const deleteCustomer = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.deleteCustomer(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a customer.
     */
    const uploadCustomerImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.uploadCustomerImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the customer XLSX template.
     */
    const downloadCustomerTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.downloadCustomerTemplate();
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export customers to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportCustomers = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.exportCustomers(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import customers from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importCustomers = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CustomerApi.importCustomers(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchCustomers,
        fetchCustomerById,
        createCustomer,
        updateCustomer,
        deactivateCustomer,
        deleteCustomer,
        uploadCustomerImgOrFile,
        downloadCustomerTemplate,
        exportCustomers,
        importCustomers,
        loading,
        error,
    };
};

export default useCustomerApi;
