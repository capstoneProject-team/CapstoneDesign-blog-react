import React, {useState, useEffect} from 'react'
import {Figure, Container} from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import {Divider, Col, Row, Typography} from 'antd';
import noimage from '../image/noimage.png';
const PostCard = ({detail}) => {
  //상세페이지로 넘어가기 
  const { Title} = Typography;
  const moveToDetail = () => {
    
  }

  const text = detail.content;
  const newtext = text.replace(/(<([^>]+)>)/ig,"");

  const emotion = detail.mainEmotion;

  const[emotionIcon, setEmotionIcon] =  useState("")

  const handleImageError = (e) => {
    e.target.src = noimage;
  }
    
  const textEmotionToIcon = (emotion) => {
    if (emotion == 'happy'){
      setEmotionIcon("😄")
    }
    if (emotion == 'sad'){
      setEmotionIcon("😭")
    }
    if (emotion == 'angry'){
      setEmotionIcon("🤬")
    }
    if (emotion == 'hurt'){
      setEmotionIcon("🤕")
    }
    if (emotion == 'anxious'){
      setEmotionIcon("😨")
    }
    if (emotion == 'statrled'){
      setEmotionIcon("😳")
    }
    else{
      setEmotionIcon("🤪")
    }
  }
  useEffect(()=>{
    textEmotionToIcon(emotion);
  }, [])

  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container>
        <Row  align='middle' justify='center'>
          <Col span={3} style={{fontSize:"30px"}}>{emotionIcon}</Col>
          <Col span={15}><Title level={1}>{detail.title}</Title>
          <br/><Title level={5} ellipsis={true} >{newtext}</Title>
          <br/>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</Col>
          <Col span={3}>{
          detail.photo && (
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="게시물 사진"
                src={detail.photo}
                onError={handleImageError}
              />
            </Figure> 
          )
        }</Col>
        </Row>
      
        <br/>
        <Divider/>
        <br/>

        </Container>
    </Link>
  )
}

export default PostCard