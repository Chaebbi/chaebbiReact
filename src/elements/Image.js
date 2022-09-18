import styled from "styled-components";

function Image(props){
    const { 
        src,
        width,
        height,
        margin,
        borderRadius,
        display,
        position,
        top,
        bottom,
        left,
        right,
    } = props;

    return(
        <ImageContainer 
            src={src} 
            width={width} 
            height={height} 
            margin={margin}
            borderRadius={borderRadius}
            display={display}
            position={position}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            >
        </ImageContainer>
    )
}

Image.defaultProps = {
    src: "no_image_50px.png",
    width: "100%",
    height: "300px",
    margin: "0",
    borderRadius: "0"
    };

const ImageContainer = styled.div`
    top: 0;
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    display: ${(props)=>props.display};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    background-image: url("${(props)=>props.src}");
    background-size: cover;
    background-position: center;
    box-sizing: border-box;
    border: 1px solid #fff;
    border-radius: ${(props)=>props.borderRadius};
    margin: ${(props)=>props.margin};
    `;

export default Image;