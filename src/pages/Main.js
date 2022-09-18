import { useState,useEffect } from "react";
import styled from "styled-components";
import Grid from "../elements/Grid";
import MealRecord from "../components/MealRecord";
import Planner from "../components/Planner";
import NutrientsInfo from "../components/NutrientsInfo";

//페이지 설명
function Main(){

    return(
        <MainContainer>
            <Planner/>
        </MainContainer>
        )
    }


const MainContainer = styled.div`
    min-width: 650px;
    margin: 0 auto;
`;
export default Main;