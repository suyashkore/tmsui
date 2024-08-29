import { useState, useCallback } from 'react';
import CompanyApi from '../api/CompanyApi';

/**
 * Custom hook to interact with the Company API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete companies, 
 * upload files, download templates, export companies, and import companies,
 * while managing loading and error states.
 */
const useCompanyApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all companies with optional query parameters.
     */
    const fetchCompanies = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.getCompanies(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a company by its ID.
     */
    const fetchCompanyById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const company = await CompanyApi.getCompanyById(id);
            return company;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new company.
     */
    const createCompany = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newCompany = await CompanyApi.createCompany(data);
            return newCompany;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing company by its ID.
     */
    const updateCompany = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedCompany = await CompanyApi.updateCompany(id, data);
            return updatedCompany;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a company by its ID.
     */
    const deactivateCompany = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.deactivateCompany(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a company by its ID.
     */
    const deleteCompany = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.deleteCompany(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a company.
     */
    const uploadCompanyImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.uploadCompanyImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the company XLSX template.
     */
    const downloadCompanyTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.downloadCompanyTemplate();
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export companies to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportCompanies = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.exportCompanies(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import companies from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importCompanies = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await CompanyApi.importCompanies(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchCompanies,
        fetchCompanyById,
        createCompany,
        updateCompany,
        deactivateCompany,
        deleteCompany,
        uploadCompanyImgOrFile,
        downloadCompanyTemplate,
        exportCompanies,
        importCompanies,
        loading,
        error,
    };
};

export default useCompanyApi;
