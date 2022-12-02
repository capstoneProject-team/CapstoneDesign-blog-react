import {React,useState,useEffect} from 'react'
import { Routes, Route ,Navigate} from "react-router-dom";
import Introduce from './page/Introduce';
import Login from "./page/Login";
import DiaryCreate from "./page/DiaryCreate";
import DiaryDetail from "./page/DiaryDetail";
import DiaryEdit from "./page/DiaryEdit";
import DiaryList from "./page/DiaryList";
import FindPassword from "./page/FindPassword";
import Main from "./page/Main";
import Mypage from "./page/Mypage";
import Register from "./page/Register";
import './App.css';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';
import Footer from './component/footer';
import KakaoRedirectHandler from './component/KakaoRedirectHandler';
import getStorageItem from './utils/useLocalStorage';

function App() {
  let jwtBoolean = '' ;
  localStorage.getItem('jwtToken') == null ? jwtBoolean=false : jwtBoolean=true;
  let [isAuthenticated , setAuthentication] = useState(jwtBoolean);
  let [navVisible,setNavVisible] = useState(jwtBoolean);
  let [page, setPage] = useState(1);
  let [searchInput, setSearchInput] = useState("");
  return (
    <div>
    {navVisible && <Navigation isAuthenticated={isAuthenticated} setAuthentication={setAuthentication} setPage={setPage} setSearchInput={setSearchInput} searchInput={searchInput}/>}
      <div className="topPadding" id="font-family">
      <Routes>
        <Route path="/" element={<Introduce setNavVisible={setNavVisible} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-create" element={isAuthenticated==true ? <DiaryCreate authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-detail/:post_id" element={isAuthenticated==true ? <DiaryDetail authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-list" element={isAuthenticated==true ? <DiaryList authentication={isAuthenticated} setNavVisible={setNavVisible} setPage={setPage} page={page} setSearchInput={setSearchInput} searchInput={searchInput}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/login"  element={<Login setAuthentication={setAuthentication} setNavVisible={setNavVisible}/>}/>
        <Route path="/oauth/callback/kakao" element={<KakaoRedirectHandler setAuthentication={setAuthentication}/>}/>
        <Route path="/main" element={isAuthenticated ? <Main authentication={isAuthenticated} setNavVisible={setNavVisible} setAuthentication={setAuthentication}/> : <Navigate replace to="/" />} />
        <Route path="/Mypage" element={isAuthenticated==true ? <Mypage authentication={isAuthenticated} setNavVisible={setNavVisible} setAuthentication={setAuthentication}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/Register" element={<Register setNavVisible={setNavVisible}/>}/>
        <Route path="/FindPassword" element={<FindPassword setNavVisible={setNavVisible}/>}/>
        <Route path="/diary-edit/:post_id" element={isAuthenticated==true ? <DiaryEdit authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
      </Routes>
      <Footer/></div>
    </div>

  );
}

export default App;
