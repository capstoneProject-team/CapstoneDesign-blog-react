import React, { useState } from 'react'
import getStorageItem from '../utils/useLocalStorage'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { notification } from "antd";
import { SmileOutlined, FrownOutlined } from "@ant-design/icons";
import useLocalStorage from '../utils/useLocalStorage';
import Axios from "axios";
import jwt_decode from "jwt-decode";
import InputGroup from 'react-bootstrap/InputGroup';
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
  let { nickname } = jwt_decode(token);
  const { email } = jwt_decode(token);
  const [changeName, setChangeName] = useState('');


  const updateName = async (event) => {
    event.preventDefault();
    console.log(changeName)
    try {
      let nickname=changeName
      const response = await Axios.patch(`${process.env.REACT_APP_LOCAL_DJ_IP}user/edit/info/${user_id}/`,{nickname})
      console.log(token)
      // const response2 = await Axios.post(`${process.env.REACT_APP_LOCAL_DJ_IP}user/token/`,{token})
      // console.log(response2)
      // const token = response2.data.access;
      // console.log(token)
      // setJwtToken(token);
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
        <Container >
          {/* <form action='' method='update'> */}
          <Form>
            <h3>마이페이지</h3>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                이름
              </InputGroup.Text>
              <Form.Control
                onChange={(event) => setChangeName(event.target.value)}
                placeholder={nickname}
                aria-describedby="inputGroup-sizing-small"
              />
            </InputGroup>
            <InputGroup className="mb-3">
              <InputGroup.Text id="inputGroup-sizing-default">
                Email
              </InputGroup.Text>
              <Form.Control
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
                value={email}
                readOnly
              />
            </InputGroup>
            <Button variant='primary' onClick={namehandleShow}>이름 변경</Button>

            <Button variant="danger" onClick={handleShow}>
              계정 삭제
            </Button>


            <Modal show={nameshow} onHide={namehandleClose}>
              <Modal.Header closeButton>
                <Modal.Title>이름 변경</Modal.Title>
              </Modal.Header>
              <Modal.Body>이름을 변경하시겠습니까?</Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={namehandleClose}>
                  취소
                </Button>
                <Button variant="danger" type="submit" onClick={updateName}>
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
          <br />

        </Container>

      </div>
    )
  }

  export default Mypage