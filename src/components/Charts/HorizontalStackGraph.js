import styled from "styled-components";

function HorizontalStackGraph(props){
    const {carb, protein, fat} = props;

    return(
        <HorizontalContainer carb={carb} protein={protein} fat={fat}>
            <span>탄수화물 {carb}%</span>
            <span>단백질 {protein}%</span>
            <span>지방 {fat}%</span>
        </HorizontalContainer>
    )
}

const HorizontalContainer = styled.div`
    width: 100%;
    height: 4.8rem;
    border: 1px solid var(--color-white);
    background-color: var(--color-white);
    white-space: nowrap;

    span{
        line-height: 4.8rem;
        list-style-type: none;
        display: inline-block;
        border: 1px solid var(--color-white);
        text-align: center;
        font-size: 1.4rem;
        background-color: beige;
        color: var(--color-white);
    }
    span:first-child{
        width: ${(props)=>props.carb}%;
        background-color: #0088fe;
    }
    span:nth-child(2){
        width: ${(props)=>props.protein}%;
        background-color: #00c49f;
    }
    span:last-child{
        width: ${(props)=>props.fat}%;
        background-color: #ffbb28;
    }
`;

export default HorizontalStackGraph;