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
        nickname: '',
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

    //닉네임 중복체크(POST)==================================================================
    const [isDuplNickname, setIsDuplNickname] = useState(false);
    const [tmp, setTmp] = useState('');
    const checkDuplicateNickname =()=>{
        axios.post("https://spring.chaebbiserver.shop/api/user-nickname",
            {
                nickname: userinfo.nickname,
            },
            ).then(function(response) {
                console.log(response.data);
                if(response.data.result.exist === true){
                    alert("이미 존재하는 닉네임입니다.(Duplicate)");
                    setIsDuplNickname(false);
                    setTmp(userinfo.nickname);
                }else{
                    alert("사용 가능한 닉네임입니다.(Not Duplicate)");
                    setIsDuplNickname(true);
                    setTmp(userinfo.nickname);
                }
              }).catch(function(error) {
                console.log(error);
              });
    }

    const handleCheckDuplicateNK =(event)=>{
        event.preventDefault();
        if(userinfo.nickname.length > 0){
            checkDuplicateNickname();
        }else{
            alert("닉네임이 입력되지 않았거나 올바르지 않습니다.");
        }
    }


    const signUp =()=>{
        axios.post("https://spring.chaebbiserver.shop/api/signup", {
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
    const handleValid =(e)=>{
        e.preventDefault();
        let ckName = userinfo.name.length > 0 && userinfo.name.length < 45;
        let ckDuplNickname = isDuplNickname === true;
        let ckNickname = userinfo.nickname.length > 0;
        let ckGender = userinfo.gender !== '';
        let ckAge = userinfo.age > 0 && userinfo.age !== '';
        let ckHeight = userinfo.height > 0 && userinfo.height !== '';
        let ckWeight = userinfo.weight > 0 && userinfo.weight !== '';
        let ckActivity = userinfo.activity !== '';

        if(ckName && ckNickname && ckDuplNickname && ckGender && ckAge && ckHeight && ckWeight && ckActivity){
            signUp();
        }else{
            if(!ckName){
                alert("이름을 올바르게 입력해주세요.");
            }else if(!ckNickname){
                setIsDuplNickname(false); //닉네임 중복체크 해놓고 닉네임을 지우는 경우의 문제 방지
                alert("닉네임을 입력해주세요.");
            }else if(!ckDuplNickname){
                alert("닉네임 중복체크를 해주세요.");
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
        <Form width="40%" height="560px" minwidth="500px" margin="0 auto" position="relative" top="70px">
                <h1 style={{textAlign:"center", margin:"20px 0 20px 0"}}>프로필 신규 등록</h1>
                {/* 각 항목별 오류메세지는 라벨 옆에 띄우고 border: 1px solid red로 변경 시키면 될 것 같음 */}
    
                <Grid col="2" row="2" margin="0">
                    <Input name="name" type="text" text="이름" placeholder="홍길동" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="age" type="text" text="나이" placeholder="00" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="height" type="number" text="신장(cm)" placeholder="cm" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                    <Input name="weight" type="number" text="몸무게(kg)" placeholder="kg" margin="5px" fieldwidth="95%" onChange={changeContent}/>
                </Grid>

                <GridContainer>
                        <Input name="nickname" type="text" text="닉네임" placeholder="닉네임" margin="0px 5px 5px 5px" onChange={changeContent}/>
                        <Button
                            submit
                            width="93%" 
                            height="44px"
                            position="relative"
                            top="30px"
                            left="5%"
                            borderRadius="10px"
                            text="중복확인" 
                            onClick={handleCheckDuplicateNK}/>
                </GridContainer>
                
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

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 70% 30%;
    margin: 10px 0;
`;

export default OnBoard;