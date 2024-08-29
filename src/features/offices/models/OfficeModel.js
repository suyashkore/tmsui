// tmsui/src/features/offices/models/OfficeModel.js

/**
 * Office Model
 * Represents the structure of an office object in the application.
 */
export class Office {
    constructor({
        id = null,
        tenant_id = null,
        company_tag = null,
        code = '',
        name = '',
        name_reg = null,
        gst_num = null,
        cin_num = null,
        owned = false,
        o_type = '',
        cp_kyc_id = null,
        country = null,
        state = null,
        district = null,
        taluka = null,
        city = null,
        pincode = '',
        latitude = '',
        longitude = '',
        address = '',
        address_reg = null,
        active = true,
        description = null,
        parent_id = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.company_tag = company_tag;
        this.code = code;
        this.name = name;
        this.name_reg = name_reg;
        this.gst_num = gst_num;
        this.cin_num = cin_num;
        this.owned = owned;
        this.o_type = o_type;
        this.cp_kyc_id = cp_kyc_id;
        this.country = country;
        this.state = state;
        this.district = district;
        this.taluka = taluka;
        this.city = city;
        this.pincode = pincode;
        this.latitude = latitude;
        this.longitude = longitude;
        this.address = address;
        this.address_reg = address_reg;
        this.active = active;
        this.description = description;
        this.parent_id = parent_id;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Office instance from a plain object.
     * @param {Object} data - Plain object with office properties.
     * @returns {Office} New Office instance.
     */
    static fromApiResponse(data) {
        return new Office({
            id: data.id,
            tenant_id: data.tenant_id,
            company_tag: data.company_tag,
            code: data.code,
            name: data.name,
            name_reg: data.name_reg,
            gst_num: data.gst_num,
            cin_num: data.cin_num,
            owned: data.owned,
            o_type: data.o_type,
            cp_kyc_id: data.cp_kyc_id,
            country: data.country,
            state: data.state,
            district: data.district,
            taluka: data.taluka,
            city: data.city,
            pincode: data.pincode,
            latitude: data.latitude,
            longitude: data.longitude,
            address: data.address,
            address_reg: data.address_reg,
            active: data.active,
            description: data.description,
            parent_id: data.parent_id,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}

export default Office;
