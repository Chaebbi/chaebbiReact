import styled,{css} from "styled-components";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useState } from "react";
import Input from "./Input";

function PwdInput (props){
    const [isShow, setIsShow] = useState(false);

    return (
        <PositionWrapper>
            <Input 
                type={isShow ? 'text' : 'password'} 
                {...props}
            />
            <VisibleIndicator onClick={() => setIsShow(!isShow)} error={props.error}>
                {!isShow ? (<VisibilityIcon/>) : (<VisibilityOffIcon/>)}
            </VisibleIndicator>
        </PositionWrapper>)
}
const PositionWrapper = styled.div`
    position: relative;
`;

const VisibleIndicator = styled.span`
    width: 2rem;
    background-color: var(--color-white);
    text-align: center;
    position: absolute;
    top: 3.1rem;
    right: 1rem; 
    cursor: pointer;

    ${({ error }) =>
        error &&
        css`
            background-color: var(--color-input-danger);
        `
    }
`;

export default PwdInput;