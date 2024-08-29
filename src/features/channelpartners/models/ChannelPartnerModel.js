// tmsui/src/features/channelpartners/models/ChannelPartnerModel.js

/**
 * ChannelPartner Model
 * Represents the structure of a channel partner object in the application.
 */
export class ChannelPartner {
    constructor({
        id = null,
        tenant_id = null,
        company_tag = null,
        legal_name = '',
        owner1_name = '',
        photo1_url = null,
        owner1_aadhaar = null,
        owner1_aadhaar_url = null,
        owner1_pan = null,
        owner1_pan_url = null,
        owner1_email = null,
        owner1_mobile = null,
        owner2_name = null,
        photo2_url = null,
        owner2_aadhaar = null,
        owner2_aadhaar_url = null,
        owner2_pan = null,
        owner2_pan_url = null,
        owner2_email = null,
        owner2_mobile = null,
        country = null,
        state = null,
        district = null,
        taluka = null,
        city = null,
        pincode = '',
        latitude = null,
        longitude = null,
        address = '',
        address_reg = null,
        addr_doc_url = null,
        gst_num = null,
        gst_cert_url = null,
        cin_num = null,
        company_reg_cert_url = null,
        pan_num = null,
        pan_card_url = null,
        tan_num = null,
        tan_card_url = null,
        msme_num = null,
        msme_reg_cert_url = null,
        aadhaar_num = null,
        aadhaar_card_url = null,
        bank1_name = null,
        bank1_accnt_holder = null,
        bank1_account_type = null,
        bank1_account_num = null,
        bank1_ifsc_code = null,
        bank1_doc_url = null,
        bank2_name = null,
        bank2_accnt_holder = null,
        bank2_account_type = null,
        bank2_account_num = null,
        bank2_ifsc_code = null,
        bank2_doc_url = null,
        default_bank = null,
        date_of_reg = null,
        doc1_name = null,
        doc1_url = null,
        doc1_date = null,
        doc2_name = null,
        doc2_url = null,
        doc2_date = null,
        doc3_name = null,
        doc3_url = null,
        doc3_date = null,
        doc4_name = null,
        doc4_url = null,
        doc4_date = null,
        key_personnel1_name = null,
        key_personnel1_job_title = null,
        key_personnel1_mobile = null,
        key_personnel1_email = null,
        key_personnel2_name = null,
        key_personnel2_job_title = null,
        key_personnel2_mobile = null,
        key_personnel2_email = null,
        key_personnel3_name = null,
        key_personnel3_job_title = null,
        key_personnel3_mobile = null,
        key_personnel3_email = null,
        key_personnel4_name = null,
        key_personnel4_job_title = null,
        key_personnel4_mobile = null,
        key_personnel4_email = null,
        kyc_date = null,
        kyc_completed = false,
        active = true,
        status = 'DONE',
        note = null,
        created_by = null,
        updated_by = null,
        created_at = null,
        updated_at = null
    } = {}) {
        this.id = id;
        this.tenant_id = tenant_id;
        this.company_tag = company_tag;
        this.legal_name = legal_name;
        this.owner1_name = owner1_name;
        this.photo1_url = photo1_url;
        this.owner1_aadhaar = owner1_aadhaar;
        this.owner1_aadhaar_url = owner1_aadhaar_url;
        this.owner1_pan = owner1_pan;
        this.owner1_pan_url = owner1_pan_url;
        this.owner1_email = owner1_email;
        this.owner1_mobile = owner1_mobile;
        this.owner2_name = owner2_name;
        this.photo2_url = photo2_url;
        this.owner2_aadhaar = owner2_aadhaar;
        this.owner2_aadhaar_url = owner2_aadhaar_url;
        this.owner2_pan = owner2_pan;
        this.owner2_pan_url = owner2_pan_url;
        this.owner2_email = owner2_email;
        this.owner2_mobile = owner2_mobile;
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
        this.addr_doc_url = addr_doc_url;
        this.gst_num = gst_num;
        this.gst_cert_url = gst_cert_url;
        this.cin_num = cin_num;
        this.company_reg_cert_url = company_reg_cert_url;
        this.pan_num = pan_num;
        this.pan_card_url = pan_card_url;
        this.tan_num = tan_num;
        this.tan_card_url = tan_card_url;
        this.msme_num = msme_num;
        this.msme_reg_cert_url = msme_reg_cert_url;
        this.aadhaar_num = aadhaar_num;
        this.aadhaar_card_url = aadhaar_card_url;
        this.bank1_name = bank1_name;
        this.bank1_accnt_holder = bank1_accnt_holder;
        this.bank1_account_type = bank1_account_type;
        this.bank1_account_num = bank1_account_num;
        this.bank1_ifsc_code = bank1_ifsc_code;
        this.bank1_doc_url = bank1_doc_url;
        this.bank2_name = bank2_name;
        this.bank2_accnt_holder = bank2_accnt_holder;
        this.bank2_account_type = bank2_account_type;
        this.bank2_account_num = bank2_account_num;
        this.bank2_ifsc_code = bank2_ifsc_code;
        this.bank2_doc_url = bank2_doc_url;
        this.default_bank = default_bank;
        this.date_of_reg = date_of_reg;
        this.doc1_name = doc1_name;
        this.doc1_url = doc1_url;
        this.doc1_date = doc1_date;
        this.doc2_name = doc2_name;
        this.doc2_url = doc2_url;
        this.doc2_date = doc2_date;
        this.doc3_name = doc3_name;
        this.doc3_url = doc3_url;
        this.doc3_date = doc3_date;
        this.doc4_name = doc4_name;
        this.doc4_url = doc4_url;
        this.doc4_date = doc4_date;
        this.key_personnel1_name = key_personnel1_name;
        this.key_personnel1_job_title = key_personnel1_job_title;
        this.key_personnel1_mobile = key_personnel1_mobile;
        this.key_personnel1_email = key_personnel1_email;
        this.key_personnel2_name = key_personnel2_name;
        this.key_personnel2_job_title = key_personnel2_job_title;
        this.key_personnel2_mobile = key_personnel2_mobile;
        this.key_personnel2_email = key_personnel2_email;
        this.key_personnel3_name = key_personnel3_name;
        this.key_personnel3_job_title = key_personnel3_job_title;
        this.key_personnel3_mobile = key_personnel3_mobile;
        this.key_personnel3_email = key_personnel3_email;
        this.key_personnel4_name = key_personnel4_name;
        this.key_personnel4_job_title = key_personnel4_job_title;
        this.key_personnel4_mobile = key_personnel4_mobile;
        this.key_personnel4_email = key_personnel4_email;
        this.kyc_date = kyc_date;
        this.kyc_completed = kyc_completed;
        this.active = active;
        this.status = status;
        this.note = note;
        this.created_by = created_by;
        this.updated_by = updated_by;
        this.created_at = created_at;
        this.updated_at = updated_at;
      }
    
