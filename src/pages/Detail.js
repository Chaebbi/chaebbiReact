import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { IoCloseOutline } from 'react-icons/io5';
import { MdModeEdit } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";
import axios from "axios";
import Input from "../elements/Input";
import {API} from "../utils/API.js";

//기록된 식단을 보여주는 상세페이지
function Detail(){
    const {r_id} = useParams();
    const navigate = useNavigate();
    const iconstyle = { float:"right",cursor:"pointer" }

    const conversionForRead =(r)=> {
        let form = r.split('.');
        return (`${form[0]}-${form[1]}-${form[2]}`);
    }
    const conversionForEdit =(r)=> {
        let form = r.split('-');
        return (`${form[0]}.${form[1]}.${form[2]}.`);
    }
    function ateMeal(m){
        const morning = '아침';
        const lunch = '점심';
        const dinner = '저녁';

        if(m == 0){
            return morning;
        }else if(m == 1){
            return lunch;
        }else{
            return dinner;
        }
    }

    //식단기록을 get api 호출하는 함수=========================================================================
    const [record, setRecord] = useState([]);
    const [today, setToday] = useState('');
    const getRecord=()=>{
        axios.post(`${API}/detailrecord`,{
            record_id: r_id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result.data[0]);
            setRecord(response.data.result.data[0]);
            setToday(conversionForRead(response.data.result.data[0].date));
            if(response.data.result.data[0].image_url !== null){
                let splitName = (response.data.result.data[0].image_url).split('/');
                console.log(splitName);
                setImagename(splitName[splitName.length-1]);
                setExist(true);
            }
        }).catch(function(error) {
            console.log(error);
        });
    }

    const handleToday =(e)=>{
        setToday(e.target.value);
    }
    

    //식단기록 삭제(DELETE)=============================================================
    const deleteRecord =()=>{
        axios.delete(`${API}/record`, 
        {
            data:
            {
                recordId: r_id, 
            },
            headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              },
        })
        .then(function(response) {
            console.log(response.data);
            alert('정상적으로 삭제되었습니다.');
            navigate('/');
        }).catch(function(error) {
            console.log(error);
        });
    };

    //수정======================================================
    const [editmode, setEditmode] = useState(false);
    const changeEditmode = () => {
		setEditmode(!editmode);
	};

    const changeContent = (event) => {
        setRecord({...record,[event.target.name]: event.target.value});
	};

    const changeContentInt = (event) => {
		setRecord({...record,[event.target.name]: Number(event.target.value)});
	};

    //이미지 관리=============================================================================
    const [image, setImage] = useState(record.image_url);
    const [imagename, setImagename] = useState(record.image_url);
    const [exist, setExist] = useState(false);
    const handleImage =(e)=>{
        setImage(e.target.files[0]);
        setImagename(e.target.files[0].name);
        setExist(true);
        console.log(e.target.files[0]);
    }

    const deleteImage =(e)=>{
        e.preventDefault();
        axios.delete(`${API}/image-delete`,
        {
            data:
            {
                recordId: r_id
            },
            headers: 
            {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            setExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //식사 정보 + 이미지 수정하기(post api 동시호출)==========================================================================
    const saveAll =()=>{
        const formData = new FormData();
        formData.append("recordId", r_id);
        formData.append("text", record.text);
        formData.append("calory", record.cal);
        formData.append("carb", record.carb);
        formData.append("protein", record.protein);
        formData.append("fat", record.fat);
        formData.append("rdate", conversionForEdit(today));
        formData.append("rtime", record.time);
        formData.append("amount", parseFloat(record.amount));
        formData.append("meal", record.meal);
        formData.append("image", image);

        axios.all([
        axios.post(`${API}/image-update`, formData,
        { headers : { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}`}
        }),
        axios.post(`${API}/record-update`, formData,
        { headers : { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        ]).then(axios.spread((res1, res2)=>{
            console.log(res1.data);
            console.log(res2.data);
            alert("정상적으로 수정되었습니다.");
            window.location.reload();
        })).catch(function(error) {
            console.log(error);
        });
    };



    //유효성 검사========================================================
    const handleValid =(e)=>{
        e.preventDefault();
        let ckCalory = record.cal > 0 && record.cal !== '';
        let ckCarb = record.carb > 0 && record.carb !== '';
        let ckProtein = record.protein > 0 && record.protein !== '';
        let ckFat = record.fat > 0 && record.fat !== '';
        let ckDate = today !== undefined;
        let ckTime = record.time !== '';
        let ckAmount = record.amount > 0 && record.amount !== '';
        let ckMeal = record.meal !== undefined;

        if(ckDate && ckTime && ckMeal && ckCalory && ckAmount && ckCarb && ckProtein && ckFat){
            saveAll();
        }else{
            if(!ckDate){
                alert("나이를 올바르게 입력해주세요.");
            }else if(!ckTime){
                alert("식사시간을 올바르게 입력해주세요.");
            }else if(!ckMeal){
                alert("끼니를 올바르게 입력해주세요.");
            }else if(!ckCalory){
                alert("칼로리를 올바르게 입력해주세요.");
            }else if(!ckAmount){
                alert("섭취량을 올바르게 입력해주세요.");
            }else if(!ckCarb){
                alert("탄수화물량을 올바르게 입력해주세요.");
            }else if(!ckProtein){
                alert("단백질량을 올바르게 입력해주세요.");
            }else if(!ckFat){
                alert("지방량을 올바르게 입력해주세요.");
            }
        }
    }

    useEffect(()=>{
        getRecord();
    },[]);

    return(
        <>
        {!editmode ? 
            <Container>
                <AiOutlineArrowLeft size="25" onClick={()=>{navigate(-1)}} style={{cursor:"pointer"}}/>
                <h2>{record.text}</h2>
                <IoCloseOutline size="25" color="#868e96" style={iconstyle} onClick={deleteRecord}/> 
                <MdModeEdit size="23" color="#868e96" style={iconstyle} onClick={changeEditmode}/>
                <Image 
                    src={record.image_url !== null ? record.image_url : "/no_image_50px.png"}
                    width="100%" 
                    height="200px" 
                    borderRadius="5px"
                    display="inline-block"
                />
                <Grid col="3" row="1" margin="10px 0">
                    <Text inline label="날짜" text={record.date}/>
                    <Text inline label="시간" text={record.time}/>
                    <Text inline label="끼니" text={ateMeal(record.meal)}/>
                </Grid>
                <hr/>
                <Grid col="2" row="1" margin="0 0 10px 0">
                    <Text inline label="칼로리" text={`${record.cal} kcal`}/>
                    <Text inline label="식사량" text={`${record.amount} g`}/>
                </Grid>
                <Grid col="3" row="1" colgap="6px">
                    <Text center label="탄수화물" text={`${record.carb} g`}/>
                    <Text center label="단백질" text={`${record.protein} g`}/>
                    <Text center label="지방" text={`${record.fat} g`}/>
                </Grid>
            </Container>
        :
            <Container>
                <AiOutlineArrowLeft size="25" onClick={()=>{navigate(-1)}} style={{cursor:"pointer"}}/>
                <h2>{record.text}</h2>
                <IoCloseOutline size="25" color="#868e96" style={iconstyle} onClick={deleteRecord}/> 
                <VscSaveAs size="23" color="#868e96" style={iconstyle} onClick={handleValid}/>
                <Image 
                    src={record.image_url !== null ? record.image_url : "/no_image_50px.png"}
                    width="100%" 
                    height="200px" 
                    borderRadius="5px"
                    display="inline-block"
                />
                <Grid col="2" row="1" margin="10px 0">
                    <Input name="date" type="date" text="섭취일자" margin="5px" fieldwidth="95%" value={today} onChange={handleToday}/>
                    <Input name="time" type="time" text="섭취시간" margin="5px" fieldwidth="95%" value={record.time} onChange={changeContent}/>
                </Grid>
                <RadioBox>
                        <Legend>끼니</Legend>
                        <input value="0" name="meal" type="radio" onChange={changeContentInt} checked={record.meal==0}/>아침
                        <input value="1" name="meal" type="radio" onChange={changeContentInt} checked={record.meal==1}/>점심
                        <input value="2" name="meal" type="radio" onChange={changeContentInt} checked={record.meal==2}/>저녁
                </RadioBox>
                <hr/>
                <Grid col="2" row="1" margin="0 0 10px 0">
                    <Input name="cal" type="text" text="칼로리" placeholder="kcal" margin="5px" fieldwidth="95%" value={record.cal} onChange={changeContent}/>
                    <Input name="amount" type="text" text="섭취량" placeholder="g" margin="5px" fieldwidth="95%" value={record.amount} onChange={changeContent}/>
                </Grid>
                <Grid col="3" row="1" colgap="6px" margin="0 0 15px 0">
                    <Input name="carb" type="text" text="탄수화물" placeholder="g" margin="5px" fieldwidth="95%" value={record.carb} onChange={changeContent}/>
                    <Input name="protein" type="text" text="단백질" placeholder="g" margin="5px" fieldwidth="95%" value={record.protein} onChange={changeContent}/>
                    <Input name="fat" type="text" text="지방" placeholder="g" margin="5px" fieldwidth="95%" value={record.fat} onChange={changeContent}/>
                </Grid>
                <hr/>
                {exist == true ? 
                    <>
                        {imagename}
                        <button onClick={deleteImage}>삭제</button>
                    </>
                :
                    <Input inline name="image" type="file" text="이미지" margin="5px" fieldwidth="95%" border="0" onChange={handleImage}/>
                }
                
            </Container>
        }
        </>
        )
    }

const Container = styled.form`
    width: 50%;
    min-width: 360px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    position: relative;
    top: 60px;

    > h2 {
        margin: 5px 0px 20px 20px;
        display: inline-block;
        width: 50%;
    }

    > hr {
        color: #e6e6e6;    /* IE */
        border-color: #e6e6e6;   /* 사파리 */
        background-color: #e6e6e6; /* 크롬 */
        height:1px;
        border:0;
        margin: 10px 0;
    }
`;

const RadioBox = styled.div`
    margin: 4px 0px 4px 10px;
    display: inline-block;

    input{ margin-left: 10px; }
`;

const Legend = styled.legend`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
`;



export default Detail;