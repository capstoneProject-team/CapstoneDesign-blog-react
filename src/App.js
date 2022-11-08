import {React,useState,useEffect} from 'react'
import { Routes, Route ,Navigate} from "react-router-dom";
import Introduce from './page/Introduce';
import Login from "./page/Login";
import DiaryCreate from "./page/DiaryCreate";
import DiaryDetail from "./page/DiaryDetail";
import DiaryList from "./page/DiaryList";
import FindPassword from "./page/FindPassword";
import Main from "./page/Main";
import Mypage from "./page/Mypage";
import Register from "./page/Register";
import './App.css';
import 'antd/dist/antd.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from './component/Navigation';
import KakaoRedirectHandler from './component/KakaoRedirectHandler';
import getStorageItem from './utils/useLocalStorage';

function App() {
  let jwtBoolean = '' ;
  localStorage.getItem('jwtToken') == null ? jwtBoolean=false : jwtBoolean=true;
  let [isAuthenticated , setAuthentication] = useState(jwtBoolean);
  let [navVisible,setNavVisible] = useState(jwtBoolean);
  
  return (
    <div>
    {navVisible && <Navigation isAuthenticated={isAuthenticated}  setAuthentication={setAuthentication}/>}
      <Routes>
        <Route path="/" element={<Introduce setNavVisible={setNavVisible}/>}/>
        <Route path="/diary-create" element={isAuthenticated==true ? <DiaryCreate authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-detail" element={isAuthenticated==true ? <DiaryDetail authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/diary-list" element={isAuthenticated==true ? <DiaryList authentication={isAuthenticated} setNavVisible={setNavVisible}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/login"  element={<Login setAuthentication={setAuthentication} setNavVisible={setNavVisible}/>}/>
        <Route path="/oauth/callback/kakao" element=<KakaoRedirectHandler setAuthentication={setAuthentication}/>/>
        <Route path="/main" element={isAuthenticated ? <Main authentication={isAuthenticated} setNavVisible={setNavVisible} setAuthentication={setAuthentication}/> : <Navigate replace to="/" />} />
        <Route path="/Mypage" element={isAuthenticated==true ? <Mypage authentication={isAuthenticated} setNavVisible={setNavVisible} setAuthentication={setAuthentication}/> : <Login authentication={isAuthenticated} setAuthentication={setAuthentication}/>}/>
        <Route path="/Register" element={<Register setNavVisible={setNavVisible}/>}/>
        <Route path="/FindPassword" element={<FindPassword setNavVisible={setNavVisible}/>}/>
      </Routes>
    </div>

  );
}

export default App;
