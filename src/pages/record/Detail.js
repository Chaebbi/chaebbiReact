import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Text from "../../elements/Text";
import axios from "axios";
import Button from "../../elements/Button"
import defaultImage from '../../assets/no_image_50px.png';

//기록된 식단을 보여주는 상세페이지
function Detail(){
    const {r_id} = useParams();
    const navigate = useNavigate();

    const [record, setRecord] = useState({});

    const {
        text = '',
        cal = 0,
        carb = 0,
        protein = 0,
        fat = 0,
        amount = 0,
        meal = 0,
        date,
        time,
        url
    } = record;

    //식단기록을 get api 호출하는 함수=========================================================================
    const getRecord=()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/detailrecord`,{
            record_id: r_id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result.data[0]);
            setRecord(response.data.result.data[0]);
        }).catch(function(error) {
            console.log(error);
            setRecord({
                "name": "veve",
                "text": "감자튀김",
                "cal": "200",
                "carb": "13",
                "protein": "23",
                "fat": "4",
                "image_url": null,
                "date": "2022.08.15.",
                "time": "17:00",
                "amount": 300.0,
                "meal": 1
            })
        });
    }
    

    //식단기록 삭제(DELETE)=============================================================
    const deleteRecord =()=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/record`, 
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


    // 삭제 여부 검토
    const confirmDelete =()=>{
        if(window.confirm('정말로 삭제하시겠습니까?')){
            deleteRecord();
        }
    }
    
    useEffect(()=>{
        getRecord();
    },[]);

    return(
        <Container>
            <AiOutlineArrowLeft size="25" onClick={()=>{navigate('/')}}/>
            <h2>{text ? text : '음식명'}</h2>
            <DetailContentWrapper>
                <img src={url !== null ? defaultImage : url} alt="음식 이미지" />

                <div className="content">
                    <GridWrapper>
                        <Text inline label="날짜" text={date ? date: '0000.00.00'}/>
                        <Text inline label="시간" text={time ? time: '00:00'}/>
                        <Text inline label="끼니" text={meal === 0 ? '아침' : meal === 1 ? '점심' : '저녁'}/>
                    </GridWrapper>
                    <hr/>
                    <GridWrapper>
                        <Text inline label="칼로리" text={`${cal} kcal`}/>
                        <Text inline label="식사량" text={`${amount} g`}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Text inline label="탄수화물" text={`${carb} g`}/>
                        <Text inline label="단백질" text={`${protein} g`}/>
                        <Text inline label="지방" text={`${fat} g`}/>
                    </GridWrapper>
                    <ButtonWrapper>
                        <Button onClick={()=>navigate('edit', { state: record })}>수정하기</Button>
                        <Button contrast onClick={confirmDelete}>삭제하기</Button>
                    </ButtonWrapper>
                </div>
            </DetailContentWrapper>
        </Container>
        )
    }

const Container = styled.form`
    width: 100rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 2rem;

    > h2 {
        display: inline-block;
        margin: 0 0 2rem 1rem;
    }

    hr {
        color: var(--color-border);    /* IE */
        border-color: var(--color-border);   /* 사파리 */
        background-color: var(--color-border); /* 크롬 */
        height: 1px;
        border: 0;
        margin: 2rem 0;
    }

    img{
        border-radius: 0.5rem;
        width: 100%;
        height: 30rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        margin: 0 1rem;
    }
`;

const DetailContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        grid-template-columns: 1fr;
    }
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        grid-template-columns: 1fr;
        row-gap: 1.5rem;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: end;
    margin-top: 2rem;
`;



export default Detail;