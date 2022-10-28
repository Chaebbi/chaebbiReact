import Button from "../elements/Button";
import Input from "../elements/Input";
import Form from "../elements/Form";
import axios from "axios";
import { useState } from "react";
import{ useNavigate } from "react-router-dom";
import {API} from "../utils/API.js";

//유저 로그인
function UserLogin(){
    //*****이 부분 rest api key분리해서 따리 관리할 것!!!! */
    const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=de34834910d5d355823cd6cceaeb1678&redirect_uri=http://localhost:3000/kakao_login&response_type=code`;
    //*****이 부분 rest api key분리해서 따리 관리할 것!!!! */

    
    const doKakaoLogin =()=>{
        window.location.href = KAKAO_AUTH_URL;
    }
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [pwd, setPwd] = useState('');

    const handleEmail = (e) => {
        setEmail(e.target.value);
    }
    const handlePwd = (e) => {
        setPwd(e.target.value);
        if(e.key === 'Enter'){
            handleValid();
        }
    }

    //유효성 검사========================================================
    const handleValid =(e)=>{
        e.preventDefault();
        let ckEmail = email.length > 0 && email.includes('@');
        let ckPwd = pwd.length > 0;

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
        axios.post(`${API}/user-login`, {
                email: email,
                pwd: pwd
            }).then(function(response) {
                console.log(response);
                let isSuccess = response.data.isSuccess;
                let error = response.data.code;
                let msg = response.data.message;
                if(isSuccess){
                    localStorage.setItem('token', response.data.result.token);
                    // alert("로그인 성공");
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
            <Form width="26%" height="536px" margin="0 auto" position="relative" top="140px" minwidth="380px">
                <h1 style={{textAlign:"center", margin:"10px 0"}}>로그인</h1>
                <h4 style={{textAlign:"center", color:"#495057"}}>서비스를 이용하기 위해선 로그인이 필요합니다.</h4>

                <Input name="email" type="email" text="이메일" placeholder="id@gmail.com" margin="30px 5px 5px 5px" width="100%" fieldwidth="97%" fontsize="15px" onChange={handleEmail}/>
                <Input name="pwd" type="password" text="비밀번호" placeholder="*****" margin="5px" width="100%" fieldwidth="97%" fontsize="15px" onChange={handlePwd}/>

                <Button
                 submit
                 width="96%" 
                 height="46px"
                 margin="10px 0"
                 position="relative"
                 left="2%"
                 borderRadius="10px"
                 text="로그인하기" 
                 onClick={handleValid}
                 />
                 <Button
                 width="96%" 
                 height="46px"
                 margin="10px 0"
                 position="relative"
                 left="2%"
                 borderRadius="10px"
                 text="회원가입" 
                 href="/sign_up" 
                 />
                 <Button
                 just
                 width="96%" 
                 height="46px"
                 margin="10px 0"
                 position="relative"
                 left="2%"
                 borderRadius="10px"
                 border="#e6e6e6"
                 hover="#fff"
                 background="#fff"
                 color="#495057"
                 text="카카오계정으로 로그인" 
                 onClick={doKakaoLogin}
                 />
            </Form>
    )
}

export default UserLogin;
