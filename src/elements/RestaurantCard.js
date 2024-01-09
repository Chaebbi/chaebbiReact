import styled from "styled-components";
import StarBorderRoundedIcon from '@mui/icons-material/StarBorderRounded';
import StarRateRoundedIcon from '@mui/icons-material/StarRateRounded';

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
    onClickBookmark,
    onClickBookmarkAlready
  } = props;

  const openRestaurantNewTab = () => {
    window.open(href, '_blank');
  };

  const spCategory = category && category.split(',').map(i => i.trim());


  return(
    <RestaurantCardWrapper>
      <h1 onClick={openRestaurantNewTab}>{name}</h1>
      <span>
        {isBookmark !== 0 ? <StarRateRoundedIcon className="fill" onClick={onClickBookmarkAlready}/> : <StarBorderRoundedIcon className="empty" onClick={onClickBookmark}/>}
      </span>
      { category && 
        <div className="category">
          {spCategory.map((c,idx)=>(
            <CategoryItem key={idx}>{c}</CategoryItem>
          ))}
        </div>
      }
      <p className="address">{newaddress !== null ? newaddress : '주소 알 수 없음'}</p>
      <p className="address">{address !== null ? address : '주소 알 수 없음'}</p>
      <p>{call !== null ? call : '연락처 알 수 없음'}</p>
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
  position: relative;

  h1{
    font-size: 2rem;
    transition: all 0.1s;
    display: inline-block;
    cursor: pointer;

    &:hover{
      color: var(--color-primary);
    }
  }

  svg{
    color: var(--color-kakao);
    background-color: var(--color-white);
    border: 1px solid var(--color-kakao);
    border-radius: 100%;
    padding: 0.2rem;
    font-size: 2.6rem;
    position: absolute;
    right: 1.2rem;
    cursor: pointer;
  }

  svg.fill{
    background-color: var(--color-recommend);
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