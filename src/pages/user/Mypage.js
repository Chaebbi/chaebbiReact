import Profile from "../../components/Profile";
import Bookmarks from "../../components/Bookmarks";
import styled from "styled-components";

//마이페이지
function Mypage(){
    return(
            <LayoutContainer>
                <Profile/>
                <Bookmarks/>
            </LayoutContainer>
        )
}

const LayoutContainer = styled.div`
    display: flex;
    align-items: flex-start;
    gap: 2rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        flex-direction: column;
        align-items: stretch;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
        padding: 1rem;
    } 
`;


export default Mypage;