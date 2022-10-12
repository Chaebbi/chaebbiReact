import styled from "styled-components";
import { useState,useEffect } from "react";
import { Link } from "react-router-dom";
import Grid from "../elements/Grid";
import Button from "../elements/Button";
import { AiOutlineLink } from "react-icons/ai";
import axios from "axios";
import "../styles/ScrollBar.css";

//냉장고 재료 추천 페이지
function RecommendFridge(){
    //모든 재료 가져와서 복제(GET)===============================================================
    const [ingredientlist, setIngredientlist] = useState([]);
    const ingredientlist2 = ingredientlist;
    const getIngredientList =()=>{
        axios.get("https://spring.chaebbiserver.shop/api/ingredient",
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
        .then((response) =>{
            console.log(response.data);
            setIngredientlist(response.data.result.data);
    })};

    //검색창 핸들링===========================================================================
    const [searchword, setSearchword] = useState('');
    const [hasText,setHasText] = useState(false);
    const [autocompletes, setAutocompletes] = useState(ingredientlist2);
    
    const handleKeyword =(event)=>{
        setSearchword(event.target.value);
        setHasText(!hasText);
    }

    //자동완성 리스트 채우기==============================================================
    const updateData =() => {
       let b = ingredientlist2.filter((i)=> i.name.includes(searchword)===true).slice(0,20);
       setAutocompletes(b);
    }

    //재료추가하기========================================================================
    const [basket, setBasket] = useState([]);
    const selectIngredient =(ingre)=>{
        console.log(ingre);
        setSearchword(ingre);
        setBasket((basket)=>{return [...basket, ingre]});
        setSearchword('');
        console.log("basket :",basket);
    }

    //메뉴 추천받기(POST)==================================================================
    const [recomenu, setRecoMenu] = useState([]);
    const [recomenuinfo, setRecoMenuInfo] = useState([]);
    const recommendMenu =(e) => {
        e.preventDefault();
        axios.post("https://flask.chaebbiserver.shop/api/foodrecommend",{
            ingredients: basket
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(`나의 냉장고:: ${basket}`);
            setRecoMenu(response.data.foods);
            setRecoMenuInfo(response.data.foodDto);
            console.log(response.data.foods[0]);
            console.log(response.data.foodDto[0]);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //useEffect==========================================================================
    useEffect(()=>{
        getIngredientList();
        const debounce = setTimeout(() => {
            if(searchword) updateData();
        },200)
        return () => {
            clearTimeout(debounce)
        };
    },[searchword,basket]);

    return(
        <div className="boxForZ-index">  
        <Explain>재료를 먼저 입력 후 '추천받기' 버튼을 눌러주세요.</Explain>

        <SearchBox>
                <Search type="text" placeholder="검색어를 입력하세요." value={searchword} onChange={handleKeyword}/>
                {searchword.length > 0 && searchword && (
                    <AutoSearchContainer className="scrollbar">
                        <AutoSearchWrap>
                            {autocompletes.map((a,index)=>(
                                <AutoSearchData key={index} onClick={()=>{selectIngredient(`${a.name}`)}}>{a.name}</AutoSearchData>
                            ))}
                        </AutoSearchWrap>
                    </AutoSearchContainer>
                )}
            </SearchBox>

            <Container>
                <FridgeContainer>
                    <h3>나의 냉장고</h3>
                    <IngredientsList>
                        <ul>
                            <Grid col="3">
                                {Array.from(basket).map((b,index) => (
                                    <li key={index}>{b}</li>
                                ))} 
                            </Grid>
                        </ul>
                    </IngredientsList>
                    <div style={{textAlign:"center"}}>
                        <Button 
                            just
                            width="220px"
                            height="40px" 
                            margin="0px"
                            borderRadius="10px"
                            position="relative"
                            top="8px"
                            text="추천받기"
                            onClick={recommendMenu}
                    />
                    </div>
                </FridgeContainer>
                
            </Container>

            {/* 추천메뉴 컨테이너 */}
            {  recomenu.length == 0 ?
                ''
            :
                <RecommendContainer>
                    <Grid col="3" row="1" colgap="15px">
                    {recomenuinfo.map((reco,index) => (
                        <MenuContainer key={index}>
                            { recomenu[index] === undefined||null||'' ? 
                                '' 
                            : 
                                (<>
                                    <h3>{`${recomenu[index]}`}</h3>
                                    <a href={recomenuinfo[index].recipeUrl} target="_blank">
                                        <AiOutlineLink size="23"/>
                                    </a>
                                </>)
                            }
                            <Listlabel>있는 재료</Listlabel>
                            <HaveList className="scrollbar">
                                <ul>
                                    { reco.has === undefined || null ? 
                                        ''
                                    :
                                        <Grid col="2" row="1" colgap="20px" margin="0" width="100%">
                                            {(reco.has).map((rl,index) => (
                                                <li key={index}>{rl}</li>
                                            ))}
                                        </Grid>
                                    }
                                </ul>
                            </HaveList>

                            <Listlabel>필요한 재료</Listlabel>
                            <NeedList className="scrollbar">
                                <ul>
                                    { reco.no == undefined ? 
                                        ''
                                    :
                                        <Grid col="2" row="1" colgap="20px" margin="0" width="100%">
                                            {(reco.no).map((rl,index) => (
                                                <li key={index}>{rl}</li>
                                            ))}
                                        </Grid>
                                    }
                                </ul>
                            </NeedList>
                        </MenuContainer>
                    ))}    
                    </Grid>

                </RecommendContainer>
            }
        </div>
        )
    }


const AutoSearchContainer = styled.div`
    z-index: 10;
    width: 40%;
    min-width: 300px;
    max-height: 400px;
    background-color: #fff;
    position: relative;
    left: 30%;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    padding: 5px;
  `;
  
const AutoSearchWrap = styled.ul`
      list-style-type: none;
      padding: 0;
  `;
  
const AutoSearchData = styled.li`
    padding: 5px 0;
    width: 100%;
    font-size: 14px;
    z-index: 4;
    
    &:hover {
        background-color: rgba(198,221,207,0.3);
        font-weight: bold;
        cursor: pointer; }
    `;

const Container = styled.div`
    width: 45%;
    min-width: 500px;
    height: 290px;
    position: absolute;
    top: 190px;
    left: 380px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    color: #495057;
`;

const FridgeContainer = styled.div`
    height: 130px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    height: 200px;
    padding:10px;

    > h3 { 
        margin: 5px;
     }
`;

const IngredientsList = styled.div`
    width:100%;
    height: 125px;
    margin: 20px 0;
    box-sizing: border-box;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: rgba(198,221,207,0.3);
`;

const RecommendContainer = styled.div`
    min-width: 600px;
    max-width: 850px;
    position: relative;
    top: 380px;
    background-color: #f8f9fa;
    box-sizing: border-box;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    color: #495057;
`;

const MenuContainer = styled.div`
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: #fff;
    height: 440px;
    padding: 10px;
    
    > h3 {
        margin: 8px;
        display: inline-block;
    }
    > a{
        margin: 8px;
        float: right;
        
        &:focus, &:hover, &:visited, &:link, &:active {
            text-decoration: none;
            color: #398234;
        }
    }
`;

const Listlabel = styled.p`
    margin: 20px 0 10px 10px;
`;

const HaveList = styled.div`
    height: 32%;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: rgba(198,221,207,0.3);
`;

const NeedList = styled.div`
    height: 32%;
    border: 1px solid #e6e6e6;
    border-radius: 20px;
    box-sizing: border-box;
    background-color: rgba(198,221,207,0.3);
`;

const Explain = styled.h2`
    text-align:center;
    position: relative;
    top: 60px;
`;

const SearchBox = styled.form`
    min-width: 600px;
    text-align: center;
    position: relative;
    top: 65px;
`;

const Search = styled.input`
    display: inline-block;
    width: 35%;
    min-width: 400px;
    height: 60px;

    padding: 3px 35px 0px 35px;

    font-size: 18px;
    background: transparent;

    border: 1px solid #e6e6e6;
    border-radius: 20px;
    outline: none;

    box-sizing: border-box;
    transition: all 0.3s;

    &:hover{
        border: 1px solid #868e96;
    }
    &:focus{
        border: 1px solid #398234;
    }
`;


export default RecommendFridge;