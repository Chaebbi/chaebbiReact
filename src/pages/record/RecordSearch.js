import styled from "styled-components";
import "../../styles/ScrollBar.css";
import { useState, useEffect } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Radio from "../../elements/Radio";
import Text from "../../elements/Text";
import axios from "axios";
import { when, dateConversion, timeConversion } from "../../utils/common";
import { checkRegDate, checkRegTime } from "../../utils/validation";
import { useSelector, useDispatch } from 'react-redux';
import { __getFoodList } from "../../store/slices/foodSlice";
import { dummyFoodList } from "../../utils/dummy"; //테스트용

//식단 기록 - 검색
function RecordSearch(){
    const dispatch = useDispatch();
    //상태변수
    const [error, setError] = useState({date: '', time: '', capacity: ''});
    const [nutrients, setNutrients] = useState({
        name: '',
        calory: 0,
        carb: 0,
        pro: 0,
        fat: 0,
        capacity: '',
        meal: 0
    })

    const {name, calory, carb, pro, fat, capacity, meal} = nutrients;

    const changeAmount=(e)=>{ // 키 입력을 마치면 호출되도록 수정
        const foodInfo = JSON.parse(localStorage.getItem('food'));
        const amount = Number(e.target.value);
        const ratio = (amount/foodInfo.capacity);
        let convertedCalory = Number((foodInfo.calory*ratio).toFixed(2));
        let convertedCarb = Number((foodInfo.carb*ratio).toFixed(1));
        let convertedPro = Number((foodInfo.pro*ratio).toFixed(1));
        let convertedFat = Number((foodInfo.fat*ratio).toFixed(1));

        if(amount <= 0 || isNaN(convertedCalory)){
            setNutrients({ 
                ...nutrients, 
                calory: 0, 
                carb: 0, 
                pro: 0, 
                fat: 0,
                capacity: ''
            });
            setError({ capacity: '유효하지 않은 값입니다.'})
        }else{
            setNutrients({ 
                ...nutrients, 
                calory: convertedCalory, 
                carb: convertedCarb, 
                pro: convertedPro, 
                fat: convertedFat, 
                capacity: amount
            });
            setError({ capacity: '' })
        }

        
    }
    // 날짜, 끼니 입력 ===============================================================
    const [dateInfo, setDateInfo] = useState({date: '', time: '', prevDate: '', prevTime: ''});

    const changeDate =(e)=>{
        const { prevTime } = dateInfo;

        if(checkRegDate(e.target.value)){
            const converted = dateConversion(e.target.value);
            setDateInfo({ ...dateInfo, date: converted });
            setError({...error, date: ''});
        
            if (prevTime && checkRegTime(e.target.value, prevTime)) {
                console.log('changeDate - time : ', prevTime);
                const timeConverted = timeConversion(prevTime);
                setDateInfo({ date: converted, time: timeConverted, prevTime: '', prevDate: '' });
                setError({ date: '', time: '' });
            }
        }else{
            setDateInfo({ ...dateInfo, date: '', prevDate: e.target.value});
            setError({ ...error, date: '유효하지 않은 날짜입니다.'});
        }
    }

    const changeTime =(e)=>{
        const { date, prevDate } = dateInfo;

        if(checkRegTime(date, e.target.value)){
            const converted = timeConversion(e.target.value);
            setDateInfo({ ...dateInfo, time: converted });
            setError({ ...error, time: ''});
        
            if (prevDate && checkRegDate(prevDate)) {
                console.log('changeTime - date : ', prevDate);
                const dateConverted = dateConversion(prevDate);
                setDateInfo({ date: dateConverted, time: converted, prevDate: '', prevTime: '' });
                setError({ date: '', time: '' });
            }
        }else{
            setDateInfo({ ...dateInfo, time: '', prevTime: e.target.value });
            setError({ ...error, time: '유효하지 않은 시간입니다.'});
        }
        
    }
    
    const changeMeal = (e) => {
		setNutrients({...nutrients, meal: e.target.value});
        console.log(dateInfo);
	};


    //모든 음식 조회(페이지 접근 시 최초1회)===============================================================
    const getFoodList =async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/foodname`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => 
            dispatch(__getFoodList(response.data.data))
        ).catch(function(error) {
            console.log(error);
            dispatch(__getFoodList(dummyFoodList)); // 테스트 후 삭제
        });
    }
    
    //검색창 핸들링===========================================================================
    const foodlist = useSelector((state) => state.foodlist.data);
    const [searchword, setSearchword] = useState('');
    const [autocompletes, setAutocompletes] = useState([]);
    const updateData =() => {
        const filteredList = foodlist.filter((i)=> i.name.includes(searchword) === true).slice(0,20);
        setAutocompletes(filteredList);
    }

    //특정 음식 정보 조회==============================================================
    const selectFood =(food,id)=>{
        setSearchword(food);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/food`,{
            id: id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            localStorage.setItem('food', JSON.stringify(response.data.result.data[0]));
            setNutrients({...nutrients, ...JSON.parse(localStorage.getItem('food'))});
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
        formData.append("meal", meal);
        formData.append("rdate", dateInfo.date);
        formData.append('rtime', dateInfo.time);
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/record-no-img`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            if(response.data.code === 1000){
                alert('식단이 정상적으로 등록되었습니다.');
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사===========================================================================
    const handleValid =()=>{
        // 필드값 유효성 검사 후 recordBySearch();
        // error 객체값을 순회하며 값이 있는지 체크 후...
        // capacity의 경우 값이 0이거나 음수이면
        let isInputBlank = false;
        let isErrorBlank = true;
        let errorMessage = { date: '', time: '', amount: '' };

        if(dateInfo.date === ''){
            errorMessage.date = '식사날짜를 입력하세요.';
            isInputBlank = true;
        }
        
        if(dateInfo.time === '') {
            errorMessage.time = '식사시간을 입력하세요.';
            isInputBlank = true;
        }
        
        if(nutrients.capacity === ''){
            errorMessage.capacity = '식사량을 입력하세요.';
            isInputBlank = true;
        }

        for (const key in error) {
            if (error[key] !== '') {
              isErrorBlank = false;
            }
        }

        if(!isInputBlank && isErrorBlank){ // 필드가 채워져 있으면서 유효한 값일 때
            // recordBySearch();
            console.log('기록 성공');
        }else{
            setError(errorMessage);
            console.log('기록 실패');
        }
    }


    //useEffect==========================================================================
    useEffect(()=>{
        if(foodlist.length === 0){
            getFoodList();
        }

        // 검색어가 변경되고 2초 후에 updateDate()
        const debounce = setTimeout(() => {
            if(searchword !== '') updateData();
        },200)
        return () => {
        clearTimeout(debounce)
        }
      } ,[searchword]);

    return(
        <Container>
            <SearchWrapper>
                <Search type="text" placeholder="검색어를 입력하세요." value={searchword} onChange={(e)=>setSearchword(e.target.value)}/>
                {searchword !== '' && (
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
                        <Input label="식사날짜" type="text" name="date" placeholder="YYYY-MM-DD" error={error.date} onChange={changeDate}/>
                        <Input label="식사시간" type="text" name="time" placeholder="hh:mm" error={error.time} onChange={changeTime}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Radio legend="끼니" radioArray={when} onChange={changeMeal} checked={Number(meal)}/>
                        <Input label="식사량" type="text" name="capacity" value={capacity} placeholder="그람(1인분 300g)" error={error.capacity} onChange={changeAmount}/>
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
`;

const SearchWrapper = styled.div`

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
`;



export default RecordSearch;