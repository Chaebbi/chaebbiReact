import styled from "styled-components";
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Landing from "./pages/Landing";
import UserLogin from "./pages/UserLogin";
import UserRegister from "./pages/UserRegister";
import Mypage from "./pages/Mypage";
import Main from "./pages/Main";
import RecordSearch from "./pages/RecordSearch";
import RecordImage from "./pages/RecordImage";
import SearchRestaurant from "./pages/SearchRestaurant";
import RecommendFridge from "./pages/RecommendFridge";
import AnalyzeDiet from "./pages/AnalyzeDiet";
import Detail from "./pages/Detail";
import KakaoUserLogin from "./pages/KakaoUserLogin";
import OnBoard from "./pages/OnBoard";
import PrivateRoute from "./components/Routes/PrivateRoute";
import Test from "./pages/Test";
import CommunityMain from "./pages/community/CommunityMain";
import CommunityMypage from "./pages/community/CommunityMypage";
import BlogPost from "./pages/community/BlogPost";
import BlogDetail from "./pages/community/BlogDetail";
import BlogUpdate from "./pages/community/BlogUpdate";

function App() {
  //커뮤니티에 접속중일때 로컬스토리지에 접속여부를 저장
  //커뮤니티 접속 버튼 클릭시 setItem, 로그아웃 혹은 채삐관련 페이지로 이동 시 removeItem.
  const isCommunity = localStorage.getItem('community');
  return (
    <>
    <Container>
      <Router>
        <Navigation/>
        <Subcontainer>
          <Routes>
            <Route path='/landing' element={<Landing/>}/>
            <Route element={<PrivateRoute />}>
              {/* 채삐 관련 페이지=============================================== */}
              <Route path='/' element={<Main />} exact/>
              <Route path='/analyze-diet' element={<AnalyzeDiet/>}/>
              <Route path='/record-foodsearch'element={<RecordSearch/>}/>
              <Route path='/record-foodimage'element={<RecordImage/>}/>
              <Route path='/detail/:r_id' element={<Detail/>}/>
              <Route path='/search-restaurant' element={<SearchRestaurant/>}></Route>
              <Route path='/recommend-fridge-ingredients' element={<RecommendFridge/>}></Route>
              <Route path='/mypage' element={<Mypage/>}></Route>

            </Route>
              {/* 채숲 관련 페이지=============================================== */}
              <Route path='/community' element={<CommunityMain/>}></Route>
              <Route path='/community-mypage' element={<CommunityMypage/>}></Route>
              <Route path='/community/posting' element={<BlogPost/>}></Route>
              <Route path='/community/detail/:postIdx' element={<BlogDetail/>}></Route>
              <Route path='/community/detail/:postIdx/edit' element={<BlogUpdate/>}></Route>
          
            
            <Route path='/sign_up' element={<UserRegister/>}/>
            <Route path='/sign_in' element={<UserLogin/>}/>
            <Route path='/kakao_login' element={<KakaoUserLogin/>}/>
            <Route path='/on_board' element={<OnBoard/>}></Route>


            <Route path='/test' element={<Test/>}></Route>
          </Routes>
        </Subcontainer>
      </Router>
    </Container>
    </>
  );
}

const Container = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
`;

const Subcontainer = styled.div`
  width: 100%;
  height: 800px;
  position: relative;
  top: 60px;
  z-index: 0;
`;

export default App;
