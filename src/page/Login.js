import { React, useState, useEffect } from 'react'
import { Button, Col, Row, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import useLocalStorage from '../utils/useLocalStorage';
import logo_detail from '../image/logo_detail.png';
import kakao_img from '../image/kakao_login_medium_wide.png';

const Login = ({ setNavVisible, setAuthentication }) => {
  setNavVisible(false);
  const navigate = useNavigate();

  const navigateRegister = () => {
    navigate("/Register")
  }
  
  const CLIENT_ID = "c0e623d493a756e23825d84d5a28587a";
  const REDIRECT_URI =  "http://localhost:3000/main";

// 프런트엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:3000/oauth/callback/kakao";

// 백엔드 리다이랙트 URI 예시
// const REDIRECT_URI =  "http://localhost:5000/kakao/code";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const [username, setId] = useState(null);
  const [password, setPassword] = useState(null);
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", ""); //local 에 저장
  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/token/`, { username, password })
      console.log(response)
      const token = response.data.access;
      console.log(token)
      setAuthentication(true);
      const { user_id } = jwt_decode(token);
      setJwtToken(token);
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


      <Form className="LoginForm" onSubmit={onSubmit}>
      <Link to="/"><img src={logo_detail} width="300" height="150" /></Link>
        
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="Enter email" onChange={e => setId(e.target.value)} />

        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <div style={{ float: "right"}}><Link to="/FindPassword" setNavVisible={true} style={{textDecoration: 'none'}}>비밀번호 찾기</Link></div>
        </Form.Group>
        
        <br/>

        <Col className='loginButton'>
          <Row>
            <Button className="w-100" variant="primary" type="submit" >로그인</Button>
          </Row><br/>
          <Row>
            <a href={KAKAO_AUTH_URL}>
              <img src={kakao_img} />
            </a>
          </Row>
          <hr />
          <Row>
            <Button variant="outline-primary" onClick={navigateRegister}>회원가입</Button>
          </Row>
        </Col>



      </Form>


    </div>
  )
}

export default Login