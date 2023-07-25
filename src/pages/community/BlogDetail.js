import axios from "axios";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {COMMUNITY_API, USER_IDX} from "../../utils/API.js";
import { AiOutlineArrowLeft,AiOutlineComment } from "react-icons/ai";
import { BsCardImage } from "react-icons/bs";
import Comment from "../../components/community/Comment.js";
import Thumb from "../../components/community/Thumb.js";
import Image from "../../elements/Image.js";
import Button from "../../elements/Button.js";

//글 상세 페이지
function BlogDetail(){
    const {postIdx} = useParams();
    const navigate = useNavigate();

    //글 조회(GET)=============================================================
    const [useridx, setUseridx] = useState('');
    const [detail, setDetail] = useState({
        title: '',
        content: '',
        nickname: '',
        createdAt: '',
        imagesCount: 0,
        imagesLists: [],
        thumbupCount: 0,
        commentCount: 0,
    });
    const [comments, setComments] = useState([]);
    const getBlogDetail =async()=>{
        await axios.get(`${COMMUNITY_API}/posting/post/${USER_IDX}/${postIdx}`)
        .then(function(response) {
            console.log(response.data);
            setDetail(response.data);
            setUseridx(response.data.userIdx);
            setComments(response.data.commentsLists);
        }).catch(function(error) {
            let code = error.response.data.code;
            if(code == 1102){
                alert("존재하지 않는 게시글입니다.");
                navigate("/community");
            }
        });
    }
    var imagesArr = detail.imagesLists;
    let filteredUrlArr = [];
    let filteredRankArr = [];
    if(imagesArr){
        filteredUrlArr = imagesArr.map(p=>{return p.imageUrl});
        filteredRankArr = imagesArr.map(p=>{return p.imageRank});
    }

    //글 삭제(DELETE)=============================================================
    const deletePost =()=>{
        axios.delete(`${COMMUNITY_API}/posting/${USER_IDX}/${postIdx}`)
        .then(function(response) {
            console.log(response.data);
            alert('게시글이 삭제되었습니다.');
            navigate('/community');
        }).catch(function(error) {
            console.log(error);
        });
    };

    //글 수정(수정 페이지로 이동시켜서 수정 진행)=================================
    const updatePost =(postid)=>{
        navigate(`/community/detail/${postid}/edit`);
    }

    //댓글 작성(POST)=============================================================
    const [content, setContent] = useState('');
    const writeComment =(e)=>{
        setContent(e.target.value);
    }
    const postComment =()=>{
        axios.post(`${COMMUNITY_API}/comment/${USER_IDX}`,{
            postIdx: postIdx,
            content: content
        }).then(function(response) {
            console.log(response.data);
            setContent('');
            getBlogDetail(); //댓글 저장 후 다시 posting의 상세정보를 불러온다(comments 관련 데이터가 여기 있기 때문에~)
        }).catch(function(error) {
            console.log(error);
        });
    };

    //댓글 삭제(DELETE)=============================================================
    const deleteComment =(cid)=>{
        axios.delete(`${COMMUNITY_API}/comment/${USER_IDX}`,{
            data:{
                commentIdx: cid
            }
        })
        .then(function(response) {
            console.log(response.data);
            alert('댓글이 삭제되었습니다.');
            getBlogDetail();
        }).catch(function(error) {
            console.log(error);
        });
    };


    //좋아요 관리(POST,DELETE)==========================================================
    const [like, setLike] = useState(false);
    //좋아요 등록(POST)
    const postLike =()=>{
        axios.post(`${COMMUNITY_API}/thumbup/${USER_IDX}`,{
            postIdx: postIdx
        }).then(function(response) {
            console.log(response.data);
            setLike(!like);
            
        }).catch(function(error) {
            console.log(error);
        });
    }
    //좋아요 취소(DELETE)
    const deleteLike =()=>{
        axios.delete(`${COMMUNITY_API}/thumbup/${USER_IDX}`,{
            data:{
                    postIdx: postIdx
                },
        }).then(function(response) {
            console.log(response.data);
            setLike(!like);
        }).catch(function(error) {
            console.log(error);
        });
    }
    //좋아요 토글(like값에 따라 좋아요 등록,취소 수행)
    const toggleLike = async(like) => {
        if(like === false){
            postLike();
        }else{
            deleteLike();
        }
    }
    //좋아요 여부 조회(useEffect)
    const getLike =async()=>{
        await axios.get(`${COMMUNITY_API}/thumbup/${USER_IDX}/${postIdx}`)
        .then(function(response) {
            console.log(response.data);
            if(response.data.isThumbup){
                setLike(true);
            }
        });
    }


    //useEffect=============================================================
    useEffect(()=>{
        getBlogDetail();
        getLike();
        console.log(`${postIdx}`);
      } ,[like]);


    return (
        <>
        {/* 게시글 컨테이너 ======================================================= */}
        <DetailContainer>
            <h2>{detail.title}</h2>
            <p className="created_date">{detail.createdAt}</p>
            <span>{detail.nickname}</span>
            <div className="content-part">
                {detail.content.split('\n').map((t)=>{
                    return (
                        <span>
                            {t}<br/>
                        </span>
                    )
                })}
            </div>

            <ImageContainer>
                {detail.imagesLists == null ?
                    null
                :
                    filteredUrlArr.map((i, index)=>{
                        return (
                            <Image
                                key={index}
                                src={i}
                                width="100%" 
                                height="150px" 
                                borderRadius="1px"
                                display="inline-block"
                            />
                        )
                    })
                }
            </ImageContainer>

            <ExtraInfo>
                <div className="infos">
                    <span><BsCardImage color="#398234"/>  {detail.imagesCount}</span>
                    <span><Thumb like={like} onClick={()=>{toggleLike(like)}}/>  {detail.thumbupCount}</span>
                    <span><AiOutlineComment color="#398234" size="18" className="comment"/> {detail.commentCount}</span>
                </div>
                {useridx == `${USER_IDX}` ? 
                    <div className="btns">
                        <button type="button" onClick={()=>{updatePost(`${postIdx}`)}}>[수정]</button>
                        <button type="button" onClick={deletePost}>[삭제]</button>
                    </div>
                :
                    null
                }
            </ExtraInfo>

        </DetailContainer>

        {/* 댓글 컨테이너 ======================================================= */}
        <CommentContainer>
            <h4>댓글</h4>
            {/* <p>{localStorage.getItem('nickname')}</p> */}
            <textarea name="content" rows="5" value={content} onChange={writeComment}></textarea>
            <Button 
                just
                width="100%" 
                height="40px"
                margin="5px 0 10px 0"
                borderRadius="10px"
                text="등록"
                onClick={postComment}
            />
            {comments !== null || undefined ? 
                <CommentList>
                    {comments ?
                        Array.from(comments).map((c,index)=>{
                            return (
                                <Comment 
                                    key={index}
                                    id={c.commentIdx}
                                    nickname={c.nickname}
                                    date={c.date}
                                    content={c.content}
                                    onClick={()=>{deleteComment(`${c.commentIdx}`)}}/>
                            )})
                    :
                        <p>작성한 댓글이 없습니다.</p>
                    }
                </CommentList>
            :
                <p>댓글이 아직 없습니다.</p>      
            }
        </CommentContainer>
        </>
    );
}

