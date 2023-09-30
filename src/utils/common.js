export const gender = [
    {id: 1, name:"gender", value:0, label:"남자"},
    {id: 2, name:"gender", value:1, label:"여자"},
]
export const activity = [
    {id: 3, name:"activity", value:25, label:"1단계"},
    {id: 4, name:"activity", value:33, label:"2단계"},
    {id: 5, name:"activity", value:40, label:"3단계"},
]

export const when = [
    {id: 0, name:"meal", value:0, label:"아침"},
    {id: 1, name:"meal", value:1, label:"점심"},
    {id: 2, name:"meal", value:2, label:"저녁"},
]

export const dateConversion =(str)=> {
    let form = str.split('-');
    return `${form[0]}.${form[1]}.${form[2]}.`
}

export const timeConversion =(str)=> {
    let ampm = str.slice(8);  //문자열에서 AM/PM 여부를 알 수 있도록 slice
    let hh = str.slice(0,2);  //시, 분, 초 부분을 각각 slice
    let mm = str.slice(3,5); 
    
    if(ampm === 'PM' && hh !== '12') {
        hh = Number(hh) + 12;  //slice 하면 문자열이 되므로 숫자로 변환해서 계산
    }
    if(ampm === 'AM' && hh === '12') {
        hh = '00';
    }

    return `${hh}:${mm}`
}

