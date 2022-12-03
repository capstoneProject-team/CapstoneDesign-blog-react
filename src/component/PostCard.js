import React, { useState, useEffect } from 'react'
import { Figure, Container } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Divider, Col, Row, Typography } from 'antd';
import noimage from '../image/noimage.png';
import MainEmtoion from './MainEmotion.js'
const PostCard = ({ detail }) => {


  const text = detail.content;
  const newtext = text.replace(/(<([^>]+)>)/ig, "");
  const newnewtext = newtext.replace(/&nbsp;/g, "");
  // const emotion = detail.mainEmotion;

  // const [emotionIcon, setEmotionIcon] = useState("")
  // // const textEmotionToIcon = (emotion) => {
  // //   if (emotion == 'happy') {
  // //     setEmotionIcon("😄")
  // //   }
  // //   if (emotion == 'sad') {
  // //     setEmotionIcon("😭")
  // //   }
  // //   if (emotion == 'angry') {
  // //     setEmotionIcon("🤬")
  // //   }
  // //   if (emotion == 'hurt') {
  // //     setEmotionIcon("🤕")
  // //   }
  // //   if (emotion == 'anxious') {
  // //     setEmotionIcon("😨")
  // //   }
  // //   if (emotion == 'statrled') {
  // //     setEmotionIcon("😳")
  // //   }
  // //   else {
  // //     setEmotionIcon("🤪")
  // //   }
  // // }
  // // useEffect(() => {
  // //   textEmotionToIcon(emotion);
  // // }, [])
  const handleImageError = (e) => {
    e.target.src = noimage;
  }



  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{display:"flex", justifyContent : "space-between"}}>
          <div style={{width:"75%"}}>
            <MainEmtoion detail={detail}/>
            <h4>{emotionIcon} &nbsp; {detail.title}</h4>
            <br/>
            <div style={{fontSize:"10pt", color: "grey", paddingLeft:"6%", paddingRight:"6%"}}>
            <p style={{ color: "grey"}}>{newnewtext.substr(0, 200)}...</p> 
            <br/>
            <div>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</div> </div>
          </div>

          <div>{detail.photo && (
            <img src={detail.photo} onError={handleImageError} style={{width:"200px", height : "200px", objectFit : "cover"}}/>

          )}
          </div>
        </div>

        <Divider />
        <br />

      </Container>
    </Link>
  )
}

export default PostCard