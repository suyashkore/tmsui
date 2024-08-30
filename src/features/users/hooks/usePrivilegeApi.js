import { useCallback } from 'react';
import PrivilegeApi from '../api/PrivilegeApi';

/**
 * Custom hook to interact with the Privilege API.
 * Provides methods for fetching, creating, updating, and deleting privileges.
 */
const usePrivilegeApi = () => {

    /**
     * Fetch a list of privileges with optional filters, sorting, and pagination.
     * @param {Object} params - Query parameters for filtering, sorting, and pagination.
     * @returns {Promise<Object>} - The API response with data and total count.
     */
    const fetchPrivileges = useCallback(async (params) => {
        try {
            const response = await PrivilegeApi.fetchPrivileges(params);
            return response;
        } catch (error) {
            console.error('Failed to fetch privileges:', error);
            throw error;
        }
    }, []);

    /**
     * Fetch a privilege by its ID.
     * @param {number} id - The ID of the privilege to fetch.
     * @returns {Promise<Object>} - The privilege data.
     */
    const fetchPrivilegeById = useCallback(async (id) => {
        try {
            const response = await PrivilegeApi.fetchPrivilegeById(id);
            return response;
        } catch (error) {
            console.error(`Failed to fetch privilege with ID ${id}:`, error);
            throw error;
        }
    }, []);

    /**
     * Create a new privilege.
     * @param {Object} privilegeData - The data for the new privilege.
     * @returns {Promise<Object>} - The created privilege data.
     */
    const createPrivilege = useCallback(async (privilegeData) => {
        try {
            const response = await PrivilegeApi.createPrivilege(privilegeData);
            return response;
        } catch (error) {
            console.error('Failed to create privilege:', error);
            throw error;
        }
    }, []);

    /**
     * Update an existing privilege by its ID.
     * @param {number} id - The ID of the privilege to update.
     * @param {Object} privilegeData - The updated data for the privilege.
     * @returns {Promise<Object>} - The updated privilege data.
     */
    const updatePrivilege = useCallback(async (id, privilegeData) => {
        try {
            const response = await PrivilegeApi.updatePrivilege(id, privilegeData);
            return response;
        } catch (error) {
            console.error(`Failed to update privilege with ID ${id}:`, error);
            throw error;
        }
    }, []);

    /**
     * Delete a privilege by its ID.
     * @param {number} id - The ID of the privilege to delete.
     * @returns {Promise<void>} - The API response indicating success.
     */
    const deletePrivilege = useCallback(async (id) => {
        try {
            await PrivilegeApi.deletePrivilege(id);
        } catch (error) {
            console.error(`Failed to delete privilege with ID ${id}:`, error);
            throw error;
        }
    }, []);

    return {
        fetchPrivileges,
        fetchPrivilegeById,
        createPrivilege,
        updatePrivilege,
        deletePrivilege,
    };
};

export default usePrivilegeApi;
