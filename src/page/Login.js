import { React, useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { setJwtAtStorage } from '../utils/useLocalStorage';
import logo_detail from '../image/logo_detail.png';

const Login = ({ setNavVisible, setAuthentication }) => {
  setNavVisible(false);
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/Register")
  }

  const CLIENT_ID = "c0e623d493a756e23825d84d5a28587a";
  const REDIRECT_URI = "http://3.36.254.187:3000/main";

  // 프런트엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

  // 백엔드 리다이랙트 URI 예시
  // const REDIRECT_URI =  "http://localhost:5000/kakao/code";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  
  const [username, setId] = useState(null);
  const [password, setPassword] = useState(null);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`http://3.36.254.187:8000/user/token/`, { username, password })
      console.log(response)
      const token = response.data.access;
      console.log(token)
      setAuthentication(true);
      const { user_id } = jwt_decode(token);
      const { nickname } = jwt_decode(token);
      localStorage.setItem('nickname', nickname);
      setJwtAtStorage('jwtToken', token);
      
      notification.open({
        message: "로그인 성공",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
      navigate('/main')
    }
    catch (e) {

      notification.open({
        message: "로그인 실패",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
    }
  }

  return (

    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Form className="LoginForm" onSubmit={onSubmit} style={{ marginTop: '50px', width: '300px'}}>

        <div className="logoImage" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom : '30px' }}>
          <Link to="/"><img src={logo_detail} width="250" height="120" /></Link>
        </div>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="이메일" onChange={e => setId(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
          <div style={{ float: "right", fontSize : "10pt" }}><Link to="/FindPassword" setNavVisible={true} style={{ textDecoration: 'none' }}>비밀번호 찾기</Link></div>
        </Form.Group>

        <br />

        <div className='loginButton mt-3'>
          <Button className="w-100 mb-2" style={{ backgroundColor: '#4A93FF', border: 'none' }} type="submit" >로그인</Button>
          <hr />
          <p style={{ textAlign : 'center', fontSize : "10pt" }}>HED의 회원이 아니신가요? <Link to='/Register' style={{ textDecoration: 'none' }}>회원가입</Link></p>


        </div>




        {/* 
          <Row>
            
          </Row> */}

      </Form>


    </div>
  )
}

export default Login
