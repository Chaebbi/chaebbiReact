import styled from "styled-components";
import {useState} from 'react';
import { AiFillStar,AiOutlineStar } from 'react-icons/ai';
import { IoIosStarOutline,IoIosStar } from 'react-icons/io';
import { IoCloseOutline } from 'react-icons/io5';

function Card(props){
    const { 
        id,
        width, 
        height, 
        margin, 
        fontsize,
        title,
        category,
        call,
        newaddress,
        address,
        del,
        isBookmark,
        onClick } = props;


    //북마크 DELETE 카드===========================================
    if(del){ 
        return(
            <CardContainer del id={id} width={width} height={height} margin={margin} >
                <Title>
                    {title.length> 10 ? `${title.slice(0,10)} ..`: title}
                </Title>
                <Icon onClick={onClick}>
                    <IoCloseOutline size="23" color="#868e96"/> 
                </Icon>
                <Category>{category}</Category>
                <P fontsize={fontsize}>{newaddress}</P>
                <P fontsize={fontsize}>{address}</P>
                <P fontsize={fontsize}>{call}</P>
                
            </CardContainer>
        )
    }
    //북마크 POST 카드===========================================
    return(
        <CardContainer id={id} width={width} height={height} margin={margin} >
            <Title>
                {title.length> 10 ? `${title.slice(0,10)} ..`: title}
            </Title>
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
            
            <Category>{category}</Category>
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
    padding: 15px;
    border: 1px solid #e6e6e6;
    border-radius: 15px;
    box-sizing: border-box;
    transition: all 0.3s;
    background-color: #fff;

    &:hover{
        color: #112A46;
        background-color: rgba(198,221,207,0.3);
        box-shadow: rgba(50, 50, 105, 0.15) 0px 2px 5px 0px, rgba(0, 0, 0, 0.05) 0px 1px 1px 0px;
    }
`;

const Title = styled.h3`
    display: inline-block;
    color: #495057;
    margin: 5px 10px 10px 0;
`;

const Category = styled.p`
    color: #495057;
    margin: 0 0 20px 0;
    font-size: ${(props)=>props.fontsize};
`;

const P = styled.p`
    margin: 0 0 10px 0;
    padding: 0;
    color: #112A46;
    font-size: ${(props)=>props.fontsize};
`;

const Icon = styled.span`
    float: right;
    margin-top: 2px;
    position: relative;
    cursor: pointer;
`;

export default Card;