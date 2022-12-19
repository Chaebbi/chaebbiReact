import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Comment(props){
    const { id, postid, width, fontSize, onClick,
            nickname, date, content,
    } = props;
    const navigate = useNavigate();

    if(postid){
        return(
            <MyCommentContainer id={id} width={width} onClick={()=>{navigate(`/community/detail/${postid}`)}}>
                <p>{date}</p>
                <Content fontSize={fontSize}>
                    {content.length > 60 ? `${content.slice(0,60)} ...`: content}
                </Content>
            </MyCommentContainer>
        )}

    return(
        <CommentContainer id={id} width={width}>
            <div>
                <h4>{nickname}</h4>
                <span onClick={onClick}>[삭제]</span>
            </div>
            <p>{date}</p>
            <Content fontSize={fontSize}>
                {content}
            </Content>
        </CommentContainer>
    )
}

Comment.defaultProps = {
    width: "100%",
    fontSize: "14px",
    onClick: () => {},
}

const CommentContainer = styled.div`
    width: ${(props)=>props.width};
    height: auto;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;

    h4{
        display: inline;
    }

    span{
        float: right;
        color: #777;
        font-size: small;
    }

    div:first-child{
        margin-bottom: 5px;
    }

    >p{
        color: #777;
        font-size: small;
        margin-bottom: 5px;
    }
`;

const MyCommentContainer = styled(CommentContainer)`
    &:hover{
        background-color: #eef5f1;
        transition: all 0.2s;
    }
`;

const Content = styled.div`
    width: 100%;
    height: auto;
    font-size: ${(props)=>props.fontSize};
`;

export default Comment;