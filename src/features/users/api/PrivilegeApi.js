import axios from 'axios';

/**
 * Privilege API
 * Provides methods to interact with the privilege-related backend APIs.
 */
const PrivilegeApi = {
    /**
     * Fetch a list of privileges with optional filters, sorting, and pagination.
     * @param {Object} params - Query parameters for filtering, sorting, and pagination.
     * @returns {Promise<Object>} - The API response with data and total count.
     */
    async fetchPrivileges(params = {}) {
        const response = await axios.get('/users/privileges', { params });
        return response.data;
    },

    /**
     * Fetch a privilege by its ID.
     * @param {number} id - The ID of the privilege to fetch.
     * @returns {Promise<Object>} - The privilege data.
     */
    async fetchPrivilegeById(id) {
        const response = await axios.get(`/users/privileges/${id}`);
        return response.data;
    },

    /**
     * Create a new privilege.
     * @param {Object} privilegeData - The data for the new privilege.
     * @returns {Promise<Object>} - The created privilege data.
     */
    async createPrivilege(privilegeData) {
        const response = await axios.post('/users/privileges', privilegeData);
        return response.data;
    },

    /**
     * Update an existing privilege by its ID.
     * @param {number} id - The ID of the privilege to update.
     * @param {Object} privilegeData - The updated data for the privilege.
     * @returns {Promise<Object>} - The updated privilege data.
     */
    async updatePrivilege(id, privilegeData) {
        const response = await axios.put(`/users/privileges/${id}`, privilegeData);
        return response.data;
    },

    /**
     * Delete a privilege by its ID.
     * @param {number} id - The ID of the privilege to delete.
     * @returns {Promise<void>} - The API response indicating success.
     */
    async deletePrivilege(id) {
        await axios.delete(`/users/privileges/${id}`);
    }
};

export default PrivilegeApi;
