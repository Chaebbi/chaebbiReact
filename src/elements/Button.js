import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


function Button(props){
    const { href, disabled, contrast, onClick, children } = props;
 
    return( 
        <StyledButton onClick={onClick} disabled={disabled} contrast={contrast}>
            { href ? <StyledLink to={href}>{children}</StyledLink> : <span>{children}</span> }
        </StyledButton>
    )
}

const StyledLink = styled(Link)`
    display: block;
    padding: 1rem 1.2rem;
    color: var(--color-white);
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 

const StyledButton = styled.button`
    color: var(--color-white);
    background: var(--color-primary);
    border: 1px solid var(--color-primary);
    border-radius: 0.4rem;
    font-size: 1.4rem;
    transition: all 0.2s;

    span{
        display: block;
        padding: 1rem 1.2rem;
    }

    &:hover{
        background: var(--color-hover);
    }

    ${props =>
        props.disabled &&
        css`
            background: var(--color-light-gray);
            border: 1px solid var(--color-light-gray);
            cursor: not-allowed;

            &:hover{
                background: var(--color-light-gray);
            }
        `}

    ${props =>
        props.contrast &&
        css`
            background: var(--color-white);
            border: 1px solid var(--color-border-hover);
            color: var(--color-black);
    
            &:hover{
                background: var(--color-light-gray);
            }
        `}
`;


export default Button;