import styled from "styled-components";
import { useState } from "react";
import Grid from "../elements/Grid";

//영양정보 보여주는 컴포넌트 - 분석페이지에서 사용
function NutrientsInfo(props){
    const {
        recommended_kcal,
        recommended_carb,
        recommended_protein,
        recommended_fat,
        total_kcal,
        total_carb,
        total_protein,
        total_fat,
        position,
        top,
        left,
        right,
        bottom
    } = props;



    return(
        <NutrientsContainer position={position} top={top} left={left} right={right} bottom={bottom}>
                <Grid col="2" row="1" colgap="20px" margin="0 auto" width="100%">
                    <ChartContainer>
                        <Chart>
                        {`추천 섭취 칼로리 : ${recommended_kcal} kcal`}<br/>
                        {`금일 섭취 칼로리 : ${total_kcal} kcal`}
                        </Chart>
                    </ChartContainer>
                    <InfoContainer>
                        <h2 style={{display:"inline-block",margin:"0",marginBottom:"15px"}}>주요 영양소</h2>
                        <span style={{float:"right"}}>(단위:g)</span>
                        <br/>
                        <div>
                            <H4>탄수화물</H4>
                            <G>{`${total_carb}/${recommended_carb}`}</G>
                        </div>
                        <Slider>0</Slider>
                        <div>
                            <H4>단백질</H4>
                            <G>{`${total_protein}/${recommended_protein}`}</G>
                        </div>
                        <Slider>0</Slider>
                        <div>
                            <H4>지방</H4>
                            <G>{`${total_fat}/${recommended_fat}`}</G>
                        </div>
                        <Slider>0</Slider>
                    </InfoContainer>  
                </Grid>
            </NutrientsContainer>
        )
    }

NutrientsInfo.defaultProps={
    recommended_kcal: 0,
    recommended_carb: 0,
    recommended_protein: 0,
    recommended_fat: 0,
    total_kcal: 0,
    total_carb: 0,
    total_protein: 0,
    total_fat: 0,
    }

const NutrientsContainer = styled.div`
    width: 30%;
    min-width: 500px;
    height: 400px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 20px;
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    bottom: ${(props)=>props.bottom};
`;

const ChartContainer = styled.div`
    background-color: yellow;
    box-sizing: border-box;
`;

const Chart = styled.div`
    width: 100%;
    height: 357px;
    border: 1px solid #fff;
    background-color: #e6e6e6;
`;

const InfoContainer = styled.div`
    box-sizing: border-box;
    padding: 10px;
`;

const H4 = styled.h3`
    display: inline-block;
    width: 55%;
    margin: 20px 0px 0px 10px;
`;

const G = styled.span`
    display: inline-block;
    width: 20%;
    margin: 20px 10px 0px 0px;
    float: right;
`;

const Slider = styled.p`
    width: 95%;
    margin: 5px;
    padding: 1px;
    background-color: rgba(198,221,207,0.5);
    border: 1px solid #fff;
    border-radius: 15px;
`;

export default NutrientsInfo;