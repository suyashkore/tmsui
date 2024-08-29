/**
 * DriverRate Model
 * Represents the structure of a driver rate object in the application.
 */
export class DriverRate {
    constructor({
        id = null,
        tenant_id = null,
        contracting_office_id = null,
        vendor_id = null,
        vendor_name = '',
        default_rate_type = 'TRIP_WISE',
        daily_rate = 0,
        hourly_rate = 0,
        overtime_hourly_rate = 0,
        daily_allowance = 0,
        per_km_rate = 0,
        per_extra_km_rate = 0,
        night_halt_rate = 0,
        per_trip_rate = 0,
        trip_allowance = 0,
        incentive_per_trip = 0,
        monthly_sal = 0,
        monthly_incentive = 0,
        per_trip_penalty_percent = 0,
        per_trip_penalty_fixed_amount = 0,
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
        this.daily_rate = daily_rate;
        this.hourly_rate = hourly_rate;
        this.overtime_hourly_rate = overtime_hourly_rate;
        this.daily_allowance = daily_allowance;
        this.per_km_rate = per_km_rate;
        this.per_extra_km_rate = per_extra_km_rate;
        this.night_halt_rate = night_halt_rate;
        this.per_trip_rate = per_trip_rate;
        this.trip_allowance = trip_allowance;
        this.incentive_per_trip = incentive_per_trip;
        this.monthly_sal = monthly_sal;
        this.monthly_incentive = monthly_incentive;
        this.per_trip_penalty_percent = per_trip_penalty_percent;
        this.per_trip_penalty_fixed_amount = per_trip_penalty_fixed_amount;
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
     * Static method to create a new DriverRate instance from a plain object.
     * @param {Object} data - Plain object with driver rate properties.
     * @returns {DriverRate} New DriverRate instance.
     */
    static fromApiResponse(data) {
        return new DriverRate({
            id: data.id,
            tenant_id: data.tenant_id,
            contracting_office_id: data.contracting_office_id,
            vendor_id: data.vendor_id,
            vendor_name: data.vendor_name,
            default_rate_type: data.default_rate_type,
            daily_rate: data.daily_rate,
            hourly_rate: data.hourly_rate,
            overtime_hourly_rate: data.overtime_hourly_rate,
            daily_allowance: data.daily_allowance,
            per_km_rate: data.per_km_rate,
            per_extra_km_rate: data.per_extra_km_rate,
            night_halt_rate: data.night_halt_rate,
            per_trip_rate: data.per_trip_rate,
            trip_allowance: data.trip_allowance,
            incentive_per_trip: data.incentive_per_trip,
            monthly_sal: data.monthly_sal,
            monthly_incentive: data.monthly_incentive,
            per_trip_penalty_percent: data.per_trip_penalty_percent,
            per_trip_penalty_fixed_amount: data.per_trip_penalty_fixed_amount,
            active: data.active,
            status: data.status,
            note: data.note,
            start_date: data.start_date,
            end_date: data.end_date,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at
        });
    }
}
