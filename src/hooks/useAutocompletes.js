import { useState, useEffect } from 'react';

export const useAutocompletes =(foodlist)=>{
  const [searchword, setSearchword] = useState('');
  const [autocompletes, setAutocompletes] = useState([]);

  
  const updateData =() => {
    const filteredList = foodlist.filter((i)=> i.name.includes(searchword) === true).slice(0,20);
    setAutocompletes(filteredList);
  }


  useEffect(() => {
    const debounce = setTimeout(() => {
      if(searchword.length > 0) updateData();
    },200)

    return () => {
      clearTimeout(debounce)
    }
    
  }, [searchword]);

  return { searchword, setSearchword, autocompletes }
}