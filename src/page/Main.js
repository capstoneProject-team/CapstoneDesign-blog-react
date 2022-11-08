import { React, useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import WeatherDate from '../component/WeatherDate';
import MainBanner from '../component/MainBanner';
import MainPrologue from '../component/MainPrologue';
import MainTrend from '../component/MainTrend';


const Main = ({ setNavVisible }) => {
  //메인 새로고침(데이터 변경 시, 반영을 위해서)
  // window.location.replace("/main")
  
  //네비게이션바 관련 
  setNavVisible(true);


  // 날짜 가져오기
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth = now.getMonth() + 1;
  let todayDate = now.getDate();
  const week = ['일', '월', '화', '수', '목', '금', '토'];
  let dayOfweek = week[now.getDay()];

  return (
    <div>
      <Container>
        <Col className="body">
          <Row>
              <WeatherDate todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek}/>
          </Row>

          <Row>
            <MainBanner todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek}/>
          </Row>

          <Row className="mt-4">
            <Col><MainPrologue/></Col>
            <Col><MainTrend/></Col>
          </Row>

        </Col>

      </Container>
    </div>
  )
}


export default Main