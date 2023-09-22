import styled from "styled-components";
import { useState, useEffect, useMemo, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Button from "../elements/Button";
import { throttle } from 'lodash';

function Navigation(){
    const insertedToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const [scroll, setScroll] = useState(false);
    const beforeScrollY = useRef(0);
    const throttledScroll = useMemo(
        () =>
          throttle(() => {
            const currentScrollY = window.scrollY;
            if (beforeScrollY.current < currentScrollY) {
                setScroll(false);
                console.log(scroll);
            } else {
                setScroll(true);
                console.log(scroll);
            }
            beforeScrollY.current = currentScrollY;
        }, 300),
        [beforeScrollY]
    );

    const doLogout =()=>{
        localStorage.clear();
        navigate("/sign_in");
    }

    useEffect(()=>{
        window.addEventListener('scroll', throttledScroll);
        return () => {
            window.removeEventListener('scroll', throttledScroll);
    };
    },[beforeScrollY]);

    return(
        <NavBox state={scroll}>
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
                    <Button onClick={doLogout}>로그아웃</Button>
                :
                    <Button href="/sign_in">로그인</Button>
                }
        </NavBox>
    )
}

const NavBox = styled.div`
    width: 100%;
    height: 6rem;
    padding: 0 2rem;
    background-color: ${(props)=>(props.state ? 'transparent':'var(--color-white)')};
    border-bottom: ${(props)=>(props.state ? 'transparent':`1px solid var(--color-light-gray)`)};
    color: ${(props)=>(props.state ? 'var(--color-white)' : 'var(--color-text)')};
    transition: all 0.2s ease;
    z-index: 3;

    display: flex;
    align-items: center;

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`;

const Logo = styled.div`
    font-size: 2.6rem;
    font-weight: 600;
    margin-top: 0.3rem;
`;

const Ul = styled.ul`
    display: flex;
    padding-left: 0;
    

    > li {
            margin: 1rem;
            padding: 5px;
            font-size: 14px;
            font-weight: 500;
            list-style: none;
        }
`;


const StyledLink = styled(Link)`
    text-decoration: none;
    color: inherit;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`;

export default Navigation;