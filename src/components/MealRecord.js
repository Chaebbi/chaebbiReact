import styled from "styled-components";
import { useState } from "react";
import Button from "../elements/Button";
import axios from "axios";
import MealBox from "../elements/MealBox";
import { useEffect } from "react";

//아침,점심,저녁 조회 + 등록페이지로 이동가능한 버튼을 포함한 컴포넌트 - 메인페이지에서 사용
function MealRecord({breakfast, lunch, dinner}){
    
    //탭메뉴==========================================================
    const [activeIndex, setActiveIndex]=useState(0);
    const tabClickHandler=(index)=>{ 
        if(index === 0){
            setActiveIndex(index);
            console.log("breakfast: ",breakfast);
        }else if(index === 1){
            setActiveIndex(index);
            console.log("lunch: ",lunch);
        }else{
            setActiveIndex(index);
            console.log("dinner: ",dinner);
        }
    };
    const tabContArr=[
        {
            tabTitle:(
                <Li className={activeIndex===0 ? "is-active" : ""} onClick={()=>tabClickHandler(0)}>아침</Li>
            ),
            tabCont:(
                <div>
                    {breakfast == undefined ? 
                        <H5>식단을 등록해주세요</H5>
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
            tabTitle:(
                <Li className={activeIndex===1 ? "is-active" : ""} onClick={()=>tabClickHandler(1)}>점심</Li>
            ),
            tabCont:(
                <div>
                    {lunch == undefined ? 
                        <H5>식단을 등록해주세요</H5>
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
            tabTitle:(
                <Li className={activeIndex===2 ? "is-active" : ""} onClick={()=>tabClickHandler(2)}>저녁</Li>
            ),
            tabCont:(
                <div>
                    {dinner == undefined ? 
                        <H5>식단을 등록해주세요</H5>
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
            {/* 버튼================================================================ */}
            <ButtonContainer>
                    <Button
                        width="30%" 
                        height="30px"
                        borderRadius="50px"
                        color="#fff"
                        text="이미지" 
                        margin="0 5px 0 0"
                        href="/record-foodimage"
                    />
                    <Button
                        width="30%" 
                        height="30px"
                        borderRadius="50px"
                        color="#fff"
                        text="검색"
                        margin="0"
                        href="/record-foodsearch"
                    />
                </ButtonContainer>

            <ContentContainer>
                <TabMenu>
                    <Ul>
                        {tabContArr.map((section,index)=><span key={index}>{section.tabTitle}</span>)}
                    </Ul>
                </TabMenu>
                {tabContArr[activeIndex].tabCont}
            </ContentContainer>

            {/* <ContentContainer> */}
                {/* { breakfast.record !== undefined||breakfast.record !== null||breakfast.record !== '' ?
                    <MealBox 
                            id={breakfast.record[0].record_id} 
                            rtime={breakfast.record[0].rtime}
                            menu={breakfast.record[0].text}
                            onClick={()=>{
                                console.log(breakfast.record[0].record_id);
                            }}
                        />
                        // getDetail(`${breakfast.record[0].record_id}`)
                    :
                    <div>undefined</div>
                } */}
                        
                        {/* <MealBox 
                        id={lunch.record[0].record_id} 
                        rtime={lunch.record[0].rtime}
                        menu={lunch.record[0].text}
                        onClick={getDetail(`${lunch.record[0].record_id}`)}
                        />
                        <MealBox 
                            id={dinner.record[0].record_id} 
                            rtime={dinner.record[0].rtime}
                            menu={dinner.record[0].text}
                            onClick={getDetail(`${dinner.record[0].record_id}`)}
                        /> */}

            {/* </ContentContainer> */}
        </ParentContainer>
        </>
        )
    }

MealRecord.defaultProps={
    breakfast: undefined,
    lunch: undefined,
    dinner: undefined,
}

const ParentContainer = styled.div`
    min-width: 280px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    padding: 10px;
`;

const ContentContainer = styled.div`
    background-color: rgba(198,221,207,0.3);
    width: 100%;
    height: 88%;
    /* overflow-y: auto; */
`;


const TabMenu = styled.div`
    width: 100%;
    height: 40px;
    position: relative;
    top: -17px;
    border-bottom: 1px solid #e6e6e6;
    background-color: #fff;

`;

const Ul = styled.ul`
    display: flex;
    width: 100%;
    align-items: center;

    .is-active{
        font-weight: 700;
        color: #398234;
        border-bottom: 2px solid #398234;
    }
`;

const Li = styled.li`
    list-style-type: none;
    margin-right: 10px;
    cursor: pointer;
    padding: 10px 10px 8px 10px;
    color: #495057;
`;

const H5 = styled.h5`
    text-align: center;
`;

const ButtonContainer = styled.div`
    position: relative;
    top:-3px;
    text-align: center;
`;


export default MealRecord;