import styled from "styled-components";
import { useState } from "react";
import axios from "axios";
import Form from "../elements/Form";
import Grid from "../elements/Grid";
import Card from "../elements/Card";
import { useEffect } from "react";

//음식점 추천(음식점 조회?)
function SearchRestaurant(){
    const bistrowide =  [ "서울특별시","경상남도","인천광역시","광주광역시","경기도","충청남도","울산광역시","대구광역시",
                          "부산광역시","제주특별자치도","경상북도","대전광역시","전라남도","전라북도","충청북도" ];

    //중분류 불러오기(POST)========================================================
    const [bistromiddle, setBistromiddle] = useState('');

    const getBistromiddle = async(wide) => {
        axios.post("https://spring.chaebbiserver.shop/api/bistromiddle",{
            wide: wide //param
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            setBistromiddle(response.data.result.data);
        }).catch(function(error) {
            console.log(error);
        });
    }
    //select 핸들링========================================================
    const [wide, setWide] = useState(''); //select된 지역명 출력 위한 상태변수
    const [middle, setMiddle] = useState('');

    const handleSelectWide =(e)=>{
        setWide(e.target.value);
        getBistromiddle(e.target.value);
    }

    const handleSelectMiddle =(e)=>{
        if(wide == null||undefined||''){
            alert('대분류를 지정하지 않았습니다.');
        }else{
            setMiddle(e.target.value);
            getRestaurant(e.target.value);
        }
    }

    //음식점 조회(POST)========================================================
    const [restaurant, setRestaurant] = useState('');
    const getRestaurant = async(middle) => {
        await axios.post("https://spring.chaebbiserver.shop/api/categories",{
            wide: wide,
            middle: middle //param
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            setRestaurant(response.data.result.categoryList);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //북마크 추가(POST)========================================================
    const addBookmark =(id) => {
        axios.post("https://spring.chaebbiserver.shop/api/bookmark",{
            bistroId: Number(id)
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            if(response.data.code == 1000){
                alert("북마크 되었습니다.");
            }else{
                alert("이미 북마크된 음식점입니다.");
            }
            // window.location.reload(); 전체리렌더링 + 드롭박스가 초기화되는 문제
        }).catch(function(error) {
            console.log(error);
        });
    };

    useEffect(()=>{
        console.log(wide);
    },[]);

    return(
        <>
            {/* 지역탐색기=========================================================== */}
            <Explain>지역을 선택하면 음식점이 나타납니다.</Explain>

            <Form width="40%" height="40px" margin="0 auto" position="relative" top="65px" minwidth="380px">
                <label>대분류: </label>
                <select onChange={handleSelectWide} value={wide}>
                <option value="">==선택==</option>
                    {Array.from(bistrowide).map((w,index) => (
                        <option value={w} key={index}>{w}</option>
                    ))};
                </select>

                <label>중분류: </label>
                <select onChange={handleSelectMiddle} value={middle}>
                    <option value="">==선택==</option>
                    {Array.from(bistromiddle).map((m,index) => (
                        <option value={m} key={index}>{m}</option>
                    ))}
                </select>      
            </Form>
        {/* 조회된 음식점 출력=========================================================== */}
        <Container>
            <Grid col="3" colgap="20px" rowgap="20px" padding="20px">
                {Array.from(restaurant).map((r,index) => (
                    <Card 
                        width="320px"
                        height="220px"
                        key={index}
                        id={r.bistroId}
                        title={r.name}
                        category={r.category}
                        newaddress={r.roadAddr}
                        address={r.lnmAddr}
                        call={r.telNo}
                        isBookmark={r.isBookmark}
                        onClick={()=>{
                            addBookmark(`${r.bistroId}`);
                        }}
                    />
                ))}
            </Grid>
        </Container>

        </>
        
        );
};

const Container = styled.div`
    width: 1040px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 0 auto;
    position: relative;
    top: 100px;
`;

const Explain = styled.h2`
    text-align:center;
    position: relative;
    top: 60px;
`;

export default SearchRestaurant;