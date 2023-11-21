import Button from "../../elements/Button";
import Input from "../../elements/Input";
import PwdInput from "../../elements/PwdInput";
import axios from "axios";
import { useState } from "react";
import{ useNavigate,Link } from "react-router-dom";
import styled from "styled-components";


//유저 로그인
function UserLogin(){
    const client_id = process.env.REACT_APP_REST_API_KEY;
    const redirect_uri = 'http://localhost:3000/kakao_login'
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&response_type=code`;

    const doKakaoLogin =()=>{
        window.location.href = KAKAO_AUTH_URL;
    }

    const navigate = useNavigate();
    const [auth, setAuth] = useState({email:'', pwd: ''});
    const handleInputs = (e) =>{
        const {name, value} = e.target;
        setAuth({...auth, [name]: value});
        if(e.key === 'Enter'){
            handleValid();
        }
    }

    //유효성 검사========================================================
    const handleValid =(e)=>{

    }

    const doLogin =()=>{
        console.log(auth);
        
        axios.post(`${process.env.REACT_APP_SERVER_URL}/api/user-login`, auth)
        .then(function(response) {
                console.log(response);
                let isSuccess = response.data.isSuccess;
                let error = response.data.code;
                let msg = response.data.message;
                if(isSuccess){
                    localStorage.setItem('token', response.data.result.token);
                    localStorage.setItem('userIdx', response.data.result.userId);
                    navigate("/");
                    window.location.reload(); 
                }else{
                    if(error === 3014){
                        alert(msg);
                    }else if(error === 3015){
                        alert(msg);
                    }else if(error === 2018){
                        alert(msg);
                    }else if(error === 2015){
                        alert(msg);
                    }
                }
            }).catch(function(error) {
                console.log(error);
            });
    };
    return(
            <AuthContainer>
                <img className="logo" src="/images/chaebbi-logo.svg" alt="logo" onClick={()=>navigate('/landing')}/>
                <h1 className="login-text">로그인</h1>
                <p className="login-text">서비스를 이용하기 위해선 로그인이 필요합니다.</p>

                <Button onClick={doKakaoLogin}>
                    <img className="kakao" src="/images/kakaotalk-svg.svg" alt="kakao"/>
                    &nbsp;카카오 계정으로 로그인
                </Button>

                <p className="login-text">또는</p>

                <Input label="이메일" name="email" type="email" onChange={handleInputs}/>
                <PwdInput label="비밀번호" name="pwd" onChange={handleInputs}/>

                <Button onClick={handleValid}>로그인</Button>
                <p className="login-text signup-text">아직 계정이 없으신가요? <Link to="/sign_up">회원가입</Link></p>
                {/* <Button href="/community">채숲</Button> */}
            </AuthContainer>
    )
}

const AuthContainer = styled.div`
    width: 46rem;
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .login-text{
        text-align: center;
    }

    .signup-text{
        margin-top: 2rem;
    }

    img.logo{
        width: 8rem;
        margin: 0 auto;
        position: relative;
        top: 1rem;
        cursor: pointer;
    }

    img.kakao{
        position: relative;
        top: 0.15rem;
    }

    @media ${({ theme }) => theme.breakpoints.desktop} {
        width: 50%;
    }

    @media ${({ theme }) => theme.breakpoints.mobile} {
        width: 100%;
        padding: 1rem;
    }
`;

export default UserLogin;
