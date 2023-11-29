import { useState } from 'react';

export const useNutrients =(initialValue)=>{
  const [nutrients, setNutrients] = useState(initialValue);
  const [capacityError, setCapacityError] = useState('');

  const updateNutrients =(values)=>{
    setNutrients({...nutrients, ...values});
    console.log(nutrients);
  }

  const initNutrients =()=>{
    setNutrients({
      name: '',
      calory: 0,
      carb: 0,
      pro: 0,
      fat: 0,
      capacity: 0,
    });
    setCapacityError('');
  }

  const changeAmount = (e) => {
    const foodInfoString = localStorage.getItem('food');

    if (!foodInfoString) {
      setCapacityError('메뉴를 먼저 등록해주세요.');
      return;
    }

    const foodInfo = JSON.parse(foodInfoString);

    const amount = Number(e.target.value);
    const ratio = foodInfo ? amount / foodInfo.capacity : amount / 0;
    let convertedCalory = Number((foodInfo.calory * ratio).toFixed(2));
    let convertedCarb = Number((foodInfo.carb * ratio).toFixed(1));
    let convertedPro = Number((foodInfo.pro * ratio).toFixed(1));
    let convertedFat = Number((foodInfo.fat * ratio).toFixed(1));

    if (amount <= 0 || isNaN(convertedCalory)) {
      setNutrients({
        calory: 0,
        carb: 0,
        pro: 0,
        fat: 0,
        capacity: amount,
      });
      setCapacityError('유효하지 않은 값입니다.');
    } else {
      setNutrients({
        calory: convertedCalory,
        carb: convertedCarb,
        pro: convertedPro,
        fat: convertedFat,
        capacity: amount,
      });
      setCapacityError('');
    }
  };

  return { nutrients, changeAmount, updateNutrients, initNutrients, capacityError }
} 
