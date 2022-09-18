import styled from "styled-components";

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
        label,
        text
    } = props;

    return(
        <>
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
        </>
        )
    }

Text.defaultProps = {
    fontsize: "15px",
    fontweight: "300"
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

const H4 = styled.h4`
    font-size: ${(props)=>props.labelsize};
    margin: 5px 0px 0px 10px;
`;

const P = styled.p`
    margin: 0;
    margin-top: 10px;
    padding-left: 10px;
    font-size: ${(props)=>props.fontsize};
    font-weight: ${(props)=>props.fontweight};
`;


export default Text;