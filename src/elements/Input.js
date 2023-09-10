import styled from "styled-components";

function Input(props){
    const {
        name,
        type, 
        placeholder,
        disabled = false,
        onChange,
        value,
        label,
        step,
    } = props


    return(
        <InputWrapper>
            <Label htmlFor={name}>{label}</Label>
            <InputField
                id={name}
                name={name}
                type={type}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                disabled={disabled}
                required
                autoComplete="off"
                step={step}
            />
        </InputWrapper>
        );

}


const InputWrapper = styled.div`

`;

const Label = styled.label`
    margin-right: 0.6rem;
    color: var(--color-black);
    font-size: 1.4rem;
    font-weight: 600;
`;


const InputField = styled.input.attrs({
    placeholderTextColor : "var(--color-black)",
})`
   padding: 1rem;
   background-color: transparent;
   border: 1px solid var(--color-border);
   border-radius: 0.6rem;
   outline: 0;
   transition: all 0.2s;

   &:hover{
        border: 1px solid var(--color-border-hover);
   }
   &:focus{
        border: 1.2px solid var(--color-primary);
    }
`;

export default Input;