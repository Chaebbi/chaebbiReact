import { useNavigate } from "react-router-dom";
import styled from "styled-components";

function Postcard(props){
    const { id, width, fontSize,
            nickname, date, title, content,
    } = props;
    const navigate = useNavigate();

    if(nickname){
        return(
            <PostContainer id={id} width={width} onClick={()=>{navigate(`/community/detail/${id}`)}}>
                <h4>{title}</h4>
                <p>{nickname}</p>
                <p>{date}</p>
                <Content fontSize={fontSize}>
                    {content.length > 33 ? `${content.slice(0,33)} ...`: content}
                </Content>
            </PostContainer>
        )}

    return(
        <MyPostContainer id={id} width={width} onClick={()=>{navigate(`/community/detail/${id}`)}}>
            <h4>{title}</h4>
            <p>{date}</p>
            <Content fontSize={fontSize}>
                {content}
            </Content>
        </MyPostContainer>
    )
}

Postcard.defaultProps = {
    width: "100%",
    fontSize: "14px",
    // onClick: () => {},
}

const PostContainer = styled.div`
    width: ${(props)=>props.width};
    height: auto;
    border: 1px solid #e6e6e6;
    box-sizing: border-box;
    padding: 10px;
    cursor: pointer;

    h4{
        display: inline;
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

const MyPostContainer = styled(PostContainer)`
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

export default Postcard;