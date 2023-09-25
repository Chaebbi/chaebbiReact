import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


function Button(props){
    const { href, disabled = false, onClick, children } = props;
 
    return( 
        <StyledButton onClick={onClick} disabled={disabled}>
            { href ? <StyledLink to={href}>{children}</StyledLink> : <span>{children}</span> }
        </StyledButton>
    )
}

const StyledButton = styled.button`
    background: var(--color-primary);
    color: var(--color-white);
    border: 1px solid var(--color-primary);
    border-radius: 0.6rem;
    padding: 1rem 2rem;
    font-size: 1.6rem;
    transition: all 0.2s;

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
`;

const StyledLink = styled(Link)`
    color: var(--color-white);
    text-decoration: none;

    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`; 


export default Button;