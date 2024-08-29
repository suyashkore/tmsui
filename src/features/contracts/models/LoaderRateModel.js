// tmsui/src/features/contracts/models/LoaderRateModel.js

/**
 * LoaderRate Model
 * Represents the structure of a loader rate object in the application.
 */
export class LoaderRate {
    constructor({
        id = null,
        tenant_id = null,
        contracting_office_id = null,
        vendor_id = null,
        vendor_name = '',
        default_rate_type = 'DAILY',
        reg_pkg_rate = 0,
        crossing_pkg_rate = 0,
        reg_weight_rate = 0,
        crossing_weight_rate = 0,
        monthly_sal = 0,
        daily_allowance = 0,
        daily_wage = 0,
        daily_wage_pkg_capping = 0,
        daily_wage_weight_capping = 0,
        overtime_hourly_rate = 0,
        active = true,
        status = 'APPROVED',
        note = null,
        start_date = null,
        end_date = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.contracting_office_id = contracting_office_id;
        this.vendor_id = vendor_id;
        this.vendor_name = vendor_name;
        this.default_rate_type = default_rate_type;
        this.reg_pkg_rate = reg_pkg_rate;
        this.crossing_pkg_rate = crossing_pkg_rate;
        this.reg_weight_rate = reg_weight_rate;
        this.crossing_weight_rate = crossing_weight_rate;
        this.monthly_sal = monthly_sal;
        this.daily_allowance = daily_allowance;
        this.daily_wage = daily_wage;
        this.daily_wage_pkg_capping = daily_wage_pkg_capping;
        this.daily_wage_weight_capping = daily_wage_weight_capping;
        this.overtime_hourly_rate = overtime_hourly_rate;
        this.active = active;
        this.status = status;
        this.note = note;
        this.start_date = start_date;
        this.end_date = end_date;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new LoaderRate instance from a plain object.
     * @param {Object} data - Plain object with loader rate properties.
     * @returns {LoaderRate} New LoaderRate instance.
     */
    static fromApiResponse(data) {
        return new LoaderRate({
            id: data.id,
            tenant_id: data.tenant_id,
            contracting_office_id: data.contracting_office_id,
            vendor_id: data.vendor_id,
            vendor_name: data.vendor_name,
            default_rate_type: data.default_rate_type,
            reg_pkg_rate: data.reg_pkg_rate,
            crossing_pkg_rate: data.crossing_pkg_rate,
            reg_weight_rate: data.reg_weight_rate,
            crossing_weight_rate: data.crossing_weight_rate,
            monthly_sal: data.monthly_sal,
            daily_allowance: data.daily_allowance,
            daily_wage: data.daily_wage,
            daily_wage_pkg_capping: data.daily_wage_pkg_capping,
            daily_wage_weight_capping: data.daily_wage_weight_capping,
            overtime_hourly_rate: data.overtime_hourly_rate,
            active: data.active,
            status: data.status,
            note: data.note,
            start_date: data.start_date,
            end_date: data.end_date,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
    }
}
