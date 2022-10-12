import styled from "styled-components";
import Button from "../elements/Button";
import Grid from "../elements/Grid";
import Image from "../elements/Image";
import Input from "../elements/Input";
import Radio from "../elements/Radio";
import {useState, useEffect} from 'react';
import axios from "axios";
import Text from "../elements/Text";
import { MdModeEdit } from "react-icons/md";
import { VscSaveAs } from "react-icons/vsc";

//프로필 컴포넌트
function Profile(){
    const [profile, setProfile] = useState({ //서버에서 불러온 유저정보를 각 필드에 저장
        name: '',
        age: '',
        weight: '',
        height: '',
        activity: '',
        gender: '',
    });

    const [actlabel, setActlabel] = useState('');
    const showActlabel =(p)=>{
        if(p === 25){
            setActlabel("1단계");
        }else if(p === 33){
            setActlabel("2단계");
        }else if(p === 40){
            setActlabel("3단계");
        }
    }

    //유저정보 불러오기(GET)========================================================
    const getProfile = async() => {
        const response = await axios.get("https://spring.chaebbiserver.shop/api/userinfo",
            { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        );
        setProfile({
                name: response.data.result.name,
                age: response.data.result.age,
                weight: response.data.result.weight,
                height: response.data.result.height,
                activity: response.data.result.activity,
                gender: response.data.result.gender
        });
        showActlabel(response.data.result.activity);
        console.log(response.data.result);
    }

    //유저정보 수정하기(PUT)========================================================
    const saveAll =(e)=>{
        // e.preventDefault();
        axios.put("https://spring.chaebbiserver.shop/api/userupdate",{
            age: profile.age,
            height: profile.height,
            weight: profile.weight,
            activity: profile.activity,
        },
        { headers : { Authorization: `Bearer ${localStorage.getItem('token')}`}}
        ).then(function(response) {
            console.log(response.data);
            alert("정상적으로 수정되었습니다.");
            window.location.reload();
        }).catch(function(error) {
            console.log(error);
        });
    };

    //수정 토글======================================================
    const [editmode, setEditmode] = useState(false);
    const changeEditmode = () => {
		setEditmode(!editmode);
	};

    //값 변경========================================================
    const changeContent = (event) => {
		setProfile({...profile,[event.target.name]: event.target.value});
	};

    const changeContentInt = (event) => {
		setProfile({...profile,[event.target.name]: Number(event.target.value)});
	};

    //유효성 검사========================================================
    const handleValid =()=>{
        let ckAge = profile.age> 1;
        let ckHeight = profile.height> 0;
        let ckWeight = profile.weight> 0;

        if(ckAge && ckHeight && ckWeight){
            saveAll();
        }else{
            if(!ckAge){
                alert("나이를 올바르게 입력해주세요.");
            }else if(!ckHeight){
                alert("신장(cm)을 올바르게 입력해주세요.");
            }else if(!ckWeight){
                alert("몸무게(kg)를 올바르게 입력해주세요.");
            }
        }
    }
    
    //useEffect====================================================
    useEffect(()=>{
        getProfile();
    },[actlabel]);

    return(
        <ProfileContainer>
            <Image 
                src="blank-profile.png"
                width="120px" 
                height="120px" 
                borderRadius="100%"
                display="inline-block"
                position="relative"
                top="15px"
                left="30px"
            />
         {editmode ?
            (  <> 
            {/* 수정모드 */}
                <Grid col="2" row="2" width="64%" position="relative" top="-120px" left="30%">
                    <Text label="이름" text={profile.name} margin="0 0 20px 0"/>
                    <Text label="성별" text={profile.gender == 1 ? "여자" : "남자"} margin="0 0 20px 0"/>
                    <Input name="age" type="number" text="나이" placeholder="10" margin="5px" fieldwidth="95%" value={profile.age} onChange={changeContentInt}/>
                    <Input name="height" type="number" text="신장(cm)" placeholder="cm" margin="5px" fieldwidth="95%" value={profile.height} onChange={changeContent}/>
                    <Input name="weight" type="number" text="몸무게(kg)" placeholder="kg" margin="5px" fieldwidth="95%" value={profile.weight} onChange={changeContent} />
                    <RadioBox>
                    <Legend>활동점수</Legend>
                        <div>
                            <input id="1" value="25" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==25}/>1단계
                            <input id="2" value="33" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==33}/>2단계<br/>
                            <input id="3" value="40" name="activity" type="radio" onChange={changeContentInt} checked={profile.activity==40}/>3단계
                        </div>
                    </RadioBox>
                </Grid>
                    
                
                <div style={{width: "60%", position: "relative", top:"-245px"}}>
                    {/* <Input name="image" type="file" text="프로필이미지" margin="5px" fieldwidth="95%"/> */}
                </div>
                
                <Icon onClick={handleValid} style={{top:"-150px"}}>
                    <VscSaveAs size="25" color="#868e96"/>
                </Icon>
            </>
        )
        :
        (
            <>
            {/* 수정모드 아님 */}
                <Grid col="2" row="2" width="64%" position="relative" top="-120px" left="30%">
                    <Text label="이름" text={profile.name} margin="0 0 20px 0"/>
                    <Text label="성별" text={profile.gender == 1 ? "여자" : "남자"} margin="0 0 20px 0"/>
                    <Input name="age" type="number" text="나이" placeholder="10" margin="5px" fieldwidth="95%" value={profile.age} disabled/>
                    <Input name="height" type="number" text="신장(cm)" placeholder="cm" margin="5px" fieldwidth="95%" value={profile.height} disabled/>
                    <Input name="weight" type="number" text="몸무게(kg)" placeholder="kg" margin="5px" fieldwidth="95%" value={profile.weight} disabled/>
                    <Text label="활동점수" text={actlabel} position="relative" top="-0px"/>
                </Grid>

                <Icon onClick={changeEditmode}>
                    <MdModeEdit size="25" color="#868e96"/>
                </Icon>
                
            </>
        )
    }
        </ProfileContainer>
    )
}

const ProfileContainer = styled.div`
    width : 42%;
    min-width: 550px;
    height: 310px;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
`;

const RadioBox = styled.div`
    margin-left: 12px;
    margin-bottom: 20px;
    margin-top: 4px;
`;

const Legend = styled.legend`
    font-weight: 700;
    font-size: 15px;
    margin-bottom: 6px;
`;

const Icon = styled.span`
    position: relative;
    top: -150px;
    left: 96%;
`;
export default Profile;