import styled from "styled-components";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import PwdInput from "../../elements/PwdInput";
import Radio from "../../elements/Radio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { gender, activity } from '../../utils/common.js';
import { checkPassword, checkEmail, checkNickname } from "../../utils/validation.js";


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
    const [error, setError]= useState({
        email: '',
        nickname: '',
        pwd: '',
        name: '',
        age: '',
        height: '',
        weight: '',
    })

    //입력값 및 에러 핸들러=======================================================
    const changeContent = (event) => {
        const {name, value} = event.target;

        setUserinfo({...userinfo, [name]: value});

        if(name === 'age' || name === 'height' || name === 'weight'){
            if(value <= 0 || isNaN(value)){
                setError({...error, [name]: '유효하지 않은 값입니다.'})
            }else{
                setError({...error, [name]: ''})
            }
        }else if(name === 'pwd'){
            if(!checkPassword(value)){
                setError({...error, [name]: '비밀번호가 유효하지 않습니다.'})
            }else{
                setError({...error, [name]: ''})
            }
        }else if(name === 'email'){
            setError({...error, 'email': ''})
        }else if(name === 'nickname'){
            setError({...error, 'nickname': ''});
        }
	};

    //이메일 중복체크(POST)==================================================================
    const [isOkEmail, setIsOkEmail] = useState(false);
    const checkDuplEmail =()=>{
        if(!checkEmail(userinfo.email)){
            setError({...error, 'email': '이메일을 올바르게 입력해주세요.'});
            return;
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/email-check`,
            {
                email: userinfo.email,
            },
            ).then(function(response) {
                if(response.data.result.isPresent === "duplicate email"){
                    alert("사용할 수 없는 이메일입니다.");
                }else{
                    if(window.confirm("사용할 수 있는 이메일입니다.")){
                        setIsOkEmail(true);
                    }
                }
              }).catch(function(error) {
                console.log(error);
              });
    }
    //닉네임 중복체크(POST)==================================================================
    const [isOkNickname, setIsOkNickname] = useState(false);
    const checkDuplNickname =()=>{
        if(!checkNickname(userinfo.nickname)){
            setError({...error, 'nickname': '닉네임을 올바르게 입력해주세요.'});
            return;
        }

        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user-nickname`,
            {
                nickname: userinfo.nickname,
            },
            ).then(function(response) {
                console.log(response.data);
                if(response.data.result.exist === true){
                    alert("이미 존재하는 닉네임입니다.");
                    setIsOkNickname(false);
                }else{
                    if(window.confirm("사용할 수 있는 닉네임입니다.")){
                        setIsOkNickname(true);
                    }
                }
              }).catch(function(error) {
                console.log(error);
              });
    }

    const registerUser =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/create-user`, userinfo )
        .then(function(response) {
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
    const handleValid =()=>{
        // 각 필드가 유효한 값을 갖고 있는지
        // isOkEmail && isOkNickname 모두 true
        // 검증을 모두 마치면 회원가입 api 호출
        // registerUser();

        let isValid = true;
        let isError = false;

        for(let key in userinfo){
            if(userinfo[key] === ''){
                isValid = false;
            }
        }

        for(let key in error){
            if(error[key] !== ''){
                isError = true;
            }
        }

        if(isValid && !isError && isOkEmail && isOkNickname){
            registerUser();
        }else{
            if(!isOkEmail){
                alert('이메일 중복확인을 진행해주세요.');
            }else if(!isOkNickname){
                alert('닉네임 중복확인을 진행해주세요.');
            }else{
                alert('유효한 값을 입력했는지 다시 한번 확인해주세요.');
            }
        }

    }

    return(
            <AuthContainer>
                <h1>회원가입</h1>
                <Wrapper>
                    <Input label="이메일" type="email" name="email" placeholder="id@gmail.com" disabled={isOkEmail} error={error.email} onChange={changeContent}/>
                    {isOkEmail ? <Button onClick={()=>setIsOkEmail(false)}>이메일 변경</Button> : <Button onClick={checkDuplEmail}>중복확인</Button>}
                </Wrapper>
                <Wrapper>
                    <Input label="닉네임" type="text" name="nickname" placeholder="8자 미만" disabled={isOkNickname} error={error.nickname} onChange={changeContent}/>
                    {isOkNickname ? <Button onClick={()=>setIsOkNickname(false)}>닉네임 변경</Button> : <Button onClick={checkDuplNickname}>중복확인</Button>}
                </Wrapper>
                <PwdInput label="비밀번호" name="pwd" placeholder="5자 이상 20자 미만" error={error.pwd} onChange={changeContent}/>
                <Input label="이름" type="text" name="name" placeholder="홍길동" error={error.name} onChange={changeContent}/>
                <Input label="나이" type="text" name="age" error={error.age} onChange={changeContent}/>
                <Input label="신장" type="text" name="height" placeholder="cm" error={error.height} onChange={changeContent}/>
                <Input label="체중" type="text" name="weight" placeholder="kg" error={error.weight} onChange={changeContent}/>

                <Radio legend="성별" radioArray={gender} onChange={changeContent} checked={Number(userinfo.gender)}/>
                <Radio legend="활동수준" radioArray={activity} onChange={changeContent} checked={Number(userinfo.activity)}/>

                <Button onClick={handleValid}>가입하기</Button>
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