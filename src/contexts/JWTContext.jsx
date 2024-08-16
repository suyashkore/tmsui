import PropTypes from 'prop-types';
import React, { createContext, useEffect, useReducer } from 'react';

// third-party
import { Chance } from 'chance';
import { jwtDecode}  from 'jwt-decode';

// reducer - state management
import { LOGIN, LOGOUT } from 'store/actions';
import accountReducer from 'store/accountReducer';

// project imports
import Loader from 'ui-component/Loader';
import axiosServices from 'utils/axios';  // Import the centralized Axios instance

const chance = new Chance();

// constant
const initialState = {
    isLoggedIn: false,
    isInitialized: false,
    user: null
};

const verifyToken = (jwToken) => {
    if (!jwToken) {
        return false;
    }
    const decoded = jwtDecode(jwToken);
    return decoded.exp > Date.now() / 1000;
};

const setSession = (jwToken) => {
    if (jwToken) {
        localStorage.setItem('jwToken', jwToken);
        axiosServices.defaults.headers.common.Authorization = `Bearer ${jwToken}`;
    } else {
        localStorage.removeItem('jwToken');
        delete axiosServices.defaults.headers.common.Authorization;
    }
};

// ==============================|| JWT CONTEXT & PROVIDER ||============================== //
const JWTContext = createContext(null);

export const JWTProvider = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, initialState);

    useEffect(() => {
        const init = async () => {
            try {
                const jwToken = window.localStorage.getItem('jwToken');
                if (jwToken && verifyToken(jwToken)) {
                    setSession(jwToken);
                    const decodedToken = jwtDecode(jwToken);

                    // Extract the user details from the token payload
                    const user = {
                        user_id: decodedToken.user_id,
                        tenant_id: decodedToken.tenant_id,
                        tenant_name: decodedToken.tenant_name,
                        tenant_logo_url: decodedToken.tenant_logo_url,
                        name: decodedToken.name,
                        job_title: decodedToken.job_title,
                        department: decodedToken.department,
                        profile_pic_url: decodedToken.profile_pic_url,
                        login_id: decodedToken.login_id,
                        mobile: decodedToken.mobile,
                        email: decodedToken.email,
                        user_type: decodedToken.user_type,
                        role_name: decodedToken.role_name,
                        privileges: decodedToken.privileges
                    };

                    dispatch({
                        type: LOGIN,
                        payload: {
                            isLoggedIn: true,
                            user
                        }
                    });
                } else {
                    dispatch({
                        type: LOGOUT
                    });
                }
            } catch (err) {
                console.error(err);
                dispatch({
                    type: LOGOUT
                });
            }
        };

        init();
    }, []);

    const login = async (tenant_id, login_id, password) => {

        // Convert empty tenant_id string to null
        tenant_id = tenant_id === '' ? null : tenant_id;

        // Now using the centralized axios instance without the full URL
        const response = await axiosServices.post('/tapi/v1/userauth/withloginid', {
            tenant_id,
            login_id,
            password
        });
        const { token } = response.data;
        setSession(token);
        const decodedToken = jwtDecode(token);

        // Extract the user details from the token payload
        const user = {
            user_id: decodedToken.user_id,
            tenant_id: decodedToken.tenant_id,
            tenant_name: decodedToken.tenant_name,
            tenant_logo_url: decodedToken.tenant_logo_url,
            name: decodedToken.name,
            job_title: decodedToken.job_title,
            department: decodedToken.department,
            profile_pic_url: decodedToken.profile_pic_url,
            login_id: decodedToken.login_id,
            mobile: decodedToken.mobile,
            email: decodedToken.email,
            user_type: decodedToken.user_type,
            role_name: decodedToken.role_name,
            privileges: decodedToken.privileges
        };

        dispatch({
            type: LOGIN,
            payload: {
                isLoggedIn: true,
                user
            }
        });
    };

    const logout = () => {
        setSession(null);
        dispatch({ type: LOGOUT });
    };

    if (state.isInitialized !== undefined && !state.isInitialized) {
        return <Loader />;
    }

    return (
        <JWTContext.Provider value={{ ...state, login, logout }}>
            {children}
        </JWTContext.Provider>
    );
};

JWTProvider.propTypes = {
    children: PropTypes.node
};

export default JWTContext;
