// tmsui/src/features/places/models/StationCoverageModel.js

/**
 * StationCoverage Model
 * Represents the structure of a station coverage object in the application.
 */
export class StationCoverage {
    constructor({
        id = null,
        tenant_id = null,
        name = '',
        name_reg = null,
        post_name = '',
        post_name_reg = null,
        pincode = '',
        taluka = '',
        taluka_reg = null,
        district = '',
        district_reg = null,
        state = '',
        state_reg = null,
        country = '',
        latitude = '',
        longitude = '',
        servicing_office_id = null,
        service_office_tat = null,
        servicing_office_dist = null,
        name_gmap = null,
        zone = '',
        route_num = '',
        route_sequence = null,
        oda = false,
        nr_state_highway = null,
        nr_national_highway = null,
        active = true,
        status = 'APPROVED',
        note = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.name = name;
        this.name_reg = name_reg;
        this.post_name = post_name;
        this.post_name_reg = post_name_reg;
        this.pincode = pincode;
        this.taluka = taluka;
        this.taluka_reg = taluka_reg;
        this.district = district;
        this.district_reg = district_reg;
        this.state = state;
        this.state_reg = state_reg;
        this.country = country;
        this.latitude = latitude;
        this.longitude = longitude;
        this.servicing_office_id = servicing_office_id;
        this.service_office_tat = service_office_tat;
        this.servicing_office_dist = servicing_office_dist;
        this.name_gmap = name_gmap;
        this.zone = zone;
        this.route_num = route_num;
        this.route_sequence = route_sequence;
        this.oda = oda;
        this.nr_state_highway = nr_state_highway;
        this.nr_national_highway = nr_national_highway;
        this.active = active;
        this.status = status;
        this.note = note;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new StationCoverage instance from a plain object.
     * @param {Object} data - Plain object with station coverage properties.
     * @returns {StationCoverage} New StationCoverage instance.
     */
    static fromApiResponse(data) {
        return new StationCoverage({
            id: data.id,
            tenant_id: data.tenant_id,
            name: data.name,
            name_reg: data.name_reg,
            post_name: data.post_name,
            post_name_reg: data.post_name_reg,
            pincode: data.pincode,
            taluka: data.taluka,
            taluka_reg: data.taluka_reg,
            district: data.district,
            district_reg: data.district_reg,
            state: data.state,
            state_reg: data.state_reg,
            country: data.country,
            latitude: data.latitude,
            longitude: data.longitude,
            servicing_office_id: data.servicing_office_id,
            service_office_tat: data.service_office_tat,
            servicing_office_dist: data.servicing_office_dist,
            name_gmap: data.name_gmap,
            zone: data.zone,
            route_num: data.route_num,
            route_sequence: data.route_sequence,
            oda: data.oda,
            nr_state_highway: data.nr_state_highway,
            nr_national_highway: data.nr_national_highway,
            active: data.active,
            status: data.status,
            note: data.note,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
    }
}
