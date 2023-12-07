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
            <StyledLink to={`/detail/${id}`}>
                <span className="time">{rtime}</span>
                <span className="kcal">{kcal} kcal</span>
                <p className="menu">{menu}</p>
            </StyledLink>
        </RecordContainer>
        )
    }

const RecordContainer = styled.div`
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    cursor: pointer;
    transition: 0.2s all;

    .time{
        margin-right: 1rem;
        font-weight: 700;
    }

    &:hover{
        background-color: var(--color-input-focus);
    }
`;

const StyledLink = styled(Link)`
    width: 100%;
    display: block;
    text-decoration: none;
    color: var(--color-text);
    padding: 1rem;

    .menu{
        font-size: 1.6rem;
        margin-top: 0.8rem;
    }
`;

export default MealBox;