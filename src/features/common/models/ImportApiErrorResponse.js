/**
 * ImportApiErrorResponse Model
 * Represents the structure of an error response during import.
 */
class ImportApiErrorResponse {
    /**
     * Constructor to initialize the ImportApiErrorResponse model.
     * @param {string} message - The error message from the API response.
     * @param {Array} errors - An array of detailed error messages.
     */
    constructor(message = 'Import failed with errors', errors = []) {
        this.message = message;
        this.errors = errors;
    }

    /**
     * Factory method to create an instance of ImportApiErrorResponse from the API response.
     * @param {Object} responseData - The raw data from the API response.
     * @returns {ImportApiErrorResponse} A populated instance of the ImportApiErrorResponse model.
     */
    static fromApiResponse(responseData) {
        return new ImportApiErrorResponse(
            responseData.message || 'Import failed with errors',
            responseData.data.errors || []
        );
    }
}

export default ImportApiErrorResponse;
