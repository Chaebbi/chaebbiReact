import styled from "styled-components";
import StackGraph from "./Charts/StackGraph";

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
        bottom,
        width
    } = props;

    return(
        <NutrientsContainer position={position} top={top} left={left} right={right} bottom={bottom} width={width}>
                    <InfoContainer>
                        <h2 style={{display:"inline-block",margin:"0",marginBottom:"15px"}}>주요 영양소</h2>
                        <span style={{float:"right"}}>(단위:g)</span>
                        <br/>
                        {`추천 섭취 칼로리 : ${recommended_kcal} kcal`}<br/>
                        {`금일 섭취 칼로리 : ${total_kcal} kcal`}
                        <div>
                            <H4>탄수화물</H4>
                            <G>{`${total_carb}/${recommended_carb}`}</G>
                            <StackGraph intake={total_carb} recommend={recommended_carb}/>
                        </div>
                        <div>
                            <H4>단백질</H4>
                            <G>{`${total_protein}/${recommended_protein}`}</G>
                            <StackGraph intake={total_protein} recommend={recommended_protein}/>
                        </div>
                        <div>
                            <H4>지방</H4>
                            <G>{`${total_fat}/${recommended_fat}`}</G>
                            <StackGraph intake={total_fat} recommend={recommended_fat}/>
                        </div>
                    </InfoContainer>  
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
    width:  ${(props)=>props.width};
    min-width: 300px;
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
    width: 12%;
    margin: 20px 0px 0px 0px;
    float: right;
`;


export default NutrientsInfo;