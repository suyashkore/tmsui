import React from 'react';
import { useDispatch } from 'store';
import CrUpFormTenant from '../components/CrUpFormTenant';
import { createTenant } from 'store/slices/tenant';

const CreateTenant = () => {
    const dispatch = useDispatch();

    const initialValues = {
        name: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        address: '',
        active: false,
    };

    const handleSubmit = (values) => {
        dispatch(createTenant(values));
    };

    return <CrUpFormTenant initialValues={initialValues} isEditMode={false} onSubmit={handleSubmit} />;
};

export default CreateTenant;
