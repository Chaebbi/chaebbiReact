import React from 'react';
import styled from 'styled-components';
import { Outlet,Navigate } from "react-router-dom";
import Navigation from "../Navigation";

const PrivateRoute =()=>{
    const isActive =()=>{
        const active = localStorage.getItem('login');
        return active !== '' ? true : false
    }

    console.log(isActive());
    return (!isActive ? 
        <>
            <Navigation enableEvent={false}/>
            <ComponentWrapper>
                <Outlet/>
            </ComponentWrapper>
        </> 
        : 
        <Navigate to="/sign_in"/>
        )
    
}

const ComponentWrapper = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 3rem;
`;

export default PrivateRoute;