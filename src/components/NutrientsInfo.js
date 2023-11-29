import styled from "styled-components";
import StackGraph from "./Charts/StackGraph";

//영양정보 보여주는 컴포넌트 - 메인 페이지에서 사용
function NutrientsInfo(props){
    const {
        recommended_kcal = 0,
        recommended_carb = 0,
        recommended_protein = 0,
        recommended_fat = 0,
        total_kcal = 0,
        total_carb = 0,
        total_protein = 0,
        total_fat = 0,
    } = props;

    return(
        <NutrientsContainer>
            <div className="flex-wrapper">
                <h1>주요 영양소</h1>
                <span>(단위:g)</span>
            </div>
                        <div className="kcal-wrapper">
                            <p>{`추천 섭취 칼로리 : ${recommended_kcal} kcal`}</p>
                            <p>{`금일 섭취 칼로리 : ${total_kcal} kcal`}</p>
                        </div>
                        
                        <div>
                            <div className="flex-wrapper flat-chart-wrapper">
                                <h3>탄수화물</h3>
                                <span>{`${total_carb}/${recommended_carb}`}</span>
                            </div>
                            <StackGraph intake={total_carb} recommend={recommended_carb}/>
                        </div>
                        <div>
                            <div className="flex-wrapper flat-chart-wrapper">
                                <h3>단백질</h3>
                                <span>{`${total_protein}/${recommended_protein}`}</span>
                            </div>
                            <StackGraph intake={total_protein} recommend={recommended_protein}/>
                        </div>
                        <div>
                            <div className="flex-wrapper flat-chart-wrapper">
                                <h3>지방</h3>
                                <span>{`${total_fat}/${recommended_fat}`}</span>
                            </div>
                            <StackGraph intake={total_fat} recommend={recommended_fat}/>
                        </div>
        </NutrientsContainer>
    )
}

const NutrientsContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 2rem;

    .flex-wrapper{
        display: flex;
        align-items: center;
        justify-content: space-between;

        h1{ font-size: 2.2rem; }
    }

    .flat-chart-wrapper{
        margin-bottom: 0.4rem;
    }
`;


export default NutrientsInfo;