import styled from "styled-components";
import React from "react";

//텍스트 엘리먼트
function Text(props){
    const {
        width,
        margin,
        labelsize,
        fontsize,
        fontweight,
        position,
        top,left,right,bottom,
        background,
        inline,
        center,
        label,
        text
    } = props;

    if(inline){
        return(
            <InlineTextContainer
                inline
                width={width} 
                margin={margin}
                position={position} 
                top={top}
                bottom={bottom}
                left={left}
                right={right}
                background={background}>
                    <InlineH4 labelsize={labelsize}>{label}</InlineH4>
                    <P fontsize={fontsize} fontweight={fontweight}>{text}</P>
            </InlineTextContainer>
            );
    }

    if(center){
        return(
            <CenterTextContainer
                center
                width={width} 
                margin={margin}
                position={position} 
                top={top}
                bottom={bottom}
                left={left}
                right={right}
                background={background}>
                    <InlineH4 labelsize={labelsize}>{label}</InlineH4>
                    <P fontsize={fontsize} fontweight={fontweight}>{text}</P>
            </CenterTextContainer>
            );
    }

    return(
            <TextContainer 
                width={width} 
                margin={margin}
                position={position} 
                top={top}
                bottom={bottom}
                left={left}
                right={right}
                background={background}>
                    <H4 labelsize={labelsize}>{label}</H4>
                    <P fontsize={fontsize} fontweight={fontweight}>{text}</P>
            </TextContainer>
        )
    }

Text.defaultProps = {
    fontsize: "15px",
    fontweight: "300",
    height : "42px",
    width: "100%"
};

const TextContainer = styled.div`
    display: inline-block;
    width: ${(props)=>props.width};
    margin: ${(props)=>props.margin}; 
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    box-sizing: border-box;
    background-color: ${(props)=>props.background};
`;

const InlineTextContainer = styled.div`
    display: inline-grid;
    grid-template-columns: 30% 70%;
    width: ${(props)=>props.width};
    margin: ${(props)=>props.margin}; 
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    box-sizing: border-box;
    background-color: ${(props)=>props.background};

    @media (max-width: 200px){
        display: inline-block;
        width: ${(props)=>props.width};
        margin: ${(props)=>props.margin}; 
        position: ${(props)=>props.position};
        top: ${(props)=>props.top};
        bottom: ${(props)=>props.bottom};
        left: ${(props)=>props.left};
        right: ${(props)=>props.right};
        box-sizing: border-box;
        background-color: ${(props)=>props.background};
    }
`;

const CenterTextContainer = styled.div`
        display: inline-block;
        width: ${(props)=>props.width};
        margin: ${(props)=>props.margin}; 
        position: ${(props)=>props.position};
        top: ${(props)=>props.top};
        bottom: ${(props)=>props.bottom};
        left: ${(props)=>props.left};
        right: ${(props)=>props.right};
        box-sizing: border-box;
        background-color: ${(props)=>props.background};
        text-align: center;
`;

const H4 = styled.h4`
    font-size: ${(props)=>props.labelsize};
`;

const InlineH4 = styled.h4`
    font-size: ${(props)=>props.labelsize};
    margin: 0px;
    line-height: 42px;
`;

const P = styled.p`
    margin: 0;
    margin-top: 10px;
    padding-left: 10px;
    text-align: center;
    font-size: ${(props)=>props.fontsize};
    font-weight: ${(props)=>props.fontweight};
`;


export default React.memo(Text);