// import styles from "../styles/Accordion.module.css";
import Image from "../elements/Image";

//아코디언 디자인
function Accordion({suggestions,problems,problemlist}){
    const suggestList = suggestions;
    const problemList = problems;
    const problemTable = problemlist;

    console.log(problemTable);
    console.log(problemList);

    //1차 -> 2차원 배열로 만들어 봤으나 실패(원인을 모르겠음)=======================================
    var probStorage = [];
    for(let i=0; i<problemList.length; i++){
        let filtered = Array.from(suggestList).filter((s)=>{ return s.problemId == problemList[i].problemId });
        probStorage.push(filtered);
    }
    console.log(probStorage);
    //======================================================================================


    // for(let i=0; i<problemList.length; i++){
    //         let filtered = Array.from(suggestList).filter((s)=>{ return s.problemId == problemList[i].problemId });
    //         probStorage.push(filtered);
    //     // }



    return(
        <>
        </>
    )
}
export default Accordion;