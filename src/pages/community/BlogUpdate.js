import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import {COMMUNITY_API, USER_IDX} from "../../utils/API.js";
import Form from "../../elements/Form.js";
import Button from "../../elements/Button.js";
import Input from "../../elements/Input.js";

function BlogUpdate(){
    const {postIdx} = useParams();
    const navigate = useNavigate();
    
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [imageslist, setImagesList] = useState([]);
    const getPost =async()=>{
        await axios.get(`${COMMUNITY_API}/posting/post/${USER_IDX}/${postIdx}`)
        .then(function(response) {
            console.log(response.data);
            setTitle(response.data.title);
            setContent(response.data.content);
            setImagesList(response.data.imagesLists);
        }).catch(function(error) {
            console.log(error.data);
        });
    }

    const handleTitle =(e)=>{
        setTitle(e.target.value);
    }

    const handleContent =(e)=>{
        setContent(e.target.value);
    }

    const [image, setImage] = useState(null);
    const handleImage =(e)=>{
        setImage(e.target.files[0]);
    };

    //이미지 삭제(DELETE)===============================================================
    const deleteImage =(imageIdx)=>{
        axios.delete(`${COMMUNITY_API}/images/${USER_IDX}/${imageIdx}`)
        .then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }
    //이미지 추가(POST)===============================================================
    const postImage =(imageIdx)=>{
        const formData = new FormData();
        formData.append("multipartFileList", image);
        formData.append("imgRank");

        axios.delete(`${COMMUNITY_API}/images/${USER_IDX}/${imageIdx}`,formData,
        { headers : {'Content-Type': 'multipart/form-data'}}
        ).then(function(response) {
            console.log(response.data);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //게시글 수정하기(POST)===============================================================
    const updatePost =()=>{
        axios.post(`${COMMUNITY_API}/posting/update/${USER_IDX}/${postIdx}`,{
            title: title,
            content: content
        }).then(function(response) {
            console.log(response.data);
            navigate(`/community/detail/${postIdx}`);
        }).catch(function(error) {
            console.log(error);
        });
    }

    //유효성 검사========================================================
    const handleValid =()=>{
        let ckTitle = title.length > 0 && title !== '';
        let ckContent = content.length > 0 && content !== '';


        if(ckTitle && ckContent){
            updatePost();
        }else{
            if(!ckTitle){
                alert("제목을 입력해주세요.");
            }else if(!ckContent){
                alert("내용을 입력해주세요.");
            }
        }
    }

    //useEffect===============================================================
    useEffect(()=>{
        getPost();
    },[]);

    return(
        <Container>
            <h2>
                <AiOutlineArrowLeft onClick={()=>{navigate(`/community/detail/${postIdx}`)}}/>&nbsp;&nbsp;
                {postIdx}번 게시글 수정페이지(진행중)
            </h2>
            <Form width="100%" height="auto" padding="20px" display="grid">
                <Input name="title" type="title" text="제목" value={title} margin="0 0 10px 0" fieldwidth="100%" onChange={handleTitle}/>
                <Input name="title" type="title" text="내용" value={content} margin="0 0 10px 0" fieldwidth="100%" rows="20" multiline onChange={handleContent}/>
                <Attachments>
                    <h4>첨부 이미지</h4>
                    <ul>
                    { imageslist ?
                            imageslist.map((i,index)=>{
                                return (
                                    <ListItem key={index} onClick={deleteImage}>
                                        {i.imgRank}:{i.imageUrl}
                                    </ListItem>
                                )
                            })
                        :
                            <input id="images" name="image" type="file" multiple="multiple" onChange={handleImage}/>
                        }
                    </ul>
                </Attachments>
                <Button 
                    just
                    width="100%" 
                    height="40px"
                    margin="10px 0"
                    borderRadius="10px"
                    text="수정하기"
                    onClick={handleValid}
                    />
            </Form>
        </Container>
    )
}

const Container = styled.div`
    width: 40%;
    margin: 0 auto;
    position: relative;
    top: 50px;

    h2{
        margin-bottom: 10px;
    }

    label{
        font-weight: 600;
    }
    textarea{
        margin-bottom: 10px;
        outline: none;
    }
`;

const Attachments = styled.div`
    border-top: 1px solid #e6e6e6;
    padding: 10px 0;

    h4{
        margin-bottom: 10px;
    }
`;

const ListItem = styled.li`
    list-style-type: none;
`;

export default BlogUpdate;