/**
 * Privilege Model
 * Represents the structure of a privilege object in the application.
 */
export class Privilege {
    constructor({
        id = null,
        name = '',
        description = '',
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Privilege instance from a plain object.
     * @param {Object} data - Plain object with privilege properties.
     * @returns {Privilege} New Privilege instance.
     */
    static fromApiResponse(data) {
        return new Privilege({
            id: data.id,
            name: data.name,
            description: data.description,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
