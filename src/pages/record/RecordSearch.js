import styled from "styled-components";
import "../../styles/ScrollBar.css";
import { useState, useEffect } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Radio from "../../elements/Radio";
import Text from "../../elements/Text";
import axios from "axios";
import { when, dateConversion, timeConversion } from "../../utils/common";

//식단 기록 - 검색
function RecordSearch(){
    //상태변수
    const [nutrients, setNutrients] = useState({
        name: '',
        calory: 0,
        carb: 0,
        pro: 0,
        fat: 0,
        capacity: 0,
        inputAmount: 0,
        meal: 0
    })

    const {name, calory, carb, pro, fat, capacity, meal} = nutrients;

    const changeAmount=(e)=>{ // 키 입력을 마치면 호출되도록 수정
        const amount = parseFloat(e.target.value);
        console.log(capacity, amount);
        const ratio = (amount/capacity)*10;
        const convertedCalory = (calory*ratio).toFixed(2);
        const convertedCarb = (carb*ratio).toFixed(1);
        const convertedPro = (pro*ratio).toFixed(1);
        const convertedFat = (fat*ratio).toFixed(1);
        setNutrients({ 
            ...nutrients, 
            calory: convertedCalory, 
            carb: convertedCarb, 
            pro: convertedPro, 
            fat: convertedFat, 
            capacity: amount 
        });
    }

    const changeMeal = (e) => {
		setNutrients({...nutrients, meal: e.target.value});
	};
    
    const [dateInfo, setDateInfo] = useState({date: '', time: ''});
    const changeDate = (e) => {
        if(e.target.name === 'date'){
            const converted = dateConversion(e.target.value);
            setDateInfo({ ...dateInfo, date: converted });
        }else{
            const converted = timeConversion(e.target.value);
            setDateInfo({ ...dateInfo, time: converted });
        }
	};


    //모든 음식 조회(GET)===============================================================
    const [foodlist, setFoodlist] = useState([]);
    const foodlist2 = foodlist;
    const getFoodList =async()=>{
        await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/foodname`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => 
            setFoodlist(response.data.result.data)
        );
    }
    
    //검색창 핸들링===========================================================================
    const [searchword, setSearchword] = useState(''); //input값
    const [autocompletes, setAutocompletes] = useState(foodlist2); //자동완성 결과 담을 상태변수

    //자동완성 리스트==============================================================
    const updateData =() => {
    //    const filteredList = foodlist2.filter((i)=> i.name.includes(searchword) === true).slice(0,20);
    const filteredList = [{
        "id": 1,
        "name": "더덕구이"
    },
    {
        "id": 2,
        "name": "김치국"
    },
    {
        "id": 3,
        "name": "떡만둣국"
    }];
       setAutocompletes(filteredList);
    }

    //음식 아이디 전송(POST)==============================================================
    const selectFood =(food,id)=>{
        setSearchword(food);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/food`,{
            id: id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result.data[0]);
            localStorage.setItem('food', response.data.result.data[0]);
            setNutrients({...nutrients, ...response.data.result.data[0]});
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
        formData.append("amount", parseFloat(capacity));
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
        recordBySearch();
    }


    //useEffect==========================================================================
    useEffect(()=>{
        /* if(저장소가 비었으면){
            getFoodList();
        } 
        */

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
                <Input label="식사날짜" type="date" name="date" onChange={changeDate}/>
                <Input label="식사시간" type="time" name="time" onChange={changeDate}/>
                <Radio legend="끼니" radioArray={when} onChange={changeMeal} checked={Number(meal)}/>
                <Input label="식사량" type="number" name="capacity" placeholder="그람(1인분 300g)" onChange={changeAmount}/>
                <Text label="칼로리" text={`${calory} kcal`}/>
                <Text label="탄수화물" text={`${carb} g`}/>
                <Text label="단백질" text={`${pro} g`}/>
                <Text label="지방" text={`${fat} g`}/>

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
    row-gap: 1rem;
`;



export default RecordSearch;