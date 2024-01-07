export const checkEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email)
}

export const checkNickname = (name) => {
  const nicknameRegex = /^.{1,8}$/
  return nicknameRegex.test(name)
}
  
export const checkPassword = (password) => {
  // 8자 이상, 문자와 숫자 포함
  const pwdRegex = /^.{5,20}$/
  return pwdRegex.test(password)
}

export const checkRegDate =(date)=>{
  // yyyy-mm-dd
  const regex = /^\d{4}-\d{2}-\d{2}$/;
    
  if(regex.test(date) === false){
    return false
  }

  const convertedDate = new Date(date);
  convertedDate.setHours(0, 0, 0, 0);

  if (isNaN(convertedDate.getTime())) {
    return false;
  }

  const Today = new Date();
  Today.setHours(0, 0, 0, 0);

  if(Today < convertedDate){ //현재 날짜보다 미래를 입력했으면 false
    return false
  }

  return true;
}


export const checkRegTime =(date, time)=>{
  // hh:mm
  const regex = /^([01]\d|2[0-3]):([0-5]\d)$/;

  if(regex.test(time) === false){
    return false
  }

  // 인자로 들어온 date를 변환, 없으면 현재시간으로..
  // 현재보다 과거면 무조건 true
  let convertedTime;

  if(date !== ''){
    convertedTime = new Date(date);
  }else{
    convertedTime = new Date();
  }

  const now = new Date();
  const [hh , mm] = time.split(':');
  convertedTime.setHours(hh);
  convertedTime.setMinutes(mm);

  if(now < convertedTime){ //현재시각보다 이전이면 유효
    return false;
  }

  return true
}