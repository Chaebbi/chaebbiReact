import styled from "styled-components";

function HorizontalStackGraph(props){
    const {carb, protein, fat, width} = props;

    return(
        <HorizontalContainer width={width} carb={carb} protein={protein} fat={fat}>
            <span>탄수화물 {carb}</span>
            <span>단백질 {protein}</span>
            <span>지방 {fat}</span>
        </HorizontalContainer>
    )
}

const HorizontalContainer = styled.div`
    width: ${(props)=>props.width};
    height: 48px;
    position: relative;
    box-sizing: border-box;
    /* border: 1px solid #cac4ce; */
    border: 1px solid #fff;
    background-color: #fff;
    margin: 0 auto;
    white-space: nowrap;

    span{
        line-height: 48px;
        list-style-type: none;
        display: inline-block;
        border: 1px solid #fff;
        box-sizing: border-box;
        text-align: center;
        font-size: 14px;
        background-color: beige;
        color: #fff;
    }
    span:first-child{
        width: ${(props)=>props.carb};
        background-color: #0088fe;
        /* color:"#0088fe" */
        /* color:"#00c49f" */
        /* color:"#ffbb28" */
    }
    span:nth-child(2){
        width: ${(props)=>props.protein};
        background-color: #00c49f;
    }
    span:last-child{
        width: ${(props)=>props.fat};
        background-color: #ffbb28;
    }
`;

export default HorizontalStackGraph;