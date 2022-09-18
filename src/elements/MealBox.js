import styled from "styled-components";
import {Link} from "react-router-dom";

//식단등록 컴포넌트에서 사용할 식단 요소
function MealBox(props){
    const {
        id,
        rtime,
        kcal,
        menu,
    } = props;

    return(
        <RecordContainer id={id}>
            <p>{rtime}</p>
            <span>{kcal} kcal</span>
            <StyledLink to={`/detail/${id}`}>
                <p>{menu}</p>
            </StyledLink>
        </RecordContainer>
        )
    }

MealBox.defaultProps={
    onClick: () => {},
}

const RecordContainer = styled.div`
    width: 100%;
    background-color: rgba(198,221,207,0.3);
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;
    transition: 0.2s all;

    > p:first-child {
        display: inline-block;
        width: 60%;
        margin : 0;
        font-weight: 600;
    }
    > p:last-child {
        margin : 0;
    }

    &:hover{
        background-color: rgba(198,221,207,0.5);
        color: #495057;
    }
`;

const StyledLink = styled(Link)`
    text-decoration: none;
    color: #495057;
`;

export default MealBox;