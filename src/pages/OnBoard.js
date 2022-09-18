import styled from "styled-components";
import Button from "../elements/Button";
import Input from "../elements/Input";
import Form from "../elements/Form";
import Grid from "../elements/Grid";
import Radio from "../elements/Radio";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

//온보드 페이지
function OnBoard(){
    const navigate = useNavigate();
    const [userinfo,setUserinfo] = useState({
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


    const signUp =()=>{
        axios.post("https://spring.chaebbiserver.shop/api/signup", {
                name: userinfo.name,
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
    const handleValid =(e)=>{
        e.preventDefault();
        let ckName = userinfo.name.length > 0 && userinfo.name.length < 45;
        let ckGender = userinfo.gender !== '';
        let ckAge = userinfo.age > 0 && userinfo.age !== '';
        let ckHeight = userinfo.height > 0 && userinfo.height !== '';
        let ckWeight = userinfo.weight > 0 && userinfo.weight !== '';
        let ckActivity = userinfo.activity !== '';

        if(ckName && ckGender && ckAge && ckHeight && ckWeight && ckActivity){
            signUp();
        }else{
            if(!ckName){
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
        <Form width="40%" height="500px" minwidth="500px" margin="0 auto" position="relative" top="70px">
                <h1 style={{textAlign:"center", margin:"20px 0 20px 0"}}>프로필 신규 등록</h1>
                {/* 각 항목별 오류메세지는 라벨 옆에 띄우고 border: 1px solid red로 변경 시키면 될 것 같음 */}
    
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
                    text="등록하기" 
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

export default OnBoard;