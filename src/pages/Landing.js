import styled from "styled-components";
import Button from "../elements/Button";
import Image from "../elements/Image";

//비회원용 대문페이지
function Landing(){
    return(
        <>
            <IntroduceBox>
                <H1>Chaebbi</H1>
                <H4>채식인들을 위한 식단추천 웹사이트</H4>
                <Button 
                 width="240px"
                 height="46px" 
                 margin="25px 0 15px 0"
                 borderRadius="10px"
                 position="relative" left="180px"
                 text="테스트 페이지" 
                 href="/test"
                />
                <Button
                 width="240px" 
                 height="46px"
                 margin="25px 0 15px 0"
                 position="relative" top="60px" left="-60px"
                 borderRadius="10px"
                 border="#e6e6e6"
                 hover="#fff"
                 background="#fff"
                 color="#000"
                 text="로그인하기" 
                 href="/sign_in"
                 />
            
            </IntroduceBox>
        </>
)}

const IntroduceBox = styled.div`
    width: 600px;
    margin: 0 auto;
    position: relative;
    top: 230px;
`;

const H1 = styled.h1`
    font-size: 66px;
    font-weight: 800;
    text-align: center;
    margin: 0;
    margin-bottom: 25px;
`;

const H4 = styled.h4`
    font-size: 18px;
    font-weight: 500;
    text-align: center;
    color: #495057;
    margin: 10px 0;

`;

export default Landing;