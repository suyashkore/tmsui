// tmsui/src/features/users/api/UserApi.js

import backendApiCall from 'utils/backendApiCall';
import { User } from '../models/UserModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * User API - Handles all the backend API calls for user-related actions.
 */
const UserApi = {
    /**
     * Fetches all users with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: User[], total: number }>} The list of users and the total count.
     */
    async getUsers(params = {}) {
        try {
            const response = await backendApiCall.get('/users', { params });
            const users = response.data.data.map((user) => User.fromApiResponse(user));
            return { data: users, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<User>} The fetched user.
     */
    async getUserById(id) {
        try {
            const response = await backendApiCall.get(`/users/id/${id}`);
            return User.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new user.
     * @param {Object} data - The user data.
     * @returns {Promise<User>} The created user.
     */
    async createUser(data) {
        try {
            const response = await backendApiCall.post('/users', data);
            return User.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing user by its ID.
     * @param {number} id - The user ID.
     * @param {Object} data - The updated user data.
     * @returns {Promise<User>} The updated user.
     */
    async updateUser(id, data) {
        try {
            const response = await backendApiCall.put(`/users/${id}`, data);
            return User.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateUser(id) {
        try {
            const response = await backendApiCall.patch(`/users/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteUser(id) {
        try {
            const response = await backendApiCall.delete(`/users/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads a profile picture or file for a user.
     * @param {number} id - The user ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadUserProfilePicOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/users/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the user XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadUserTemplate() {
        try {
            const response = await backendApiCall.get('/users/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'user_template.xlsx';

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Exports users to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportUsers(params = {}) {
        try {
            const response = await backendApiCall.get('/users/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'user_export.xlsx';

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', filename);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Imports users from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importUsers(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/users/import/xlsx', formData);
            return ImportApiResponse.fromApiResponse(response.data);
        } catch (error) {
            if (error.data) {
                throw ImportApiErrorResponse.fromApiResponse(error);
            } else {
                throw ApiErrorResponse.fromApiResponse(error);
            }            
        }
    }

};

export default UserApi;
