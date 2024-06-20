import {useEffect, useState} from 'react';
import axios from "axios";
import {getToken} from "../helper/sessionStorage";
import AuthLoader from "../components/AuthLoader";
import axiosInstance from "../helper/axiosInstance";

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {

        const [ok, setOk] = useState(false);
        const token = getToken();
        const AuthToken = { headers: { 'Authorization': `Bearer ${token}` } }

        useEffect(() => {

            const authCheck = async () => {
                const { data } = await axiosInstance.get(`/auth/auth-check`);
                if (data.ok) {
                    setOk(true);
                } else {
                    setOk(false);
                }
            };

            if (token) authCheck();
        }, [token]);

        return ok ? <WrappedComponent {...props} /> : <AuthLoader path=''/>;
    };

    return AuthComponent;
};

export default withAuth;

