import styled from "styled-components";
import { useState, useRef } from "react";
import Input from "../../elements/Input";
import Button from "../../elements/Button";
import Radio from "../../elements/Radio";
import Text from "../../elements/Text";
import axios from "axios";
import { when } from "../../utils/common";
import { useConvertDate } from "../../hooks/useConvertDate.js";
import { useNutrients } from "../../hooks/useNutrients.js";


//식단 기록 - 이미지
function RecordImage(){
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

    const { dateInfo, changeDate, changeTime, dateError, setDateError } = useConvertDate({date: '', time: '', prevDate: '', prevTime: ''});


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

    //이미지 예측(POST)=====================================================================
    const [isPost, setIsPost] = useState(false); //이미지 등록 여부
    const predictImage =(e)=>{
        e.preventDefault();

        const formData = new FormData();
        formData.append("file", image);

        axios.post(`${process.env.REACT_APP_FLASK_SERVER_URL}/api/foodpredict`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            localStorage.setItem('food', JSON.stringify(response.data));
            updateNutrients(JSON.parse(localStorage.getItem('food')));
            setIsPost(true);
        }).catch(function(error) {
            alert(error.message);
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
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/record`,formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            if(response.data.code === 1000){
                initNutrients();
                localStorage.removeItem('food');
                alert('식단이 정상적으로 등록되었습니다.');
            }
        }).catch(function(error) {
            console.log(error.message);
        });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
            let isInputBlank = false;
            let isErrorBlank = true;
            const errorMessage = { date: '', time: '', capacity: '' };

            if(!isPost){
                alert('이미지를 먼저 등록해주세요.');
            }
    
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
                recordByImage();
            }else{
                setCapacityError(errorMessage.capacity);
                setDateError({date: errorMessage.date, time: errorMessage.time});
            }
    }

    return(
        <Container>
            <FormContainer>
                <h2>{name ? name : '음식명'}</h2>
                <div>
                    <ImageWrapper>
                        <p className="p-label">이미지</p>
                        {image ?
                            <div className="d-flex-wrapper">
                                <FoodImage src={image} alt="food"/>
                                <input type="file" name="image" accept="image/*" ref={fileRef} onChange={handleImage} style={{display:"none"}}/>
                                <div>
                                    <Button onClick={clickFileInput} contrast>이미지 수정</Button>
                                    <Button onClick={predictImage}>이미지 등록</Button>
                                    <p className="p-guide">불러온 이미지를 등록해 음식 정보를 조회합니다.</p>
                                </div>
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
                        <Input name="date" type="text" label="식사날짜" error={dateError.date} placeholder="YYYY-MM-DD" onChange={changeDate}/>
                        <Input name="time" type="text" label="식사시간" error={dateError.time} placeholder="hh:mm" onChange={changeTime}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Radio legend="끼니" radioArray={when} onChange={(e)=> updateNutrients({meal: e.target.value})} checked={Number(meal)}/>
                        <Input name="capacity" type="text" label="식사량" placeholder="그람(1인분 300g)" error={capacityError} value={capacity} onChange={changeAmount}/>
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

    @media ${({ theme }) => theme.breakpoints.mobile} {
        margin: 0 1rem;
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

    .d-flex-wrapper{
        display: flex;
        gap: 1.5rem;

        >div{
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
    }


    @media ${({ theme }) => theme.breakpoints.mobile} {
        .d-flex-wrapper{
            display: flex;
            flex-direction: column;
        }
    }
`;

const FoodImage = styled.img`
    width: 20rem;
    height: 20rem;
    border: 1px solid var(--color-border);
    border-radius: 0.2rem;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
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

const FlexWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;



export default RecordImage;