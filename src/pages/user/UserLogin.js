import Button from "../../elements/Button";
import Input from "../../elements/Input";
import Form from "../../elements/Form";
import axios from "axios";
import { useState } from "react";
import{ useNavigate } from "react-router-dom";
import {API} from "../../utils/API.js";

//유저 로그인
function UserLogin(){
    //*****이 부분 rest api key분리해서 따리 관리할 것!!!! */
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=de34834910d5d355823cd6cceaeb1678&redirect_uri=http://localhost:3000/kakao_login&response_type=code`;
    //*****이 부분 rest api key분리해서 따리 관리할 것!!!! */

    
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
        e.preventDefault();
        let ckEmail = auth.email.length > 0 && auth.email.includes('@');
        let ckPwd = auth.pwd.length > 0;

        if(ckEmail && ckPwd){
            doLogin();
        }else{
            if(!ckEmail){
                alert("이메일을 올바르게 입력해주세요.");
            }else if(!ckPwd){
                alert("비밀번호를 입력해주세요.");
            }
        }
    }

    const doLogin =()=>{
        axios.post(`${API}/user-login`, auth)
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
            <Form>
                <h1>로그인</h1>
                <p>서비스를 이용하기 위해선 로그인이 필요합니다.</p>

                <Input name="email" type="email" label="이메일" placeholder="id@gmail.com" onChange={handleInputs}/>
                <Input name="pwd" type="password" label="비밀번호" placeholder="*****" onChange={handleInputs}/>

                <Button onClick={handleValid}>로그인</Button>
                <Button href="/sign_up">회원가입</Button>
                <Button onClick={doKakaoLogin}>카카오 계정으로 로그인</Button>

                <Button href="/community">채숲</Button>
            </Form>
    )
}

export default UserLogin;
