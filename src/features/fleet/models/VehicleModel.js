// tmsui/src/features/fleet/models/VehicleModel.js

/**
 * Vehicle Model
 * Represents the structure of a vehicle object in the application.
 */
export class Vehicle {
    constructor({
        id = null,
        tenant_id = null,
        company_tag = null,
        base_office_id = null,
        vendor_id = null,
        rc_num = '',
        vehicle_num = null,
        vehicle_ownership = 'OWN',
        make = '',
        model = null,
        gvw = null,
        capacity = null,
        gvw_capacity_unit = null,
        length = null,
        width = null,
        height = null,
        lwh_unit = null,
        specification = null,
        sub_specification = null,
        fuel_type = null,
        rto_reg_expiry = null,
        rc_url = null,
        insurance_policy_num = null,
        insurance_expiry = null,
        insurance_doc_url = null,
        fitness_cert_num = null,
        fitness_cert_expiry = null,
        fitness_cert_url = null,
        vehicle_contact_mobile1 = null,
        vehicle_contact_mobile2 = null,
        active = true,
        status = 'CREATED',
        note = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.company_tag = company_tag;
        this.base_office_id = base_office_id;
        this.vendor_id = vendor_id;
        this.rc_num = rc_num;
        this.vehicle_num = vehicle_num;
        this.vehicle_ownership = vehicle_ownership;
        this.make = make;
        this.model = model;
        this.gvw = gvw;
        this.capacity = capacity;
        this.gvw_capacity_unit = gvw_capacity_unit;
        this.length = length;
        this.width = width;
        this.height = height;
        this.lwh_unit = lwh_unit;
        this.specification = specification;
        this.sub_specification = sub_specification;
        this.fuel_type = fuel_type;
        this.rto_reg_expiry = rto_reg_expiry;
        this.rc_url = rc_url;
        this.insurance_policy_num = insurance_policy_num;
        this.insurance_expiry = insurance_expiry;
        this.insurance_doc_url = insurance_doc_url;
        this.fitness_cert_num = fitness_cert_num;
        this.fitness_cert_expiry = fitness_cert_expiry;
        this.fitness_cert_url = fitness_cert_url;
        this.vehicle_contact_mobile1 = vehicle_contact_mobile1;
        this.vehicle_contact_mobile2 = vehicle_contact_mobile2;
        this.active = active;
        this.status = status;
        this.note = note;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new Vehicle instance from a plain object.
     * @param {Object} data - Plain object with vehicle properties.
     * @returns {Vehicle} New Vehicle instance.
     */
    static fromApiResponse(data) {
        return new Vehicle({
            id: data.id,
            tenant_id: data.tenant_id,
            company_tag: data.company_tag,
            base_office_id: data.base_office_id,
            vendor_id: data.vendor_id,
            rc_num: data.rc_num,
            vehicle_num: data.vehicle_num,
            vehicle_ownership: data.vehicle_ownership,
            make: data.make,
            model: data.model,
            gvw: data.gvw,
            capacity: data.capacity,
            gvw_capacity_unit: data.gvw_capacity_unit,
            length: data.length,
            width: data.width,
            height: data.height,
            lwh_unit: data.lwh_unit,
            specification: data.specification,
            sub_specification: data.sub_specification,
            fuel_type: data.fuel_type,
            rto_reg_expiry: data.rto_reg_expiry,
            rc_url: data.rc_url,
            insurance_policy_num: data.insurance_policy_num,
            insurance_expiry: data.insurance_expiry,
            insurance_doc_url: data.insurance_doc_url,
            fitness_cert_num: data.fitness_cert_num,
            fitness_cert_expiry: data.fitness_cert_expiry,
            fitness_cert_url: data.fitness_cert_url,
            vehicle_contact_mobile1: data.vehicle_contact_mobile1,
            vehicle_contact_mobile2: data.vehicle_contact_mobile2,
            active: data.active,
            status: data.status,
            note: data.note,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
