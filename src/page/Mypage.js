import React, { useState } from 'react'
import  { getJwtAtStorage } from '../utils/useLocalStorage'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import Axios from "axios";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../static/CSS/Mypage.css"


const Mypage = ({ setAuthentication, setNavVisible }) => {
  setNavVisible(true);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [nameshow, setnameShow] = useState(false);
  const namehandleClose = () => setnameShow(false);
  const namehandleShow = () => setnameShow(true);

  const token = getJwtAtStorage(); // getStorageItem('jwtToken', '')[0]
  const { user_id } = jwt_decode(token);
  let nickname = localStorage.getItem('nickname');
  const { email } = jwt_decode(token);
  const {location} = jwt_decode(token);
  const [changeName, setChangeName] = useState('');

  const updateName = async (event) => {
    event.preventDefault();

    try {
      let nickname = changeName;

      const response = await Axios.patch(`http://3.36.254.187:8000/user/edit/info/${user_id}/`, { nickname }, 
      {headers: {Authorization: `Bearer ${token}`}})
      localStorage.setItem("nickname", response.data.nickname);


      namehandleClose();
      notification.open({
        message: "이름변경 성공",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'bottomeRight'
      });
    } catch (e) {
      notification.open({
        message: "이름변경 실패! 다시 시도해주세요..",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'bottomeRight'
      });
    }
  }
  const deleteAccount = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(`http://3.36.254.187:8000/user/delete/${user_id}/`)
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
      <div className="containerMypage">
        <div>
          <Form>
            <div className="myPageCard" >
              <div className='explain'>
                <h5><b>닉네임 변경</b></h5>
                <p className="explain2">사용자가 원하는 닉네임으로 언제든지 변경이 가능합니다.</p>
              </div>

            <div className="mypageBox" >
            <Form.Label>닉네임</Form.Label>
              <Form.Group id="inputGroup-sizing-default">
                <Form.Control
                  onChange={(event) => setChangeName(event.target.value)}
                  placeholder={nickname}
                  aria-describedby="inputGroup-sizing-small"/>
                  <br/>
                  <Button id="changeButton" onClick={namehandleShow}>변경사항 저장</Button>
              </Form.Group></div>
            </div>


            <div className="myPageCard" >
              <div className='explain'>
                <h5><b>개인정보</b></h5>
                <p className="explain2">사용자가 회원가입 시 입력한 개인정보를 확인할 수 있습니다.</p>
              </div>

            <div className="mypageBox">
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

            <div className="myPageCard" >
              <div className='explain'>
                <h5><b>회원 탈퇴</b></h5>
              </div>

            <div className="deleteBox">
            <Button variant="danger" id="deleteButton" onClick={handleShow} style={{width : "200px"}}>
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
      </div>


    </div>
  )
}

export default Mypage