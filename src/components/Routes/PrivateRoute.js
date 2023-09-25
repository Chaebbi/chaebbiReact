import React from 'react';
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute =({Children})=>{
    const isActive =()=>{
        const active = localStorage.getItem('login');
        return active !== '' ? true : false
    }
    return isActive ? <Outlet/> : <Navigate to="/sign_in"/>
}

export default PrivateRoute;