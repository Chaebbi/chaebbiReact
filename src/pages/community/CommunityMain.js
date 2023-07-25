import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import {COMMUNITY_API, USER_IDX} from "../../utils/API.js";
import { useNavigate } from "react-router-dom";
import Button from "../../elements/Button.js";

//전체 글 목록 페이지
function CommunityMain(){
    const navigate = useNavigate();

    //전체 글 조회(GET)=============================================================
    const [count, setCount] = useState([]);
    const [posts, setPosts] = useState([]);
    const getAllPosts = async()=>{
        await axios.get(`${COMMUNITY_API}/posting/allposts/${USER_IDX}`)
        .then(function(response) {
            console.log(response.data);
            setCount(response.data.postCount);
            setPosts(response.data.allPostsLists);
        });
    }



    //useEffect=============================================================
    useEffect(()=>{
        getAllPosts();
    } ,[]);


    return (
        <>  
            <PostsContainer>
                <h3>전체 글 리스트({count})</h3>
                <div style={{display: "flex", gap: "5px"}}>
                    <Button
                        width="150px" 
                        height="30px"
                        margin="10px 0"
                        borderRadius="10px"
                        text="글 작성" 
                        href="/community/posting" 
                    />
                    <Button
                        width="150px" 
                        height="30px"
                        margin="10px 0"
                        borderRadius="10px"
                        text="내가 작성한 글" 
                        href="/community-mypage" 
                    />
                </div>
                <div>
                    {posts.length > 0 ?
                        Array.from(posts).map((c,index)=>{
                            return (
                            <ListCard key={index} onClick={()=>{navigate(`/community/detail/${c.postIdx}`)}}>
                                <div className="flex_container">
                                    <div className="content_1">
                                        <h4>{c.title}</h4>
                                        <div>{c.content}</div>
                                    </div>
                                    <div className="content_2">
                                        <span>{c.nickname}</span>&nbsp;&nbsp;
                                        <span>{c.createdAt}</span>
                                    </div>
                                    <div className="content_3">
                                        <span>좋아요: {c.thumbupCount}</span>&nbsp;&nbsp;
                                        <span>댓글: {c.commentCount}</span>
                                    </div>
                                </div>
                                {c.frstImgUrl !== null ? <img src={c.frstImgUrl}/> : null}
                            </ListCard>
                        )})
                    :
                        <p>작성된 글이 없습니다.</p>      
                    }
                </div>
            </PostsContainer>
        </>
    );
}

const PostsContainer = styled.div`
    width: 50vw;
    height: auto;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;
    color: #363636;
    display: grid;
    position: relative;
    top: 40px;

    h3{
        display: inline-block;
        width: 50%;
        margin-bottom: 16px;
    }
    >div{
        /* overflow-y: scroll; */
        border-bottom: 1px solid #e6e6e6;
    }
`;

const ListCard = styled.div`
    display: grid;
    grid-template-columns: 80% 20%;
    box-sizing: border-box;
    padding: 10px;
    border: 1px solid #e6e6e6;
    border-bottom: 0;
    cursor: pointer;
    transition: all 0.2s;

    &:hover{
        background-color: #eef5f1;
    }

    .content_1 {
        div{ 
            width: 95%;
            height: 50px; 
            margin: 3px 0;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: small;
        }
    }
    .content_2,.content_3 { font-size: 13px; }

    img{
        width: 100%;
        height: 100%;
        border: 0;
    }
`;

export default CommunityMain;