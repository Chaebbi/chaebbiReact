import styled,{css} from "styled-components";
import React from "react";
import ErrorIcon from '@mui/icons-material/Error';

function Input(props){
    const {
        name,
        type, 
        placeholder,
        disabled,
        onChange,
        onKeyDown,
        value,
        label,
        error
    } = props


    return(
        <div>
            <Label htmlFor={name}>{label}</Label>
            <InputField
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                onKeyDown={onKeyDown}
                value={value}
                disabled={disabled}
                autoComplete="off"
                error={error}
            />
            {error && <ErrorMessage><ErrorIcon/>{error}</ErrorMessage>}
        </div>
        );

}

const Label = styled.label`
    color: var(--color-black);
    margin-left: 0.4rem;
    font-size: 1.4rem;
    font-weight: 600;
`;

const InputField = styled.input.attrs({
    placeholderTextColor : "var(--color-black)",
})`
    width: 100%;
    padding: 1rem;
    margin-top: 0.2rem;
    background-color: transparent;
    border: 1px solid var(--color-border);
    border-radius: 0.4rem;
    outline: 0;
    transition: all 0.2s;

    &:hover{
        border: 1px solid var(--color-border-hover);
    }
    &:focus{
        border: 1.2px solid var(--color-primary);
        background-color: var(--color-input-focus);
    }

    ${({ error }) =>
        error &&
        css`
            border: 1.2px solid var(--color-danger);
            background-color: var(--color-input-danger);

            &:focus{
                border: 1.2px solid var(--color-danger);
                background-color: var(--color-input-danger);
            }
        `
    }

    ${({ disabled }) =>
        disabled &&
        css`
            border: 1.2px solid var(--color-border);
            background-color: var(--color-light-gray);

            &:hover{
                border: 1px solid var(--color-border);
            }
        `
    }
`;

const ErrorMessage = styled.p`
    color: var(--color-danger);
    font-size: 1.2rem;

    svg{
        position: relative;
        top: 0.2rem;
        margin-right: 0.2rem;
    }
`;

export default React.memo(Input);