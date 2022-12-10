import { React, useEffect, useState } from 'react'
import { Container } from 'react-bootstrap';
import WeatherDate from '../component/MainWeather';
import MainBanner from '../component/MainBanner';
import MainPrologue from '../component/MainPrologue';
import MainTrend from '../component/MainTrend';
import jwt_decode from "jwt-decode";
import { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from "axios";
import { LoadingOutlined } from '@ant-design/icons';
import { Row, Col, Carousel, List, Typography } from 'antd';
import "../static/CSS/Main.css";
import { useMediaQuery } from 'react-responsive'


const Main = ({ setNavVisible }) => {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 699 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 700 })
    return isNotMobile ? children : null
  }


  //네비게이션바 관련 
  setNavVisible(true);

  // spinner
  const [loadingSpinner, setLoadingSpinner] = useState(false);

  const { Title } = Typography;


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
  const [data, setData] = useState([])

  const noPost = (cnt) => {
    if (cnt === 0) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }

  const [visible, setVisible] = useState(false)

  useEffect(() => {
    getData();
  }, [loadingSpinner]);


  const getData = async () => {
    const res = await Axios.get(`http://3.36.254.187:8000/post?page=1&author_id=${user_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } });
    setPost(res.data.results);
    setPostCnt(res.data.count);
    setData(res.data)
    setLoadingSpinner(true);
  }

  useEffect(() => {
    setSlicedPost(Array.from(post).slice(0, 3));
    noPost(postCnt);
  }, [post]);

  if (loadingSpinner === false) {
    return (
      <div className='loadingSpinner'>
        <LoadingOutlined id='Spinner' spin />
      </div>
    )
  } else {
    return (
      <div>
        <div className='Container'>
          <Row gutter={12} id='row1'>
            <Col span={24}>
              <WeatherDate todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek} />
              <MainBanner detail={data} todayYear={todayYear} todayMonth={todayMonth} todayDate={todayDate} dayOfweek={dayOfweek} />
            </Col>
          </Row>
          <Default>
            <Row>
              <Col span={12} id='col'><h3>Prologue✨</h3>
                <br />
                <Carousel id='Carousel' autoplay>
                  {slicedPost.map(detail => (<MainPrologue detail={detail} />))}
                </Carousel>
                {visible && <div id='div'>
                  <Row id='row2'>
                    <Col span={24} align='middle' justify='center'>
                      <Title disabled strong>
                        작성하신 일기가 없습니다 🥲
                      </Title>
                    </Col>
                  </Row>
                </div>}
              </Col>
              <Col span={12} id='col'><h3>Trend📈</h3>
                <br />

                <List
                  header={<div>최근 일기</div>}
                  size="large"
                  bordered
                  dataSource={post.map(detail => (<MainTrend detail={detail} />))}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Default>
          <Mobile>
            <Row>
              <Col style={{width : "100%"}}><h3>Prologue✨</h3>
                <br />
                <Carousel id='Carousel' autoplay>
                  {slicedPost.map(detail => (<MainPrologue detail={detail} />))}
                </Carousel>
                {visible && <div id='div'>
                  <Row id='row2'>
                    <Col span={24} align='middle' justify='center'>
                      <Title disabled strong>
                        작성하신 일기가 없습니다 🥲
                      </Title>
                    </Col>
                  </Row>
                </div>}
              </Col>
              <Col style={{width : "100%"}}><h3>Trend📈</h3>
                <br />

                <List
                  header={<div>최근 일기</div>}
                  size="large"
                  bordered
                  dataSource={post.map(detail => (<MainTrend detail={detail} />))}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Mobile>

          <br />
          <br />
          <br />


        </div>
      </div>
    )
  }
}


export default Main