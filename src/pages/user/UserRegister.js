import styled from "styled-components";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import PwdInput from "../../elements/PwdInput";
import Form from "../../elements/Form";
import Radio from "../../elements/Radio";
import { useState,useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gender, activity } from '../../utils/common.js';
import { checkEmail, checkPassword } from "../../utils/validation";


//유저 회원가입
function UserRegister(){
    const navigate = useNavigate();
    const [userinfo,setUserinfo] = useState({
        email: '',
        nickname: '',
        pwd: '',
        name: '',
        gender: 0,
        age: 0,
        height: 0,
        weight: 0,
        activity: 25
    });

    //Input값 인식 이벤트 핸들러=======================================================
    const changeContent = useCallback((event) => {
        const {name, value} = event.target;
        setUserinfo((userinfo)=> ({...userinfo, [name]: value}));
	},[]);

    //이메일 중복체크(POST)==================================================================
    const [isDupl, setIsDupl] = useState(false);
    const checkEmail =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/email-check`,
            {
                email: userinfo.email,
            },
            ).then(function(response) {
                if(response.data.result.isPresent === "duplicate email"){
                    alert("사용할 수 없는 이메일입니다.(Duplicate)");
                    setIsDupl(false);
                }else{
                    alert("사용할 수 있는 이메일입니다.(Not Duplicate)");
                    setIsDupl(true);
                }
              }).catch(function(error) {
                console.log(error);
              });
    }
    //닉네임 중복체크(POST)==================================================================
    const [isDuplNickname, setIsDuplNickname] = useState(false);
    const checkNickname =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user-nickname`,
            {
                nickname: userinfo.nickname,
            },
            ).then(function(response) {
                console.log(response.data);
                if(response.data.result.exist === true){
                    alert("이미 존재하는 닉네임입니다.(Duplicate)");
                    setIsDuplNickname(false);
                }else{
                    alert("사용 가능한 닉네임입니다.(Not Duplicate)");
                    setIsDuplNickname(true);
                }
              }).catch(function(error) {
                console.log(error);
              });
    }

    const registerUser =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/create-user`, userinfo ).then(function(response) {
                console.log(response);
                if(response.data.code === 1000){
                    alert("정상적으로 가입되었습니다.");
                    navigate('/sign_in');
                }
            }).catch(function(error) {
                console.log(error);
            });
    }

    //유효성 검사========================================================
    const handleValid =(values)=>{
        // 닉네임, 이메일 중복체크를 통과했는지
        // 각 필드가 유효한 값을 갖고 있는지 (0, '', null)
        let isBlank = false
        let isNotValid = true

      for (const key in values) {
        if (values[key] === '') {
          isBlank = true
        }
      }
        // 검증을 모두 마치면 회원가입 api 호출
        // registerUser();
    }

    return(
            <AuthContainer>
                <h1>회원가입</h1>
                <Wrapper>
                    <Input label="이메일" type="email" name="email" error="이메일을 올바르게 입력하세요." placeholder="id@gmail.com" onChange={changeContent}/>
                    <Button onClick={checkEmail}>중복확인</Button>
                </Wrapper>
                <Wrapper>
                    <Input label="닉네임" type="text" name="nickname" placeholder="얼어붙은발바닥" disabled onChange={changeContent}/>
                    <Button onClick={checkNickname}>중복확인</Button>
                </Wrapper>
                <PwdInput label="비밀번호" name="pwd" placeholder="5자 이상 20자 미만" error="유효하지 않은 비밀번호입니다" onChange={changeContent}/>
                <Input label="이름" type="text" name="name" placeholder="홍길동" onChange={changeContent}/>
                <Input label="나이" type="number" name="age" onChange={changeContent}/>
                <Input label="신장" type="number" name="height" placeholder="cm" onChange={changeContent}/>
                <Input label="체중" type="number" name="weight" placeholder="kg"onChange={changeContent}/>

                <Radio legend="성별" radioArray={gender} onChange={changeContent} checked={Number(userinfo.gender)}/>
                <Radio legend="활동수준" radioArray={activity} onChange={changeContent} checked={Number(userinfo.activity)}/>

                <Button onClick={handleValid(userinfo)}>가입하기</Button>
            </AuthContainer>
    )
}

const AuthContainer = styled.div`
    width: 46rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    h1{
        text-align: center;
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        width: 55%;
        min-width: 40rem;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
        padding: 1rem;
    }
`;

const Wrapper = styled.div`
    display: grid;
    position: relative;
    grid-template-columns: 2fr 1fr;
    gap: 1rem;

    button{
        height: 3.8rem;
        position: relative;
        top: 1.8rem;
    }
`;

export default UserRegister;