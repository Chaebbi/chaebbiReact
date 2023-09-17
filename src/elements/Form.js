import styled from "styled-components";

function Form(props){
    const {
        width,
        zindex,
        children
    } = props;

    return(
        <Container width={width} zindex={zindex}>
            {children}
        </Container>
    )
}

const Container = styled.form`
    padding: 2rem;
    width: ${(props)=>props.width};
    z-index: ${(props)=>props.zindex};
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 1px solid var(--color-border);
    border-radius: 1rem;
`;

export default Form;