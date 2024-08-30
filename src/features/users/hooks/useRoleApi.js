// tmsui/src/features/users/hooks/useRoleApi.js

import { useCallback } from 'react';
import RoleApi from '../api/RoleApi';
import { Role } from '../models/RoleModel';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Custom hook for interacting with the Role API.
 * Provides functions for common operations such as fetching, creating, updating, and deleting roles.
 */
const useRoleApi = () => {
    const fetchRoles = useCallback(async (params = {}) => {
        try {
            const response = await RoleApi.getRoles(params);
            return response;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const fetchRoleById = useCallback(async (id) => {
        try {
            const role = await RoleApi.getRoleById(id);
            return role;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const createRole = useCallback(async (data) => {
        try {
            const newRole = await RoleApi.createRole(data);
            return newRole;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const updateRole = useCallback(async (id, data) => {
        try {
            const updatedRole = await RoleApi.updateRole(id, data);
            return updatedRole;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const deactivateRole = useCallback(async (id) => {
        try {
            await RoleApi.deactivateRole(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const deleteRole = useCallback(async (id) => {
        try {
            await RoleApi.deleteRole(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const downloadRoleTemplate = useCallback(async () => {
        try {
            await RoleApi.downloadRoleTemplate();
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const exportRoles = useCallback(async (params = {}) => {
        try {
            await RoleApi.exportRoles(params);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const importRoles = useCallback(async (file) => {
        try {
            const response = await RoleApi.importRoles(file);
            return response;
        } catch (error) {
            if (error instanceof ImportApiErrorResponse) {
                throw error;
            }
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    return {
        fetchRoles,
        fetchRoleById,
        createRole,
        updateRole,
        deactivateRole,
        deleteRole,
        downloadRoleTemplate,
        exportRoles,
        importRoles,
    };
};

export default useRoleApi;
