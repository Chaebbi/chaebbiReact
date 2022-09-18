import styled from "styled-components";
import { useState } from "react";
import Form from "../elements/Form";
import Image from "../elements/Image";
import Input from "../elements/Input";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import Radio from "../elements/Radio";
import Text from "../elements/Text";
import axios from "axios";
import Modal from "../elements/Modal";
import { useEffect } from "react";

//식단 기록 - 이미지
function RecordImage(){
    const when = [
        {id: 0, name:"meal", value:"0", label:"아침"},
        {id: 1, name:"meal", value:"1", label:"점심"},
        {id: 2, name:"meal", value:"2", label:"저녁"},
    ]

    //상태변수
    const [name, setName] = useState();
    const [calory, setCalory] = useState(0);
    const [carb, setCarb] = useState(0);
    const [protein, setProtein] = useState(0);
    const [fat, setFat] = useState(0);

    const [amount, setAmount] = useState('');
    const [ratio, setRatio] = useState('');
    const changeAmount=(e)=>{
        setAmount(e.target.value);
        console.log([e.target.name], e.target.value);

        setRatio((parseFloat(e.target.value)/food.capacity)*10);
        // console.log(parseFloat(e.target.value)/food.capacity);

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
        let ss = s.slice(6,8); 
        
        if(ampm === 'PM' && hh !== '12') {
            hh = Number(hh) + 12;  //slice 하면 문자열이 되므로 숫자로 변환해서 계산
        }
        if(ampm === 'AM' && hh === '12') {
            hh = '00';
        }
        console.log(`${hh}:${mm}`);
        setTime24(`${hh}:${mm}`);
    }

    
    //이미지 상태변수=====================================================================================
    const [image,setImage] = useState('');
    const handleImage =(e)=>{
        setImage(e.target.files[0]);
    }

    //미리보기====================================================================================
    const reader = new FileReader();
    const previewImage =()=>{
        reader.onload=()=>{
            document.querySelector('#image_preview').style.backgroundImage = `url(${reader.result})`
        }
        reader.readAsDataURL(image);
    }

    const showImage =()=>{
        reader.onload=()=>{
            document.querySelector('.image2').style.backgroundImage = `url(${reader.result})`
            document.querySelector('.image2').style.backgroundSize = `cover`;
            document.querySelector('.image2').style.backgroundPosition = `center`;
        }
        reader.readAsDataURL(image);
    }

    //모달=======================================================================================
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = (e) => {
        e.preventDefault();
        setModalOpen(true);
        previewImage();
    };
    const submitModal = () => {
        setModalOpen(false);
        predictImage();
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    //음식 이미지 전송(POST)=====================================================================
    const [isPost, setIsPost] = useState(false); //이미지 등록 여부
    const [food,setFood] = useState();
    const predictImage =(e)=>{
        const formData = new FormData();
        formData.append("file", image);
        axios.post("https://flask.chaebbiserver.shop/api/foodpredict",formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response);
            setFood(response.data);
            setName(response.data.name);
            setCarb(response.data.carb);
            setProtein(response.data.pro);
            setFat(response.data.fat);
            setCalory(response.data.calory);
            setAmount(response.data.capacity);
            setIsPost(true);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //이미지로 식단기록하기(POST)==========================================================================
    const recordByImage =()=>{
        const formData = new FormData();
        formData.append("image", image);
        formData.append("text", name);
        formData.append("calory", calory);
        formData.append("carb", String(carb));
        formData.append("protein", String(protein));
        formData.append("fat", String(fat));
        formData.append("amount", parseFloat(amount));
        formData.append("meal", Number(meal));
        formData.append("rdate", dateform);
        formData.append('rtime', time24);
        axios.post("https://spring.chaebbiserver.shop/api/record",formData,
        { headers : { 'Content-Type': 'multipart/form-data' , Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            if(response.data.code == 1000){
                alert('식단이 정상적으로 등록되었습니다.');
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


        if(isPost && ckName && ckAmount && ckDate && ckTime && ckMeal && ckCarb && ckProtein && ckCalory && ckFat){
            recordByImage();
        }else{
            if(!isPost){
                alert("이미지를 첨부해주세요.");
            }else if(!ckName){
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

    //useEffect==========================
    useEffect(()=>{
        if(isPost){
            showImage();
        }
    },[image,isPost])

    return(
        <>
            <Explain>이미지를 불러오면 식단을 기록할 수 있습니다.</Explain>
            <ImageBox>
                <input type="file" name="image" onChange={handleImage}/>
                <button onClick={openModal}>이미지등록</button>
            </ImageBox>
            
            {isPost ? 
                    <Form width="60%" height="400px" margin="0 auto" padding="20px" position="relative" top="50px">
                        <FoodName>{name}</FoodName>
                        <Grid col="2" row="1" margin="10px" colgap="20px" width="90%" height="200px">
                            <div className="image2"></div>

                            <Grid col="2" row="1" margin="0" width="100%">
                                <Input name="date" type="date" text="식사날짜" placeholder="2022-00-00" value={date||''} margin="0px" fieldwidth="95%" onChange={changeDate}/>
                                <Input name="time" type="time" text="식사시간" placeholder="00:00~23:59" value={time||''} margin="0px" fieldwidth="95%" onChange={changeTime}/>
                            </Grid>
                        </Grid>
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
                                submit
                                width="240px"
                                height="46px" 
                                margin="0 auto"
                                borderRadius="10px"
                                text="기록하기"
                                onClick={handleValid}
                            />
                        </ButtonPlace>
                    </Form>
            :
                ''
            }
            
            

            <Modal open={modalOpen} close={closeModal} submit={submitModal} header="미리보기" height="400px" margin="150px auto">
                <PreviewBox id="image_preview"></PreviewBox>
            </Modal>
        </>
    )
}


const Explain = styled.h2`
    text-align:center;
    position:relative;
    top: 40px;
`;

const ImageBox = styled.form`
    width: 40%;
    min-width: 400px;
    text-align: center;

    position: relative;
    top: 45px;

    border: 1px solid #e6e6e6;
    border-radius: 20px;

    padding: 10px 10px 10px 20px;
    margin: 0 auto;
    box-sizing: border-box;
`;

const PreviewBox = styled.div`
    height: 300px;
    background-position: center;
    background-size: cover;
    /* background-position: 50% 50%;
	background-size: contain;
	background-repeat: no-repeat; */
`;

const FoodName = styled.h2`
    margin: 5px 0 20px 0;
`;

const ButtonPlace = styled.div`
    text-align:center;
`;

const RadioBox = styled.div`
    margin-left: 10px;
    margin-top: 4px;
    margin-bottom: 20px;
    display: inline-block;
`;

const Legend = styled.legend`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
`;


export default RecordImage;