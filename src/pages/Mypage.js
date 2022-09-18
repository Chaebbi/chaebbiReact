import Profile from "../components/Profile";
import Bookmarks from "../components/Bookmarks";

//마이페이지==> 상단엔 프로필, 하단엔 즐겨찾기 조회
function Mypage(){
    return(
        <>
            <Profile/>
            <Bookmarks/>
        </>
    )
}


export default Mypage;