const DetailContainer = styled.div`
    width: 800px;
    box-sizing: border-box;
    padding: 20px;
    margin: 20px auto;
    border: 1px solid #e6e6e6;

    h2{
        margin-bottom: 5px;
    }

    .created_date{
        color: #777;
        font-size: 14px;
        margin-bottom: 5px;
    }

    .content-part{
        border-top: 1px solid #e6e6e6;
        margin: 10px 0;
        box-sizing: border-box;
        padding: 20px 0;
    }
`;

const ImageContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, auto);
    column-gap: 5px;
    margin-bottom: 10px;
`;

const ExtraInfo = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;

    .infos{
        display: flex;
        gap: 10px;
    }
    .comment { 
        position: relative; 
        top: 1px; 
    }
    button{
        border: 0;
        background-color: #fff;
        margin-right: 5px;
        cursor: pointer;
    }
`;

const CommentContainer = styled.div`
    width: 800px;
    box-sizing: border-box;
    padding: 20px;
    margin: 0 auto;

    h4{
        margin-bottom: 10px;
    }
    
    textarea{
        width: 100%;
        outline: 0;
        border: 1px solid #777;

        &:focus{
            border: 1px solid #398234;
        }
    }
    button{
        display: inline-block;
        width: 10%;
        height: auto;
    }
`;

const CommentList = styled.div`
    height: auto;
`;

export default BlogDetail;