import styled from "styled-components";
import { useNavigate,Link } from 'react-router-dom';

function Navigation(){
    const insertedToken = localStorage.getItem('token');
    const navigate = useNavigate();
    const doLogout =()=>{
        localStorage.removeItem('token');
        navigate("/sign_in");
    }

    return(
        <NavBox>
            {insertedToken ? ( 
                <Logo>
                    <StyledLink to='/'>CHAEBBI</StyledLink>
                </Logo>
                ) : (
                <Logo>
                    <StyledLink to='/landing'>CHAEBBI</StyledLink>
                </Logo>
                )}
            
                <Ul>
                    <li>
                        <StyledLink to='/record-foodimage'>식단기록-이미지</StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/record-foodsearch'>식단기록-검색</StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/analyze-diet'>식단분석</StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/search-restaurant'>음식점검색</StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/recommend-fridge-ingredients'>메뉴추천</StyledLink>
                    </li>
                    <li>
                        <StyledLink to='/mypage'>마이페이지</StyledLink>
                    </li>
                </Ul>

                {insertedToken ? 
                    <span onClick={doLogout}>로그아웃</span>
                :
                    <span>
                        <StyledLink to='/sign_in'>로그인</StyledLink>
                    </span>
                }
        </NavBox>
    )
}

const NavBox = styled.div`
    width: 100%;
    height: 60px;
    border-bottom: 1px solid #e6e6e6; 
    background-color: #fff;
    z-index: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;

    > span{
        display: inline-block;
        min-width: 80px;
        margin: 0 30px;
        color: #495057;
        font-weight: 600;
    }
`;

const Logo = styled.div`
    height: 40px;
    font-size: 25px;
    font-weight: 600;
    margin-left: 40px;
    margin-right: 40px;
`;

const Ul = styled.ul`
    display: flex;
    min-width: 630px;
    box-sizing: border-box;
    margin: 0;
    padding-left: 0;
    

    > li {
            box-sizing: inherit;
            margin: 10px;
            padding:5px;
            font-size: 14px;
            font-weight: 500;
            opacity: 0.9;
            list-style: none;
        }
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: #495057;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
        color: #495057;
    }
`;

export default Navigation;