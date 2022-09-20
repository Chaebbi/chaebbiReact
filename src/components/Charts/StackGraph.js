import styled,{ keyframes } from "styled-components";

//막대 그래프 컴포넌트
function StackGraph({intake, recommend}){
    let before_conversion = (intake/recommend)*100;
    let after_conversion = Math.round(before_conversion);

    return(
        <StackContainer after_conversion={after_conversion}>
            <span>{`${after_conversion}%`}</span>
        </StackContainer>
        )
    }

StackGraph.defaultProps={
    intake: 0,
}

const stackAnimation = keyframes`
    0% { 
        width: 0%;
        color: rgba(73,80,87,0);
     }
    100% { 
        width: ${({after_conversion}) => `${after_conversion}%`};
        color: rgba(73,80,87,1);
        } 
`;

const StackContainer = styled.div`
    height: 20px;
    margin-top: 5px;
    background-color: #e6e6e6;
    border-radius: 15px;

    > span {
        display: block;
        padding: 0;
        width: ${({after_conversion}) => `${after_conversion}%`};
        max-width: 100%;
        height: 20px;
        line-height: 20px;
        background-color: rgba(198,221,207,1);
        border-radius: 15px;
        box-sizing: border-box;
        text-align: right;
        color: #495057;
        animation: ${stackAnimation} 1s ease-in-out both ;
        animation-delay: 2s;
    }
`;

export default StackGraph;