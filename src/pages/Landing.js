import styled from "styled-components";
import Button from "../elements/Button";

//비회원용 대문페이지
function Landing(){
    return(
        <IntroduceWrapper>
            <h1>Chaebbi</h1>
            <p>채식인들을 위한 일상 식단관리 웹사이트</p>
                
            <Button href="/sign_in">로그인</Button>
            <Button href="/sign_up">회원가입</Button>
        </IntroduceWrapper>
)}

const IntroduceWrapper = styled.div`
    width: 600px;
    margin: 0 auto;
    position: relative;
    top: 230px;
`;

export default Landing;