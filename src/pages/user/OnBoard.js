import styled from "styled-components";
import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Radio from "../../elements/Radio";
import { gender, activity } from "../../utils/common";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//온보드 페이지
function OnBoard(){
    const navigate = useNavigate();
    const [error, setError] = useState({
        nickname: '',
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        activity: ''
    });
    const [userinfo,setUserinfo] = useState({
        nickname: '',
        name: '',
        gender: 0,
        age: 0,
        height: 0,
        weight: 0,
        activity: 25
    });

    //Input값 인식 이벤트 핸들러=======================================================
    const changeContent = (e) => {
        const { name, value } = e.target;
        if(name === 'age' || name === 'weight' || name === 'height'){
            if(value <= 0 || isNaN(value)){
                setUserinfo({...userinfo,[name]: value});
                setError({...error, [name]: '유효하지 않은 값입니다.'})
            }else{
                setUserinfo({...userinfo,[name]: value});
                setError({...error, [name]: ''})
            }
        }else{
            setUserinfo({...userinfo,[name]: value});
        }
	};

    //닉네임 중복체크(POST)==================================================================
    const [isOkNickname, setIsOkNickname] = useState(false);
    const checkDuplicateNickname =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user-nickname`,
            {
                nickname: userinfo.nickname,
            },
            ).then(function(response) {
                console.log(response.data);
                if(response.data.result.exist === true){
                    alert("이미 존재하는 닉네임입니다.");
                }else{
                    if(window.confirm("사용 가능한 닉네임입니다.")){
                        setIsOkNickname(true);
                    }
                }
              }).catch(function(error) {
                console.log(error);
              });
    }

    const handleCheckDuplicateNK =(e)=>{
        e.preventDefault();

        if(userinfo.nickname.length > 0){
            setError({...error, 'nickname': ""});
            checkDuplicateNickname();
        }else{
            setError({...error, 'nickname': "닉네임을 입력하세요."});
        }
    }


    const signUp =()=>{
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/signup`, {
                name: userinfo.name,
                nickname: userinfo.nickname,
                gender: Number(userinfo.gender),
                age: Number(userinfo.age),
                height: userinfo.height,
                weight: userinfo.weight,
                activity: Number(userinfo.activity)
            },
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}})
            .then(function(response) {
                console.log(response);
                alert("정상적으로 등록되었습니다.");
                navigate("/");
            }).catch(function(error) {
                console.log(error);
            });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
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

        // 초기 플래그가 그대로 유지되면 유효성 검증 성공 + 닉네임 중복 확인
        if(isValid && !isError && isOkNickname){
            signUp();
        }else{
            alert('올바른 값을 입력해주세요.');
        }
    }

    return(
        <AuthContainer>
            <h1>유저 정보 입력</h1>
            
            <Wrapper>
                <Input label="닉네임" type="text" name="nickname" error={error.nickname} disabled={isOkNickname} onChange={changeContent}/>
                {
                    isOkNickname ? 
                        <Button onClick={()=>setIsOkNickname(false)}>닉네임 수정</Button> 
                    : 
                        <Button onClick={handleCheckDuplicateNK}>중복확인</Button>
                }
            </Wrapper>

            <Input label="이름" type="text" name="name" onChange={changeContent}/>
            <Input label="나이" type="text" name="age" error={error.age} onChange={changeContent}/>
            <Input label="신장" type="text" name="height" error={error.height} placeholder="cm" onChange={changeContent}/>
            <Input label="체중" type="text" name="weight" error={error.weight} placeholder="kg"onChange={changeContent}/>

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

export default OnBoard;