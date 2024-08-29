/**
 * GeoHierarchy Model
 * Represents the structure of a geo-hierarchy object in the application.
 */
export class GeoHierarchy {
    constructor({
        id = null,
        country = '',
        state = '',
        district = '',
        taluka = '',
        po_name = '',
        pincode = '',
        po_lat = null,
        po_long = null,
        place = '',
        place_lat = null,
        place_long = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.country = country;
        this.state = state;
        this.district = district;
        this.taluka = taluka;
        this.po_name = po_name;
        this.pincode = pincode;
        this.po_lat = po_lat;
        this.po_long = po_long;
        this.place = place;
        this.place_lat = place_lat;
        this.place_long = place_long;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new GeoHierarchy instance from a plain object.
     * @param {Object} data - Plain object with geo-hierarchy properties.
     * @returns {GeoHierarchy} New GeoHierarchy instance.
     */
    static fromApiResponse(data) {
        return new GeoHierarchy({
            id: data.id,
            country: data.country,
            state: data.state,
            district: data.district,
            taluka: data.taluka,
            po_name: data.po_name,
            pincode: data.pincode,
            po_lat: data.po_lat,
            po_long: data.po_long,
            place: data.place,
            place_lat: data.place_lat,
            place_long: data.place_long,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
