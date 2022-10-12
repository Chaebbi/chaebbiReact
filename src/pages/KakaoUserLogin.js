import styled from "styled-components";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

//카카오 로그인 페이지
function KakaoUserLogin(){
    const location = useLocation();
    const navigate = useNavigate();
    const KAKAO_CODE = location.search.split('=')[1];

    //분리하고 GITIGNORE에 추가할것*****************************
    const REST_API_KEY = 'de34834910d5d355823cd6cceaeb1678';
    const REDIRECT_URI = 'http://localhost:3000/kakao_login';
    //*********************************************************

    //카카오 액세스토큰 받아오기
    const getToken =()=>{
        fetch(`https://kauth.kakao.com/oauth/token`,{
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' },
            body: `grant_type=authorization_code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&code=${KAKAO_CODE}`,
        })
        .then(res => res.json())
        .then(data =>{
            if(data.access_token){
                sendKakaoToken(data.access_token);
            }else{
                navigate('/');
            }
        });
    };

    //카카오 액세스토큰 받아오기
    const sendKakaoToken=(at)=>{
        axios.post(`https://spring.chaebbiserver.shop/api/login`,{
            accessToken: at
        },
        ).then(function(response) {
            console.log(response.data);
            localStorage.setItem('token', response.data.result.token);
            if(response.data.result.signup == true){
                navigate('/on_board');
            }else{
                navigate('/');
            }
            
            
        }).catch(function(error) {
            console.log(error);
        });
    }


    useEffect(()=>{
        if(!location.search) return;
        getToken();
    },[]);

    return(
        <>
            <h1>카카오계정으로 로그인중입니다</h1>
        </>
        )
    }


export default KakaoUserLogin;