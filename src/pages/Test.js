import styled from "styled-components";
import Accordion from "../components/Accordion";
import HorizontalStackGraph from "../components/Charts/HorizontalStackGraph";
import Image from "../elements/Image";

//컴포넌트 테스트 페이지
function Test(){

    return(
        <>
        <HorizontalStackGraph carb="1264" protein="350" fat="420"/>
        {/* <Accordion/> */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,auto)"}}>

            <div style={{border:"1px solid #e6e6e6", width: "300px", height:"200px"}}>
                <Image 
                    src="/images/blank-profile.png"
                    width="100%"
                    height="150px"
                />
                <h3>안녕</h3>
            </div>
            <div style={{border:"1px solid #e6e6e6", width: "300px", height:"200px"}}>
                <Image 
                    src="/images/blank-profile.png"
                    width="100%"
                    height="150px"
                />
                <h3>안녕</h3>
            </div>
            <div style={{border:"1px solid #e6e6e6", width: "300px", height:"200px"}}>
                <Image 
                    src="/images/blank-profile.png"
                    width="100%"
                    height="150px"
                />
                <h3>안녕</h3>
            </div>

        </div>
        </>
        )
    }

export default Test;