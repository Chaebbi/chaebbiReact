import styled from "styled-components";
import { useState,useEffect } from "react";
import axios from "axios";
import WeeklyGraph from "../../components/Charts/WeeklyGraph";
import HorizontalStackGraph from "../../components/Charts/HorizontalStackGraph";
import styles from "../../styles/AnalyzeDiet.module.css";
import { dateConversion } from "../../utils/common";

const problem = ["", "칼로리 섭취 높음","칼로리 섭취 적음","탄수화물 섭취 높음","탄수화물 섭취 적음","단백질 섭취 높음","단백질 섭취 적음","지방 섭취 높음","지방 섭취 적음"];

//식단분석 페이지
function AnalyzeDiet(){
    const [startDate, setStartDate] = useState(new Date());
    const [ratio, setRatio] = useState({});
    const [analysis, setAnalysis] = useState([]); //그래프에 사용(날짜별 총 섭취 칼로리)
    const [problems, setProblems] = useState([]); //문제
    const [suggestionList, setSuggestionList] = useState([]); //제안 식단

    const getAnalysis =()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/analysis`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            setStartDate(new Date());
            setRatio({
                carb: response.data.result.ratioCarb,
                protein: response.data.result.ratioPro,
                fat: response.data.result.ratioFat
            });
            setAnalysis(response.data.result.analysisDtos);
            setProblems(response.data.result.problemsDtoList);
            setSuggestionList(response.data.result.suggestionsDtoList);
            
        }).catch(function(error) {
            setStartDate(new Date());
            setRatio({
                carb: 0,
                protein: 0,
                fat: 0,
            })
            setAnalysis([]);
            setProblems([]);
            setSuggestionList([]);
        });
    }
    
    const probStorage = [];
    for(let i=0; i<problems.length; i++){
        const filtered = Array.from(suggestionList).filter((s)=>{ return s.problemId === problems[i].problemId });
        probStorage.push(filtered);
    }

    useEffect(()=>{
        getAnalysis();
    },[]);
    

    return(
        <Container>
            <div className="date-wrapper">
                <span className="bedge">Today</span>
                <h1>{dateConversion(startDate)}</h1>
            </div>
            <h1>누적 칼로리 섭취량</h1>
            <p>지난 7일간 기록된 칼로리 섭취량입니다.</p>
            {analysis.length !== 0 ?
                <WeeklyGraph week={analysis}/>
            :
                <NoAnalysisWrapper>
                    <span>데이터 부족</span>
                </NoAnalysisWrapper>
            }

            <NutrientsInfomation>
                <h1>주간영양섭취량</h1>
                { analysis.length !== 0 && <HorizontalStackGraph carb={ratio.carb} protein={ratio.protein} fat={ratio.fat}/> }
                <p>지난 7일간의 식습관 평가</p>
                {problems.length !== 0 ? 
                    <ul>
                        {Array.from(problems).map((p,index) => (
                            <li key={index}>{problem[p.problemId]}</li>
                        ))}
                    </ul>
                :
                    <NoAnalysisWrapper>
                        <span>데이터 부족</span>
                    </NoAnalysisWrapper>
                }
            </NutrientsInfomation>

            <h1>식습관 개선을 위한 채식 메뉴 제안</h1>
            <p>걱정마세요! 채삐가 사용자님을 위해 다양한 음식들을 가져왔어요.</p>
            <ul id={styles.accordionContainer}>
            {problems.length !== 0 ? 
            <>
                {Array.from(problems).map((p,index) => (
                    <li key={index}>
                        <label htmlFor={index}>{problem[p.problemId]}</label>
                        <input type="checkbox" name="suggestions" id={index}/>
                        <div className={styles.content}>
                        {Array.from(probStorage[index]).map((p,index) => (
                            <div key={index}>
                                <img src={p.foodUrl} alt={p.foodName}/>
                                <p>{p.foodName}</p>
                            </div>
                        ))}
                        </div>
                    </li>
                ))}
            </>
            :
                <NoAnalysisWrapper>
                    <span>데이터 부족</span>
                </NoAnalysisWrapper>
            }
            </ul>
        </Container>
        )
    }

const Container = styled.div`
    width: 80rem;
    padding: 2rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;

    .grid-box{
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 2rem;
    }
    h1{
        font-size: 2.2rem;
        margin: 1rem 0;
    }
    p{  
        margin-bottom: 1rem;
        color: var(--color-sub-text);
    }
    img{
        width: 100%;
        height: 12rem;
        border-radius: 0.5rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 80%;
        min-width: 40rem;

        .grid-box{
            grid-template-columns: 1fr;
        }
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
        margin: 0 1rem;
        padding: 1rem;
    }
`;

const NoAnalysisWrapper = styled.div`
    text-align: center;
    height: 7rem;
    border-radius: 0.5rem;
    background-color: var(--color-light-gray);
    display: flex;
    align-items: center;
    justify-content: center;

    span{
        color: var(--color-sub-text);
    }
`;

const NutrientsInfomation = styled.div`
    margin-bottom: 4rem;

    p{
        margin-top: 1.5rem;
    }

    ul{
      padding-left: 2rem;
    }

    li{
        margin-bottom: 1rem;
    }
`;


export default AnalyzeDiet;