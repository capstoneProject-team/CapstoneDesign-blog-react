import React, {useState, useEffect} from 'react'
import {Figure, Container, Row, Col} from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
const PostCard = ({detail}) => {
  //상세페이지로 넘어가기 
  const moveToDetail = () => {
    
  }

  const emotion = detail.mainEmotion;

  const[emotionIcon, setEmotionIcon] =  useState("")
    
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
  }
  useEffect(()=>{
    textEmotionToIcon(emotion);
  }, [])


  console.log('detail = ' + detail.title)
  return (
    <Link to={`/diary-detail/${detail.id}`}>
      <Container>
        <Row>
          <Col>{detail.title} </Col>
        </Row>
        <Row>
          <Col>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</Col>
        </Row>
        {
          detail.photo && (
            <Figure>
              <Figure.Image
                width={171}
                height={180}
                alt="게시물 사진"
                src={detail.photo}
              />
            </Figure> 
          )
        }
      
        <br/><br/><br/> 

        </Container>
    </Link>
  )
}

export default PostCard