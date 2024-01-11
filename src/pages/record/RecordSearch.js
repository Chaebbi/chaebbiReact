import styled from "styled-components";
import "../../styles/ScrollBar.css";
import { useEffect } from "react";
import { useNutrients } from "../../hooks/useNutrients";
import { useConvertDate } from "../../hooks/useConvertDate";
import { useAutocompletes } from "../../hooks/useAutocompletes";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Radio from "../../elements/Radio";
import Text from "../../elements/Text";
import axios from "axios";
import { when } from "../../utils/common";
import { useSelector, useDispatch } from 'react-redux';
import { __getFoodList } from "../../store/slices/foodSlice";

//식단 기록 - 검색
function RecordSearch(){
    const dispatch = useDispatch();
    const { nutrients, changeAmount, initNutrients, updateNutrients, capacityError, setCapacityError } = useNutrients({
        name: '',
        calory: 0,
        carb: 0,
        pro: 0,
        fat: 0,
        capacity: 0,
        meal: 0
    });

    const {
        name = '',
        calory = 0,
        carb = 0,
        pro = 0,
        fat = 0,
        capacity = 0,
        meal = 0
    } = nutrients;

    // 날짜, 끼니 입력 ===============================================================
    // {date: '', time: '', prevDate: '', prevTime: ''} 형태의 값을 넘겨야한다.
    const { dateInfo, changeDate, changeTime, dateError, setDateError } = useConvertDate({date: '', time: '', prevDate: '', prevTime: ''});

    //모든 음식 조회(페이지 접근 시 최초1회)================================================
    const getFoodList =async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/foodname`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => 
            dispatch(__getFoodList(response.data.data))
        ).catch(function(error) {
            console.log(error);
        });
    }
    
    //검색창 핸들링====================================================================
    const foodlist = useSelector((state) => state.foodlist.data);
    const { searchword, setSearchword, autocompletes } = useAutocompletes(foodlist);

    //특정 음식 정보 조회===============================================================
    const selectFood =(food,id)=>{
        setSearchword(food);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/food`,{
            id: id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            localStorage.setItem('food', JSON.stringify(response.data.result.data[0]));
            updateNutrients(JSON.parse(localStorage.getItem('food')));
            setSearchword('');
        }).catch(function(error) {
            console.log(error);
        });
    }

    //식단기록하기(POST)==========================================================================
    const recordBySearch =()=>{
        const formData = new FormData();
        formData.append("text", name);
        formData.append("calory", calory);
        formData.append("carb", carb);
        formData.append("protein", pro);
        formData.append("fat", fat);
        formData.append("amount", Number(capacity));
        formData.append("meal", Number(meal));
        formData.append("rdate", dateInfo.date);
        formData.append('rtime', dateInfo.time);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/record-no-img`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            if(response.data.code === 1000){
                localStorage.removeItem('food');
                initNutrients();
                alert('식단이 정상적으로 등록되었습니다.');
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사===========================================================================
    const handleValid =()=>{
        let isInputBlank = false;
        let isErrorBlank = true;
        const errorMessage = { date: '', time: '', capacity: '' };

        if(dateInfo.date === ''){
            errorMessage.date = '올바른 식사날짜를 입력하세요.';
            isInputBlank = true;
        }
        
        if(dateInfo.time === '') {
            errorMessage.time = '올바른 식사시간을 입력하세요.';
            isInputBlank = true;
        }
        
        if(nutrients.capacity <= 0){
            errorMessage.capacity = '올바른 식사량을 입력하세요.';
            isInputBlank = true;
        }

        for (const key in errorMessage) {
            if (errorMessage[key] !== '') {
              isErrorBlank = false;
            }
        }

        for (const key in nutrients) {
            if (nutrients[key] !== '') {
              isInputBlank = true;
            }
        }

        if(!isInputBlank && isErrorBlank){ // 필드가 채워져 있으면서 유효한 값일 때
            recordBySearch();
        }else{
            setCapacityError(errorMessage.capacity);
            setDateError({date: errorMessage.date, time: errorMessage.time});
        }
    }


    //useEffect==========================================================================
    useEffect(()=>{
        if(foodlist.length === 0){
            getFoodList();
        }
    }, []);

    return(
        <Container>
            <SearchWrapper>
                <Search type="text" placeholder="검색어를 입력하세요." value={searchword} onChange={(e)=>setSearchword(e.target.value)}/>
                {searchword.length > 0 && autocompletes.length > 0 && (
                    <AutocompleteList className="scrollbar">
                        {autocompletes.map((a)=>(
                            <li key={a.id} onClick={()=>{selectFood(`${a.name}`,`${a.id}`)}}>{a.name}</li>
                        ))}
                    </AutocompleteList>
                )}
            </SearchWrapper>
            <FormWrapper>
                <h2>{name ? name : '음식명'}</h2>
                <div>
                     <GridWrapper>
                        <Input label="식사날짜" type="text" name="date" placeholder="YYYY-MM-DD" error={dateError.date} onChange={changeDate}/>
                        <Input label="식사시간" type="text" name="time" placeholder="hh:mm" error={dateError.time} onChange={changeTime}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Radio legend="끼니" radioArray={when} onChange={(e)=>updateNutrients({meal: e.target.value})} checked={Number(meal)}/>
                        <Input label="식사량" type="text" name="capacity" value={capacity} placeholder="그람(1인분 300g)" error={capacityError} onChange={changeAmount}/>
                    </GridWrapper>
                    <Text label="칼로리" text={`${calory} kcal`}/>
                    <Text label="탄수화물" text={`${carb} g`}/>
                    <Text label="단백질" text={`${pro} g`}/>
                    <Text label="지방" text={`${fat} g`}/>
                </div>
                <Button onClick={handleValid}>기록하기</Button>
            </FormWrapper>
        </Container>
    )
}

const Container = styled.div`
    width: 100rem;
    padding: 2rem;
    display: grid;
    grid-template-columns: 1fr 2fr;
    column-gap: 2rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        grid-template-columns: 1fr;
        row-gap: 2rem;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        padding: 2rem 1rem;
    }
`;

const SearchWrapper = styled.div`
    position: relative;
`;

const AutocompleteList = styled.ul`
    border-radius: 0.5rem;
    list-style-type: none;
    padding: 1rem;
    margin: 0;

    li{
        border-radius: 0.5rem;
        padding: 1rem;
        transition: all 0.2s;
  
        &:hover {
            background-color: var(--color-input-focus);
            font-weight: bold;
            cursor: pointer; 
        }
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
        position: absolute;
        z-index: 2;
        background-color: var(--color-white);
    } 
`;


const Search = styled.input`
    width: 100%;
    padding: 2rem;
    background: transparent;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    transition: all 0.3s;

    &:hover{
        border: 1px solid var(--color-border-hover);
    }
    &:focus{
        border: 1px solid var(--color-primary);
    }
`;

const FormWrapper = styled.div`
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 2rem;
    display: grid;
    row-gap: 3rem;

    >div{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        grid-template-columns: 1fr;
        row-gap: 1.5rem;
    }
`;



export default RecordSearch;