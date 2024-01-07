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
    {id: 6, name:"meal", value:0, label:"아침"},
    {id: 7, name:"meal", value:1, label:"점심"},
    {id: 8, name:"meal", value:2, label:"저녁"},
]

export const dateConversion =(date)=> {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    console.log(`${year}-${month}-${day}`);

    return `${year}-${month}-${day}`;
}

export const timeConversion =(str)=> {
    let ampm = str.slice(8);
    let hh = str.slice(0,2);
    let mm = str.slice(3,5); 
    
    if(ampm === 'PM' && hh !== '12') {
        hh = Number(hh) + 12;
    }
    if(ampm === 'AM' && hh === '12') {
        hh = '00';
    }

    return `${hh}:${mm}`
}

