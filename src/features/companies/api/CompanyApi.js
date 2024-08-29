import backendApiCall from 'utils/backendApiCall';
import { Company } from '../models/CompanyModel';
import ApiErrorResponse from 'features/common/models/ApiErrorResponse';
import ImportApiResponse from 'features/common/models/ImportApiResponse';
import ImportApiErrorResponse from 'features/common/models/ImportApiErrorResponse';

/**
 * Company API - Handles all the backend API calls for company-related actions.
 */
const CompanyApi = {
    /**
     * Fetches all companies with optional query parameters.
     * @param {Object} params - Optional query parameters for pagination, sorting, etc.
     * @returns {Promise<{ data: Company[], total: number }>} The list of companies and the total count.
     */
    async getCompanies(params = {}) {
        try {
            const response = await backendApiCall.get('/companies', { params });
            const companies = response.data.data.map((company) => Company.fromApiResponse(company));
            return { data: companies, total: response.data.total };
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Fetches a single company by its ID.
     * @param {number} id - The company ID.
     * @returns {Promise<Company>} The fetched company.
     */
    async getCompanyById(id) {
        try {
            const response = await backendApiCall.get(`/companies/id/${id}`);
            return Company.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Creates a new company.
     * @param {Object} data - The company data.
     * @returns {Promise<Company>} The created company.
     */
    async createCompany(data) {
        try {
            const response = await backendApiCall.post('/companies', data);
            return Company.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Updates an existing company by its ID.
     * @param {number} id - The company ID.
     * @param {Object} data - The updated company data.
     * @returns {Promise<Company>} The updated company.
     */
    async updateCompany(id, data) {
        try {
            const response = await backendApiCall.put(`/companies/${id}`, data);
            return Company.fromApiResponse(response.data);
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deactivates a company by its ID.
     * @param {number} id - The company ID.
     * @returns {Promise<Object>} The response containing the deactivation status.
     */
    async deactivateCompany(id) {
        try {
            const response = await backendApiCall.patch(`/companies/${id}/deactivate`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Deletes a company by its ID.
     * @param {number} id - The company ID.
     * @returns {Promise<Object>} The response containing the deletion status.
     */
    async deleteCompany(id) {
        try {
            const response = await backendApiCall.delete(`/companies/${id}`);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Uploads an image or file for a company.
     * @param {number} id - The company ID.
     * @param {File} file - The file to upload.
     * @param {string} fieldName - The field name for the file URL.
     * @returns {Promise<Object>} The response containing the file URL.
     */
    async uploadCompanyImgOrFile(id, file, fieldName) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('urlfield_name', fieldName);
            const response = await backendApiCall.post(`/companies/${id}/uploadimgorfile`, formData);
            return response.data;
        } catch (error) {
            throw ApiErrorResponse.fromApiResponse(error);
        }
    },

    /**
     * Downloads the company XLSX template.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async downloadCompanyTemplate() {
        try {
            const response = await backendApiCall.get('/companies/xlsxtemplate', {
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'company_template.xlsx';

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
     * Exports companies to an XLSX file based on the provided query parameters.
     * @param {Object} params - Query parameters like active status, name, etc.
     * @returns {Promise<void>} Initiates the file download with the correct filename.
     */
    async exportCompanies(params = {}) {
        try {
            const response = await backendApiCall.get('/companies/export/xlsx', {
                params,
                responseType: 'blob',
            });

            const contentDisposition =
                response.headers['content-disposition'] ||
                response.headers['Content-Disposition'] ||
                response.headers['CONTENT-DISPOSITION'];
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1]?.replace(/['"]/g, '')
                : 'company_export.xlsx';

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
     * Imports companies from an XLSX file.
     * @param {File} file - The file to upload for import.
     * @returns {Promise<ImportApiResponse>} The import result details.
     */
    async importCompanies(file) {
        try {
            const formData = new FormData();
            formData.append('file', file);
            const response = await backendApiCall.post('/companies/import/xlsx', formData);
            return ImportApiResponse.fromApiResponse(response.data);
        } catch (error) {
            if (error.data) {
                throw ImportApiErrorResponse.fromApiResponse(error);
            } else {
                throw ApiErrorResponse.fromApiResponse(error);
            }
        }
    },
};

export default CompanyApi;
