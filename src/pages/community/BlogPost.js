import axios from "axios";
import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {COMMUNITY_API, USER_IDX} from "../../utils/API.js";
import Form from "../../elements/Form.js";
import Button from "../../elements/Button.js";
import Input from "../../elements/Input.js";

//글 작성 페이지
function BlogPost(){
    const navigate = useNavigate();
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleTitle =(e)=>{
        setTitle(e.target.value);
    }
    const handleContent =(e)=>{
        setContent(e.target.value);
    }
    const handleImages = (e) => {
        setImages(e.target.files);
    }
    
    
    //글 작성(POST)==================================================================================
    const postBlog =()=>{
        const formData = new FormData();
        Array.from(images).forEach((image) => formData.append("multipartFileList", image));
        formData.append("title", title);
        formData.append("content", content);

        axios.post(`${COMMUNITY_API}/posting/${USER_IDX}`,formData,
        { headers : {'Content-Type': 'multipart/form-data'}})
        .then(function(response) {
            console.log(response);
            navigate("/community");
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
        let ckTitle = title.length > 0 && title !== '';
        let ckContent = content.length > 0 && content !== '';


        if(ckTitle && ckContent){
            postBlog();
        }else{
            if(!ckTitle){
                alert("제목을 입력해주세요.");
            }else if(!ckContent){
                alert("내용을 입력해주세요.");
            }
        }
    }

    return (
        <Container>
            <Form width="40%" height="auto" margin="0 auto 20px" padding="20px" position="relative" top="85px" display="grid">
                <Input name="title" type="title" text="제목" value={title} margin="0 0 10px 0" fieldwidth="100%" onChange={handleTitle}/>
                <Input name="title" type="title" text="내용" value={content} margin="0 0 10px 0" fieldwidth="100%" rows="20" multiline onChange={handleContent}/>
                <label htmlFor="images">첨부 이미지</label>
                <input id="images" name="image" type="file" multiple="multiple" onChange={handleImages}/>
                <br/>
                <Button 
                    just
                    width="100%" 
                    height="40px"
                    margin="10px 0"
                    borderRadius="10px"
                    text="저장하기"
                    onClick={handleValid}
                />
            </Form>
        </Container>
    );
}

const Container = styled.div`
    
    label{
        font-weight: 600;
        margin-bottom: 10px;
    }
`;

export default BlogPost;