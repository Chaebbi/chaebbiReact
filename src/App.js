import styled from "styled-components";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navigation from "./components/Navigation";
import Test from "./pages/Test";
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

function App() {
  const insertedToken = localStorage.getItem('token');
  return (
    <Container>
      <BrowserRouter>
        <Navigation/>

        <Subcontainer>
          <Routes>
            {insertedToken ?
              <Route path='/' element={<Main/>}></Route>
              : 
              <Route path='/' element={<Landing/>}></Route>
            }
            <Route path='/analyze-diet' element={<AnalyzeDiet/>}></Route>
            
            <Route path='/sign_up' element={<UserRegister/>}></Route>
            <Route path='/sign_in' element={<UserLogin/>}></Route>
            <Route path='/kakao_login' element={<KakaoUserLogin/>}></Route>
            <Route path='/on_board' element={<OnBoard/>}></Route>

            <Route path='/record-foodsearch'element={<RecordSearch/>}></Route>
            <Route path='/record-foodimage'element={<RecordImage/>}></Route>
            <Route path='/detail/:r_id' element={<Detail/>}></Route>

            <Route path='/search-restaurant' element={<SearchRestaurant/>}></Route>
            <Route path='/recommend-fridge-ingredients' element={<RecommendFridge/>}></Route>

            <Route path='/mypage' element={<Mypage/>}></Route>
            <Route path='/test' element={<Test/>}></Route>
          </Routes>


          {/* <PublicRoute restricted={true} component={UserRegister} path="/sign_up" exact />
          <PublicRoute restricted={true} component={UserLogin} path="/sign_in" exact />
          <PublicRoute restricted={true} component={KakaoUserLogin} path="/kakao_login" exact />
          <PublicRoute restricted={true} component={OnBoard} path="/on_board" exact />

          <PrivateRoute component={AnalyzeDiet} path="/analyze-diet" exact /> 

            <PrivateRoute component={RecordSearch} path="/record-foodsearch" exact /> 
            <PrivateRoute component={RecordSearch} path="/record-foodsearch" exact /> 
            <PrivateRoute component={RecordImage} path="/record-foodimage" exact /> 
            <PrivateRoute component={Detail} path="/detail" exact /> 

            <PrivateRoute component={SearchRestaurant} path="/search-restaurant" exact /> 
            <PrivateRoute component={RecommendFridge} path="/recommend-fridge-ingredients" exact /> 

            <PrivateRoute component={Mypage} path="/mypage" exact /> 
            <Route component={NotFound}/> */}
        </Subcontainer>
      </BrowserRouter>
    </Container>
  );
}

const Container = styled.div`
  padding: 0px;
  width: 100%;
  height: 100%;
`;

const Subcontainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  top: 60px;
  z-index: 0;
`;

export default App;
