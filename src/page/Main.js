import { React, useEffect, useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import WeatherDate from '../component/MainWeather';
import MainBanner from '../component/MainBanner';
import MainPrologue from '../component/MainPrologue';
import MainTrend from '../component/MainTrend';
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from "axios";

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

  // jwt token
  let jwt = localStorage.getItem('jwtToken');
  jwt = jwt.substring(1, jwt.length - 1)
  const { user_id } = jwt_decode(jwt);

  // 전체 정보가 담긴 list
  const [post, setPost] = useState([]);
  const [slicedPost, setSlicedPost] = useState([]);

  const [postCnt, setPostCnt] = useState(0);

  useEffect(() => {
    const getData = async() => {
    const res = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post?page=1&author_id=${user_id}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}});
    setPost(res.data.results);
    setPostCnt(res.data.count);
  }

  getData();
  },[])

//   useEffect(() => {
//     window.location.replace("/main")
// }, [])
  return (
    <div>
      <Container style={{paddingLeft : '8%', paddingRight : '8%'}}>
        <Col className="body">
            <Row><WeatherDate todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek} /></Row>
          <Row>
            <MainBanner todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek}/>
          </Row>
          <Col><h3>Prologue✨</h3></Col>
          <Col>{post.map(detail => (<MainPrologue detail={detail}/>))}</Col>
          <Col>
                <h3>Trend📈</h3>
                <Col className='box'>
                    <table class="table table-borderless">
                        <thead>
                            <tr>
                                <th>날짜</th>
                                <th>감정</th>
                                <th>퍼센트</th>
                            </tr>
                        </thead>
                        <tbody>
                        {post.map(detail => (<MainTrend detail={detail}/>))}
                        </tbody>
                    </table>
                </Col>
            </Col>
          
          <Col></Col>
            
        <br/>
        <br/>
        <br/>
        </Col>

      </Container>
    </div>
  )
}


export default Main