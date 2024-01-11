import styled from "styled-components";
import Input from "../elements/Input";
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import Text from "../elements/Text";
import { BsGenderAmbiguous,BsPersonBadge } from "react-icons/bs";
import Radio from "../elements/Radio";
import Button from "../elements/Button";
import { activity } from '../utils/common.js';

const maleAvt = "/images/avatar-male-man-svgrepo-com.svg";
const femaleAvt = "/images/avatar-female-portrait-2-svgrepo-com.svg";
const defaultAvt = "/images/blank-profile.png";

//프로필 컴포넌트
function Profile(){
    const navigate = useNavigate();
    const [profile, setProfile] = useState({ 
        name: '',
        nickname: '',
        age: 0,
        weight: 0,
        height: 0,
        activity: 25,
        gender: 0
    });

    const [actlabel, setActlabel] = useState('1단계');
    const showActlabel =(p)=>{
        switch(Number(p)){
            case 25:
                setActlabel("1단계");
                break;
            case 33:
                setActlabel("2단계");
                break;
            case 40:
                setActlabel("3단계");
                break;
            default:
                break;
        }
    }

    //유저정보 불러오기(GET)========================================================
    const getProfile = async() => {
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/api/userinfo`,
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
            
            Number(response.data.result.activity) === 25 ? setActlabel("1단계") : 
            Number(response.data.result.activity) === 33 ? setActlabel("2단계") : setActlabel("3단계");
        }catch(error){
            
        }
    }

    //유저정보 수정하기(PUT)========================================================
    const saveAll =()=>{
        axios.put(`${process.env.REACT_APP_SERVER_URL}/api/userupdate`,{
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
            setEditmode(!editmode);
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

    //유효성 검사========================================================
    const handleValid =()=>{
        console.log(profile);
        saveAll(); 
    }

    //유저 삭제하기(delete)========================================================
    const deleteUser =()=>{
        axios.delete(`${process.env.REACT_APP_SERVER_URL}/api/userdelete`, 
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}`} }
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
        const answer = window.confirm("정말로 탈퇴하시겠습니까?");
        if(answer){
            deleteUser();
        }
    }

    //커뮤니티 이동시 로컬스토리지에 값 저장
    const gotoCommunity =()=>{
        window.localStorage.setItem('community', true);
        console.log(localStorage.getItem('community'));
    }
    
    //useEffect====================================================
    useEffect(()=>{
        getProfile();
    },[actlabel,editmode]);

    return(
        <ProfileContainer>
            <img src={
                profile.gender === 0 ? maleAvt : 
                profile.gender === 1 ? femaleAvt : defaultAvt
                } 
                alt="프로필 이미지"/>
         {editmode ?
            (  
            <>
            {/* 수정모드 */}
            <InfoContainer>
                <div>
                    <h1>{profile.name ? profile.name : '유저명'}</h1>
                    <p><BsPersonBadge/> {profile.nickname ? profile.nickname : '닉네임'} <BsGenderAmbiguous/> {profile.gender === 1 ? "여자" : "남자"}</p>
                </div>
                <form>
                    <Input name="age" type="text" label="나이" value={profile.age} onChange={changeContent}/>
                    <Input name="height" type="text" label="신장(cm)" placeholder="cm" value={profile.height} onChange={changeContent}/>
                    <Input name="weight" type="text" label="몸무게(kg)" placeholder="kg" value={profile.weight} onChange={changeContent} />
                    <Radio legend="활동수준" radioArray={activity} onChange={changeContent} checked={Number(profile.activity)}/>
                </form>
                <Button onClick={handleValid}>프로필 저장</Button>
            </InfoContainer>
            </>
        )
        :
        (
        <div className="display">
            {/* 수정모드 아님 */}
            <InfoContainer>
                <div>
                    <h1>{profile.name ? profile.name : '유저명'}</h1>
                    <p><BsPersonBadge/> {profile.nickname ? profile.nickname : '닉네임'} <BsGenderAmbiguous/> {profile.gender === 1 ? "여자" : "남자"}</p>
                </div>
                <GridContainer>
                    <Text label="나이" text={profile.age}/>
                    <Text label="신장" text={`${profile.height} cm`}/>
                    <Text label="체중" text={`${profile.weight} kg`}/>
                    <Text label="활동점수" text={actlabel}/>
                </GridContainer>
            </InfoContainer>
            <ButtonWrapper>
                <Button onClick={changeEditmode}>프로필 수정</Button>
                <Button onClick={()=>navigate('/manage-record')}>식단관리</Button>
                <Button onClick={confirmDelete} contrast>회원탈퇴</Button>
                {/* <Button onClick={gotoCommunity} href="/community">커뮤니티</Button> */}
            </ButtonWrapper>
        </div>   
        )
    }
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    padding: 2rem;
    border: 1px solid var(--color-primary);
    border-radius: 0.5rem;
    background-color: var(--color-input-focus);
    position: relative;
    text-align: center;
    min-width: 30rem;

    .display{
        width: 100%;
        display: flex;
        flex-direction: column;
    }

    @media (min-width: ${(props) => props.theme.breakpoints.tablet}){
        width: 100%;
        margin: 0 1rem;
    }
`;

const InfoContainer = styled.div`
    width: 100%;

    >div h1{
        margin-bottom: 0.8rem;
    }

    form{
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        margin: 1rem 0;
        padding: 1rem;
    }
`;

const GridContainer = styled.div`
    display: flex;
    margin: 1rem 0;

    @media (max-width: ${(props) => props.theme.breakpoints.tablet}){
    }
`;


const ButtonWrapper = styled.div`
    display: flex;
    justify-content: center;
    gap: 0.5rem;
`;


export default Profile;