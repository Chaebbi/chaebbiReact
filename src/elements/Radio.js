import styled from "styled-components";
import React from "react";

function Radio(props){
    const { legend, radioArray, checked, onChange } = props

    return(
        <div>
            <Legend>{legend}</Legend>
            <RadioWrapper>
                {radioArray.map((i) => (
                    <RadioInputWrapper key={i.id}>
                        <RadioInput
                            id={i.id}
                            type="radio"
                            name={i.name}
                            value={i.value}
                            checked={i.value === checked}
                            onChange={onChange}/>
                        <StyledLabel htmlFor={i.id}>{i.label}</StyledLabel>
                    </RadioInputWrapper>
                ))}
            </RadioWrapper>
        </div>
    )
}

const Legend = styled.legend`
    font-size: 1.4rem;
    font-weight: 600;
    margin-left: 0.4rem;
    color: var(--color-black);
`;

const RadioWrapper = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const RadioInputWrapper = styled.div`
    margin: 1.3rem 0 1.2rem 0;
`;

const StyledLabel = styled.label`
    color: var(--color-border-hover);
    font-size: 1.4rem;
    border: 1px solid var(--color-border);
    border-radius: 0.4rem;
    padding: 1rem 2rem;
    cursor: pointer;
    transition: all 0.2s;

    &:hover{
        border: 1px solid var(--color-border-hover);
        color: var(--color-border-hover);
    }
`;

const RadioInput = styled.input`
    display: none;

    &:checked + ${StyledLabel}{
        border: 1px solid var(--color-primary);
        background-color: var(--color-input-focus);
        color: var(--color-primary);
    }
`

export default React.memo(Radio);