// tmsui/src/features/customers/api/CustomerApi.js

import backendApiCall from 'utils/backendApiCall';
import { Customer } from '../models/CustomerModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Customer API - Handles all the backend API calls for customer-related actions.
 */
const CustomerApi = {
    /**
     * Fetches all customers with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Customer[], total: number }>} The list of customers and the total count.
     */
    async getCustomers(params = {}) {
        try {
            const response = await backendApiCall.get('/customers', { params });
            const customers = response.data.data.map((customer) => Customer.fromApiResponse(customer));
            return { data: customers, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single customer by its ID.
     * @param {number} id - The customer ID.
     * @returns {Promise<Customer>} The fetched customer.
     */
    async getCustomerById(id) {
        try {
            const response = await backendApiCall.get(`/customers/id/${id}`);
            return Customer.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new customer.
     * @param {Object} data - The customer data.
     * @returns {Promise<Customer>} The created customer.
     */
    async createCustomer(data) {
        try {
            const response = await backendApiCall.post('/customers', data);
            return Customer.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing customer by its ID.
     * @param {number} id - The customer ID.
     * @param {Object} data - The updated customer data.
     * @returns {Promise<Customer>} The updated customer.
     */
    async updateCustomer(id, data) {
        try {
            const response = await backendApiCall.put(`/customers/${id}`, data);
            return Customer.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a customer by its ID.
     * @param {number} id - The customer ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateCustomer(id) {
        try {
            const response = await backendApiCall.patch(`/customers/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a customer by its ID.
     * @param {number} id - The customer ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteCustomer(id) {
        try {
            const response = await backendApiCall.delete(`/customers/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a customer.
     * @param {number} id - The customer ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadCustomerImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/customers/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the customer XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadCustomerTemplate() {
        try {
            const response = await backendApiCall.get('/customers/xlsxtemplate', {
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'customer_template.xlsx';

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
     * Exports customers to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportCustomers(params = {}) {
        try {
            const response = await backendApiCall.get('/customers/export/xlsx', {
                params,
                responseType: 'blob'
            });

            const contentDisposition = response.headers['content-disposition'] || response.headers['Content-Disposition'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'customer_export.xlsx';

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
     * Imports customers from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importCustomers(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/customers/import/xlsx', formData);
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

export default CustomerApi;
