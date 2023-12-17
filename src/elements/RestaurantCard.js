import styled from "styled-components";

const RestaurantCard =(props)=>{
  const { 
    id,
    name,
    category,
    call,
    newaddress,
    address,
    href,
    isBookmark,
    onClick
  } = props;

  const openRestaurantNewTab = () => {
    window.open(href, '_blank');
  };

  const spCategory = category.split(',').map(i => i.trim());


  return(
    <RestaurantCardWrapper onClick={openRestaurantNewTab}>
      <h1>{name}</h1>
      <div className="category">
        {spCategory.map((c,idx)=>(
          <CategoryItem key={idx}>{c}</CategoryItem>
        ))}
      </div>
      <p className="address">{newaddress}</p>
      <p className="address">{address}</p>
      <p>{call}</p>
      <p onClick={onClick}>{isBookmark !== 0 ? 'bookmarked': 'not Bookmarked'}</p>
    </RestaurantCardWrapper>
  )
}

const CategoryItem = styled.span`
  padding: 0.3rem 0.8rem;
  margin-right: 0.2rem;
  background-color: var(--color-input-focus);
  color: var(--color-hover);
  border: 1px solid var(--color-hover);
  border-radius: 2rem;
  line-height: 2.5rem;
`;

const RestaurantCardWrapper = styled.div`
  padding: 1.5rem;
  background-color: var(--color-white);
  border: 1px solid var(--color-hover);
  border-radius: 0.5rem;
  cursor: pointer;

  h1{
    font-size: 2rem;
  }

  .category{
    margin: 0.4rem 0;
  }

  .address{
    color: var(--color-border-hover);
    margin-bottom: 0.3rem;
  }

  &:hover{
    background-color: var(--color-input-focus);

    ${CategoryItem}{
      background-color: var(--color-white);
    }
  }
`;


export default RestaurantCard;