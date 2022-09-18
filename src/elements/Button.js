import styled, {keyframes} from "styled-components";
import { Link } from "react-router-dom";


function Button(props){
    const { width, 
            height, 
            margin, 
            padding,
            fontsize,
            position,
            top,left,bottom,right,
            text, 
            href,
            hover,
            background,
            border,
            hoverBorder,
            color,
            borderRadius,
            onClick,
            onSubmit,
            just,
            submit
        } = props;

        if(just){ //그냥 버튼
            return(
                <StyledButton
                    just
                    type="button"
                    width={width} 
                    height={height} 
                    margin={margin} 
                    padding={padding} 
                    background={background}
                    hover={hover}
                    color={color}
                    fontsize={fontsize}
                    position={position}
                    top={top} left={left} bottom={bottom} right={right}
                    border={border}
                    hoverBorder={hoverBorder}
                    borderRadius={borderRadius}
                    onClick={onClick}
                    onSubmit={onSubmit}>
                        {text}
                </StyledButton>
                )
        }

        if(submit){ //submit 버튼 
            return(
                <StyledButton
                    submit
                    type="submit"
                    width={width} 
                    height={height} 
                    margin={margin} 
                    padding={padding} 
                    background={background}
                    hover={hover}
                    color={color}
                    fontsize={fontsize}
                    position={position}
                    top={top} left={left} bottom={bottom} right={right}
                    border={border}
                    hoverBorder={hoverBorder}
                    borderRadius={borderRadius}
                    onClick={onClick}
                    onSubmit={onSubmit}>
                        {text}
                </StyledButton>
                )
        }
 
 
    return( //경로 이동 기능을 가진 버튼
        <StyledButton
            width={width} 
            height={height} 
            margin={margin} 
            padding={padding} 
            background={background}
            hover={hover}
            fontsize={fontsize}
            position={position}
            top={top} left={left} bottom={bottom} right={right}
            border={border}
            hoverBorder={hoverBorder}
            borderRadius={borderRadius}
            onClick={onClick}
            onSubmit={onSubmit}>
                <StyledLink to={href} color={color}>
                    {text}
                </StyledLink>
        </StyledButton>
    )
}

Button.defaultProps = {
    height:"50px",
    fontsize: "16px",
    background: "#398234",
    hover: "#0d5f07",
    border: "#868e96",
    borderRadius: "15px",
    hoverBorder: "#868e96",
    color: "#fff"
};

const StyledButton = styled.button`
    font-size: ${(props)=>props.fontsize};
    background: ${(props)=>props.background}; /*#3772ff;*/
    border: 1px solid ${(props)=>props.border};
    border-radius: ${(props)=>props.borderRadius};
    width: ${(props)=>props.width};
    height: ${(props)=>props.height};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    letter-spacing: 2px;
    color: ${(props)=>props.color};
    transition: all 0.2s;

    &:hover{
        background: ${(props)=>props.hover};
        border: 1px solid ${(props)=>props.hoverBorder};
    }

    &:focus, &:hover, &:visited, &:link, &:active {
        color: #fff;
    }

`;

const StyledLink = styled(Link)`
    color: ${(props)=>props.color};
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 


export default Button;