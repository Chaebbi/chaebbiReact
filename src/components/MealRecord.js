import styled from "styled-components";
import { useState } from "react";
import MealBox from "../elements/MealBox";
import Button from "../elements/Button";

//아침,점심,저녁 조회 + 등록페이지로 이동가능한 버튼을 포함한 컴포넌트 - 메인페이지에서 사용
function MealRecord({ breakfast, lunch, dinner }){
    const [activeIndex, setActiveIndex] = useState(0);
    const tabContArr = [
        {
            tabTitle: '아침',
            tabContent:(
                <div className="content-wrapper scrollbar">
                    {breakfast.length === 0 ? 
                        <p>등록된 식단이 없습니다.</p>
                    : 
                    <>
                        {breakfast.map((b,index) => (
                            <MealBox 
                                key={index}
                                id={b.record_id} 
                                rtime={b.rtime}
                                menu={b.text}
                                kcal={b.calory}
                            />
                        ))}  
                    </>
                    }
                </div>
            )
        },
        {
            tabTitle: '점심',
            tabContent:(
                <div className="content-wrapper scrollbar">
                    {lunch.length === 0 ? 
                        <p>등록된 식단이 없습니다.</p>
                    : 
                    <>
                        {lunch.map((l,index) => (
                            <MealBox 
                                key={index} 
                                id={l.record_id} 
                                rtime={l.rtime}
                                menu={l.text}
                                kcal={l.calory}
                            />
                        ))}  
                    </>
               }
                </div>
            )
        },
        {
            tabTitle: '저녁',
            tabContent:(
                <div className="content-wrapper scrollbar">
                    {dinner.length === 0 ? 
                        <p>등록된 식단이 없습니다.</p>
                    : 
                    <>
                        {dinner.map((d,index) => (
                            <MealBox 
                                key={index}
                                id={d.record_id} 
                                rtime={d.rtime}
                                menu={d.text}
                                kcal={d.calory}
                            />
                        ))}  
                    </>
                    }
                </div>
            )
        }];

    return(
        <>
            <ParentContainer>
                <div className="menu-wrapper">
                    <TabMenu>
                        {tabContArr.map((el,index) => (
                            <Tab key={index} className={index === activeIndex ? "is-active" : "submenu" }
                                onClick={() => setActiveIndex(index)}>{el.tabTitle}
                            </Tab>
                        ))}
                    </TabMenu>
                    <div className="menu-wrapper button-wrapper">
                        <Button href="/record-foodimage">이미지로 등록</Button>
                        <Button href="/record-foodsearch">검색어로 등록</Button>
                    </div>
                </div>
                <TabContantWrapper>
                    {tabContArr[activeIndex].tabContent}
                </TabContantWrapper>
            </ParentContainer>
        </>
        )
    }

const ParentContainer = styled.div`
    .menu-wrapper{
        display: flex;
        justify-content: space-between;
    }
    .button-wrapper{
        gap: 1rem;
        position: relative;
        top: -1rem;
    }
`;

const TabMenu = styled.div`
    display: flex;
    align-items: center;
    gap: 0.2rem;
    padding-left: 0;
`;

const Tab = styled.li`
    border: 1px solid var(--color-border);
    border-bottom: 0;
    border-radius: 0.5rem 0.5rem 0 0;
    list-style-type: none;
    padding: 1.4rem 3rem;
    cursor: pointer;

    &.is-active{
        font-weight: 700;
        color: var(--color-hover);
    }

    &.submenu{
        background-color: var(--color-light-gray);
        color: var(--color-border-hover);
    }
`;

const TabContantWrapper = styled.ul`
    border: 1px solid var(--color-border);
    border-radius: 0 0 0.5rem 0.5rem;
    padding: 2rem;
    min-height: 20rem;

    .content-wrapper{
        display: grid;
        grid-template-rows: repeat(4, 1fr);
        row-gap: 0.5rem;
        overflow-y: auto;
        overflow-x: hidden;
    }
`;


export default MealRecord;