      /**
       * Static method to create a new ChannelPartner instance from a plain object.
       * @param {Object} data - Plain object with channel partner properties.
       * @returns {ChannelPartner} New ChannelPartner instance.
       */
      static fromApiResponse(data) {
        return new ChannelPartner({
          id: data.id,
          tenant_id: data.tenant_id,
          company_tag: data.company_tag,
          legal_name: data.legal_name,
          owner1_name: data.owner1_name,
          photo1_url: data.photo1_url,
          owner1_aadhaar: data.owner1_aadhaar,
          owner1_aadhaar_url: data.owner1_aadhaar_url,
          owner1_pan: data.owner1_pan,
          owner1_pan_url: data.owner1_pan_url,
          owner1_email: data.owner1_email,
          owner1_mobile: data.owner1_mobile,
          owner2_name: data.owner2_name,
          photo2_url: data.photo2_url,
          owner2_aadhaar: data.owner2_aadhaar,
          owner2_aadhaar_url: data.owner2_aadhaar_url,
          owner2_pan: data.owner2_pan,
          owner2_pan_url: data.owner2_pan_url,
          owner2_email: data.owner2_email,
          owner2_mobile: data.owner2_mobile,
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
          addr_doc_url: data.addr_doc_url,
          gst_num: data.gst_num,
          gst_cert_url: data.gst_cert_url,
          cin_num: data.cin_num,
          company_reg_cert_url: data.company_reg_cert_url,
          pan_num: data.pan_num,
          pan_card_url: data.pan_card_url,
          tan_num: data.tan_num,
          tan_card_url: data.tan_card_url,
          msme_num: data.msme_num,
          msme_reg_cert_url: data.msme_reg_cert_url,
          aadhaar_num: data.aadhaar_num,
          aadhaar_card_url: data.aadhaar_card_url,
          bank1_name: data.bank1_name,
          bank1_accnt_holder: data.bank1_accnt_holder,
          bank1_account_type: data.bank1_account_type,
          bank1_account_num: data.bank1_account_num,
          bank1_ifsc_code: data.bank1_ifsc_code,
          bank1_doc_url: data.bank1_doc_url,
          bank2_name: data.bank2_name,
          bank2_accnt_holder: data.bank2_accnt_holder,
          bank2_account_type: data.bank2_account_type,
          bank2_account_num: data.bank2_account_num,
          bank2_ifsc_code: data.bank2_ifsc_code,
          bank2_doc_url: data.bank2_doc_url,
          default_bank: data.default_bank,
          date_of_reg: data.date_of_reg,
          doc1_name: data.doc1_name,
          doc1_url: data.doc1_url,
          doc1_date: data.doc1_date,
          doc2_name: data.doc2_name,
          doc2_url: data.doc2_url,
          doc2_date: data.doc2_date,
          doc3_name: data.doc3_name,
          doc3_url: data.doc3_url,
          doc3_date: data.doc3_date,
          doc4_name: data.doc4_name,
          doc4_url: data.doc4_url,
          doc4_date: data.doc4_date,
          key_personnel1_name: data.key_personnel1_name,
          key_personnel1_job_title: data.key_personnel1_job_title,
          key_personnel1_mobile: data.key_personnel1_mobile,
          key_personnel1_email: data.key_personnel1_email,
          key_personnel2_name: data.key_personnel2_name,
          key_personnel2_job_title: data.key_personnel2_job_title,
          key_personnel2_mobile: data.key_personnel2_mobile,
          key_personnel2_email: data.key_personnel2_email,
          key_personnel3_name: data.key_personnel3_name,
          key_personnel3_job_title: data.key_personnel3_job_title,
          key_personnel3_mobile: data.key_personnel3_mobile,
          key_personnel3_email: data.key_personnel3_email,
          key_personnel4_name: data.key_personnel4_name,
          key_personnel4_job_title: data.key_personnel4_job_title,
          key_personnel4_mobile: data.key_personnel4_mobile,
          key_personnel4_email: data.key_personnel4_email,
          kyc_date: data.kyc_date,
          kyc_completed: data.kyc_completed,
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
    
