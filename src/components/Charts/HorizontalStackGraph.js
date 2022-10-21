import styled,{ keyframes } from "styled-components";

function HorizontalStackGraph({carb, protein, fat, width}){
    // console.log(carb, protein, fat); //string

    let c = Number(carb);
    let p = Number(protein);
    let f = Number(fat);
    const total = c + p+ f;
    const carbPercent = Number(((c/total)*100).toFixed(0));
    const proteinPercent = ((p/total)*100).toFixed(0);
    const fatPercent = ((f/total)*100).toFixed(0);
    const nutrientsRatio = [carbPercent,proteinPercent,fatPercent];

    return(
        <HorizontalContainer width={width}>
            <span carbPercent={carbPercent}>탄수화물 {`${nutrientsRatio[0]}%`}</span>
            <span proteinPercent={proteinPercent}>단백질 {`${nutrientsRatio[1]}%`}</span>
            <span fatPercent={fatPercent}>지방 {`${nutrientsRatio[2]}%`}</span>
        </HorizontalContainer>
    )
}

const HorizontalContainer = styled.div`
    width: ${(props)=>props.width};
    height: 40px;
    position: relative;
    box-sizing: border-box;
    border: 1px solid #cac4ce;
    background-color: #cac4ce;
    margin: 0 auto;
    white-space: nowrap;

    span{
        line-height: 40px;
        list-style-type: none;
        display: inline-block;
        background-color: beige;
        box-sizing: border-box;
        text-align: center;
        font-size: 12px;
        color: #4a5759;
    }
    span:first-child{
        width: ${(props)=>props.carbPercent}%;
        background-color: #dde5b6;
        /* color:"#0088fe" */
        /* color:"#00c49f" */
        /* color:"#ffbb28" */
    }
    span:nth-child(2){
        width: ${(props)=>props.proteinPercent}%;
        background-color: #adc178;
    }
    span:last-child{
        width: ${(props)=>props.fatPercent}%;
        background-color: #cbdfbd;
    }
`;

export default HorizontalStackGraph;