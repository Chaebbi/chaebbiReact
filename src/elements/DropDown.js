import styled from "styled-components"
import KeyboardArrowDownSharpIcon from '@mui/icons-material/KeyboardArrowDownSharp';
import { useState } from "react"

const DropDown =(props)=>{
  const { initial, itemList, onClick } = props;

  const [item, setItem] = useState(initial); // 리스트 아이템 클릭
  const [isActive, setIsActive] = useState(false); // 드롭다운 활성화 여부
  const handleClick =(item)=>{
    onClick(item);
    setItem(item);
    setIsActive(!isActive);
  }

  return(
    <DropDownWrapper>
      <SelectedItem onClick={()=>setIsActive(!isActive)}>
        <span>{item}</span>
        <KeyboardArrowDownSharpIcon className={isActive ? "active" : "inactive"}/>
      </SelectedItem>
      {isActive && (
        <DropDownList>
          {itemList.map((i,idx) => (
            <li key={idx} onClick={() => handleClick(i)}>
              {i}
            </li>
          ))}
        </DropDownList>
      )}
    </DropDownWrapper>
  )
}

const DropDownWrapper = styled.div`
  
`;

const SelectedItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 1rem;
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;

  svg{
    transition: transform 0.2s;
  }

  svg.active{
    transform: rotate(-180deg);
}
`;

const DropDownList = styled.ul`
  border: 1px solid var(--color-border);
  border-radius: 0.5rem;
  margin-top: 1rem;

  li{
    width: 100%;
    list-style: none;
    padding: 1rem;
    transition: all 0.2s;
    cursor: pointer;

    &:hover{
      font-weight: 700;
      background-color: var(--color-input-focus);
    }
  }
`;


export default DropDown