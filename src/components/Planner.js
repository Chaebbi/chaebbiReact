import styled from "styled-components";
import { useState } from "react";
import { AiOutlineFileAdd,AiOutlineArrowRight } from "react-icons/ai";
import Input from "../elements/Input";
import Modal from "../elements/Modal";
import axios from  "axios";
import { useEffect } from "react";
import Grid from "../elements/Grid";
import MealRecord from "./MealRecord";
import NutrientsInfo from "./NutrientsInfo";

//일정등록 컴포넌트
function Planner(){

    //일정등록위한 상태변수들====================================================================
    const [sdate, setSdate] = useState(); //시작날짜
    const [edate, setEdate] = useState(); //종료날짜
    const [sdateform, setSdateForm] = useState(); //일정조회를 위한 형식으로 저장할 상태변수
    const handleSDate =(e)=>{
        setSdate(e.target.value);
        showPlans(dateConversion(e.target.value));
    }

    const handleEDate =(e)=>{
        setEdate(e.target.value);
    }

    const dateConversion =(s)=> {
        let form = s.split('-');
        setSdateForm(`${form[0]}.${form[1]}.${form[2]}.`);
        return (`${form[0]}.${form[1]}.${form[2]}.`);
    }

    const [stime, setStime] = useState('');  //시작시간
    const [etime, setEtime] = useState(''); //종료시간
    const [stime24, setStime24] = useState(''); //post용
    const [etime24, setEtime24] = useState(''); //post용
    const changeSTime = (event) => {
        setStime(event.target.value);
        setStime24(timeConversion(event.target.value));
	};
    const changeETime = (event) => {
        setEtime(event.target.value);
        setEtime24(timeConversion(event.target.value));
	};

    const timeConversion =(s)=> {
        let ampm = s.slice(8);  //문자열에서 AM/PM 여부를 알 수 있도록 slice
        let hh = s.slice(0,2);  //시, 분, 초 부분을 각각 slice
        let mm = s.slice(3,5); 
        let ss = s.slice(6,8); 
        
        if(ampm === 'PM' && hh !== '12') {
            hh = Number(hh) + 12;  //slice 하면 문자열이 되므로 숫자로 변환해서 계산
        }
        if(ampm === 'AM' && hh === '12') {
            hh = '00';
        }
        console.log(`${hh}:${mm}:${ss}`);

        return (`${hh}:${mm}:${ss}`);
    }

    //지역 조회(대분류,중분류 불러오기)============================================================================
    const bistrowide =  [ "서울특별시","경상남도","인천광역시","광주광역시","경기도","충청남도","울산광역시","대구광역시",
                          "부산광역시","제주특별자치도","경상북도","대전광역시","전라남도","전라북도","충청북도" 
    ];
    
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

    const [wide, setWide] = useState(''); 
    const [middle, setMiddle] = useState('');

    const handleSelectWide =(e)=>{
        setWide(e.target.value);
        getBistromiddle(e.target.value);
    }

    const handleSelectMiddle =(e)=>{
        setMiddle(e.target.value);
    }

    //일정등록(POST)============================================================================
    const [title,setTitle] = useState('');
    const handleTitle =(e)=>{
        setTitle(e.target.value);
    }

    const addPlan =async()=>{
        await axios.post("https://spring.chaebbiserver.shop/api/schedule",{
            title: title,
            wide: wide,
            middle: middle,
            sdate: sdate,
            edate: edate,
            stime: stime24,
            etime: etime24,
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //일정조회(POST)============================================================================
    const [plans,setPlans] = useState([]); //일정
    const [bmeal,setBmeal] = useState([]); //식단-아침(목록)
    const [lmeal,setLmeal] = useState([]); //식단-점심(목록)
    const [dmeal,setDmeal] = useState([]); //식단-저녁(목록)
    const [nutrients,setNutrients] = useState([]); //영양정보
    const showPlans =async(e)=>{
        await axios.post("https://spring.chaebbiserver.shop/api/daterecord",{
            date: e
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data.result);
            setPlans(response.data.result.schedules);
            setBmeal(response.data.result.records[0].record);
            setLmeal(response.data.result.records[1].record);
            setDmeal(response.data.result.records[2].record);
            setNutrients(response.data.result);
        }).catch(function(error) {
            console.log(error);
        });
    }


    //모달=======================================================================================
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
        setTitle('');
        setWide('');
        setMiddle('');
        setEdate('');
        setStime('');
        setEtime('');
    };
    const submitModal = () => {
        handleValid();
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    //유효성검사================================================================================
    const handleValid =()=>{
        let ckTitle = title.length > 0;
        let ckWide = wide !== '';
        let ckMiddle = middle !== '';
        let ckSdate = sdate !== '';
        let ckEdate = edate !== '';
        let ckStime = stime !== '';
        let ckEtime = etime !== '';

        if(ckTitle && ckSdate && ckEdate && ckStime && ckEtime && ckWide && ckMiddle){
            addPlan();
            setModalOpen(false);
        }else{
            if(!ckTitle){
                alert("제목을 입력해주세요.");
            }else if(!ckSdate){
                alert("시작날짜를 입력해주세요.");
            }else if(!ckEdate){
                alert("종료날짜를 입력해주세요.");
            }else if(!ckStime){
                alert("시작시간을 입력해주세요.");
            }else if(!ckEtime){
                alert("종료시간을 입력해주세요.");
            }else if(!ckWide){
                alert("지역(대분류)을 선택해주세요.");
            }else if(!ckMiddle){
                alert("지역(중분류)을 선택해주세요.");
            }
        }
    }


    useEffect(()=>{
    },[]);

    return(
        <>
        
        <PlanContainer>
            <Grid col="3" row="1" width="80%" colgap="20px" margin="100px auto 0px auto">
                <div>
                    <DateContainer>
                        <Input name="sdate" type="date" text="날짜" width="80%" margin="0px 5px 0px 0px" onChange={handleSDate}/>
                        <Icon onClick={openModal}>
                            <AiOutlineFileAdd size="23" color="#398234"/>
                        </Icon>
                    </DateContainer>
                {sdate !== undefined ?
                    //날짜 선택시
                    <InnerContainer>
                        {Array.from(plans).map((p,index) => (
                            <PlanBox key={index}>
                                <p>{p.startDate}</p>
                                <span>일정시작시간: {p.startTime}</span>
                                <li>{p.title}</li>
                            </PlanBox>
                        ))} 
                    </InnerContainer>
                :
                    //날짜 미선택시
                    <InnerContainer>
                        <h5>등록된 일정이 없습니다.</h5>
                    </InnerContainer>
                }
                </div>
                <>
                { bmeal.length || lmeal.length || dmeal.length !== 0? 
                    <MealRecord 
                    breakfast={bmeal} 
                    lunch={lmeal} 
                    dinner={dmeal}
                    />
                :
                    <MealRecord 
                    breakfast={bmeal} 
                    lunch={lmeal} 
                    dinner={dmeal}
                    />
                }
                </>
                
                <NutrientsInfo
                    recommended_kcal={nutrients.recommCalory}
                    recommended_carb={nutrients.recommCarb}
                    recommended_protein={nutrients.recommPro}
                    recommended_fat={nutrients.recommFat}
                    total_kcal={nutrients.totalCalory}
                    total_carb={nutrients.totalCarb}
                    total_protein={nutrients.totalPro}
                    total_fat={nutrients.totalFat}
                />
            </Grid>
            
                
        </PlanContainer>
        
        {/* 등록 모달 */}
        <Modal open={modalOpen} close={closeModal} submit={submitModal} header="일정등록" height="500px" margin="130px auto">
                <Input type="text" name="title" placeholder="내용" text="일정내용" onChange={handleTitle}/><br/>
                {/* sdate는 추후에 disabled로 설정해서 임의 변경을 막는 게 좋을듯->>모달 외부에서 받아온 sdate를 고정으로 가져가기 위함 */}
                <Grid col="2" colgap="10px" >
                    <Input type="date" name="sdate" placeholder="시작일자" text="일정시작일자" value={sdate || ''} onChange={handleSDate}/>
                    <Input type="date" name="edate" placeholder="종료일자" text="일정종료일자" value={edate || ''} onChange={handleEDate}/>
                    <Input type="time" name="stime" placeholder="시작시간" text="일정시작시간" step="1" value={stime} onChange={changeSTime}/>
                    <Input type="time" name="etime" placeholder="종료시간" text="일정종료시간" step="1" value={etime} onChange={changeETime}/>
                </Grid>
                
                <Label>지역</Label><br/>
                <select onChange={handleSelectWide} value={wide}>
                    <option value="1">==선택==</option>
                    {Array.from(bistrowide).map((w,index) => (
                        <option value={w} key={index}>{w}</option>
                    ))};
                    </select>
                
                <select onChange={handleSelectMiddle} value={middle}>
                    <option value="1">==선택==</option>
                    {Array.from(bistromiddle).map((m,index) => (
                        <option value={m} key={index}>{m}</option>
                    ))}
                </select>      
        </Modal>

        {/* 상세 조회 모달 */}
        {/* <Modal open={modalOpen} close={closeModal} submit={submitModal} header="일정조회" height="400px" margin="150px auto">

        </Modal> */}
        </>
    )
    }

const PlanContainer = styled.div`
    position: relative;
    top: -10px;
    height: 100%;
`;

const DateContainer = styled.div`
    width: 80%;
`;

const InnerContainer = styled.div`
    width: 100%;
    min-width: 300px;
    height: 300px;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    margin: 0;
    overflow: auto;
`;

const PlanBox = styled.div`
    box-sizing: border-box;
    border-radius: 10px;
    margin-bottom: 10px;
    padding: 10px;
    transition: all 0.2s;

    > p:first-child {
        display: inline-block; 
        margin: 0 0 6px 0;
        font-weight: 600;
    }
    > span {
        float: right;
        cursor: pointer;
        font-size: 12px;
    }

    &:hover{
        background-color: rgba(198,221,207,0.3);
        color: #495057;
    }
`;

const Icon = styled.span`
    position: relative;
    top: 7px;
    left: 7px;
    cursor: pointer;
`;

const Label = styled.label`
    font-weight: 600;
`;

export default Planner;