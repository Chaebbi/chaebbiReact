import styled from "styled-components";
import { useState,useEffect } from "react";
import axios from "axios";
import Image from "../elements/Image";
import WeeklyGraph from "../components/Charts/WeeklyGraph";
import HorizontalStackGraph from "../components/Charts/HorizontalStackGraph";

//식단분석 페이지
function AnalyzeDiet(){
    //오늘 날짜 출력을 위한 변수=======================================================================
    let today = new Date();   
    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let fulldate = year + '.' + month + '.' + date;

    //식이문제번호====================================================================================
    const problem = ["칼로리 섭취 높음","칼로리 섭취 적음","탄수화물 섭취 높음","탄수화물 섭취 적음","단백질 섭취 높음","단백질 섭취 적음","지방 섭취 높음","지방 섭취 적음"];


    //식단분석결과 가져오기(GET)=======================================================================
    const [ratio, setRatio] = useState('');
    const [total, setTotal] = useState('');
    const [weeklist, setWeeklist] = useState([]); //그래프에 사용(날짜별 총 섭취 칼로리)
    const [problems, setProblems] = useState(''); //문제
    const [suggestionList, setSuggestionList] = useState(''); //제안 식단

    const getAnalysis=async()=>{
        await axios.get("https://spring.chaebbiserver.shop/api/analysis",
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);

            setRatio({
                carb: response.data.result.ratioCarb,
                protein: response.data.result.ratioPro,
                fat: response.data.result.ratioFat
            });
            
            setTotal({
                carb : response.data.result.totalCarb,
                protein: response.data.result.totalPro,
                fat: response.data.result.totalFat
            });

            setWeeklist(response.data.result.analysisDtos);
            setProblems(response.data.result.problemsDtoList);
            setSuggestionList(response.data.result.suggestionsDtoList);
            
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(()=>{
        getAnalysis();
    },[]);
    

    return(
        <>
        <H2>식단분석</H2>
        <Container>
                <ChartContainer>
                    <h2>Today {fulldate}</h2>
                    <p>지난 7일간 기록된 점수입니다.</p>
                    {weeklist !== undefined||null||''?
                        <div style={{width:"550px", height:"300px", margin: "0px auto", position:"relative", left:"-18px"}}>
                            <WeeklyGraph week={weeklist}/>
                        </div>
                    :
                        <div style={{margin: "0px auto", backgroundColor:"#e6e6e6"}}>
                            표본 부족
                        </div>
                    }       
                </ChartContainer>

                <NutrientsInfomation>
                    <Title>주간영양섭취량</Title>
                    {/* 아예 퍼센트를 계산해서 넘겨줘야 css를 인식할듯 */}
                    <HorizontalStackGraph carb={total.carb} protein={total.protein} fat={total.fat} width="80%"/>
                    <h3>지난 7일간의 식습관 평가</h3>
                    <ul>
                        {Array.from(problems).map((p,index) => (
                            <li key={index}>{problem[p.problemId-1]}</li>
                        ))}
                    </ul>
                </NutrientsInfomation>

                <SuggestionContainer>
                    <h2>식습관 개선을 위한 채식 제안</h2>
                    <p>걱정마세요! 채삐가 사용자님을 위해 이런 음식들을 가져왔어요.</p>
                    <GridContainer>
                                {Array.from(suggestionList).map((s,index) => (
                                    <div>
                                        <div style={{height:"100px",backgroundColor:"yellow"}}>
                                            <Image src={s.foodUrl} width="100%" height="auto"/>
                                        </div>
                                        <h3>{s.foodName}</h3>
                                    </div>
                                ))}
                    </GridContainer>
                </SuggestionContainer>
        </Container>
        </>
        )
    }

const Container = styled.div`
    width: 60%;
    height: 1600px;
    min-width: 600px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    position: relative;
    top: 70px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
`;

const ChartContainer = styled.div`
    width: 100%;
    margin: 0 auto;

    h2{ margin: 0;}
    p{ margin: 10px 0; color: #868e96; }
`;

const NutrientsInfomation = styled.div`
    
    ul li {

    }
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(3, auto);
    grid-template-rows: repeat(3, 200px);
    column-gap: 10px;
    row-gap: 10px;
    position: relative;

    div{
        height: 200px;
        border: 1px solid #e6e6e6;
    }

    div h3{
        position: relative;
        top: -50px;
        z-index: 2;
        color: #fff;
    }


`;

const SuggestionContainer = styled.div`
    h2{ margin: 20px 0 0 0; }
    p{ margin: 10px 0; color: #868e96; }
`;

const H2 = styled.h2`
    margin: 0;
    margin-bottom: 15px;
    position: relative;
    top: 70px;
    text-align: center;
`;

const Title = styled.h2`
    margin: 0;
    margin-bottom: 10px;
`;


export default AnalyzeDiet;