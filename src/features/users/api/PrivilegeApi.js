// tmsui/src/features/users/api/PrivilegeApi.js

import backendApiCall from 'utils/backendApiCall';
import { Privilege } from '../models/PrivilegeModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Privilege API - Handles all the backend API calls for privilege-related actions.
 */
const PrivilegeApi = {
    async getPrivileges(params = {}) {
        try {
            const response = await backendApiCall.get('/users/privileges', { params });
            const privileges = response.data.data.map((privilege) => Privilege.fromApiResponse(privilege));
            return { data: privileges, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async getPrivilegeById(id) {
        try {
            const response = await backendApiCall.get(`/users/privileges/id/${id}`);
            return Privilege.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async createPrivilege(data) {
        try {
            const response = await backendApiCall.post('/users/privileges', data);
            return Privilege.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async updatePrivilege(id, data) {
        try {
            const response = await backendApiCall.put(`/users/privileges/${id}`, data);
            return Privilege.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async deactivatePrivilege(id) {
        try {
            const response = await backendApiCall.patch(`/users/privileges/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async deletePrivilege(id) {
        try {
            const response = await backendApiCall.delete(`/users/privileges/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    async downloadPrivilegeTemplate() {
        try {
            const response = await backendApiCall.get('/users/privileges/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'privilege_template.xlsx';

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

    async exportPrivileges(params = {}) {
        try {
            const response = await backendApiCall.get('/users/privileges/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'] || response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'privilege_export.xlsx';

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

    async importPrivileges(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/users/privileges/import/xlsx', formData);
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

export default PrivilegeApi;
