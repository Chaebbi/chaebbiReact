import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Grid from "../elements/Grid";
import Text from "../elements/Text";
import Image from "../elements/Image";
import axios from "axios";

//기록된 식단을 보여주는 상세페이지
function Detail(){
    const {r_id} = useParams();
    const navigate = useNavigate();

    //식단기록을 get api 호출하는 함수=========================================================================
    const [record, setRecord] = useState([]);
    const getRecord=()=>{
        axios.post("https://spring.chaebbiserver.shop/api/detailrecord",{
            record_id: r_id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result.data[0]);
            setRecord(response.data.result.data[0]);
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(()=>{
        getRecord();
    },[]);

    return(
        <>
            <Container>
                <AiOutlineArrowLeft size="25" onClick={()=>{navigate(-1)}} style={{cursor:"pointer"}}/>
                <h2>{record.text}</h2>
                <Image 
                    src={record.image_url}
                    width="100%" 
                    height="200px" 
                    borderRadius="5px"
                    display="inline-block"
                />
                <Grid col="2" row="1" margin="10px 0">
                    <Text label="날짜" text={record.date}/>
                    <Text label="시간" text={record.time}/>
                </Grid>
                <Grid col="2" row="1" margin="0 0 10px 0">
                    <Text label="칼로리" text={`${record.cal} kcal`}/>
                    <Text label="식사량" text={`${record.amount} g`}/>
                </Grid>
                <Grid col="3" row="1" colgap="6px" margin="0 0 10px 0">
                    <Text label="탄수화물" text={`${record.carb} g`}/>
                    <Text label="단백질" text={`${record.protein} g`}/>
                    <Text label="지방" text={`${record.fat} g`}/>
                </Grid>
            </Container>
        </>
        )
    }

const Container = styled.div`
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
`;



export default Detail;