// tmsui/src/features/customers/models/CustomerModel.js

/**
 * Customer Model
 * Represents the structure of a customer object in the application.
 */
export class Customer {
    constructor({
        id = null,
        tenant_id = null,
        company_tag = null,
        parent_id = null,
        code = '',
        name = '',
        payment_types = null, // JSON type column storing an array of payment types
        name_reg = null,
        industry_type = null,
        c_type = '',
        c_subtype = null,
        pan_num = null,
        gst_num = null,
        country = null,
        state = null,
        district = null,
        taluka = null,
        city = '',
        pincode = '',
        latitude = null,
        longitude = null,
        address = null,
        address_reg = null,
        mobile = null,
        tel_num = null,
        email = null,
        billing_contact_person = null,
        billing_mobile = '',
        billing_email = '',
        billing_address = '',
        billing_address_reg = null,
        primary_servicing_office_id = null,
        other_servicing_offices = null,
        erp_entry_date = null,
        active = true,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.company_tag = company_tag;
        this.parent_id = parent_id;
        this.code = code;
        this.name = name;
        this.payment_types = payment_types; // JSON type column for array
        this.name_reg = name_reg;
        this.industry_type = industry_type;
        this.c_type = c_type;
        this.c_subtype = c_subtype;
        this.pan_num = pan_num;
        this.gst_num = gst_num;
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
        this.mobile = mobile;
        this.tel_num = tel_num;
        this.email = email;
        this.billing_contact_person = billing_contact_person;
        this.billing_mobile = billing_mobile;
        this.billing_email = billing_email;
        this.billing_address = billing_address;
        this.billing_address_reg = billing_address_reg;
        this.primary_servicing_office_id = primary_servicing_office_id;
        this.other_servicing_offices = other_servicing_offices;
        this.erp_entry_date = erp_entry_date;
        this.active = active;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Customer instance from a plain object.
     * @param {Object} data - Plain object with customer properties.
     * @returns {Customer} New Customer instance.
     */
    static fromApiResponse(data) {
        return new Customer({
            id: data.id,
            tenant_id: data.tenant_id,
            company_tag: data.company_tag,
            parent_id: data.parent_id,
            code: data.code,
            name: data.name,
            payment_types: data.payment_types, // Handle the JSON array type
            name_reg: data.name_reg,
            industry_type: data.industry_type,
            c_type: data.c_type,
            c_subtype: data.c_subtype,
            pan_num: data.pan_num,
            gst_num: data.gst_num,
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
            mobile: data.mobile,
            tel_num: data.tel_num,
            email: data.email,
            billing_contact_person: data.billing_contact_person,
            billing_mobile: data.billing_mobile,
            billing_email: data.billing_email,
            billing_address: data.billing_address,
            billing_address_reg: data.billing_address_reg,
            primary_servicing_office_id: data.primary_servicing_office_id,
            other_servicing_offices: data.other_servicing_offices,
            erp_entry_date: data.erp_entry_date,
            active: data.active,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
