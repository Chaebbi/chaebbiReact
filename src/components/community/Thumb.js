import styled from "styled-components";
import ThumbOutline from "../../assets/thumb.svg";
import ThumbFilled from "../../assets/thumb-filled.svg";

//따봉 컴포넌트
const Thumb = ({ like, onClick }) => {
    return (
        <ThumbContainer src={like?ThumbFilled:ThumbOutline} onClick={onClick} />
    );
};

const ThumbContainer = styled.img`
    width: 18px;
    height: 18px;
    cursor: pointer;
`;

export default Thumb;