/**
 * Tenant Model
 * Represents the structure of a tenant object in the application.
 */
export class Tenant {
    constructor({
        id = null,
        name = '',
        country = '',
        state = '',
        city = '',
        pincode = '',
        address = '',
        latitude = '',
        longitude = '',
        logo_url = '',
        description = '',
        active = false,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.state = state;
        this.city = city;
        this.pincode = pincode;
        this.address = address;
        this.latitude = latitude;
        this.longitude = longitude;
        this.logo_url = logo_url;
        this.description = description;
        this.active = active;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Tenant instance from a plain object.
     * @param {Object} data - Plain object with tenant properties.
     * @returns {Tenant} New Tenant instance.
     */
    static fromApiResponse(data) {
        return new Tenant({
            id: data.id,
            name: data.name,
            country: data.country,
            state: data.state,
            city: data.city,
            pincode: data.pincode,
            address: data.address,
            latitude: data.latitude,
            longitude: data.longitude,
            logo_url: data.logo_url, // Ensure logo_url is correctly handled
            description: data.description,
            active: data.active,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
