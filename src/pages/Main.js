import axios from  "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import MealRecord from "../components/MealRecord";
import NutrientsInfo from "../components/NutrientsInfo";
import DatePicker from "react-datepicker";
import { dateConversion } from "../utils/common";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import "../styles/DatePickerCustom.css";
import "../styles/Common.css";

//로그인 후 메인 페이지
function Main(){
    const [startDate, setStartDate] = useState(new Date());
    
    //식단조회(POST)============================================================================
     const [bmeal,setBmeal] = useState([]); //식단-아침(목록)
    const [lmeal,setLmeal] = useState([]); //식단-점심(목록)
    const [dmeal,setDmeal] = useState([]); //식단-저녁(목록)
    const [nutrients,setNutrients] = useState({}); //영양정보
        
    const showPlans =(date)=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/daterecord`,{
            date: date
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
        showPlans(dateConversion(startDate));
    },[]);

    return(
            <PlanContainer>
                <div className="date-wrapper">
                    <span className="bedge">Today</span>
                    <h1>{dateConversion(startDate)}</h1>
                </div>
                <GridContainer>
                        <DatePicker
                            locale={ko}
                            open={true}
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            dateFormat="yyyy-MM-dd"
                        />
                    <NutrientsInfo
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
                <MealRecord 
                    breakfast={bmeal} 
                    lunch={lmeal} 
                    dinner={dmeal}
                />
            </PlanContainer>
    )
}

const PlanContainer = styled.div`
    width: 88rem;
    padding: 2rem;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        padding: 1rem;
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 1.7fr;
    column-gap: 2rem;
    margin-bottom: 2rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        grid-template-columns: 1fr;
        row-gap: 2rem;
    }
`;
    
export default Main;