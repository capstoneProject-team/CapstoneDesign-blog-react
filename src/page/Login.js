import { React, useState} from 'react'
import { Button, Form } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { notification, Divider } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import jwt_decode from "jwt-decode";
import Axios from "axios";
import { setJwtAtStorage } from '../utils/useLocalStorage';
import logo_detail from '../image/logo_detail.png';
import "../static/CSS/Login.css";

const Login = ({ setNavVisible, setAuthentication }) => {
  setNavVisible(false);
  const navigate = useNavigate();
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
      const { nickname } = jwt_decode(token);
      localStorage.setItem('nickname', nickname);
      setJwtAtStorage('jwtToken', token);
      
      notification.open({
        message: "로그인 성공",
        icon: <SmileOutlined id='notification'/>,
        placement: 'topRight'
      });
      navigate('/main')
    }
    catch (e) {
      notification.open({
        message: "로그인 실패",
        icon: <FrownOutlined id='notification'/>,
        placement: 'topRight'
      });
    }
  }

  return (
    <div className='div1Login'>
      <Form className="loginForm" onSubmit={onSubmit}>
        <div className="logoImage">
          <Link to="/"><img src={logo_detail} id='logoImage' /></Link>
        </div>

        <Form.Group className="mb-3 mt-3" controlId="formBasicEmail">
          <Form.Label>E-mail</Form.Label>
          <Form.Control type="email" placeholder="이메일" onChange={e => setId(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>비밀번호</Form.Label>
          <Form.Control type="password" placeholder="비밀번호" onChange={e => setPassword(e.target.value)} />
          <div id='findPassword'><Link to="/FindPassword" setNavVisible={true} id='link'>비밀번호 찾기</Link></div>
        </Form.Group>

        <br />

        <div className='loginButton mt-3'>
          <Button className="w-100" id='loginButton' type="submit" >로그인</Button>
          <Divider/>
          <p id='register'>HED의 회원이 아니신가요? <Link to='/Register' id='link'>회원가입</Link></p>
        </div>
      </Form>
    </div>
  )
}

export default Login
