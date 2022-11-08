import React from 'react'
import Button from 'react-bootstrap/Button';
import { Routes, Route ,Link, Form} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';




const Introduce = ({setNavVisible, setAuthentication}) => {

  setNavVisible(true);
  setAuthentication(false);

  return (
    <div>

​      <Container className="align-items-center justify-content-center">
​        <Row >
​          <Col className="text-center">

              <h2>오늘 하루 어떠셨나요?</h2>
              <h3>내 이야기를 기록해보세요.<br/>오늘 나의 감정을 분석해줍니다 :)</h3>
              <h6>HED를 통해 나를 자세히 알아보세요!</h6>

​              <Link to="/login"><Button variant="info">Start</Button></Link>
​          </Col>
​          <Col>
​          <img alt="" src="/logo.svg" width="300" height="300"/>
​          </Col>
​        </Row>

​        <Row><Col className='text-center'><h2>HED와 함께 소중한 하루를 마무리해보세요</h2></Col></Row>
​        <Row>
​          <Col className='text-center'><img alt="" width="300" height="300"/><br/><h5>일기내용을 통한 감정분석</h5></Col>
​          <Col className='text-center'><img alt="" width="300" height="300"/><br/><h5>일기내용을 통한 감정분석</h5></Col>
​          <Col className='text-center'><img alt="" width="300" height="300"/><br/><h5>일기내용을 통한 감정분석</h5></Col>
​          </Row>

​        <Row>
​          <Col className='text-center'><h5>HED는 특별한 경험을 선사하는 일기장입니다</h5></Col>
​          <Col><img alt="" width="300" height="300"/></Col>
​        </Row>
​        <Row>
​          <Col><img alt="" width="300" height="300"/></Col>
​          <Col className='text-center'><h5>내 삶의 순간을 기록하고 저장</h5><br/><h6>HED는 어떤 식으로 구성되어있고, 사용자가 유용하고 
편리하게 할 수 있도록 개발되었다. 이거는 예시로 작성
하는 설명이다.</h6></Col>
​        </Row>
​        <Row>
​          <Col className='text-center'><h5>감정분석을 통한 나의 컨디션 진단</h5></Col>
​          <Col><img alt="" width="300" height="300"/></Col>
​        </Row>
​        <Row>
​          <Col><img alt="" width="300" height="300"/></Col>
​          <Col className='text-center'><h5>내 하루에 어울리는 노래와 영화 추천</h5></Col>
​        </Row>
​        <Row>
​          <Col/>
​          <Col className='text-center'><h2>Haru Emotion Diary로<br/>오직 나에게만 집중해보세요</h2></Col>
​          <Col/>
​        </Row>
​        <Row>
​          <Col className='text-center'>
​          <Link to="/login"><Button variant="info" className='text-center'>오늘 하루 진단받기</Button></Link>
​          </Col>
​        </Row>
​        </Container>


​    </div>
  )
}

export default Introduce