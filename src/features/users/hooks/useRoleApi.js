// tmsui/src/features/users/hooks/useRoleApi.js

import { useCallback } from 'react';
import RoleApi from '../api/RoleApi';

/**
 * Custom hook for Role API interactions.
 * Provides methods to fetch, create, update, delete, and manage roles.
 */
const useRoleApi = () => {
    const fetchRoles = useCallback(async (params) => {
        return await RoleApi.fetchRoles(params);
    }, []);

    const fetchRoleById = useCallback(async (id) => {
        return await RoleApi.fetchRoleById(id);
    }, []);

    const createRole = useCallback(async (roleData) => {
        return await RoleApi.createRole(roleData);
    }, []);

    const updateRole = useCallback(async (id, roleData) => {
        return await RoleApi.updateRole(id, roleData);
    }, []);

    const deleteRole = useCallback(async (id) => {
        return await RoleApi.deleteRole(id);
    }, []);

    const deactivateRole = useCallback(async (id) => {
        return await RoleApi.deactivateRole(id);
    }, []);

    const downloadRoleTemplate = useCallback(async () => {
        return await RoleApi.downloadRoleTemplate();
    }, []);

    const importRoles = useCallback(async (formData) => {
        return await RoleApi.importRoles(formData);
    }, []);

    const exportRoles = useCallback(async (params) => {
        return await RoleApi.exportRoles(params);
    }, []);

    return {
        fetchRoles,
        fetchRoleById,
        createRole,
        updateRole,
        deleteRole,
        deactivateRole,
        downloadRoleTemplate,
        importRoles,
        exportRoles,
    };
};

export default useRoleApi;
