// tmsui/src/features/users/models/UserModel.js

/**
 * User Model
 * Represents the structure of a user object in the application.
 */
export class User {
    constructor({
        id = null,
        tenant_id = null,
        name = '',
        login_id = '',
        mobile = '',
        email = '',
        email2 = null,
        google_id = null,
        profile_pic_url = null,
        user_type = '',
        role_id = null,
        role_name = '',
        privileges = [],
        sso_id = null,
        sso_ref = null,
        job_title = null,
        department = null,
        aadhaar = null,
        pan = null,
        epf_uan = null,
        epf_num = null,
        esic = null,
        last_login = null,
        last_password_reset = null,
        failed_login_attempts = 0,
        active = true,
        remarks = '',
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null,
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.name = name;
        this.login_id = login_id;
        this.mobile = mobile;
        this.email = email;
        this.email2 = email2;
        this.google_id = google_id;
        this.profile_pic_url = profile_pic_url;
        this.user_type = user_type;
        this.role_id = role_id;
        this.role_name = role_name;
        this.privileges = privileges;
        this.sso_id = sso_id;
        this.sso_ref = sso_ref;
        this.job_title = job_title;
        this.department = department;
        this.aadhaar = aadhaar;
        this.pan = pan;
        this.epf_uan = epf_uan;
        this.epf_num = epf_num;
        this.esic = esic;
        this.last_login = last_login;
        this.last_password_reset = last_password_reset;
        this.failed_login_attempts = failed_login_attempts;
        this.active = active;
        this.remarks = remarks;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    /**
     * Static method to create a new User instance from a plain object.
     * @param {Object} data - Plain object with user properties.
     * @returns {User} New User instance.
     */
    static fromApiResponse(data) {
        return new User({
            id: data.id,
            tenant_id: data.tenant_id,
            name: data.name,
            login_id: data.login_id,
            mobile: data.mobile,
            email: data.email,
            email2: data.email2,
            google_id: data.google_id,
            profile_pic_url: data.profile_pic_url,
            user_type: data.user_type,
            role_id: data.role_id,
            role_name: data.role_name,
            privileges: data.privileges || [],
            sso_id: data.sso_id,
            sso_ref: data.sso_ref,
            job_title: data.job_title,
            department: data.department,
            aadhaar: data.aadhaar,
            pan: data.pan,
            epf_uan: data.epf_uan,
            epf_num: data.epf_num,
            esic: data.esic,
            last_login: data.last_login,
            last_password_reset: data.last_password_reset,
            failed_login_attempts: data.failed_login_attempts,
            active: data.active,
            remarks: data.remarks,
            created_by: data.created_by,
            updated_by: data.updated_by,
            created_at: data.created_at,
            updated_at: data.updated_at,
        });
    }
}
