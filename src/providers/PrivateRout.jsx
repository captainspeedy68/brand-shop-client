import React from 'react';
import { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Loading from '../cards/Loading';
import { AuthContext } from './AuthProvider';

const PrivateRout = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    if (loading){
        return <Loading></Loading>
    }
    if (user) {
        return children;
    }
    return <Navigate state={location.pathname} to = {"/login"}></Navigate>
};

export default PrivateRout;