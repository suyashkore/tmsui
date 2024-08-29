// tmsui/src/features/vendors/models/VendorModel.js

/**
 * Vendor Model
 * Represents the structure of a vendor object in the application.
 */
export class Vendor {
    constructor({
        id = null,
        tenant_id = null,
        company_tag = null,
        code = '',
        name = '',
        v_type = '',
        mobile = '',
        name_reg = null,
        legal_name = null,
        legal_name_reg = null,
        email = null,
        erp_code = null,
        contracting_office_id = null,
        active = false,
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
        this.v_type = v_type;
        this.mobile = mobile;
        this.name_reg = name_reg;
        this.legal_name = legal_name;
        this.legal_name_reg = legal_name_reg;
        this.email = email;
        this.erp_code = erp_code;
        this.contracting_office_id = contracting_office_id;
        this.active = active;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Vendor instance from a plain object.
     * @param {Object} data - Plain object with vendor properties.
     * @returns {Vendor} New Vendor instance.
     */
    static fromApiResponse(data) {
        return new Vendor({
            id: data.id,
            tenant_id: data.tenant_id,
            company_tag: data.company_tag,
            code: data.code,
            name: data.name,
            v_type: data.v_type,
            mobile: data.mobile,
            name_reg: data.name_reg,
            legal_name: data.legal_name,
            legal_name_reg: data.legal_name_reg,
            email: data.email,
            erp_code: data.erp_code,
            contracting_office_id: data.contracting_office_id,
            active: data.active,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}

export default Vendor;
