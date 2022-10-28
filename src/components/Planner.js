import styled from "styled-components";
import { useState } from "react";
import Input from "../elements/Input";
import axios from  "axios";
import { useEffect } from "react";
import Grid from "../elements/Grid";
import MealRecord from "./MealRecord";
import NutrientsInfo from "./NutrientsInfo";
import {API} from "../utils/API.js";


//일정등록 컴포넌트
function Planner(){
    //식단조회를 위한 날짜 조작====================================================================
    function getToday (){
        let today = new Date();   
        let year = today.getFullYear();
        let month = ("0" + (1 + today.getMonth())).slice(-2);
        let day = ("0" + today.getDate()).slice(-2);
        return String(year + '-' + month + '-' + day);
    }
    
    let day = getToday();

    const [today, setToday] = useState(day);
    const handleSDate =(e)=>{
        setToday(e.target.value);
        showPlans(dateConversion(e.target.value));
    }

    const dateConversion =(s)=> {
        let form = s.toString().split('-');
        console.log(form);
        return (`${form[0]}.${form[1]}.${form[2]}.`);
    }
    

    //식단조회(POST)============================================================================
    const [bmeal,setBmeal] = useState([]); //식단-아침(목록)
    const [lmeal,setLmeal] = useState([]); //식단-점심(목록)
    const [dmeal,setDmeal] = useState([]); //식단-저녁(목록)
    const [nutrients,setNutrients] = useState([]); //영양정보
    const showPlans =async(e)=>{
        await axios.post(`${API}/daterecord`,{
            date: e
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result);
            setBmeal(response.data.result.records[0].record);
            setLmeal(response.data.result.records[1].record);
            setDmeal(response.data.result.records[2].record);
            setNutrients(response.data.result);
        }).catch(function(error) {
            console.log(error);
        });
    }


    useEffect(()=>{
        showPlans(dateConversion(day));
        console.log(day);
    },[]);

    return(
        <>
            <PlanContainer>
                <DateContainer>
                    <Input inline name="sdate" type="date" text="날짜" value={today} onChange={handleSDate}/>
                </DateContainer>
                <GridContainer>
                    <>
                    { bmeal.length || lmeal.length || dmeal.length !== 0? 
                        <MealRecord 
                        width="390px"
                        breakfast={bmeal} 
                        lunch={lmeal} 
                        dinner={dmeal}
                        />
                    :
                        <MealRecord 
                            width="390px"
                            breakfast={bmeal} 
                            lunch={lmeal} 
                            dinner={dmeal}
                        />
                    }
                    </>
                    
                    <NutrientsInfo
                        width="390px"
                        recommended_kcal={nutrients.recommCalory}
                        recommended_carb={nutrients.recommCarb}
                        recommended_protein={nutrients.recommPro}
                        recommended_fat={nutrients.recommFat}
                        total_kcal={nutrients.totalCalory}
                        total_carb={nutrients.totalCarb}
                        total_protein={nutrients.totalPro}
                        total_fat={nutrients.totalFat}
                    />
                </GridContainer>
                
                    
            </PlanContainer>
        </>
    )
}

const PlanContainer = styled.div`
    position: relative;
    top: -10px;
    height: 100%;
`;

const DateContainer = styled.div`
    width: 500px;
    /* min-width: 300px; */
    text-align: center;
    margin: 0 auto;
    position: relative;
    top: 80px; 
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, auto);
    width: 800px;
    margin: 0 auto;
    position: relative;
    top: 93px;
`;

export default Planner;