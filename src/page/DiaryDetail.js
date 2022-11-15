import {React,useState,useEffect} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link, useParams} from "react-router-dom";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getStorageItem, { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from 'axios';
import { Divider } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';
import moment from 'moment';



const DiaryDetail = ({setNavVisible}) => {
  setNavVisible(true);

  const token = getJwtAtStorage(); //getStorageItem('jwtToken', '')[0];
  const { nickname } = jwt_decode(token);

  const {post_id} = useParams();

  const [created_at, setCreate_at] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [link, setLink] = useState([]);
  const [params, setParams] = useState({
    key : `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    part: 'snippet',
    q: `${'슬플 때'}노래모음`,
    maxResults: 10,
    type: 'video',
    videoDuration: 'long'
  });
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    const response = async() => {
      await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post/${post_id}`, {headers: {Authorization: `Bearer ${getJwtAtStorage()}`}}).then((res) => {
      console.log(res);
      const data = res.data;
      setCreate_at(data.created_at);
      setTitle(data.title);
      setContent(data.content);
      setPhoto(data.photo);
      setKeyword(data.keyword);
      })
    }
      response();
  },[]);

  useEffect(() => {
    const youtube = async() => {
      const response = await Axios.get(`https://www.googleapis.com/youtube/v3/search`,{ params });
      console.log(response.data.items);
      setYoutubeVideos(response.data.items);
    }
     youtube(); 
  },[]);

  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
           {title}
          </Col>
          <Col>{nickname} | {moment(created_at).format('YYYY년 MM월 DD일')}</Col>
          <Divider/>
          <Col className='body'>
            {content}
          </Col>
          <Col>
            <img src={photo} alt='image'/>
          </Col>
          <Divider/>
          <Col>
          <h1>일기감정분석결과</h1>
          </Col>
          <Col><h1>추천 플레이리스트</h1></Col>
          {
            shuffle(youtubeVideos).slice(0, 5).map((element) => {
              return (<iframe width='200' height='120' src={`https://www.youtube.com/embed/${element.id.videoId}`} frameborder='0' allow='accelerometer; autoplay; clip-board-write; gyroscope; picture-in-picture' allowFullscreen></iframe>)
            })
          }
        </Row>
      </Container>
    </div>
  )
}

export default DiaryDetail