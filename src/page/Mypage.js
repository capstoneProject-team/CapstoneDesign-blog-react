import React, { useState } from 'react'
import getStorageItem from '../utils/useLocalStorage'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { Row, Col } from 'react-bootstrap'
// import backgroundImagetest from '../image/background.jpeg';

import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from '../utils/useLocalStorage';
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";
import { Container } from 'react-bootstrap';


const Mypage = ({ setAuthentication, setNavVisible }) => {
  setNavVisible(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameshow, setnameShow] = useState(false);
  const namehandleClose = () => setnameShow(false);
  const namehandleShow = () => setnameShow(true);

  const token = getStorageItem('jwtToken', '')[0]
  const [jwtToken, setJwtToken] = useLocalStorage("jwtToken", "");
  const { user_id } = jwt_decode(token);
  console.log(user_id)
  let nickname = localStorage.getItem('nickname');
  const { email } = jwt_decode(token);
  const {location} = jwt_decode(token);
  const [changeName, setChangeName] = useState('');
  console.log(token);


  const updateName = async (event) => {
    event.preventDefault();
    console.log(changeName)
    try {
      let nickname = changeName;
      //바뀐 jwt token이 response에 들어올 예정
      const response = await Axios.patch(`${process.env.REACT_APP_LOCAL_DJ_IP}user/edit/info/${user_id}/`, { nickname })
      localStorage.setItem("nickname", response.data.nickname);
      // const tokenChange = response.data.access;
      // setJwtToken(tokenChange);
      // console.log(tokenChange);

      namehandleClose();
      notification.open({
        message: "이름변경 성공",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
    } catch (e) {
      notification.open({
        message: "이름변경 실패! 다시 시도해주세요..",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
    }
  }
  const deleteAccount = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(`${process.env.REACT_APP_LOCAL_DJ_IP}user/delete/${user_id}/`)
      window.localStorage.clear();
      handleClose();
      notification.open({
        message: "계정삭제 성공",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
      setAuthentication(false);
      navigate('/')
    } catch (e) {
      console.log(e)
      notification.open({
        message: "계정삭제 실패, 다시 시도해 주세요.",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });

    }
  }
  return (
    <div>
      <br/>
      <Container style={{paddingLeft : '6%', paddingRight : '6%'}}>
        <h3><b>마이페이지</b></h3> <hr />
        <div>
          <Form style={{padding: '20px'}}>
            
            <div className="myPageCard" style={{display : 'flex', justifyContent : 'center', margin : '30px'}}>
              <div className='explain' style={{width : '300px'}}>
                <h5><b>닉네임 변경</b></h5>
                <p style={{width:'200px'}}>사용자가 원하는 닉네임으로 언제든지 변경이 가능합니다.</p>
              </div>

            <div className="box" style={{width : '500px', padding : '30px'}}>
            <Form.Label>닉네임</Form.Label>
              <Form.Group id="inputGroup-sizing-default">
                <Form.Control
                  onChange={(event) => setChangeName(event.target.value)}
                  placeholder={nickname}
                  aria-describedby="inputGroup-sizing-small"/>
                  <br/>
                  <Button style={{ backgroundColor: '#4A93FF', border: 'none', float:"right"}} variant='primary' onClick={namehandleShow}>변경사항 저장</Button>
              </Form.Group></div>
            </div>


            <div className="myPageCard" style={{display : 'flex', justifyContent : 'center', margin : '30px'}}>
              <div className='explain' style={{width : '300px'}}>
                <h5><b>개인정보</b></h5>
                <p style={{width:'200px'}}>사용자가 회원가입 시 입력한 개인정보를 확인할 수 있습니다.</p>
              </div>

            <div className="box" style={{width : '500px', padding : '30px'}}>
              <Form.Group id="inputGroup-sizing-default">
              <Form.Label>E-mail</Form.Label>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={email}
                readOnly
                />
                <br/>
              <Form.Label>지역</Form.Label>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={location}
                readOnly
                />
              </Form.Group>

              </div>
            </div>

            <div className="myPageCard" style={{display : 'flex', justifyContent : 'center', margin : '30px'}}>
              <div className='explain' style={{width : '300px'}}>
                <h5><b>회원 탈퇴</b></h5>
              </div>

            <div className="box" style={{width : '500px', padding : '30px', textAlign : 'center'}}>
            <Button variant="danger" onClick={handleShow} style={{width : '200px'}}>
              회원 탈퇴 진행
            </Button>
            </div>
          </div>

            <Modal show={nameshow} onHide={namehandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>이름 변경</Modal.Title>
              </Modal.Header>
              <Modal.Body>이름을 변경하시겠습니까?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={namehandleClose}>
                  취소
                </Button>
                <Button type="submit" onClick={updateName}>
                  변경
                </Button>
              </Modal.Footer>
            </Modal>


            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>계정 삭제</Modal.Title>
              </Modal.Header>
              <Modal.Body>계정을 삭제하시겠습니까?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  취소
                </Button>
                <Button variant="danger" onClick={deleteAccount}>
                  삭제
                </Button>
              </Modal.Footer>
            </Modal>
          </Form>
        </div>
        <br />
      </Container>


    </div>
  )
}

export default Mypage