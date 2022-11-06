import {React,useState,useEffect} from 'react'
import Navigation from '../component/Navigation'
import { Routes, Route ,Link} from "react-router-dom";
import { Container, Row, Col, Button, Table } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getStorageItem from '../utils/useLocalStorage';
import { Axios } from 'axios';
import { Divider } from 'antd';
import { Breadcrumb, Layout, Menu } from 'antd';




const DiaryDetail = ({setNavVisible}) => {
  setNavVisible(true);

  const token = getStorageItem('jwtToken', '')[0];
  const { nickname } = jwt_decode(token);

  const [created_at, setCreate_at] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [image, setImage] = useState([]);
  const { Header, Content, Footer } = Layout;

  useEffect(() => {
    const detail = async() => {
      const response = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post/`,{created_at, title, content, image});
      setCreate_at(created_at);
      setTitle(title);
      setContent(content);
      setImage(image);
  }},[]);

  return (
    <div>
      <Container>
        <Row>
          <Col>
          <title>{title}</title>
          </Col>
          <Col>{nickname}, {created_at}</Col>
          <Divider/>
          <Col className='body'>
            {content}
          </Col>
          <Col>
            {image}
          </Col>
          <Divider/>
          <Col>
          <h1>일기감정분석결과</h1>
          </Col>
          <Col>
          <h1>
            추천 플레이리스트</h1></Col>
        </Row>
      </Container>
    </div>
  )
}

export default DiaryDetail