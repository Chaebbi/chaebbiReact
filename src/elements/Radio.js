import styled from "styled-components";

function Radio(props){
    const {id, label, name, value, margin, fontsize, onClick, onChange} = props;

    return(
        <Div margin={margin}>
            <input type="radio" id={id} name={name} value={value} onClick={onClick} onChange={onChange}/>
            <Label htmlFor={id} fontsize={fontsize}>{label}</Label>
        </Div>
    )
}

Radio.defaultProps={
    margin: "5px",
    fontsize: "15px",
}

const Div = styled.div`
    margin: ${(props)=>props.margin}; 
    display: inline-block;
    padding-right: 5px;
`;

const Label = styled.label`
    margin-left: 8px;
    color: #000;
`;

export default Radio;