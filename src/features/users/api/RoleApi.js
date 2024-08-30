// tmsui/src/features/users/api/RoleApi.js

import axios from 'axios';

/**
 * Role API
 * Handles API calls related to roles in the application.
 */
const RoleApi = {
    /**
     * Fetch a list of roles with optional filters, sorting, and pagination.
     * @param {Object} params - Query parameters for fetching roles.
     * @returns {Promise<Object>} - The response containing the list of roles and total count.
     */
    fetchRoles: async (params) => {
        try {
            const response = await axios.get('/users/roles', { params });
            return {
                data: response.data.data,
                total: response.data.total,
            };
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch roles');
        }
    },

    /**
     * Fetch a specific role by its ID.
     * @param {number|string} id - The ID of the role to fetch.
     * @returns {Promise<Object>} - The role data.
     */
    fetchRoleById: async (id) => {
        try {
            const response = await axios.get(`/users/roles/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to fetch role');
        }
    },

    /**
     * Create a new role.
     * @param {Object} roleData - The data for the new role.
     * @returns {Promise<Object>} - The created role data.
     */
    createRole: async (roleData) => {
        try {
            const response = await axios.post('/users/roles', roleData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to create role');
        }
    },

    /**
     * Update an existing role by its ID.
     * @param {number|string} id - The ID of the role to update.
     * @param {Object} roleData - The updated role data.
     * @returns {Promise<Object>} - The updated role data.
     */
    updateRole: async (id, roleData) => {
        try {
            const response = await axios.put(`/users/roles/${id}`, roleData);
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to update role');
        }
    },

    /**
     * Delete a role by its ID.
     * @param {number|string} id - The ID of the role to delete.
     * @returns {Promise<void>}
     */
    deleteRole: async (id) => {
        try {
            await axios.delete(`/users/roles/${id}`);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to delete role');
        }
    },

    /**
     * Deactivate a role by its ID.
     * @param {number|string} id - The ID of the role to deactivate.
     * @returns {Promise<void>}
     */
    deactivateRole: async (id) => {
        try {
            await axios.post(`/users/roles/${id}/deactivate`);
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to deactivate role');
        }
    },

    /**
     * Download a template for importing roles.
     * @returns {Promise<Blob>} - The file blob of the template.
     */
    downloadRoleTemplate: async () => {
        try {
            const response = await axios.get('/users/roles/template', { responseType: 'blob' });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to download role template');
        }
    },

    /**
     * Import roles from an Excel file.
     * @param {FormData} formData - The form data containing the file to import.
     * @returns {Promise<Object>} - The import results.
     */
    importRoles: async (formData) => {
        try {
            const response = await axios.post('/users/roles/import', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to import roles');
        }
    },

    /**
     * Export roles to an Excel file based on the current filters and sorting.
     * @param {Object} params - Query parameters for exporting roles.
     * @returns {Promise<Blob>} - The file blob of the exported roles.
     */
    exportRoles: async (params) => {
        try {
            const response = await axios.get('/users/roles/export', {
                params,
                responseType: 'blob',
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response?.data?.message || 'Failed to export roles');
        }
    },
};

export default RoleApi;
