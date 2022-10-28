import styled from "styled-components";
import Image from "../elements/Image";
import Input from "../elements/Input";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Text from "../elements/Text";
import { BsGenderAmbiguous,BsPersonBadge } from "react-icons/bs";
import {API} from "../utils/API.js";


//프로필 컴포넌트
function Profile(){
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ //서버에서 불러온 유저정보를 각 필드에 저장
        name: '',
        nickname: '',
        age: '',
        weight: '',
        height: '',
        activity: '',
        gender: '',
    });

    const [actlabel, setActlabel] = useState('');
    const showActlabel =(p)=>{
        if(p === 25){
            setActlabel("1단계");
        }else if(p === 33){
            setActlabel("2단계");
        }else if(p === 40){
            setActlabel("3단계");
        }
    }

    //유저정보 불러오기(GET)========================================================
    const getProfile = async() => {
        const response = await axios.get(`${API}/userinfo`,
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        );
        setProfile({
                name: response.data.result.name,
                nickname: response.data.result.nickname,
                age: response.data.result.age,
                weight: response.data.result.weight,
                height: response.data.result.height,
                activity: response.data.result.activity,
                gender: response.data.result.gender
        });
        showActlabel(response.data.result.activity);
        console.log(response.data.result);
    }

    //성별에 따른 아바타 가져오기========================================================
    const getAvatar =(gender)=>{
        const maleAvt = "/images/avatar-male-man-svgrepo-com.svg";
        const femaleAvt = "/images/avatar-female-portrait-2-svgrepo-com.svg";
        const defaultAvt = "/images/blank-profile.png";
        if(gender == 0){
            return maleAvt;
        }else if(gender == 1){
            return femaleAvt;
        }else{
            return defaultAvt;
        }
    }

    //유저정보 수정하기(PUT)========================================================
    const saveAll =()=>{
        axios.put(`${API}/userupdate`,{
            age: profile.age,
            height: profile.height,
            weight: profile.weight,
            activity: profile.activity,
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            alert("정상적으로 수정되었습니다.");
            setEditmode(!editmode);
        }).catch(function(error) {
            console.log(error);
        });
    };

    //수정 토글======================================================
    const [editmode, setEditmode] = useState(false);
    const changeEditmode = () => {
		setEditmode(!editmode);
	};

    //값 변경========================================================
    const changeContent = (event) => {
		setProfile({...profile,[event.target.name]: event.target.value});
	};

    const changeContentInt = (event) => {
		setProfile({...profile,[event.target.name]: Number(event.target.value)});
	};

    //유효성 검사========================================================
    const handleValid =(e)=>{
        e.preventDefault();
        let ckAge = profile.age> 1;
        let ckHeight = profile.height> 0;
        let ckWeight = profile.weight> 0;

        if(ckAge && ckHeight && ckWeight){
            saveAll();
        }else{
            if(!ckAge){
                alert("나이를 올바르게 입력해주세요.");
            }else if(!ckHeight){
                alert("신장(cm)을 올바르게 입력해주세요.");
            }else if(!ckWeight){
                alert("몸무게(kg)를 올바르게 입력해주세요.");
            }
        }
    }
    //유저 삭제하기(delete)========================================================
    const deleteUser =()=>{
        axios.delete(`${API}/userdelete`, 
        { headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            alert('탈퇴되었습니다.');
            localStorage.removeItem('token');
            navigate("/sign_in");
        }).catch(function(error) {
            console.log(error);
        });
    };

    const confirmDelete=()=>{
        let answer = window.confirm("정말로 탈퇴하시겠습니까?");
        if(answer){
            deleteUser();
        }else{
            console.log('canceled');
        }
    }
    
    //useEffect====================================================
    useEffect(()=>{
        getProfile();
    },[actlabel,editmode]);

    return(
        <ProfileContainer>
            <Image 
                src={`${getAvatar(profile.gender)}`}
                width="150px" 
                height="150px" 
                borderRadius="100%"
                margin="0 auto"
                position="relative"
                top="30px"
                className="avatar"
            />
         {editmode ?
            (  
            <>
            {/* 수정모드 */}
            <InfoContainer>
                <div>
                    <h1>{profile.name}</h1>
                    <p><BsPersonBadge/> {profile.nickname} <BsGenderAmbiguous/> {profile.gender == 1 ? "여자" : "남자"}</p>
                </div>
                <GridContainer style={{gridTemplateColumns: "repeat(3, 1fr)"}}>
                    <Input center name="age" type="number" text="나이" placeholder="10" value={profile.age} onChange={changeContentInt}/>
                    <Input center name="height" type="number" text="신장(cm)" placeholder="cm" value={profile.height} onChange={changeContent}/>
                    <Input center name="weight" type="number" text="몸무게(kg)" placeholder="kg" value={profile.weight} onChange={changeContent} />
                </GridContainer>
                    <RadioBox>
                        <Legend>활동점수</Legend>
                            <div>
                                <input id="1" value="25" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==25}/>1단계
                                <input id="2" value="33" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==33}/>2단계
                                <input id="3" value="40" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==40}/>3단계
                            </div>
                    </RadioBox>
                
                <button onClick={handleValid} style={{display:"block", margin:"0 auto"}}>프로필 저장</button>
            </InfoContainer>
            </>
        )
        :
        (
        <>
            {/* 수정모드 아님 */}
            <InfoContainer>
                <div>
                    <h1>{profile.name}</h1>
                    <p><BsPersonBadge/> {profile.nickname} <BsGenderAmbiguous/> {profile.gender == 1 ? "여자" : "남자"}</p>
                </div>
                <GridContainer>
                    <Text center label="나이" text={profile.age}/>
                    <Text center label="신장" text={`${profile.height} cm`}/>
                    <Text center label="체중" text={`${profile.weight} kg`}/>
                    <Text center label="활동점수" text={actlabel}/>
                </GridContainer>
                <div>
                    <button onClick={changeEditmode}>프로필 수정</button>
                    <button onClick={confirmDelete} style={{marginLeft:"10px"}}>회원탈퇴</button>
                </div>
            </InfoContainer>
        </>   
        )
    }
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    min-height: 550px;
    height: 550px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
`;

const InfoContainer = styled.div`
    position: relative;
    top: 60px;

    div { text-align: center; color: #495057; }
    div h1  { margin: 0; font-size: 28px; }
    div p { margin: 0; margin-top: 20px; font-size: 16px; }
    div:last-child { margin: 0 auto; }

    button{
        display: inline-block;
        width: 120px;
        box-sizing: border-box;
        padding: 5px;
        border: 1px solid #777;
        border-radius: 5px;
        background-color: transparent;
        color: #777;
        cursor: pointer;

        position: relative;
        top: 70px;
    }
`;

const GridContainer = styled.div`
    display: grid;
    width: 65%;
    grid-template-columns: repeat(4, 1fr);
    margin: 0 auto;
    position: relative;
    top: 30px;

    @media (max-width: 730px){
        
    }
`;

const RadioBox = styled.div`
    position: relative;
    top: 50px;

    div{
        display: inline;
    }
`;

const Legend = styled.span`
    display: inline;
    font-weight: 700;
    font-size: 15px;
    margin-right: 15px;
`;


export default Profile;