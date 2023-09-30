import styled from "styled-components";
import { useState } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Radio from "../../elements/Radio";
import Text from "../../elements/Text";
import axios from "axios";
import { useEffect, useRef } from "react";
import {API,FlaskAPI} from "../../utils/API.js";
import { when, timeConversion, dateConversion } from "../../utils/common";
import { checkRegDate, checkRegTime } from "../../utils/validation";

//식단 기록 - 이미지
function RecordImage(){
    const [error, setError] = useState({ date: '', time: '', capacity: '' });
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
            setError({ ...error, capacity: '유효하지 않은 값입니다.'})
        }else{
            setNutrients({ 
                ...nutrients, 
                calory: convertedCalory, 
                carb: convertedCarb, 
                pro: convertedPro, 
                fat: convertedFat, 
                capacity: amount
            });
            setError({ ...error, capacity: '' })
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
	};

    
    //이미지 상태변수=====================================================================================
    const fileRef = useRef();
    const clickFileInput =()=>{
        fileRef.current.click();
    }

    const [image,setImage] = useState('');
    const handleImage =(e)=>{
        if (e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
              // URL로 변환. e.target.files[0].name 자체는 이미지가 아니므로 img src에 넘길 수 없음
              setImage(e.target.result);
            };
            reader.readAsDataURL(e.target.files[0]);
        }
    }

    //음식 이미지 전송(POST)=====================================================================
    const [isPost, setIsPost] = useState(false); //이미지 등록 여부
    const [food,setFood] = useState();
    const predictImage =(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", image);

        axios.post(`${FlaskAPI}/foodpredict`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            setFood(response.data);
            setIsPost(true);
        }).catch(function(error) {
            console.log('gg');
        });
    }

    //이미지로 식단기록하기(POST)==========================================================================
    const recordByImage =()=>{
        const formData = new FormData();
        formData.append("image", image);
        formData.append("text", name);
        formData.append("calory", String(calory));
        formData.append("carb", String(carb));
        formData.append("protein", String(pro));
        formData.append("fat", String(fat));
        formData.append("amount", Number(capacity));
        formData.append("meal", Number(meal));
        formData.append("rdate", dateInfo.date);
        formData.append('rtime', dateInfo.time);
        axios.post(`${API}/record`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            if(response.data.code === 1000){
                alert('식단이 정상적으로 등록되었습니다.');
                window.location.reload();
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
        // recordByImage();
    }

    //useEffect==========================
    useEffect(()=>{
        
    },[])

    return(
        <Container>
            <FormContainer>
                <h2>{name ? name : '음식명'}</h2>
                <div>
                    <ImageWrapper>
                        <p className="p-label">이미지</p>
                        {image ?
                            <div>
                                <FoodImage src={image} alt="food"/>
                                <input type="file" name="image" accept="image/*" ref={fileRef} onChange={handleImage} style={{display:"none"}}/>
                                <Button onClick={clickFileInput}>이미지 수정</Button>
                                <Button onClick={predictImage}>이미지 등록</Button>
                                <p className="p-guide">불러온 이미지를 등록해 음식 정보를 조회합니다.</p>
                            </div>
                        :
                            <div>
                                <input type="file" name="image" accept="image/*" ref={fileRef} onChange={handleImage} style={{display:"none"}}/>
                                <p className="p-guide">이미지를 불러오면 식단을 기록할 수 있습니다.</p>
                                <Button onClick={clickFileInput}>이미지 추가</Button>
                            </div>
                        }
                    </ImageWrapper>
                    <GridWrapper>
                        <Input name="date" type="text" label="식사날짜" error={error.date} placeholder="YYYY-MM-DD" onChange={changeDate}/>
                        <Input name="time" type="text" label="식사시간" error={error.time} placeholder="hh:mm" onChange={changeTime}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Radio legend="끼니" radioArray={when} onChange={changeMeal} checked={Number(meal)}/>
                        <Input name="capacity" type="text" label="식사량" placeholder="그람(1인분 300g)" error={error.capacity} value={capacity} onChange={changeAmount}/>
                    </GridWrapper>
                    <FlexWrapper>
                        <Text label="칼로리" text={`${calory} kcal`}/>
                        <Text label="탄수화물" text={`${carb} g`}/>
                        <Text label="단백질" text={`${pro} g`}/>
                        <Text label="지방" text={`${fat} g`}/>
                    </FlexWrapper>
                </div>
                <Button onClick={handleValid}>기록하기</Button>
            </FormContainer>
        </Container>
    )
}

const Container = styled.div`
    width: 60rem;
    margin: 0 auto;
`;

const FormContainer = styled.div`
    display: grid;
    row-gap: 3rem;
    padding: 2rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;

    >div{
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
    }
`;

const ImageWrapper = styled.div`
    .p-label{
        font-weight: 700;
        color: var(--color-black);
        margin: 0 0 0.2rem 0.4rem;
    }

    .p-guide{
        color: var(--color-border-hover);
        margin-bottom: 0.2rem;
    }
`;

const FoodImage = styled.img`
    width: 20rem;
    height: 20rem;
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 1.5rem;
`;

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;



export default RecordImage;