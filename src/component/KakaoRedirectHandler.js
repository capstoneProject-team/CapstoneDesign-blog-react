import React, { useEffect } from "react";
import Axios from 'axios';
import {  useNavigate } from "react-router-dom";
const KakaoRedirectHandler = ({setAuthentication}) => {
  const navigate = useNavigate();
  useEffect(()=> {
    let params = new URL(document.location.toString()).searchParams;
    let code = params.get("code"); // 인가코드 받는 부분
    let grant_type = "authorization_code";
    let client_id = "c0e623d493a756e23825d84d5a28587a";

    Axios.post(`https://kauth.kakao.com/oauth/token?
        grant_type=${grant_type}
        &client_id=${client_id}
        &redirect_uri=http://localhost:3000/main
        &code=${code}`
        , {
    headers: {
        'Content-type': 'application/x-www-form-urlencoded;charset=utf-8'
    }
  }).then((res) => {
      console.log(res)
      setAuthentication(true);
      
      // res에 포함된 토큰 받아서 원하는 로직을 하면된다.
  })
  }, [])

  return <div>
        {navigate('/main')}
  </div>;
};

export default KakaoRedirectHandler;