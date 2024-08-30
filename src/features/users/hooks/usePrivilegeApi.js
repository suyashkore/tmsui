// tmsui/src/features/users/hooks/usePrivilegeApi.js

import { useCallback } from 'react';
import PrivilegeApi from '../api/PrivilegeApi';
import { Privilege } from '../models/PrivilegeModel';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Custom hook for interacting with the Privilege API.
 * Provides functions for common operations such as fetching, creating, updating, and deleting privileges.
 */
const usePrivilegeApi = () => {
    const fetchPrivileges = useCallback(async (params = {}) => {
        try {
            const response = await PrivilegeApi.getPrivileges(params);
            return response;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const fetchPrivilegeById = useCallback(async (id) => {
        try {
            const privilege = await PrivilegeApi.getPrivilegeById(id);
            return privilege;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const createPrivilege = useCallback(async (data) => {
        try {
            const newPrivilege = await PrivilegeApi.createPrivilege(data);
            return newPrivilege;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const updatePrivilege = useCallback(async (id, data) => {
        try {
            const updatedPrivilege = await PrivilegeApi.updatePrivilege(id, data);
            return updatedPrivilege;
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const deactivatePrivilege = useCallback(async (id) => {
        try {
            await PrivilegeApi.deactivatePrivilege(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const deletePrivilege = useCallback(async (id) => {
        try {
            await PrivilegeApi.deletePrivilege(id);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const downloadPrivilegeTemplate = useCallback(async () => {
        try {
            await PrivilegeApi.downloadPrivilegeTemplate();
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const exportPrivileges = useCallback(async (params = {}) => {
        try {
            await PrivilegeApi.exportPrivileges(params);
        } catch (error) {
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    const importPrivileges = useCallback(async (file) => {
        try {
            const response = await PrivilegeApi.importPrivileges(file);
            return response;
        } catch (error) {
            if (error instanceof ImportApiErrorResponse) {
                throw error;
            }
            throw error instanceof ApiErrorResponse ? error : ApiErrorResponse.fromApiResponse(error);
        }
    }, []);

    return {
        fetchPrivileges,
        fetchPrivilegeById,
        createPrivilege,
        updatePrivilege,
        deactivatePrivilege,
        deletePrivilege,
        downloadPrivilegeTemplate,
        exportPrivileges,
        importPrivileges,
    };
};

export default usePrivilegeApi;
