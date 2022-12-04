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
  const handleImageError = (e) => {
    e.target.src = noimage;
  }
  //best emotion 관련 UseState
  const [bestEmotion, setBestEmotion] = useState("");
  const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("🔎");
  const [bestEmotionResult, setBestEmotionResult] = useState("");
  const [bestEmotionName, setBestEmotionName] = useState("");

  console.log(detail.happy);

  const calResult = detail.happy + detail.sad + detail.angry + detail.hurt + detail.anxious + detail.statrled;


  const emotionList = [
    { emotion: "happy", emoticon: "😄", result: ((detail.happy / calResult) * 100).toFixed(1), emotionName: "기쁨" },
    { emotion: "sad", emoticon: "😭", result: ((detail.sad / calResult) * 100).toFixed(1), emotionName: "슬픔" },
    { emotion: "angry", emoticon: "🤬", result: ((detail.angry / calResult) * 100).toFixed(1), emotionName: "분노" },
    { emotion: "hurt", emoticon: "🤕", result: ((detail.hurt / calResult) * 100).toFixed(1), emotionName: "상처" },
    { emotion: "anxious", emoticon: "😨", result: ((detail.anxious / calResult) * 100).toFixed(1), emotionName: "불안" },
    { emotion: "statrled", emoticon: "😳", result: ((detail.statrled / calResult) * 100).toFixed(1), emotionName: "당황" },
  ]
  console.log(emotionList[0])
  const emotionResultList = (emotionList) => {
    let emotionResult = emotionList.sort(function (a, b) {
      return b.result - a.result; //내림차순 
    })

    setBestEmotion(emotionResult[0].emotion);
    setBestEmotionResult(emotionResult[0].result);
    setBestEmotionEmoticon(emotionResult[0].emoticon);
    setBestEmotionName(emotionResult[0].emotionName);
  }


  useEffect(() => {
    emotionResultList(emotionList);

  }, [calResult])


  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "75%" }}>
            <MainEmtoion detail={detail} />
            <h4>{bestEmotionEmoticon} &nbsp; {detail.title}</h4>
            <br />
            <div style={{ fontSize: "10pt", color: "grey", paddingLeft: "6%", paddingRight: "6%" }}>
              <p style={{ color: "grey" }}>{newnewtext.substr(0, 200)}...</p>
              <br />
              <div>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</div> </div>
          </div>

          <div>{detail.photo && (
            <img src={detail.photo} onError={handleImageError} style={{ width: "200px", height: "200px", objectFit: "cover" }} />

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