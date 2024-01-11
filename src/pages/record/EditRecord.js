import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import axios from "axios";
import Input from "../../elements/Input";
import Radio from "../../elements/Radio";
import { when } from "../../utils/common";
import { useNutrients } from '../../hooks/useNutrients';
import { useConvertDate } from "../../hooks/useConvertDate";
import Button from "../../elements/Button"
import defaultImage from '../../assets/no_image_50px.png';

//기록된 식단을 보여주는 상세페이지
function EditRecord(){
    const {r_id} = useParams();
    const navigate = useNavigate();
    const [record, setRecord] = useState({});
    const location = useLocation();
    const n = location.state;

    const { nutrients, changeAmount, updateNutrients, capacityError, setCapacityError } = useNutrients({
        name: '',
        calory: 0,
        carb: 0,
        pro: 0,
        fat: 0,
        capacity: 0,
        meal: 0
    });

    const {
        name = '',
        calory = 0,
        carb = 0,
        pro = 0,
        fat = 0,
        capacity = 0,
        meal = 0
    } = nutrients;

    const { dateInfo, changeDate, changeTime, dateError, setDateError } = useConvertDate({date: '', time: '', prevDate: '', prevTime: ''});

    const conversionForEdit =(r)=> {
        let form = r.split('-');
        return (`${form[0]}.${form[1]}.${form[2]}.`);
    }

    //식단기록을 get api 호출하는 함수=========================================================================
    // const [today, setToday] = useState('');
    // const getRecord=()=>{
    //     axios.post(`${process.env.REACT_APP_SERVER_URL}/api/detailrecord`,{
    //         record_id: r_id
    //     },
    //     { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
    //     ).then(function(response) {
    //         console.log(response.data.result.data[0]);
    //         setRecord(response.data.result.data[0]);
    //         setToday(conversionForRead(response.data.result.data[0].date));
    //         if(response.data.result.data[0].image_url !== null){
    //             let splitName = (response.data.result.data[0].image_url).split('/');
    //             console.log(splitName);
    //             setImagename(splitName[splitName.length-1]);
    //             setExist(true);
    //         }
    //     }).catch(function(error) {
    //         console.log(error);
    //     });
    // }

    // const handleToday =(e)=>{
    //     setToday(e.target.value);
    // }
  



    const changeContent = (event) => {
        setRecord({...record,[event.target.name]: event.target.value});
	};

    //이미지 관리
    const fileRef = useRef();
    const clickFileInput =()=>{
        fileRef.current.click();
    }

    const [image, setImage] = useState('');
    const [imagename, setImagename] = useState('');
    const [exist, setExist] = useState(false);
    const handleImage =(e)=>{
        setImage(e.target.files[0]);
        setImagename(e.target.files[0].name);
        setExist(true);
        console.log(e.target.files[0]);
    }

    const deleteImage =(e)=>{
        e.preventDefault();
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/image-delete`,
        {
          data:
          {
            recordId: r_id
          },
          headers: 
          {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          },
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
          console.log(response.data);
          setExist(false);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //식사 정보 + 이미지 수정하기(post api 동시호출)
    const saveAll =()=>{
        const formData = new FormData();
        formData.append("recordId", r_id);
        formData.append("text", name);
        formData.append("calory", calory);
        formData.append("carb", carb);
        formData.append("protein", pro);
        formData.append("fat", fat);
        // formData.append("rdate", conversionForEdit(today));
        formData.append("rtime", record.time);
        formData.append("amount", parseFloat(capacity));
        formData.append("meal", meal);
        formData.append("image", image);

        axios.all([
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/image-update`, formData,
        { headers : { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}`}
        }),
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/record-update`, formData,
        { headers : { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
        ]).then(axios.spread((res1, res2)=>{
            alert("정상적으로 수정되었습니다.");
            window.location.reload();
        })).catch(function(error) {
            console.log(error);
        });
    };


    //유효성 검사
    const handleValid =(e)=>{
        e.preventDefault();
        saveAll();
    }

    useEffect(()=>{
      localStorage.setItem('nutrients', JSON.stringify(n));
      updateNutrients(JSON.parse(localStorage.getItem('nutrients')));
    },[]);

    return(
        <Container>
            <AiOutlineArrowLeft size="25" onClick={()=>{navigate('/')}}/>
            <h2>{name ? name : '음식명'}</h2>

            <DetailContentWrapper>
                <img src={record.image_url !== null ? defaultImage : record.image_url} alt="음식 이미지" />

                <div className="content">
                    <GridWrapper>
                        <Input label="식사날짜" type="text" name="date" placeholder="YYYY-MM-DD" error={dateError.date} onChange={changeDate}/>
                        <Input label="식사시간" type="text" name="time" placeholder="hh:mm" error={dateError.time} onChange={changeTime}/>
                    </GridWrapper>

                    <Radio legend="끼니" radioArray={when} onChange={(e)=>updateNutrients({meal: e.target.value})} checked={Number(meal)}/>
                    <hr/>
                    <GridWrapper>
                        <Input label="칼로리" type="text" name="cal" value={calory} onChange={changeContent}/>
                        <Input label="섭취량" type="text" name="amount" value={capacity} error={capacityError} onChange={changeAmount}/>
                    </GridWrapper>
                    <GridWrapper>
                        <Input label="탄수화물" type="text" name="carb" value={carb} onChange={changeContent}/>
                        <Input label="단백질" type="text" name="protein" value={pro} onChange={changeContent}/>
                        <Input label="지방" type="text" name="fat" value={fat} onChange={changeContent}/>
                    </GridWrapper>
                    <hr/>
                    {exist === true ? 
                        <>
                            {imagename}
                            <button onClick={deleteImage}>삭제</button>
                        </>
                    :
                        <>
                            <input type="file" name="image" accept="image/*" ref={fileRef} onChange={handleImage} style={{display:"none"}}/>
                            <Button contrast onClick={clickFileInput}>이미지 수정하기</Button>
                        </>
                    }

                    <ButtonWrapper>
                        <Button onClick={handleValid}>저장하기</Button>
                        <Button contrast onClick={()=>navigate(`/detail/${r_id}`)}>취소</Button>
                    </ButtonWrapper>
                </div>
            </DetailContentWrapper>
        </Container>
        )
    }

const Container = styled.form`
    width: 100rem;
    border: 1px solid var(--color-border);
    border-radius: 0.5rem;
    padding: 2rem;

    > h2 {
        display: inline-block;
        margin: 0 0 2rem 1rem;
    }

    hr {
        color: var(--color-border);    /* IE */
        border-color: var(--color-border);   /* 사파리 */
        background-color: var(--color-border); /* 크롬 */
        height: 1px;
        border: 0;
        margin: 2rem 0;
    }

    img{
        border-radius: 0.5rem;
        width: 100%;
        height: 30rem;
    }

    @media ${({ theme }) => theme.breakpoints.tablet} {
        margin: 0 1rem;
    }
`;

const DetailContentWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;

    @media ${({ theme }) => theme.breakpoints.mobile} {
        grid-template-columns: 1fr;
    }
`;

const GridWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-bottom: 1.5rem;

    @media ${({ theme }) => theme.breakpoints.tablet} {
        grid-template-columns: 1fr;
        row-gap: 1.5rem;
    }
`;

const ButtonWrapper = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: end;
    margin-top: 2rem;
`;



export default EditRecord;