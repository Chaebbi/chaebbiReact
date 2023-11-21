import styled from "styled-components";
import Button from "../elements/Button";
import Navigation from "../components/Navigation";
import Diversity2Icon from '@mui/icons-material/Diversity2';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AssistantIcon from '@mui/icons-material/Assistant';

//비회원용 대문페이지
function Landing(){
    return(
        <>
            <Navigation enableEvent={true}/>
            <SplashImage>
                <div className="welcome-text-wrapper">
                    <h2>채식인들을 위한 식단 비서</h2>
                    <p>대중적이지 않은 식단으로 인해 선택에 어려움을 겪는 채식인들의 라이프 스타일을 반영해 식생활 전반을 관리해드립니다.</p>
                    <Button href="/sign_in">지금 채삐 사용해 보기</Button>
                </div>
            </SplashImage>
            <FunctionsWrapper>
                <div className="functions-wrapper">
                    <div className="function">
                        <EditCalendarIcon/>
                        <h2>식단기록</h2>
                        <p>음식명을 직접 검색하거나 해당 음식의 이미지를 등록하면 해당 음식에 맞는 영양성분 정보를 제공합니다. 주어진 정보에 추가 사항을 입력해 식단을 기록할 수 있습니다.</p>
                    </div>
                    <div className="function">
                        <LeaderboardIcon/>
                        <h2>식단분석</h2>
                        <p>사용자가 등록한 7일간의 식단기록을 기반으로 식습관을 분석합니다.</p>
                    </div>
                    <div className="function">
                        <AssistantIcon/>
                        <h2>메뉴추천</h2>
                        <p>사용자가 가지고 있는 식재료를 입력하면 해당 식재료로 만들 수 있는 메뉴 3가지를 추천해드립니다.</p>
                    </div>
                </div>
            </FunctionsWrapper>
            <ListWrapper>
                <div>
                    <h1>이럴 때 채삐를 사용해보세요!</h1>
                    <GridWrapper>
                        <ul>
                            <li>1. 냉장고에 있는 재료만으로 한 끼를 만들어 먹고 싶을 때</li>
                            <li>2. 약속이나 여행 등의 일정으로 외식을 해야 할 때</li>
                            <li>3. 집 근처에서 간편식으로 간단히 한 끼를 해결하고 싶을 때</li>
                            <li>4. 나의 식이 습관의 문제와 해결방안을 알고 싶을 때</li>
                        </ul>
                    </GridWrapper>
                </div>
            </ListWrapper>
            <CommunityWrapper>
                <div>
                    <Diversity2Icon/>
                    <p>채삐를 이용하는 다른 사용자들이 '채숲'에서 여러분을 기다리고 있어요!</p>
                    <p>다양한 사용자들과 여러분의 채식 라이프를 공유해보세요</p>
                </div>
                <Button href="/sign_in">로그인</Button>
                <Button href="/sign_up">Chaebbi 가입</Button>
            </CommunityWrapper>
            <Footer>
                &copy; 2022-2023 Chaebbi
            </Footer>
        </>
)}

const SplashImage = styled.div`
    min-height: 42rem;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    background-blend-mode: multiply;
    background: url('/images/breakfast.jpeg') no-repeat center/cover, rgba(0, 0, 0, 0.3);
    // aspect-ratio: auto 600 / 130;
        
    .welcome-text-wrapper{
        color: var(--color-white);

        h2{
            font-size: 3.2rem;
            margin: 1rem 0;
        }
        p{
            font-size: 1.5rem;
            margin-bottom: 2rem;
        }
    }
`;

const FunctionsWrapper = styled.div`
    padding: 4rem 0;

    .functions-wrapper{
        width: 88rem;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        column-gap: 2rem;
        row-gap: 2rem;
        margin: 0 auto;
    }

    .function{
        text-align: center;
        padding: 3rem;
        border-radius: 0.5rem;
        box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 3px, rgba(0, 0, 0, 0.24) 0px 1px 2px;

        svg{
            color: var(--color-primary);
            font-size: 3rem;
        }
        h2{
            margin: 1rem 0;
        }
        p{
            line-height: 2rem;
            color: var(--color-border-hover);
        }
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        .functions-wrapper{
            width: 90%;
        }
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        .functions-wrapper{
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;
            padding: 0 2rem;
        }
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        .functions-wrapper{
            grid-template-columns: 1fr;
        }
    }
`

const ListWrapper = styled.div`
    background-color: var(--color-input-focus);
    padding: 3rem 0rem 1rem 0rem;
    margin-bottom: 3rem;

    >div{
        width: 100%;
        margin: 4rem auto 5.5rem auto;

        h1{
            margin-bottom: 4rem;
        }

        ul li {
            list-style: none;
            font-size: 1.6rem;
            margin-bottom: 1rem;
        }
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        padding: 3rem 2rem 1rem 2rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        text-align: center;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        
    }
`;

const GridWrapper = styled.div`
    margin: 1rem;
`;

const CommunityWrapper = styled.div`
    width: 88rem;
    margin: 0 auto;
    padding: 4rem 0;
    background-color: var(--color-light-gray);
    border-radius: 0.5rem;
    text-align: center;

    svg{
        color: var(--color-primary);
        margin-bottom: 0.5rem;
    }
    p { line-height: 2rem; }
    p:last-child { margin-bottom: 1rem; }
    button:last-child { margin-left: 1rem; }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        width: 90%;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 90%;
        padding-left: 2rem;
        padding-right: 2rem; 
    }
`;

const Footer = styled.div`
    bottom: 0;
    padding: 4rem 0;
    margin-top: 3rem;
    border-top: 1px solid var(--color-border);
    text-align: center;
`;

export default Landing;