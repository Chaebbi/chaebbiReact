import React from 'react';
import { Navigate, Outlet } from "react-router-dom";
import  isLogin from '../../utils/isLogin';

const PrivateRoute =({Children})=>{
    // const navigate = useNavigate();
    const auth = isLogin();
    return auth ? <Outlet/> : <Navigate to="/sign_in"/>
}

export default PrivateRoute;