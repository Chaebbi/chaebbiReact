import { useState } from "react";

export const usePageChange =(initialArray)=>{
  const [activePage, setActivePage] = useState(1);
  const lastIdx = activePage * 4;
  const firstIdx = lastIdx - 4;
  const [slicedArray, setSlicedArray] = useState(initialArray.slice(firstIdx, lastIdx));

  const handlePageChange = (activePage) => {
    setActivePage(activePage);
    setSlicedArray(initialArray.slice(activePage * 4 - 4, activePage * 4));
  }

  return { activePage, slicedArray, handlePageChange }
}