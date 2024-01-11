import { Route, Routes } from 'react-router-dom';
import Landing from "./pages/Landing";
import UserLogin from "./pages/user/UserLogin";
import UserRegister from "./pages/user/UserRegister";
import Mypage from "./pages/user/Mypage";
import Main from "./pages/Main";
import RecordSearch from "./pages/record/RecordSearch";
import RecordImage from "./pages/record/RecordImage";
import SearchRestaurant from "./pages/functional/SearchRestaurant";
import RecommendFridge from "./pages/functional/RecommendFridge";
import AnalyzeDiet from "./pages/functional/AnalyzeDiet";
import Detail from "./pages/record/Detail";
import EditRecord from './pages/record/EditRecord';
import KakaoUserLogin from "./pages/user/KakaoUserLogin";
import OnBoard from "./pages/user/OnBoard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import PublicRoute from './components/Routes/PublicRoute';
import CommunityMain from "./pages/community/CommunityMain";
import CommunityMypage from "./pages/community/CommunityMypage";
import BlogPost from "./pages/community/BlogPost";
import BlogDetail from "./pages/community/BlogDetail";
import BlogUpdate from "./pages/community/BlogUpdate";
import NotFound from './pages/NotFound';

function App() {
  //커뮤니티에 접속중일때 로컬스토리지에 접속여부를 저장
  //커뮤니티 접속 버튼 클릭시 setItem, 로그아웃 혹은 채삐관련 페이지로 이동 시 removeItem.
  const isCommunity = localStorage.getItem('community');
  
  return (
    <>
          <Routes>
            <Route path='/' element={<Landing/>}/>
            <Route element={<PrivateRoute />}>
              {/* 채삐 관련 페이지 ============================================== */}
              <Route path='/manage-record' element={<Main />} exact/>
              <Route path='/analyze-diet' element={<AnalyzeDiet/>}/>
              <Route path='/record-foodsearch'element={<RecordSearch/>}/>
              <Route path='/record-foodimage'element={<RecordImage/>}/>
              <Route path='/detail/:r_id' element={<Detail/>}/>
              <Route path='/detail/:r_id/edit' element={<EditRecord/>}/>
              <Route path='/search-restaurant' element={<SearchRestaurant/>}/>
              <Route path='/recommend-fridge-ingredients' element={<RecommendFridge/>}/>
              <Route path='/mypage' element={<Mypage/>}/>
              <Route path="/error/:error" element={<NotFound />} />
              <Route path="*" element={<NotFound />} />
            </Route>

            {/* 유저 인증 =================================================== */}
            <Route element={<PublicRoute />}>
              <Route path='/sign_up' element={<UserRegister/>}/>
              <Route path='/sign_in' element={<UserLogin/>}/>
              <Route path='/kakao_login' element={<KakaoUserLogin/>}/>
              <Route path='/on_board' element={<OnBoard/>}/>
            </Route>

            {/* 채숲 ======================================================= */}
            {/* <Route path='/community' element={<CommunityMain/>}/>
            <Route path='/community-mypage' element={<CommunityMypage/>}/>
            <Route path='/community/posting' element={<BlogPost/>}></Route>
            <Route path='/community/detail/:postIdx' element={<BlogDetail/>}/>
            <Route path='/community/detail/:postIdx/edit' element={<BlogUpdate/>}/> */}
          </Routes>
    </>
  );
}

export default App;
