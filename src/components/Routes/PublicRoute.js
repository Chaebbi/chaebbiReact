import React from 'react';
import styled from 'styled-components';
import { Outlet } from "react-router-dom";

const PublicRoute =()=>{
    return (
        <ComponentWrapper>
            <Outlet/>
        </ComponentWrapper>
    )
}

const ComponentWrapper = styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export default PublicRoute;