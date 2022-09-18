import styled from "styled-components";
import { useState,useEffect } from "react";
import Grid from "../elements/Grid";
import axios from "axios";
import Pchart from "../components/Pchart";
import WeeklyGraph from "../components/WeeklyGraph";

//식단분석 페이지
function AnalyzeDiet(){
    let today = new Date();   

    let year = today.getFullYear();
    let month = today.getMonth() + 1;
    let date = today.getDate();
    let fulldate = year + '.' + month + '.' + date;

    const [ratio, setRatio] = useState('');
    const [total, setTotal] = useState('');
    const [weeklist, setWeeklist] = useState([]); //그래프에 사용(날짜별 총 섭취 칼로리)

    const getAnalysis=()=>{
        axios.get("https://spring.chaebbiserver.shop/api/analysis",
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            // console.log(response.data.result);

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
            <Grid col="2" row="1" colgap="10px">
                    <ChartContainer>
                    <h2>Today {fulldate}</h2>
                    <P>지난 7일간 기록된 점수입니다.</P>
                    {weeklist !== undefined||null||''?
                            <WeeklyGraph week={weeklist}/>
                    :
                            <div style={{margin: "40px auto", backgroundColor:"#e6e6e6"}}>표본 부족</div>
                    }       
                    </ChartContainer>

                <NutrientsInfomation>
                <Title>주간영양섭취량</Title>

                <Grid col="2" row="1" margin="0">
                    {ratio !== undefined||null||''?
                        <Pchart nutrient={ratio}/>
                    :
                        <div style={{margin: "40px auto", backgroundColor:"#e6e6e6"}}>표본 부족</div>
                    }
                    
                    <Grid col="2" row="1" margin="0">
                        <h4 style={{color:"#0088fe"}}>탄수화물</h4>
                        <p>{total.carb} g</p>
                        <h4 style={{color:"#00c49f"}}>단백질</h4>
                        <p>{total.protein} g</p>
                        <h4 style={{color:"#ffbb28"}}>지방</h4>
                        <p>{total.fat} g</p>
                    </Grid>
                </Grid>
            </NutrientsInfomation>
            </Grid>
            
            

            

            {/* <h4>평소보다 적게/많이 섭취하셨습니다.</h4> */}
        </Container>
        </>
        )
    }

const Container = styled.div`
    width: 80%;
    min-width: 1000px;
    max-width: 1000px;
    height: 380px;
    min-width: 500px;
    box-sizing: border-box;

    margin: 0 auto;
    padding: 20px;

    position: relative;
    top: 70px;

    border: 1px solid #e6e6e6;
    border-radius: 15px;
`;

const ChartContainer = styled.div`
    width: 100%;
    margin-top: 20px;
    box-sizing: border-box;
    padding-top: 20px;
    padding-left: 10px;
    /* border: 1px solid #e6e6e6; */
    /* background-color: #e6e6e6; */
`;

const NutrientsInfomation = styled.div`
    min-width: 300px;
    height: 280px;
    box-sizing: border-box;
    margin-top: 20px;
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
`;

const H2 = styled.h2`
    margin: 0;
    margin-bottom: 15px;
    position: relative;
    top: 70px;
    text-align: center;
`;

const P = styled.p`
    margin: 0;
    color: #868e96;
`;

const Title = styled.h2`
    margin: 0;
    margin-bottom: 10px;
`;


export default AnalyzeDiet;