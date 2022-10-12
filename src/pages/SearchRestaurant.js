import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import styles from '../styles/pages/SearchRestaurant.module.css';
import Card from "../elements/Card";
import Map from "../components/Map";
import { BiRestaurant,BiCoffeeTogo,BiAlignLeft } from 'react-icons/bi';

//음식점 검색 페이지(map)
function SearchRestaurant(){
    //분류 & 필터링 항목 리스트=========================================================================
    const main_category = ['음식점','카페'];
    const restaurant_category = ['한식','사찰음식','뷔페','양식','퓨전음식','인도음식','샐러드','중식'];
    const cafe_category = ['디저트','베이커리','과일/주스','브런치'];
    const bistrowide =  [ "서울특별시","경상남도","인천광역시","광주광역시","경기도","충청남도","울산광역시","대구광역시",
    "부산광역시","제주특별자치도","경상북도","대전광역시","전라남도","전라북도","충청북도" ];

    //지역(구) 불러오기(POST)========================================================
    const [bistromiddle, setBistromiddle] = useState('');
    const getBistromiddle = async(wide) => {
        axios.post("https://spring.chaebbiserver.shop/api/bistromiddle",{
            wide: wide //param
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
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
        }
    }

    //대분류 클릭 상태==================================================================================
    //********해당 대분류 버튼들은 추후 라디오 버튼으로 교체 예정********
    const [isEntire, setIsEntire] = useState(true); //전체 클릭 여부(기본값 -> 전체)
    const [isRestaurant, setIsRestaurant] = useState(false); //대분류:음식점 클릭 여부
    const [isCafe, setIsCafe] = useState(false); //대분류:카페 클릭 여부

    const clickEntire =()=>{
        setIsEntire(!isEntire);
        getAllRestaurants(wide,middle);
        if(isEntire){
            setIsRestaurant(false);
            setIsCafe(false);
        }else{
            setIsRestaurant(false);
            setIsCafe(false);
        }
    }

    const clickRestaurant =()=>{
        setIsRestaurant(!isRestaurant);
        if(wide && middle){
            getBistro(wide,middle,main_category[0]);
            console.log('입력값: ',wide,middle);
        }else{
            getBistro("서울특별시","강남구",main_category[0]);
        }
        
        if(isRestaurant){
            setIsCafe(false);
            setIsEntire(false);
        }else{
            setIsCafe(false);
            setIsEntire(false);
        }
    }

    const clickCafe =()=>{
        setIsCafe(!isCafe);
        if(wide && middle){
            getBistro(wide,middle,main_category[1]);
            console.log('입력값: ',wide,middle);
        }else{
            getBistro("서울특별시","강남구",main_category[1]);
        }

        if(isRestaurant){
            setIsRestaurant(false);
            setIsEntire(false);
        }else{
            setIsRestaurant(false);
            setIsEntire(false);
        }
    }

    //전체 음식점 조회(최초 렌더링)========================================================================================
    const [restaurants, setRestaurants] = useState([]);
    const [placeName, setPlaceName] = useState([]);
    const [laPositions, setLaPositions] = useState([]); //좌표관리la
    const [loPositions, setLoPositions] = useState([]); //좌표관리lo
    const getAllRestaurants =async(wide,middle)=>{
            await axios.post("https://spring.chaebbiserver.shop/api/categories",{
                wide: wide,
                middle: middle
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
            ).then(function(response) {
                console.log(response.data);
                setRestaurants(response.data.result.categoryList);
                setPlaceName(response.data.result.categoryList.map(row=>row.name));
                setLaPositions(response.data.result.categoryList.map(row=>row.la));
                setLoPositions(response.data.result.categoryList.map(row=>row.lo));
            }).catch(function(error) {
                console.log(error);
            });
    }
    

    //대분류 API==================================================================================
    const [mainArr, setMainArr] = useState([]);
    const [mainCategory, setMainCategory] = useState('');
    const getBistro =(wide,middle,main)=>{
        axios.post("https://spring.chaebbiserver.shop/api/bistro-category-main", {
            siteWide: wide,
            siteMiddle: middle,
            categoryMain: main
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(function(response) {
                console.log("대분류: ",response.data.result);
                setMainArr(response.data.result);
                setMainCategory(main);
                setPlaceName(response.data.result.map(row=>row.name));
                setLaPositions(response.data.result.map(row=>row.la));
                setLoPositions(response.data.result.map(row=>row.lo));

                setMiddleArr([]); //초기화 안해주면 대분류 카테고리가 달라져도 기존 middleArr를 끌고옴;;
            }).catch(function(error) {
                console.log(error);
            });
    }


    //중분류 API==================================================================================
    const [middleArr, setMiddleArr] = useState([]);
    const [middleCategory, setMiddleCategory] = useState('');
    const getMiddle =(wide,middle,main,cmiddle)=>{
        axios.post("https://spring.chaebbiserver.shop/api/bistro-category-middle", {
                siteWide: wide,
                siteMiddle: middle,
                categoryMain: main,
                categoryMiddle: cmiddle
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(function(response) {
                console.log("중분류: ",response.data.result);
                    setMiddleArr(response.data.result);
                    setMiddleCategory(cmiddle);
                    setPlaceName(response.data.result.map(row=>row.name));
                    setLaPositions(response.data.result.map(row=>row.la));
                    setLoPositions(response.data.result.map(row=>row.lo));
            }).catch(function(error) {
                console.log(error);
            });
    }

    const positionInfo = [];
    for(let i=0; i<placeName.length; i++){
        positionInfo.push({title: placeName[i], la: laPositions[i], lo: loPositions[i]})
    }
    // console.log(positionInfo);

    //북마크 추가(POST)===============================================================
    const addBookmark =(id) => {
        axios.post("https://spring.chaebbiserver.shop/api/bookmark",{
            bistroId: id
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

    //useEffect==================================================================================
    useEffect(()=>{
        if(wide && middle){
            getAllRestaurants(wide,middle);
        }else{
            getAllRestaurants("서울특별시","강남구");
        }        
    },[middle,mainArr,middleArr])

    return(
        <div className={styles.flexContainer}>
        <div className={styles.searchContainer}>
            <div className={styles.bistroContainer}>
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
                </div>
            <div className={styles.categoryContainer}>
                <div className={styles.mainContainer}>
                    <button className={isEntire ? `${styles.mainBtn} ${styles.active}` : `${styles.mainBtn}`} onClick={()=>{clickEntire()}}>
                        <BiAlignLeft/>&nbsp; 전체
                    </button>
                    <button className={isRestaurant ? `${styles.mainBtn} ${styles.active}` : `${styles.mainBtn}`} onClick={()=>{clickRestaurant()}}>
                        <BiRestaurant/>&nbsp;{main_category[0]}
                    </button>
                    <button className={isCafe ? `${styles.mainBtn} ${styles.active}` : `${styles.mainBtn}`} onClick={()=>{clickCafe()}}>
                        <BiCoffeeTogo/>&nbsp;{main_category[1]}
                    </button>
                </div>

                <div className={isEntire ? `${styles.middleContainer}` : `${styles.middleContainer} ${styles.activeMiddle}`}>
                    {isRestaurant ? 
                        <>
                            {Array.from(restaurant_category).map((mc,index) => (
                                <span className={styles.middleBlock} key={index} 
                                onClick={()=>{
                                    if(wide && middle){
                                        getMiddle(wide,middle,main_category[0],mc);
                                    }else{
                                        getMiddle("서울특별시","강남구",main_category[0],mc);
                                    }
                                }}>
                                    {mc}
                                </span>
                            ))}
                        </> 
                    : 
                        <>
                            {Array.from(cafe_category).map((mc,index) => (
                                <span className={styles.middleBlock} key={index} 
                                onClick={()=>{
                                    if(wide && middle){
                                        getMiddle(wide,middle,main_category[1],mc);
                                    }else{
                                        getMiddle("서울특별시","강남구",main_category[1],mc);
                                    }
                                }}>
                                    {mc}
                                </span>
                            ))}
                        </>
                    }
                </div>

            </div>
                <div className={isEntire? `${styles.scrollbar} ${styles.noFilterContainer}` : `${styles.scrollbar} ${styles.filterContainer}`}>
                    {isEntire ? 
                        <div>
                            {Array.from(restaurants).map((r,index) => (
                                <Card
                                    lists
                                    key={index}
                                    id={r.bistroId}
                                    title={r.name}
                                    category={r.category}
                                    newaddress={r.roadAddr}
                                    address={r.lnmAddr}
                                    call={r.telNo}
                                    menu={r.menuInfo}
                                    url={r.url}
                                    isBookmark={r.isBookmark}
                                    onClick={()=>{
                                        addBookmark(`${r.bistroId}`);
                                    }}
                                    width="100%"
                                    height="auto"
                                    fontsize="14px"
                                    catesize="12px"
                                />
                            ))} 
                        </div>    
                    :
                    <>
                        {mainArr.length !== 0 &&
                                <>
                                {mainArr.length !== 0 && middleArr.length !== 0 ?
                                    <>
                                    {Array.from(middleArr).map((r,index) => (
                                    <Card
                                        lists
                                        key={index}
                                        id={r.bistroId}
                                        title={r.name}
                                        category={`${mainCategory}/${middleCategory}`}
                                        newaddress={r.roadAddr}
                                        address={r.lnmAddr}
                                        call={r.telNo? `${r.telNo}` : `연락처 정보가 없습니다`}
                                        url={r.url}
                                        isBookmark={r.isBookmark}
                                        onClick={()=>{
                                            addBookmark(`${r.bistroId}`);
                                        }}
                                        width="100%"
                                        height="auto"
                                        fontsize="14px"
                                        catesize="12px"
                                    />
                                ))} </>
                                :
                                <>
                                    {Array.from(mainArr).map((r,index) => (
                                    <Card
                                        lists
                                        key={index}
                                        id={r.bistroId}
                                        title={r.name}
                                        category={mainCategory}
                                        newaddress={r.roadAddr}
                                        address={r.lnmAddr}
                                        call={r.telNo? `${r.telNo}` : `연락처 정보가 없습니다`}
                                        url={r.url}
                                        isBookmark={r.isBookmark}
                                        onClick={()=>{
                                            addBookmark(`${r.bistroId}`);
                                        }}
                                        width="100%"
                                        height="auto"
                                        fontsize="14px"
                                        catesize="12px"
                                    />
                                ))} </>
                                }
                            </>
                         
                        }
                    </>
                    }
                </div>
        </div>

        <Map positions={positionInfo}/>
        </div>
    );
};


export default SearchRestaurant;