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
    height : "30px",
    margin: "5px 0",
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
    margin-bottom: 20px;
    padding-right: 10px;
    box-sizing: border-box;
    /* background-color: yellow; */
`;

const Label = styled.label`
    display: inline-block;
    margin-left: 5px;
    margin-bottom: 10px;
    font-size: ${(props)=>props.fontsize};
    color: ${(props)=>props.color};
    font-weight: 600;
`;

const InputField = styled.input.attrs({
    placeholderTextColor : "#000"
})`
   width: ${(props)=>props.fieldwidth};
   height: ${(props)=>props.height};
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
   padding: ${(props)=>props.padding};
   padding-left: 10px;
   color: ${(props)=>props.color};
   background-color: transparent;
   border: ${(props)=>props.border};
   border-radius: ${(props)=>props.borderRadius};
   outline: 0;
`;

export default Input;