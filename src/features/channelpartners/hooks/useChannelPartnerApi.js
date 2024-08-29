// tmsui/src/features/channelpartners/hooks/useChannelPartnerApi.js

import { useState, useCallback } from 'react';
import ChannelPartnerApi from '../api/ChannelPartnerApi';

/**
 * Custom hook to interact with the Channel Partner API.
 * 
 * This hook provides methods to fetch, create, update, deactivate, delete channel partners, 
 * upload files, download templates, export channel partners, and import channel partners,
 * while managing loading and error states.
 */
const useChannelPartnerApi = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    /**
     * Fetch all channel partners with optional query parameters.
     */
    const fetchChannelPartners = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.getChannelPartners(params);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Fetch a channel partner by its ID.
     */
    const fetchChannelPartnerById = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const channelPartner = await ChannelPartnerApi.getChannelPartnerById(id);
            return channelPartner;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Create a new channel partner.
     */
    const createChannelPartner = useCallback(async (data) => {
        try {
            setLoading(true);
            setError(null);
            const newChannelPartner = await ChannelPartnerApi.createChannelPartner(data);
            return newChannelPartner;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Update an existing channel partner by its ID.
     */
    const updateChannelPartner = useCallback(async (id, data) => {
        try {
            setLoading(true);
            setError(null);
            const updatedChannelPartner = await ChannelPartnerApi.updateChannelPartner(id, data);
            return updatedChannelPartner;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Deactivate a channel partner by its ID.
     */
    const deactivateChannelPartner = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.deactivateChannelPartner(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Delete a channel partner by its ID.
     */
    const deleteChannelPartner = useCallback(async (id) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.deleteChannelPartner(id);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Upload an image or file for a channel partner.
     */
    const uploadChannelPartnerImgOrFile = useCallback(async (id, file, fieldName) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.uploadChannelPartnerImgOrFile(id, file, fieldName);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Download the channel partner XLSX template.
     */
    const downloadChannelPartnerTemplate = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.downloadChannelPartnerTemplate(); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Export channel partners to an XLSX file.
     * @param {Object} params - Query parameters like active status, name, etc.
     */
    const exportChannelPartners = useCallback(async (params = {}) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.exportChannelPartners(params); // Trigger the file download directly
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    /**
     * Import channel partners from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importChannelPartners = useCallback(async (file) => {
        try {
            setLoading(true);
            setError(null);
            const response = await ChannelPartnerApi.importChannelPartners(file);
            return response;
        } catch (err) {
            setError(err);
            throw err;
        } finally {
            setLoading(false);
        }
    }, []);

    return {
        fetchChannelPartners,
        fetchChannelPartnerById,
        createChannelPartner,
        updateChannelPartner,
        deactivateChannelPartner,
        deleteChannelPartner,
        uploadChannelPartnerImgOrFile,
        downloadChannelPartnerTemplate,
        exportChannelPartners,
        importChannelPartners,
        loading,
        error,
    };
};

export default useChannelPartnerApi;
