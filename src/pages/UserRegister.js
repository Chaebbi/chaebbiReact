import styled from "styled-components";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Form from "../elements/Form";
import Grid from "../elements/Grid";
import Radio from "../elements/Radio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//유저 회원가입
function UserRegister(){
    const navigate = useNavigate();
    const [userinfo,setUserinfo] = useState({
        email: '',
        pwd: '',
        name: '',
        gender: '',
        age: '',
        height: '',
        weight: '',
        activity: ''
    });

    const gender = [
        {id: 1, name:"gender", value:0, label:"남자"},
        {id: 2, name:"gender", value:1, label:"여자"},
    ]
    const activity = [
        {id: 3, name:"activity", value:25, label:"1단계"},
        {id: 4, name:"activity", value:33, label:"2단계"},
        {id: 5, name:"activity", value:40, label:"3단계"},
    ]

    //Input값 인식 이벤트 핸들러=======================================================
    const changeContent = (event) => {
		setUserinfo({...userinfo,[event.target.name]: event.target.value});
	};

    //중복체크(POST)==================================================================
    const [isDupl, setIsDupl] = useState(false);
    const checkDuplicate =()=>{
        axios.post("https://spring.chaebbiserver.shop/api/email-check",
            {
                email: userinfo.email,
            },
            ).then(function(response) {
                if(response.data.result.isPresent == "duplicate email"){
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

    const handleCheckDuplicate =()=>{
        if(userinfo.email.includes('@') && userinfo.email.includes('.')){
            checkDuplicate();
        }else{
            alert("이메일이 입력되지 않았거나 올바르지 않습니다.");
        }
    }

    const registerUser =()=>{
        axios.post("https://spring.chaebbiserver.shop/api/create-user", {
                email: userinfo.email,
                pwd: userinfo.pwd,
                name: userinfo.name,
                gender: Number(userinfo.gender),
                age: Number(userinfo.age),
                height: userinfo.height,
                weight: userinfo.weight,
                activity: Number(userinfo.activity)
            }).then(function(response) {
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
    const handleValid =(e)=>{
        e.preventDefault();
        let ckDupl = isDupl === true;
        let ckEmail = userinfo.email.length > 0 && userinfo.email.includes('@') && userinfo.email.includes('.');
        let ckPwd = userinfo.pwd.length > 4 && userinfo.pwd.length < 20;
        let ckName = userinfo.name.length > 0 && userinfo.name.length < 45;
        let ckGender = userinfo.gender !== '';
        let ckAge = userinfo.age > 0 && userinfo.age !== '';
        let ckHeight = userinfo.height > 0 && userinfo.height !== '';
        let ckWeight = userinfo.weight > 0 && userinfo.weight !== '';
        let ckActivity = userinfo.activity !== '';

        if(ckEmail && ckDupl && ckPwd && ckName && ckGender && ckAge && ckHeight && ckWeight && ckActivity){
            registerUser();
        }else{
            if(!ckEmail){
                alert("이메일을 입력해주세요.");
            }else if(!ckDupl){
                alert("중복체크를 해주세요.");
            }else if(!ckPwd){
                alert("비밀번호를 올바른 형식으로 입력해주세요.");
            }else if(!ckName){
                alert("이름을 올바르게 입력해주세요.");
            }else if(!ckAge){
                alert("나이를 올바르게 입력해주세요.");
            }else if(!ckHeight){
                alert("신장(cm)을 올바르게 입력해주세요.");
            }else if(!ckWeight){
                alert("몸무게(kg)를 올바르게 입력해주세요.");
            }else if(!ckGender){
                alert("성별을 입력해주세요.");
            }else if(!ckActivity){
                alert("활동점수를 입력해주세요.");
            }
        }
    }

    return(
        <Form width="40%" height="730px" minwidth="500px" margin="0 auto" position="relative" top="50px">
                <h1 style={{textAlign:"center", margin:"20px 0 20px 0"}}>회원가입</h1>
                {/* 각 항목별 오류메세지는 라벨 옆에 띄우고 border: 1px solid red로 변경 시키면 될 것 같음 */}
                <Grid col="2" row="1" margin="0">
                    <Input name="email" type="email" text="이메일" placeholder="id@gmail.com" margin="30px 5px 5px 5px" onChange={changeContent}/>
                    <Button
                        submit
                        width="45%" 
                        height="44px"
                        position="relative"
                        top="60px"
                        left="5%"
                        borderRadius="10px"
                        text="중복확인" 
                        onClick={handleCheckDuplicate}
                    />
                </Grid>
                <Input name="pwd" type="password" text="비밀번호" placeholder="5자 이상 20자 미만" margin="5px" minlength="5" maxlength="20" onChange={changeContent}/>
    
                <Grid col="2" row="2" margin="0">
                    <Input name="name" type="text" text="이름" placeholder="홍길동" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="age" type="text" text="나이" placeholder="00" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="height" type="number" text="신장(cm)" placeholder="cm" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="weight" type="number" text="몸무게(kg)" placeholder="kg" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                </Grid>
                
                <RadioBox>
                    <Legend>성별</Legend>
                        {Array.from(gender).map(g => (
                            <Radio
                                key={g.id} 
                                id={g.id}
                                name={g.name}
                                value={g.value}
                                label={g.label}
                                text={g.label}
                                onClick={changeContent}
                            />
                        ))}
                </RadioBox>

                <RadioBox>
                    <Legend>활동점수</Legend>
                        {Array.from(activity).map(ac => (
                            <Radio
                                key={ac.id} 
                                id={ac.id}
                                name={ac.name}
                                value={ac.value}
                                label={ac.label}
                                text={ac.label}
                                onClick={changeContent}
                            />
                        ))}
                </RadioBox>

                <Button
                    submit
                    width="96%" 
                    height="46px"
                    margin="10px 0"
                    position="relative"
                    left="2%"
                    borderRadius="10px"
                    text="가입하기"
                    onClick={handleValid}
                />
        </Form>
    )
}

const RadioBox = styled.div`
    margin-left: 10px;
    margin-bottom: 20px;
`;

const Legend = styled.legend`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
`;

export default UserRegister;