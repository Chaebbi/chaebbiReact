import styled from "styled-components";
import "../styles/ScrollBar.css";
import { useState, useEffect } from "react";
import Form from "../elements/Form";
import Input from "../elements/Input";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Radio from "../elements/Radio";
import Text from "../elements/Text";
import axios from "axios";
import {API} from "../utils/API.js";

//식단 기록 - 검색
function RecordSearch(){
    const when = [
        {id: 0, name:"meal", value:"0", label:"아침"},
        {id: 1, name:"meal", value:"1", label:"점심"},
        {id: 2, name:"meal", value:"2", label:"저녁"},
    ]
    
    //상태변수
    const [name, setName] = useState();
    const [calory, setCalory] = useState();
    const [carb, setCarb] = useState();
    const [protein, setProtein] = useState();
    const [fat, setFat] = useState();

    const [amount, setAmount] = useState('');
    const [ratio, setRatio] = useState('');
    const changeAmount=(e)=>{
        setAmount(e.target.value);
        console.log([e.target.name], e.target.value);

        setRatio((parseFloat(e.target.value)/food.capacity)*10);

        setCarb((food.carb*ratio).toFixed(1));
        setProtein((food.pro*ratio).toFixed(1));
        setFat((food.fat*ratio).toFixed(1));
        setCalory((food.calory*ratio).toFixed(2));
    }

    const [meal, setMeal] = useState();
    const changeMeal = (event) => {
		setMeal(event.target.value);
        console.log([event.target.name], event.target.value);
	};
    
    const [date, setDate] = useState();
    const [dateform, setDateform] = useState();//post용
    const changeDate = (event) => {
		setDate(event.target.value);
        dateConversion(event.target.value);
	};

    const dateConversion =(s)=> {
        let form = s.split('-');
        console.log(`${form[0]}.${form[1]}.${form[2]}.`);
        setDateform(`${form[0]}.${form[1]}.${form[2]}.`);
    }

    const [time, setTime] = useState('');
    const [time24, setTime24] = useState('');//post용
    const changeTime = (event) => {
        setTime(event.target.value);
        timeConversion(event.target.value);
	};

    const timeConversion =(s)=> {
        let ampm = s.slice(8);  //문자열에서 AM/PM 여부를 알 수 있도록 slice
        let hh = s.slice(0,2);  //시, 분, 초 부분을 각각 slice
        let mm = s.slice(3,5); 
        
        if(ampm === 'PM' && hh !== '12') {
            hh = Number(hh) + 12;  //slice 하면 문자열이 되므로 숫자로 변환해서 계산
        }
        if(ampm === 'AM' && hh === '12') {
            hh = '00';
        }
        console.log(`${hh}:${mm}`);
        setTime24(`${hh}:${mm}`);
    }

    //모든 음식정보 가져와서 복제(GET)===============================================================
    const [foodlist, setFoodlist] = useState([]);
    const foodlist2 = foodlist;
    const getFoodList =async()=>{
        await axios.get(`${API}/foodname`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) => 
            setFoodlist(response.data.result.data)
        );
    }
    
    //검색창 핸들링===========================================================================
    const [searchword, setSearchword] = useState(''); //input값
    const [hasText,setHasText] = useState(false);
    const [autocompletes, setAutocompletes] = useState(foodlist2); //자동완성 결과 담을 상태변수
    
    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
        setHasText(!hasText);
    }

    //자동완성 리스트 채우기==============================================================
    const updateData =() => {
       let b = foodlist2.filter((i)=> i.name.includes(searchword)===true).slice(0,20);
       setAutocompletes(b);
    }

    //음식 아이디 전송(POST)==============================================================
    const [food,setFood] = useState();
    const selectFood =(food,id)=>{
        console.log(food);
        setSearchword(food);

        axios.post(`${API}/food`,{
            id: id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result.data[0]);
            setFood(response.data.result.data[0]);
            setName(response.data.result.data[0].name);
            setCarb(response.data.result.data[0].carb);
            setProtein(response.data.result.data[0].pro);
            setFat(response.data.result.data[0].fat);
            setCalory(response.data.result.data[0].calory);
            setAmount(response.data.result.data[0].capacity);
            setSearchword('');
        }).catch(function(error) {
            console.log(error);
        });
    }

    //검색어로 식단기록하기(POST)==========================================================================
    const recordBySearch =()=>{
        const formData = new FormData();
        formData.append("text", name);
        formData.append("calory", calory);
        formData.append("carb", carb);
        formData.append("protein", protein);
        formData.append("fat", fat);
        formData.append("amount", parseFloat(amount));
        formData.append("meal", Number(meal));
        formData.append("rdate", dateform);
        formData.append('rtime', time24);
        axios.post(`${API}/record-no-img`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            if(response.data.code == 1000){
                alert('식단이 정상적으로 등록되었습니다.');
                window.location.reload();
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
        let ckName = name.length > 0;
        let ckCalory = calory > 0 && calory !== '';
        let ckCarb = carb > 0 && carb !== '';
        let ckProtein = protein > 0 && protein !== '';
        let ckFat = fat > 0 && fat !== '';
        let ckDate = date !== undefined;
        let ckTime = time24 !== '';
        let ckAmount = amount > 0 && amount !== '';
        let ckMeal = meal !== undefined;


        if(ckName && ckAmount && ckDate && ckTime && ckMeal && ckCarb && ckProtein && ckCalory && ckFat){
            recordBySearch();
        }else{
            if(!ckName){
                alert("메뉴를 입력해주세요.");
            }else if(!ckDate){
                alert("날짜를 입력해주세요.");
            }else if(!ckTime){
                alert("시간을 입력해주세요.");
            }else if(!ckAmount){
                alert("식사량을 올바르게 입력해주세요.");
            }else if(!ckMeal){
                alert("끼니를 입력해주세요.");
            }else if(!ckCalory){
                alert("칼로리를 올바르게 입력해주세요.");
            }else if(!ckCarb){
                alert("영양성분(탄수화물)을 올바르게 입력해주세요.");
            }else if(!ckProtein){
                alert("영양성분(단백질)을 올바르게 입력해주세요.");
            }else if(!ckFat){
                alert("영양성분(지방)을 올바르게 입력해주세요.");
            }
        }
    }

    //useEffect==========================================================================
    useEffect(()=>{
        getFoodList();
        const debounce = setTimeout(() => {
            if(searchword) updateData();
        },200)
        return () => {
        clearTimeout(debounce)
        }
      } ,[searchword,food,carb,protein,fat,calory]);

    return(
        <div className="boxForZ-index">
            <Explain>검색어를 입력하면 식단기록창이 나타납니다.</Explain>

            <SearchBox>
                <Search type="text" placeholder="검색어를 입력하세요." value={searchword} onChange={handleKeyword}/>
                {searchword.length > 0 && searchword && (
                    <AutoSearchContainer className="scrollbar">
                        <AutoSearchWrap>
                            {autocompletes.map((a,index)=>(
                                <AutoSearchData key={index} onClick={()=>{selectFood(`${a.name}`,`${a.id}`)}}>{a.name}</AutoSearchData>
                            ))}
                        </AutoSearchWrap>
                    </AutoSearchContainer>
                )}
            </SearchBox>
            
            {  food == undefined ?
                    null
                :
                
                <Form width="45%" height="485px" padding="20px" position="absolute" top="175px" left="27.5%">
                <FoodName>{name}</FoodName> 
                <Grid col="2" row="1" margin="0">
                    <Input name="date" type="date" text="식사날짜" value={date || ''} margin="0px" fieldwidth="95%" onChange={changeDate}/>
                    <Input name="time" type="time" text="식사시간" value={time || ''} margin="0px" fieldwidth="95%" onChange={changeTime}/>
                    <RadioBox>
                        <Legend>끼니</Legend>
                            {Array.from(when).map((m,index) => (
                                <Radio
                                    key={index} 
                                    id={m.id}
                                    name={m.name}
                                    value={m.value}
                                    label={m.label}
                                    text={m.label}
                                    onClick={changeMeal}/>
                            ))}
                    </RadioBox>
                </Grid>
                <Grid col="2" row="1" margin="0">
                    <Text label="칼로리" text={`${calory} kcal`}/>
                    <Input name="amount" type="number" text="식사량" placeholder="그람(1인분 300g)" value={amount} margin="0px" fieldwidth="95%" onChange={changeAmount}/>
                </Grid>
                <Grid col="3" row="1" colgap="6px" margin="0">
                    <Text label="탄수화물" text={`${carb} g`}/>
                    <Text label="단백질" text={`${protein} g`}/>
                    <Text label="지방" text={`${fat} g`}/>
                </Grid>


                <ButtonPlace>
                    <Button
                        just
                        width="240px"
                        height="46px" 
                        margin="0 auto"
                        borderRadius="10px"
                        text="기록하기"
                        onClick={handleValid}
                    />
                </ButtonPlace>
            </Form>
                
            }
        </div>
        )
}

const AutoSearchContainer = styled.div`
  z-index: 10;
  width: 40%;
  min-width: 300px;
  max-height: 400px;
  background-color: #fff;
  position: relative;
  left: 30%;
  border: 1px solid #e6e6e6;
  border-radius: 20px;
  padding: 5px;
`;

const AutoSearchWrap = styled.ul`
    list-style-type: none;
    padding: 0;
    margin: 0;
`;

const AutoSearchData = styled.li`
  padding: 5px 0;
  width: 100%;
  font-size: 14px;
  
  &:hover {
      background-color: rgba(198,221,207,0.3);
      font-weight: bold;
      cursor: pointer; }
  `;

const Explain = styled.h2`
    text-align:center;
    position: relative;
    top: 55px;
`;

const SearchBox = styled.form`
    text-align: center;
    position: relative;
    top: 70px;
    z-index: 10;
`;

const Search = styled.input`
    display: inline-block;
    width: 40%;
    min-width: 400px;
    height: 60px;

    padding: 3px 35px 0px 35px;

    font-size: 18px;
    background: transparent;

    border: 1px solid #e6e6e6;
    border-radius: 20px;
    outline: none;

    box-sizing: border-box;
    transition: all 0.3s;

    &:hover{
        border: 1px solid #868e96;
    }
    &:focus{
        border: 1px solid #398234;
    }
`;

const FoodName = styled.h2`
    margin: 5px 0 20px 0;
`;

const ButtonPlace = styled.div`
    text-align:center;
    position: relative;
    top: 55px;
`;

const RadioBox = styled.div`
    margin-left: 10px;
    margin-top: 4px;
    margin-bottom: 20px;
    /* background-color: aliceblue; */
    display: inline-block;
`;

const Legend = styled.legend`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
`;

export default RecordSearch;