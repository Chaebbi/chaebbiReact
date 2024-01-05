import React from 'react'
import ReactPaginate from 'react-js-pagination'
import styled from 'styled-components'

const Paginator =(props)=>{
  const { totalItemsCount = 10, activePage, onChange } = props;

  return(
    <PaginatorWrapper>
      <ReactPaginate
          activePage={activePage}
          itemsCountPerPage={4}
          totalItemsCount={totalItemsCount}
          pageRangeDisplayed={4}
          prevPageText={'이전'}
          nextPageText={'다음'}
          onChange={onChange}
      />
    </PaginatorWrapper>
  )
}

const PaginatorWrapper = styled.div`
  margin: 1rem 0;

  ul {
    display: flex;
    justify-content: center;
    padding: 0;
  }

  li{
    list-style: none;
    font-size: 1.8rem;

    a {
      padding: 1rem;
      text-decoration: none;
      color: var(--color-text);
    }

    &.active {
      a {
        font-weight: 700;
        color: var(--color-primary);
      }
    }
  }
`;

export default Paginator;