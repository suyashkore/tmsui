/**
 * ImportApiResponse Model
 * Represents the structure of a successful import response.
 */
class ImportApiResponse {
    /**
     * Constructor to initialize the ImportApiResponse model.
     * @param {boolean} success - Whether the import was successful or not.
     * @param {string} message - A message about the import result.
     * @param {number} importedCount - The number of successfully imported rows.
     * @param {Array} errors - Any errors that occurred during the import process.
     */
    constructor(success, message, importedCount, errors = []) {
        this.success = success;
        this.message = message;
        this.importedCount = importedCount;
        this.errors = errors;
    }

    /**
     * Factory method to create an instance of ImportApiResponse from the API response.
     * @param {Object} responseData - The raw data from the API response.
     * @returns {ImportApiResponse} A populated instance of the ImportApiResponse model.
     */
    static fromApiResponse(responseData) {
        return new ImportApiResponse(
            responseData.data.success,
            responseData.data.message,
            responseData.data.imported_count,
            responseData.data.errors
        );
    }
}

export default ImportApiResponse;
