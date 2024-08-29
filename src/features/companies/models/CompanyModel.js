/**
 * Company Model
 * Represents the structure of a company object in the application.
 */
export class Company {
    constructor({
        id = null,
        tenant_id = null,
        code = '',
        name = '',
        name_reg = null,
        address = '',
        address_reg = null,
        phone1 = null,
        phone2 = null,
        email1 = null,
        email2 = null,
        website = null,
        gst_num = null,
        cin_num = '',
        msme_num = null,
        pan_num = null,
        tan_num = null,
        logo_url = null,
        active = false,
        seq_num = 0,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.code = code;
        this.name = name;
        this.name_reg = name_reg;
        this.address = address;
        this.address_reg = address_reg;
        this.phone1 = phone1;
        this.phone2 = phone2;
        this.email1 = email1;
        this.email2 = email2;
        this.website = website;
        this.gst_num = gst_num;
        this.cin_num = cin_num;
        this.msme_num = msme_num;
        this.pan_num = pan_num;
        this.tan_num = tan_num;
        this.logo_url = logo_url;
        this.active = active;
        this.seq_num = seq_num;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Company instance from a plain object.
     * @param {Object} data - Plain object with company properties.
     * @returns {Company} New Company instance.
     */
    static fromApiResponse(data) {
        return new Company({
            id: data.id,
            tenant_id: data.tenant_id,
            code: data.code,
            name: data.name,
            name_reg: data.name_reg,
            address: data.address,
            address_reg: data.address_reg,
            phone1: data.phone1,
            phone2: data.phone2,
            email1: data.email1,
            email2: data.email2,
            website: data.website,
            gst_num: data.gst_num,
            cin_num: data.cin_num,
            msme_num: data.msme_num,
            pan_num: data.pan_num,
            tan_num: data.tan_num,
            logo_url: data.logo_url,
            active: data.active,
            seq_num: data.seq_num,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
