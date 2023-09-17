import styled from "styled-components";

function Radio(props){
    const { legend, radioArray, checked, onChange } = props

    return(
        <div>
            <Legend>{legend}</Legend>
            <RadioWrapper>
                {radioArray.map((i) => (
                    <>
                    <RadioInput
                        id={i.id}
                        type="radio"
                        name={i.name}
                        value={i.value}
                        checked={i.value === checked}
                        onChange={onChange}/>
                    <StyledLabel key={i.id} htmlFor={i.id}>{i.label}</StyledLabel>
                    </>
                ))}
            </RadioWrapper>
        </div>
    )
}

const Legend = styled.legend`
    font-size: 1.4rem;
    font-weight: 600;
    margin-bottom: 0.2rem;
`;

const RadioWrapper = styled.div`
    display: flex;
    gap: 0.4rem;
`;

const StyledLabel = styled.label`
    color: var(--color-light-gray);
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

export default Radio;