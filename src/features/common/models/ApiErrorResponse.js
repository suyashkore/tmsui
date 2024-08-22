// tmsui/src/features/common/models/ApiErrorResponse.js

/**
 * ApiErrorResponse Model
 * Represents the structure of an error response returned by the API.
 */
class ApiErrorResponse {
    /**
     * Constructor to initialize the ApiErrorResponse model.
     * @param {string} message - The error message from the API response.
     * @param {Object} errors - An object containing field-specific errors, if any.
     */
    constructor(message = 'An error occurred', errors = {}) {
        this.message = message;
        this.errors = errors;
    }

    /**
     * Factory method to create an instance of ApiErrorResponse from the API response.
     * @param {Object} responseData - The raw data from the API response.
     * @returns {ApiErrorResponse} A populated instance of the ApiErrorResponse model.
     */
    static fromApiResponse(responseData) {
        return new ApiErrorResponse(
            responseData.message || 'An error occurred', // Default message if not provided
            responseData.errors || {} // Default to an empty object if no field errors
        );
    }

    /**
     * Checks if there are any field-specific errors.
     * @returns {boolean} True if there are field errors, false otherwise.
     */
    hasFieldErrors() {
        return Object.keys(this.errors).length > 0;
    }

    /**
     * Gets the field-specific errors as an array of formatted strings.
     * @returns {Array} An array of strings representing the field-specific errors.
     */
    getFieldErrors() {
        const errorMessages = [];
        for (const [field, messages] of Object.entries(this.errors)) {
            // Capitalize the field name and join multiple messages if present
            errorMessages.push(`${field.charAt(0).toUpperCase() + field.slice(1)}: ${messages.join(', ')}`);
        }
        return errorMessages;
    }
}

export default ApiErrorResponse;
