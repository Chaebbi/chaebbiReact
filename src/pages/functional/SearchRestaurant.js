import { useState, useEffect } from "react";
import { usePageChange } from "../../hooks/usePageChange.js";
import axios from "axios";
import ReactMap from "../../components/ReactMap.js";
import DropDown from "../../elements/DropDown";
import styled from "styled-components";
import RestaurantCard from "../../elements/RestaurantCard";
import Paginator from "../../components/Paginator.js";
import { dummyRestaurants } from "../../utils/dummy.js";

const main_category = ['전체','음식점','카페'];
const restaurant_category = ['한식','사찰음식','뷔페','양식','퓨전음식','인도음식','샐러드','중식'];
const cafe_category = ['디저트','베이커리','과일/주스','브런치'];
const bistrowide =  [ "서울특별시","경상남도","인천광역시","광주광역시","경기도","충청남도","울산광역시","대구광역시",
    "부산광역시","제주특별자치도","경상북도","대전광역시","전라남도","전라북도","충청북도" ];

//음식점 검색 페이지(map)
const SearchRestaurant=()=>{
    // 도시 선택해 세부 지역 불러오기(각 도시에 맞는 지역 불러오는 용도)
    const [wide, setWide] = useState('');
    const [middle, setMiddle] = useState('');
    const [bistromiddle, setBistromiddle] = useState('');
    const getBistromiddle = (wide) => {
        setWide(wide);

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bistromiddle`,{
            wide: wide
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            setBistromiddle(response.data.result.data);
        }).catch(function(error) {
            console.log(error);
        });
    }

    // 세부 구역 선택 핸들링
    const handleMiddle =(middle)=>{
        setMiddle(middle)
    }


    //전체 음식점 조회(지역만, 최초 렌더링)========================================================================================
    const [restaurants, setRestaurants] = useState([...dummyRestaurants.result.categoryList]);
    const getAllRestaurants =async(wide,middle)=>{
        console.log(wide, middle);

        await axios.post(`${process.env.REACT_APP_SERVER_URL}/api/categories`,{
            wide: wide,
            middle: middle
        }, { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then(function(response) {
            console.log(response.data);
            setRestaurants(response.data.result.categoryList);
        }).catch(function(error) {
            console.log(error);
        });
    }
    

    //대분류 API
    const getBistroWithMainCategory =(wide,middle,main)=>{
        //wide, middle 기본값
        if(middle === ''){
            wide = '서울특별시';
            middle = '강남구';
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bistro-category-main`, {
            siteWide: wide,
            siteMiddle: middle,
            categoryMain: main
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(function(response) {
                console.log(wide,middle,main);
                // response.data.result => 필터 조건에 맞는 음식점 리스트
                setRestaurants(response.data.result);
            }).catch(function(error) {
                console.log(wide,middle,main);
            });
    }


    //중분류 API
    const getBistroWithDetailCategory =(wide,middle,cmain,cmiddle)=>{
        //wide, middle 기본값
        if(middle === ''){
            wide = '서울특별시';
            middle = '강남구';
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bistro-category-middle`, {
                siteWide: wide,
                siteMiddle: middle,
                categoryMain: cmain,
                categoryMiddle: cmiddle
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(function(response) {
                console.log(wide,middle,cmain,cmiddle);
                setRestaurants(response.data.result);
            }).catch(function(error) {
                console.log(wide,middle,cmain,cmiddle);
            });
    }

    // 카테고리 탭 조작
    const [activeIndex, setActiveIndex] = useState(0);
    // 메인 카테고리만 선택해서 음식점 조회
    const handleTabWithCategory =(i, idx)=>{
        setActiveIndex(idx);
        getBistroWithMainCategory(wide, middle, i); 
    }


    //북마크 추가(POST)
    const addBookmark =(id) => {
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/bookmark`,{
            bistroId: id
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            if(response.data.code === 1000){
                alert("북마크 되었습니다.");
            }else{
                alert("이미 북마크된 음식점입니다.");
            }
            // window.location.reload(); 전체리렌더링 + 드롭박스가 초기화되는 문제
        }).catch(function(error) {
            console.log(error.code, '북마크 요청 실패');
        });
    };

    //북마크 삭제(DELETE)
    const deleteBookmark =(id)=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/del/bookmark`,
        { data: { bistroId: id }, headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        .then(function(response) {
            console.log('북마크가 해제 성공');
        }).catch(function(error) {
            console.log(error.code, '북마크 해제 요청 실패');
        });
    };

    // 페이징
    const { activePage, slicedArray, handlePageChange } = usePageChange([...restaurants]);

    //useEffect==================================================================================
    useEffect(()=>{
        if(middle){
            getAllRestaurants(wide,middle);
        }else{
            getAllRestaurants("서울특별시","강남구"); // 기본값
        }        
    },[middle,restaurants])

    return(
        <PageWrapper>
            <MenuWrapper>
                <div className="grid-box">
                    <DropDown initial="시/도" itemList={bistrowide} onClick={getBistromiddle}/>    
                    <DropDown initial="구/동" itemList={bistromiddle} onClick={handleMiddle}/>
                </div>
                <CategoryWrapper>
                    {main_category.map((i, idx) => (
                        <li key={idx} className={idx === activeIndex ? "is-active" : "submenu" } onClick={() => handleTabWithCategory(i, idx)}>{i}</li>
                    ))}
                </CategoryWrapper>
                {activeIndex === 1 && 
                    <SubCategoryList>
                        {restaurant_category.map((i, idx) => (
                        <span key={idx}>
                            <input 
                                id={idx}
                                type="radio"
                                name="restaurant_category"
                                value={i}
                                onClick={() => getBistroWithDetailCategory(wide, middle, main_category[activeIndex], i)}/>
                            <label htmlFor={idx}>{i}</label>
                        </span>
                        ))}
                    </SubCategoryList>
                }
                {activeIndex === 2 && 
                    <SubCategoryList>
                        {cafe_category.map((i, idx) => (
                        <span key={idx}>
                            <input 
                                id={idx}
                                type="radio"
                                name="cafe_category"
                                value={i}
                                onClick={() => getBistroWithDetailCategory(wide, middle, main_category[activeIndex], i)}/>
                            <label htmlFor={idx}>{i}</label>
                        </span>
                        ))}
                    </SubCategoryList>
                }

                <p className="tooltip">* 지역 미선택시 <strong>서울특별시 강남구</strong>를 기점으로 음식점을 조회합니다.</p>
                <RestaurantWrapper>
                    {Array.from(slicedArray).map((r)=>(
                        <RestaurantCard
                            key={r.bistroId}
                            id={r.bistroId}
                            name={r.name}
                            category={r.category}
                            call={r.telNo}
                            newaddress={r.roadAddr}
                            address={r.lnmAddr}
                            href={r.url}
                            isBookmark={r.isBookmark}
                            onClickBookmark={()=>addBookmark(r.bistroId)}
                            onClickBookmarkAlready={()=>deleteBookmark(r.bistroId)}
                        />
                    ))}
                </RestaurantWrapper>
                <Paginator
                    activePage={activePage}
                    totalItemsCount={restaurants.length}
                    onChange={handlePageChange}/>
            </MenuWrapper>
            <MapWrapper>
                <ReactMap positions={restaurants}/>
            </MapWrapper>
        </PageWrapper>
    );
};


const PageWrapper = styled.div`
    display: grid;
    grid-template-columns: 1.3fr 2fr;
    gap: 2rem;
    padding: 1rem;

    .tooltip{
        color: var(--color-sub-text);
        margin-bottom: 1rem;
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        padding: 2rem;
        width: 100%;
        grid-template-columns: 1fr;
    } 
`;

const MenuWrapper = styled.div`
    padding: 2rem;
    border-radius: 1rem;
    background-color: var(--color-light-gray);
    min-width: 40rem;

    .grid-box{
        display: grid;
        row-gap: 1rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
    } 
`;

const MapWrapper = styled.div`
    width: 80rem;
    height: 90rem;

    @media ${({ theme }) => theme.breakpoints.desktop} {
        width: 100%;
        height: 65rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        height: 45rem;
    } 
`;

const CategoryWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 1rem 0;

    li{
        width: 100%;
        font-size: 1.6rem;
        background-color: var(--color-white);
        border: 1px solid var(--color-border);
        border-right: 0;
        padding: 1.2rem 2rem;
        text-align: center;
        list-style: none;
        cursor: pointer;
        transition: all 0.1s;

        &:hover{
            background-color: var(--color-input-focus)
        }

        &.is-active{
            font-weight: 700;
            color: var(--color-white);
            background-color: var(--color-primary);
        }
    
        &.submenu{
            background-color: var(--color-white);
            color: var(--color-border-hover);
        }
    }

    li:last-child{
        border-right: 1px solid var(--color-border);
    }
`;

const SubCategoryList = styled.ul`
    list-style: none;
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin: 1.5rem 0;

    label{
        cursor: pointer;
    }

    input{
        display: none;

        &:checked + label{
            color: var(--color-primary);
            font-weight: 700;
        }
    }
`;

const RestaurantWrapper = styled.div`
    display: grid;
    grid-template-rows: repeat(4, 1fr);
    row-gap: 1rem;
`;

export default SearchRestaurant;