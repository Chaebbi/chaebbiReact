import axios from  "axios";
import styled from "styled-components";
import { useState, useEffect, forwardRef } from "react";
import Button from "../elements/Button";
import MealRecord from "../components/MealRecord";
import NutrientsInfo from "../components/NutrientsInfo";
import DatePicker from "react-datepicker";
import { ko } from "date-fns/esm/locale";
import "react-datepicker/dist/react-datepicker.css";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

//로그인 후 메인 페이지
function Main(){
    const dateConversion =(date)=> {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        console.log(`${year}-${month}-${day}`);

        return `${year}-${month}-${day}`;
    }

    const [startDate, setStartDate] = useState(new Date());
    const CustomCalendarButton = forwardRef(({ onClick }, ref) => (
        <CalendarTodayIcon className="custom-calendar-button" onClick={onClick} ref={ref}/>
    ));
    

    //식단조회(POST)============================================================================
    const [bmeal,setBmeal] = useState([]); //식단-아침(목록)
    const [lmeal,setLmeal] = useState([]); //식단-점심(목록)
    const [dmeal,setDmeal] = useState([]); //식단-저녁(목록)
    const [nutrients,setNutrients] = useState([]); //영양정보
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
                <DateContainer>
                    <span className="bedge">Today</span>
                    <h1>{dateConversion(startDate)}</h1>
                    <DatePicker
                        locale={ko}
                        shouldCloseOnSelect
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy-MM-dd"
                        customInput={<CustomCalendarButton />}
                    />
                    
                    <div>
                        <Button href="/record-foodimage">이미지로 등록</Button>
                        <Button href="/record-foodsearch">검색어로 등록</Button>
                    </div>
                </DateContainer>
                <GridContainer>
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
                    <MealRecord 
                        breakfast={bmeal} 
                        lunch={lmeal} 
                        dinner={dmeal}
                    />
                </GridContainer>
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

const DateContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 1.2rem;
    margin-bottom: 1.2rem;

    .bedge{
        padding: 0.8rem;
        border: 1px solid var(--color-primary);
        color: var(--color-primary);
        border-radius: 0.5rem;
    }

    .custom-calendar-button{
        font-size: 2rem;
        cursor: pointer;
        transition: color 0.1s;
        
        &:hover{
            color: var(--color-primary);
        }
    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1.2fr 1.8fr;
    column-gap: 2rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        grid-template-columns: 1fr;
        row-gap: 2rem;
    }
`;
    
export default Main;