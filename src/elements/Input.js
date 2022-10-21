import styled from "styled-components";

function Input(props){
    const {
        name,
        type, 
        placeholder,
        accept,
        onChange,
        value,
        text,
        color,
        margin,
        padding,
        fontsize,
        border,
        width,
        fieldwidth,
        height,
        minlength,
        maxlength,
        multiple,
        borderRadius,
        disabled,
        inline,
        center,
        step
    } = props;

    if(disabled){
        return(
            <Div width={width} margin={margin} padding={padding}>
                <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
                <InputField2
                    disabled
                    name={name}
                    type={type} 
                    id={name}
                    onChange={onChange}
                    value={value}
                    color={color}
                    padding={padding}
                    height={height}
                    fieldwidth={fieldwidth}
                    border="0px"
                    borderRadius="0px"
                />
            </Div>
            );
    }

    if(inline){
        return(
            <InlineDiv width={width} padding={padding} inline>
                <InlineLabel htmlFor={name} color={color} fontsize={fontsize}>{text}</InlineLabel>
                <InputField2
                    name={name}
                    type={type} 
                    id={name}
                    onChange={onChange}
                    value={value}
                    color={color}
                    padding={padding}
                    height={height}
                    fieldwidth={fieldwidth}
                    border={border}
                    borderRadius={borderRadius}
                />
            </InlineDiv>
            );
    }

    if(center){
        return(
            <CenterDiv width={width} padding={padding} center>
                <InlineLabel htmlFor={name} color={color} fontsize={fontsize}>{text}</InlineLabel>
                <InputField2
                    name={name}
                    type={type} 
                    id={name}
                    onChange={onChange}
                    value={value}
                    color={color}
                    padding={padding}
                    height={height}
                    fieldwidth={fieldwidth}
                    border={border}
                    borderRadius={borderRadius}
                />
            </CenterDiv>
            );
    }

    return(
        <Div width={width} margin={margin} padding={padding}>
            <Label htmlFor={name} color={color} fontsize={fontsize}>{text}</Label>
            <InputField
                name={name}
                type={type} 
                id={name}
                placeholder={placeholder}
                onChange={onChange}
                value={value}
                accept={accept}
                multiple={multiple}
                color={color}
                required
                padding={padding}
                height={height}
                fieldwidth={fieldwidth}
                minlength={minlength}
                maxlength={maxlength}
                border={border}
                borderRadius={borderRadius}
                autoComplete="off"
                step={step}
            />
        </Div>
        );

}

Input.defaultProps = {
    fontsize : "15px",
    height : "40px",
    margin: "0px",
    padding: "5px",
    border: "1px solid #e6e6e6",
    borderRadius: "10px",
    color: "#000",
    fieldwidth: "98%",
    width: "100%"
};

const Div = styled.div`
    display: inline-block;
    width: ${(props)=>props.width};
    margin: ${(props)=>props.margin};
    box-sizing: border-box;
`;

const InlineDiv = styled.div`
    display: inline-grid;
    grid-template-columns: 30% 70%;
    width: ${(props)=>props.width};
    margin: ${(props)=>props.margin};
    box-sizing: border-box;

    @media (max-width: 200px){
        display: inline-block;
        margin: ${(props)=>props.margin};
        width: ${(props)=>props.width};
        min-width: 220px;
        box-sizing: border-box;
    }
`;

const CenterDiv  = styled.div`
    display: inline-block;
    width: ${(props)=>props.width};
    margin: ${(props)=>props.margin};
    box-sizing: border-box;
    text-align: center;
`;

const Label = styled.label`
    display: inline-block;
    margin-left: 5px;
    margin-bottom: 10px;
    font-size: ${(props)=>props.fontsize};
    color: ${(props)=>props.color};
    font-weight: 600;
`;


const InlineLabel = styled.label`
    display: inline-block;
    line-height: 42px;
    font-size: ${(props)=>props.fontsize};
    color: ${(props)=>props.color};
    font-weight: 600;
`;

const InputField = styled.input.attrs({
    placeholderTextColor : "#000"
})`
   width: ${(props)=>props.fieldwidth};
   height: ${(props)=>props.height};
   box-sizing: border-box;
   padding: ${(props)=>props.padding};
   padding-left: 10px;
   color: ${(props)=>props.color};
   background-color: transparent;
   border: ${(props)=>props.border};
   border-radius: ${(props)=>props.borderRadius};
   outline: 0;
   transition: all 0.2s;

   &:hover{
        border: 1px solid #adb5bd;
   }
   &:focus{
        border: 1.2px solid #398234;
    }
`;

const InputField2 = styled.input`
   width: ${(props)=>props.fieldwidth};
   height: ${(props)=>props.height};
   box-sizing: border-box;
   padding: ${(props)=>props.padding};
   padding-left: 10px;
   color: ${(props)=>props.color};
   background-color: transparent;
   border: ${(props)=>props.border};
   border-radius: ${(props)=>props.borderRadius};
   outline: 0;
`;

export default Input;