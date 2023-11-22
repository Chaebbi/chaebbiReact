import React from 'react';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";
import Navigation from "../Navigation";

const PrivateRoute =()=>{
    // const isActive =()=>{
    //     const active = localStorage.getItem('login');
    //     return active !== '' ? true : false
    // }
    // return isActive ? <Outlet/> : <Navigate to="/sign_in"/>
    return (
        <>
            <Navigation enableEvent={false}/>
            <ComponentWrapper>
                <Outlet/>
            </ComponentWrapper>
        </>
    )
}

const ComponentWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`;

export default PrivateRoute;