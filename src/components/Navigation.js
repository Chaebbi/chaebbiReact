import styled,{ css } from "styled-components";
import { useState, useEffect, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../elements/Button";
import { throttle } from 'lodash';
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';

function Navigation({ enableEvent }){
    const insertedToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const openMenuList =()=>{
        setIsOpen(!isOpen);
    }

    const [scroll, setScroll] = useState(true);
    const throttledScroll = useMemo(
        () =>
          throttle(() => {
            if (window.scrollY > 0) {
                //스크롤 내려감
                setScroll(false);
              } else {
                //초기 위치로 돌아옴
                setScroll(true);
              }
        }, 200),
        []
    );

    const doLogout =()=>{
        localStorage.clear();
        navigate("/sign_in");
    }

    useEffect(()=>{
        if (!enableEvent) {
            return; // 스크롤 이벤트 처리 비활성화
        }

        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
    };
    },[enableEvent]);

    return(
        <NavBox state={scroll} otherRoute={enableEvent} isOpen={isOpen}>
            {insertedToken ? ( 
                <Logo>
                    <StyledLink to='/manage-record'>CHAEBBI</StyledLink>
                </Logo>
                ) : (
                <Logo>
                    <StyledLink to='/'>CHAEBBI</StyledLink>
                </Logo>
                )}
                <div>
                    <MenuIndicator onClick={openMenuList}>
                        <span>
                            <KeyboardArrowDownSharpIcon className={isOpen ? "active" : "inactive"}/> menu
                        </span>

                        <MenuList isOpen={isOpen}>
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
                        </MenuList>
                    </MenuIndicator>

                    {insertedToken ? 
                        <Button onClick={doLogout}>로그아웃</Button>
                    :
                        // <Button href="/sign_in">로그인</Button>
                        <Button onClick={doLogout}>로그아웃</Button>
                    }
                </div>
                
        </NavBox>
    )
}

const NavBox = styled.div`
    width: 100%;
    height: 6rem;
    padding: 0 2rem;
    background-color: ${(props)=>(props.state ? 'transparent':'var(--color-white)')};
    border-bottom: ${(props)=>(props.state ? 'transparent':`1px solid var(--color-border)`)};
    color: ${(props)=>(props.state ? 'var(--color-white)' : 'var(--color-text)')};
    transition: all 0.2s ease;

    display: flex;
    align-items: center;
    justify-content: space-between;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 4;

    ${props =>
        props.otherRoute === false &&
        css`
            position: relative;
            border-bottom: 1px solid var(--color-border);
            color: var(--color-text);
        `}

    @media ${({ theme }) => theme.breakpoints.tablet} {
        background-color: ${({isOpen})=>(isOpen && 'var(--color-white)')};
        color: ${({isOpen})=>(isOpen && 'var(--color-text)')};
    }
`;

const Logo = styled.div`
    font-size: 2.6rem;
    font-weight: 600;
    margin-top: 0.3rem;
`;

const MenuIndicator = styled.div`
    display: inline-block;
    position: relative;
    cursor: pointer;
    padding: 1rem;
    margin-right: 0.8rem;
    border-radius: 0.5rem;
    transition: all 0.2s;

    svg{
        position: relative;
        top: 0.3rem;
        transition: transform 0.3s;
    }

    svg.active{
        transform: rotate(-180deg);
    }

    &:hover {
        background-color: rgba(0,0,0,0.1);
    }
`

const MenuList = styled.ul`
    display: ${(props) => (props.isOpen ? 'block' : 'none')};
    position: absolute;
    width: 22rem;
    top: 100%;
    left: -12.5rem;
    padding: 1rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;
    box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;
    z-index: 3;

    li {
        color: var(--color-text);
        margin: 1rem;
        font-size: 14px;
        font-weight: 500;
        list-style: none;
        border-radius: 0.5rem;
        transition: 0.2s all;

        &:hover{
            background-color: var(--color-border);
        }
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
        position: fixed;
        top: 6rem;
        left: 0;
        border-radius: 0 0 0.5rem 0.5rem;
    }
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    display: block;
    color: inherit;
    padding: 1rem;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default Navigation;