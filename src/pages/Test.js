import Button from "../elements/Button";
import Input from "../elements/Input";

//컴포넌트 테스트 페이지
function Test(){
    const handleValue =(e)=>{
        console.log(e.target.value);
    }

    const handleClick =()=>{
        console.log('clicked!');
    }

    return(
        <>
        <Button onClick={handleClick} disabled>gg</Button>
        <Input label="test input" type="text" placeholder="플레이스홀더" onChange={handleValue}/>
        </>
        )
    }

export default Test;