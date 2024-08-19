import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'store';
import TenantForm from '../components/CrUpFormTenant';
import { updateTenant, getTenantById } from 'store/slices/tenant';
import { useParams } from 'react-router-dom';

const EditTenant = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const { tenant } = useSelector((state) => state.tenant);
    const [initialValues, setInitialValues] = useState(null);

    useEffect(() => {
        dispatch(getTenantById(id));
    }, [dispatch, id]);

    useEffect(() => {
        if (tenant) {
            setInitialValues({
                id: tenant.id,
                name: tenant.name,
                country: tenant.country,
                state: tenant.state,
                city: tenant.city,
                pincode: tenant.pincode,
                address: tenant.address,
                active: tenant.active,
                created_by: tenant.created_by,
                updated_by: tenant.updated_by,
                created_at: tenant.created_at,
                updated_at: tenant.updated_at
            });
        }
    }, [tenant]);

    const handleSubmit = (values) => {
        dispatch(updateTenant(id, values));
    };

    return initialValues ? <TenantForm initialValues={initialValues} isEditMode={true} onSubmit={handleSubmit} /> : <p>Loading...</p>;
};

export default EditTenant;
