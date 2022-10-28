import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";
import styles from "../styles/pages/MyPage.module.css";
import {useState,useEffect} from "react";
import { useNavigate } from 'react-router-dom';

//마이페이지
function Mypage(){
    const [isProfile,setIsProfile] = useState(true);
    const [isBookmarks,setIsBookmarks] = useState(false);
    const navigate = useNavigate();
    
    const changeRadio =(e)=>{
        if(e.target.value == "profile"){
            setIsProfile(true);
            setIsBookmarks(false);
            console.log(e.target.value);
        }else{
            setIsProfile(false);
            setIsBookmarks(true);
            console.log(e.target.value);
        }
    }

    useEffect(()=>{
        
    },[])

    return(
        <div className={styles.container}>
            <div className={styles.radioContainer}>
                <input 
                    id="1" 
                    name="tab" 
                    type="radio"
                    onChange={changeRadio}
                    value="profile"
                    defaultChecked
                    className={isProfile ? `${styles.active}` : null} />
                <label htmlFor="1">내정보</label>
                <input 
                    id="2" 
                    name="tab" 
                    type="radio" 
                    onChange={changeRadio} 
                    value="bookmarks"
                    className={isBookmarks ? `${styles.active}` : null} />
                <label htmlFor="2">북마크</label>
            </div>
            <div className={isProfile ? `${styles.activeContent}` : `${styles.inactive}`} >
                <Profile/>  
            </div>
            <div className={isBookmarks ? `${styles.activeContent}` : `${styles.inactive}`} >
                <Bookmarks/>    
            </div>
        </div>
    )
}


export default Mypage;