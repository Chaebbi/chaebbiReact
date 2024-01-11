import styled from "styled-components";
import { useState,useEffect } from "react";
import Button from "../../elements/Button";
import MenuCard from "../../elements/MenuCard";
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import { __getIngredientList } from "../../store/slices/ingredientsSlice";
import "../../styles/ScrollBar.css";

//냉장고 재료 추천 페이지
function RecommendFridge(){
    const dispatch = useDispatch();

    //모든 재료 가져와서 복제(GET)===============================================================
    const getIngredientList =()=>{
        axios.get(`${process.env.REACT_APP_SERVER_URL}/api/ingredient`,
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) =>{
            console.log(response.data);
            dispatch(__getIngredientList(response.data.data));
        }).catch((error)=>{
            console.log('서버 연결 끊김');
        })
    };

    //검색창 핸들링===========================================================================
    const ingredientlist = useSelector((state) => state.ingredientlist.data);
    const [searchword, setSearchword] = useState('');
    const [autocompletes, setAutocompletes] = useState([]);
    
    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
    }

    //자동완성 리스트 채우기==============================================================
    const updateData =() => {
       const autocompletes = ingredientlist.filter((i)=> i.name.includes(searchword) === true).slice(0,20);
       setAutocompletes(autocompletes);
    }

    //재료추가하기========================================================================
    const [basket, setBasket] = useState([]);
    const selectIngredient =(ingre)=>{
        setBasket((basket)=>{ return [...basket, ingre] });
        setSearchword('');
    }

    //메뉴 추천받기(POST)==================================================================
    const [recomenuinfo, setRecoMenuInfo] = useState([]);
    const recommendMenu =() => {
        axios.post(`${process.env.REACT_APP_FLASK_SERVER_URL}/api/foodrecommend`,{
            ingredients: basket
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            setRecoMenuInfo(response.data.foodDto);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //useEffect==========================================================================
    useEffect(()=>{
        if(ingredientlist.length === 0){
            getIngredientList();
        }

        const debounce = setTimeout(() => {
            if(searchword !== '') updateData();
        },200)
        return () => {
            clearTimeout(debounce)
        };
    },[searchword]);

    return(
        <Container>
            {/* 검색창 */}
            <h1>재료를 입력 후 '추천받기' 버튼을 눌러주세요.</h1>
            <p>냉장고 속 재료를 토대로 만들 수 있는 메뉴를 추천해드릴게요!</p>
            <SearchWrapper>
                <SearchBar type="text" placeholder="검색어를 입력하세요." value={searchword} onChange={handleKeyword}/>
                {searchword.length > 0 && autocompletes.length > 0 && (
                    <AutocompleteList className="scrollbar">
                        {autocompletes.map((a,idx)=>(
                            <li key={idx} onClick={()=>{selectIngredient(`${a.name}`)}}>{a.name}</li>
                        ))}
                    </AutocompleteList>
                )}
            </SearchWrapper>
            
            {/* 나의 냉장고 */}
            <MyFridgeWrapper>
                {basket.length !== 0 ? 
                    <>
                    <div>
                        {basket.map((b,index) => (
                            <Ingredient key={index}>{b}</Ingredient>
                        ))}
                    </div>
                    <Button onClick={recommendMenu}>추천받기</Button>
                    </>
                :
                    <p>냉장고가 비어있습니다.</p>
                }
            </MyFridgeWrapper>

            {/* 추천메뉴 컨테이너 */}
            {  recomenuinfo.length !== 0 &&
                <RecommendWrapper>
                    { recomenuinfo.map((reco,idx) => (
                        <MenuCard key={idx} foodname={reco.food} have={reco.has} donthave={reco.no} href={reco.recipeUrl}/>
                    ))}
                </RecommendWrapper>
            }
        </Container>
        )
    }

const Container = styled.div`   
    width: 88rem;

    h1{ 
        font-size: 2.2rem;
    }
    p{ 
        font-size: 1.4rem; 
        color: var(--color-border-hover);
        margin: 0.5rem 0 1rem 0;
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        padding: 1rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
    }
`;

const SearchWrapper = styled.form`
    position: relative;
`;

const SearchBar = styled.input`
    width: 100%;
    padding: 2rem;
    background: transparent;
    outline: none;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    transition: all 0.3s;

    &:hover{
        border: 1px solid var(--color-border-hover);
    }
    &:focus{
        border: 1px solid var(--color-primary);
    }
`;
  
const AutocompleteList = styled.ul`
    width: 100%;
    position: absolute;
    top: 5.6rem;
    background-color: var(--color-white);
    border-radius: 0.5rem;
    list-style-type: none;
    padding: 1rem;
    margin: 0;
    z-index: 2;

    li{
        border-radius: 0.5rem;
        padding: 1rem;
        transition: all 0.2s;

    &:hover {
        background-color: var(--color-input-focus);
        font-weight: bold;
        cursor: pointer; 
    }
}
`;

const MyFridgeWrapper = styled.div`
    border: 1px solid var(--color-kakao);
    border-radius: 0.5rem;
    background-color: var(--color-recommend);
    padding: 2rem;
    margin: 1.6rem 0;

    display: flex;
    align-items: center;
    justify-content: space-between;

    div{
        width: 81%;
        display: flex;
        flex-wrap: wrap;
        gap: 0.2rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
        display: grid;
        row-gap: 2rem;

        div{
            width: 100%;
        }
    }
`;

const Ingredient = styled.span`
    background-color: var(--color-input-focus);
    border: 1px solid var(--color-primary);
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    display: inline-block;
    color: var(--color-primary);
`;

const RecommendWrapper = styled.div`
    width: 56rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        width: 100%;
    }
`;


export default RecommendFridge;