import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { Link,useNavigate } from "react-router-dom";
import {COMMUNITY_API, USER_IDX} from "../../utils/API.js";
import Comment from "../../components/community/Comment.js";
import Postcard from "../../components/community/Postcard.js";

//내가 쓴 글, 내가 쓴 댓글 조회할 수 있는 페이지
function CommunityMypage(){
    const navigate = useNavigate();

    //작성한 글 조회=======================================================================
    const [myPosts, setMyPosts] = useState([]);
    const getMyPosts =async()=>{
        await axios.get(`${COMMUNITY_API}/posting/mypost/${USER_IDX}`)
        .then(function(response) {
            console.log(response.data.postsLists);
            setMyPosts(response.data.postsLists);
        });
    }

    //작성한 댓글 조회=======================================================================
    const [myComments, setMyComments] = useState([]);
    const getMyComments =async()=>{
        await axios.get(`${COMMUNITY_API}/comment/${USER_IDX}`)
        .then(function(response) {
            setMyComments(response.data);
            console.log(response.data);
        });
    }

    //useEffect=============================================================
    useEffect(()=>{
        getMyPosts();
        getMyComments();
    } ,[]);

    return(
        <>
            <MainContainer>
                <div>
                    <h3>내가 작성한 글</h3>
                    <PostContainer>
                        { myPosts ?
                            myPosts.map((p,index)=>{
                                return (
                                    <Postcard
                                        key={index}
                                        id={p.postIdx}
                                        title={p.title}
                                        date={p.createdAt}
                                        content={p.content}
                                    />
                                )
                            })
                        :
                            <p>작성한 게시글이 없습니다.</p>
                        }
                    </PostContainer>
                </div>
                <div>
                    <h3>내가 작성한 댓글</h3>
                    <CommentContainer>
                        {myComments ?
                            Array.from(myComments).map((c,index)=>{
                                return (
                                    <Comment 
                                        key={index}
                                        id={c.commentIdx}
                                        postid={c.postIdx}
                                        date={c.date}
                                        content={c.content}/>
                                )})
                        :
                            <p>작성한 댓글이 없습니다.</p>
                        }
                    </CommentContainer>
                </div>
            </MainContainer>
        </>
    )
}

const MainContainer = styled.div`
    width: 1040px;
    height: 80%;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 20px;
    margin: 60px auto;
    display: grid;
    grid-template-columns: repeat(2,auto);
    column-gap: 20px;

    h3{
        margin-bottom: 10px;
    }
`;

const CommentContainer = styled.div`
    width: 100%;
    height: 93%;
    border: 1px solid #e6e6e6;
    overflow-y: auto;
`;

const PostContainer = styled(CommentContainer)`
    margin-bottom: 20px;
`;

export default CommunityMypage; 