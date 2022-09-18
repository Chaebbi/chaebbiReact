import styled from "styled-components";

function Form(props){
    const {
        minwidth,
        width,
        height,
        margin,
        padding,
        background,
        position,
        display,
        top,
        bottom,
        left,
        right,
        children
    } = props;

    return(
        <Container
            width={width}
            minwidth={minwidth}
            height={height}
            margin={margin}
            padding={padding}
            position={position}
            top={top}
            bottom={bottom}
            left={left}
            right={right}
            background={background}
            display={display}
        >
            {children}
        </Container>
    )
} 

Form.defaultProps = {
    padding: "10px",
    minwidth: "600px"
};

const Container = styled.form`
    width: ${(props)=>props.width};
    min-width: ${(props)=>props.minwidth};
    height: ${(props)=>props.height};
    display: ${(props)=>props.display};
    position: ${(props)=>props.position};
    top: ${(props)=>props.top};
    bottom: ${(props)=>props.bottom};
    left: ${(props)=>props.left};
    right: ${(props)=>props.right};
    background-color: ${(props)=>props.background};
    margin: ${(props)=>props.margin};
    padding: ${(props)=>props.padding};
    border: 1px solid #e6e6e6;
    border-radius: 15px;
`;

export default Form;