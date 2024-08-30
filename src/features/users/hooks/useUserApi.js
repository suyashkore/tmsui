// tmsui/src/features/users/hooks/useUserApi.js

import { useCallback } from 'react';
import UserApi from '../api/UserApi';
import { User } from '../models/UserModel';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Custom hook for interacting with the User API.
 * Provides functions for common operations such as fetching, creating, updating, and deleting users.
 */
const useUserApi = () => {
    /**
     * Fetches a list of users based on the provided query parameters.
     * @param {Object} params - Query parameters such as pagination, filters, etc.
     * @returns {Promise<{ data: User[], total: number }>} The list of users and the total count.
     */
    const fetchUsers = useCallback(async (params = {}) => {
        try {
            const response = await UserApi.getUsers(params);
            return response;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Fetches a specific user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<User>} The fetched user.
     */
    const fetchUserById = useCallback(async (id) => {
        try {
            const user = await UserApi.getUserById(id);
            return user;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Creates a new user with the provided data.
     * @param {Object} data - The data for the new user.
     * @returns {Promise<User>} The created user.
     */
    const createUser = useCallback(async (data) => {
        try {
            const newUser = await UserApi.createUser(data);
            return newUser;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Updates an existing user by its ID with the provided data.
     * @param {number} id - The user ID.
     * @param {Object} data - The updated user data.
     * @returns {Promise<User>} The updated user.
     */
    const updateUser = useCallback(async (id, data) => {
        try {
            const updatedUser = await UserApi.updateUser(id, data);
            return updatedUser;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Deactivates a user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<void>} Resolves when the user is deactivated.
     */
    const deactivateUser = useCallback(async (id) => {
        try {
            await UserApi.deactivateUser(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Deletes a user by its ID.
     * @param {number} id - The user ID.
     * @returns {Promise<void>} Resolves when the user is deleted.
     */
    const deleteUser = useCallback(async (id) => {
        try {
            await UserApi.deleteUser(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Uploads a profile picture or file for a user.
     * @param {number} id - The user ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    const uploadUserProfilePicOrFile = useCallback(async (id, file, fieldName) => {
        try {
            const response = await UserApi.uploadUserProfilePicOrFile(id, file, fieldName);
            return response;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Downloads the user XLSX template.
     * @returns {Promise<void>} Initiates the file download.
     */
    const downloadUserTemplate = useCallback(async () => {
        try {
            await UserApi.downloadUserTemplate();
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Exports users to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download.
     */
    const exportUsers = useCallback(async (params = {}) => {
        try {
            await UserApi.exportUsers(params);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    /**
     * Imports users from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    const importUsers = useCallback(async (file) => {
        try {
            const response = await UserApi.importUsers(file);
            return response;
        } catch (error) {
            if (error instanceof ImportApiErrorResponse) {
                throw error;
            }
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    return {
        fetchUsers,
        fetchUserById,
        createUser,
        updateUser,
        deactivateUser,
        deleteUser,
        uploadUserProfilePicOrFile,
        downloadUserTemplate,
        exportUsers,
        importUsers,
    };
};

export default useUserApi;
