import styled,{ keyframes } from "styled-components";

//막대 그래프 컴포넌트
function StackGraph({ intake, recommend }){
    const after_conversion = isNaN(Math.round((intake/recommend)*100)) ? 0 : Math.round((intake/recommend)*100);

    return(
        <StackContainer after_conversion={after_conversion}>
            <span>{ `${after_conversion}%` }</span>
        </StackContainer>
        )
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
    height: 1.4rem;
    background-color: var(--color-light-gray);
    border-radius: 1.5rem;

    > span {
        display: block;
        width: ${({after_conversion}) => `${after_conversion}%`};
        max-width: 100%;
        height: 1.4rem;
        background-color: rgba(198,221,207,1);
        background-color: #85dba9;
        border-radius: 1.5rem;
        text-align: right;
        color: var(--color-text);
        animation: ${stackAnimation} 1s ease-in-out both ;
        animation-delay: 2s;
    }
`;

export default StackGraph;