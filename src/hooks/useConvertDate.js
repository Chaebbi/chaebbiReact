import { useState } from 'react';
import { checkRegDate, checkRegTime } from "../utils/validation";
import { dateConversion, timeConversion } from "../utils/common";

// {date: '', time: '', prevDate: '', prevTime: ''} 형태의 객체를 넘겨받아야한다.
export const useConvertDate =(initialValue)=>{
  const [dateInfo, setDateInfo] = useState(initialValue);
  const [dateError, setDateError] = useState({date: '', time: ''});

    const changeDate =(e)=>{
        const { prevTime } = dateInfo;

        if(checkRegDate(e.target.value)){
            const converted = dateConversion(e.target.value);
            setDateInfo({ ...dateInfo, date: converted });
            setDateError({...dateError, date: ''});
        
            if (prevTime && checkRegTime(e.target.value, prevTime)) {
                console.log('changeDate - time : ', prevTime);
                const timeConverted = timeConversion(prevTime);
                setDateInfo({ date: converted, time: timeConverted, prevTime: '', prevDate: '' });
                setDateError({ date: '', time: '' });
            }
        }else{
            setDateInfo({ ...dateInfo, date: '', prevDate: e.target.value});
            setDateError({ ...dateError, date: '유효하지 않은 날짜입니다.'});
        }
    }

    const changeTime =(e)=>{
        const { date, prevDate } = dateInfo;

        if(checkRegTime(date, e.target.value)){
            const converted = timeConversion(e.target.value);
            setDateInfo({ ...dateInfo, time: converted });
            setDateError({ ...dateError, time: ''});
        
            if (prevDate && checkRegDate(prevDate)) {
                console.log('changeTime - date : ', prevDate);
                const dateConverted = dateConversion(prevDate);
                setDateInfo({ date: dateConverted, time: converted, prevDate: '', prevTime: '' });
                setDateError({ date: '', time: '' });
            }
        }else{
            setDateInfo({ ...dateInfo, time: '', prevTime: e.target.value });
            setDateError({ ...dateError, time: '유효하지 않은 시간입니다.'});
        }
        
    }
    return { dateInfo, changeDate, changeTime, dateError, setDateError }
}