import styled from "styled-components";

const Tag =(props)=>{
  const {name} = props;

  return(
    <TagItem>
      {name}
    </TagItem>
  )
}

const TagItem = styled.div`
  display: inline-block;
  padding: 0.3rem 0.8rem;
  background-color: var(--color-input-focus);
  color: var(--color-hover);
  border: 1px solid var(--color-hover);
  border-radius: 2rem;
`;

export default Tag;