import React, { useState, useEffect } from 'react'
import { Figure, Container } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Divider, Col, Row, Typography } from 'antd';
import noimage from '../static/image/noimage.png';

const PostCard = ({ detail }) => {
  const text = detail.content;
  const happy = detail.happy;
  const sad = detail.sad;
  const angry = detail.angry;
  const hurt = detail.hurt;
  const anxious = detail.anxious;
  const startled = detail.startled;

  const newtext = text.replace(/(<([^>]+)>)/ig, "");
  const newnewtext = newtext.replace(/&nbsp;/g, "");
  const handleImageError = (e) => {
    e.target.src = noimage;
  }

  const calResult = happy + sad + angry + hurt + anxious + startled;

  const emotionList = [
    { emotion: "happy", emoticon: "😄", result: ((happy/ calResult) * 100).toFixed(1), emotionName: "기쁨" },
    { emotion: "sad", emoticon: "😭", result: ((sad / calResult) * 100).toFixed(1), emotionName: "슬픔" },
    { emotion: "angry", emoticon: "🤬", result: ((angry / calResult) * 100).toFixed(1), emotionName: "분노" },
    { emotion: "hurt", emoticon: "🤕", result: ((hurt/ calResult) * 100).toFixed(1), emotionName: "상처" },
    { emotion: "anxious", emoticon: "😨", result: ((anxious / calResult) * 100).toFixed(1), emotionName: "불안" },
    { emotion: "statrled", emoticon: "😳", result: ((startled/ calResult) * 100).toFixed(1), emotionName: "당황" },
  ]
  //best emotion 관련 UseState
  const [bestEmotion, setBestEmotion] = useState("");
  const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("🔎");
  const [bestEmotionResult, setBestEmotionResult] = useState("");
  const [bestEmotionName, setBestEmotionName] = useState("");

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

  }, [])


  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "75%" }}>
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