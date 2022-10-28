import styled from "styled-components";
import { IoIosStarOutline,IoIosStar,IoIosCall } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';
import { MdOutlineZoomOutMap } from "react-icons/md";

function Card(props){
    const { 
        id,
        width, 
        height, 
        margin, 
        fontsize,
        catesize,
        title,
        category,
        call,
        newaddress,
        address,
        menu,
        url,
        del,
        lists,
        isBookmark,
        onClick } = props;

    

    //음식점 검색 리스트 카드===========================================
    if(lists){ 
        return(
            <CardContainer lists id={id} width={width} height={height} margin={margin} >
                <CategoryContainer>
                    <div>
                        <Category catesize={catesize}>{category}</Category>
                        { isBookmark == 0 ?
                            <Icon onClick={onClick}>
                                <IoIosStarOutline size="23" color="#868e96"/>
                            </Icon>
                        :    
                            <Icon onClick={onClick}>
                                <IoIosStar size="23" color="#868e96"/>
                            </Icon>
                        }
                    </div>
                    <Title>
                        <a href={`${url}`} target="_blank">
                            {title.length> 22 ? `${title.slice(0,22)} ..`: title}
                        </a>
                    </Title>
                </CategoryContainer>
                {menu ? <P fontsize={fontsize}>{menu.length> 30 ? `${menu.slice(0,30)} ..`: menu}</P> : null}
                <P fontsize={fontsize}><MdOutlineZoomOutMap/>&nbsp;&nbsp; {newaddress}</P>
                <P fontsize={fontsize}><MdOutlineZoomOutMap/>&nbsp;&nbsp; {address}</P>
                <P fontsize={fontsize}><IoIosCall/>&nbsp;&nbsp; {call}</P>
                
            </CardContainer>
        )
    }


    //북마크 DELETE 카드===========================================
    if(del){ 
        return(
            <CardContainer del id={id} width={width} height={height} margin={margin} >
                <CategoryContainer>
                    {/* <Category catesize={catesize}>{category}</Category> */}
                    <Icon onClick={onClick}>
                        <IoCloseOutline size="22" color="#868e96"/> 
                    </Icon>
                    <Title>
                        <a href={`${url}`} target="_blank">
                            {title.length> 22 ? `${title.slice(0,22)} ..`: title}
                        </a>
                    </Title>
                </CategoryContainer>


                <P fontsize={fontsize}><MdOutlineZoomOutMap/>&nbsp;&nbsp; {newaddress}</P>
                <P fontsize={fontsize}><MdOutlineZoomOutMap/>&nbsp;&nbsp; {address}</P>
                <P fontsize={fontsize}><IoIosCall/>&nbsp;&nbsp; {call}</P>
                
            </CardContainer>
        )
    }
    //북마크 POST 카드===========================================
    return(
        <CardContainer id={id} width={width} height={height} margin={margin} >
            <CategoryContainer>
                <div>
                    <Category catesize={catesize}>{category}</Category>
                    { isBookmark == 0 ?
                        <Icon onClick={onClick}>
                            <IoIosStarOutline size="23" color="#868e96"/>
                            {/* 클릭시 <IoIosStar size="23" color="#868e96"/>로 변경*/}
                        </Icon>
                    :    
                        <Icon onClick={onClick}>
                            <IoIosStar size="23" color="#868e96"/>
                        </Icon>
                    }
                </div>
                <Title>
                    {title.length> 10 ? `${title.slice(0,10)} ..`: title}
                </Title>
            </CategoryContainer>
            <P fontsize={fontsize}>{newaddress}</P>
            <P fontsize={fontsize}>{address}</P>
            <P fontsize={fontsize}>{call}</P>
            
        </CardContainer>
    )
}

Card.defaultProps = {
    width: "30%",
    height: "50%",
    fontsize: "15px",
    onClick: () => {},
    isBookmark: 0
}

const CardContainer = styled.div`
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    box-sizing: border-box;
    padding: 20px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    background-color: #fff;
    transition: all 0.3s;
    display: grid;
    row-gap: 10px;
    
    &:hover{
        color: #112A46;
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    }
`;


const Title = styled.h3`
    display: inline-block;
    width: 95%;
    margin: 0;
    color: #495057;
    cursor: pointer;
    
    >a {
        text-decoration: none;
        color: #495057;
    }
`;

const CategoryContainer = styled.div`
    width: 100%;

    >div{
        margin: 0;
    }
`;

const Category = styled.span`
    display: inline-block;
    text-align: center;
    margin: 0;
    color: #fff;
    background-color: #71ba7f;
    border-radius: 20px;
    padding: 2px 5px;
    font-size: ${(props)=>props.catesize};
`;

const P = styled.p`
    margin: 0;
    padding: 0;
    color: #112A46;
    font-size: ${(props)=>props.fontsize};
`;

const Icon = styled.span`
    float: right;
    position: relative;
    cursor: pointer;
`;

export default Card;