import React, {useState} from 'react'
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import {notification} from "antd";
import Axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import {SmileOutlined, FrownOutlined} from "@ant-design/icons";
import { getJwtAtStorage } from '../utils/useLocalStorage';



const FindPassword = ({setNavVisible}) => {
  setNavVisible(true);
  
  const navigate = useNavigate();
  const [user_id,setUser_id] =useState('');
  let [user, setUser] = useState({
    username: '',
    hint1: '',
    hint2: ''
  });
  const [newPassword, setNewPassword] = useState({
    password1 : '',
    password2 : ''
  });
  const[visible, setVisible] = useState(false);
  
  const handleChange = (event) => {
    event.preventDefault();
    setUser({ ...user, [event.target.name]: event.target.value});
  };
   
  const handlePassword = (event) => {
    event.preventDefault();
    setNewPassword({...newPassword, [event.target.name]: event.target.value});
  };

  const onSubmit1 = async (event) => {
    event.preventDefault();
    console.log(user);

    try {
        const response = await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/findPassword/`,{user})

        setUser_id(response.data[0].id);
        notification.open({
          message:"인증 성공!",
          description:"변경할 비밀번호를 입력해주세요.",
          icon:<SmileOutlined/>
        });

        setVisible(!visible);
        
      }
    
    catch(e) {
      if (e.response) {
        notification.open({
          message:"인증 실패!",
          description:"이메일 혹은 답변을 확인해주세요.",
          icon:<FrownOutlined/>
        })
      }
    };
  };

  const onSubmit2 = async (event) => {
    event.preventDefault();
    console.log(newPassword);

    try {
      const password=newPassword.password1
      await Axios.patch(`${process.env.REACT_APP_LOCAL_DJ_IP}user/edit/pwd/${user_id}/`,{password},{ headers: { Authorization: `Bearer ${getJwtAtStorage()}`}})
      notification.open({
        message:"비밀번호 변경 성공!",
        icon:<SmileOutlined/>
      });
      navigate('/login');
    }
  
  catch(e) {
    if (e.response) {
      notification.open({
        message:"비밀번호 변경 실패!",
        description:"무엇이 문제일까요?",
        icon:<SmileOutlined/>
      })
    }
  };
}

    return (
    <Container style={{paddingLeft : "20%", paddingRight : "20%"}}>
        <Col>
          <Row className="mt-3"><h2>본인 인증</h2>
            <p>*본인 확인을 위해 가입 이메일과 회원가입 시 입력했던 힌트에 답변해주세요.</p></Row>
          <Col>
            <Row>
              <Form onSubmit={onSubmit1}>
              <Form.Group className="mb-3" controlId="username">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="text" name="username" placeholder="가입 시 입력했던 이메일을 입력해주세요."
                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="hint2">
                  <Form.Label>가장 좋아하는 색깔은?</Form.Label>
                  <Form.Control type="text" name="hint1" placeholder="ex) 검정색"
                  onChange={handleChange}/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="hint2">
                  <Form.Label>가장 좋아하는 음식은?</Form.Label>
                  <Form.Control type="text" name="hint2" placeholder="ex) 떡볶이"
                  onChange={handleChange}/>
                </Form.Group>

                <Button  style={{ backgroundColor: '#4A93FF', border: 'none', float : "right", width : "100px" }} type="submit">
                  인증하기
                </Button>
                </Form>
            </Row>
          </Col>
        

        {visible && <div>
          <Row className="mt-3">
            <hr/>
            <h2>비밀번호 변경</h2>
            <p>새로운 비밀번호를 입력해주세요.</p>
          </Row>
          <Row>
            <Form onSubmit={onSubmit2}>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="newPassword">
                  <Form.Label>새 비밀번호</Form.Label>
                  <Form.Control type="password" name="password1" placeholder="새 비밀번호" onChange={handlePassword}/>
                </Form.Group>

                <Form.Group as={Col} controlId="newPasswordCheck">
                  <Form.Label>새 비밀번호 확인</Form.Label>
                  <Form.Control type="password" name='password2' placeholder="새 비밀번호 확인" onChange={handlePassword}/>
                </Form.Group>
              </Row>

              <Button  style={{ backgroundColor: '#4A93FF', border: 'none', float : "right", width : "100px" }} type="submit">
                완료
              </Button>

            </Form>
          </Row>
          </div>}
        </Col>
      </Container>
          )
      }


export default FindPassword