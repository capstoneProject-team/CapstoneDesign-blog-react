import "../static/CSS/MainTrend.css";
import { React, useEffect, useState } from 'react'
import { Container, Col, Row} from 'react-bootstrap';
import { Link } from "react-router-dom";
import moment from 'moment';


const MainTrend = ({detail}) => {
    const text = detail.content;
    const happy = detail.happy;
    const sad = detail.sad;
    const angry = detail.angry;
    const hurt = detail.hurt;
    const anxious = detail.anxious;
    const startled = detail.startled;
    const calResult = happy + sad + angry + hurt + anxious + startled;

    const emotionList = [
      { emotion: "happy", emoticon: "😄", result: ((happy/ calResult) * 100).toFixed(0), emotionName: "기쁨" },
      { emotion: "sad", emoticon: "😭", result: ((sad / calResult) * 100).toFixed(0), emotionName: "슬픔" },
      { emotion: "angry", emoticon: "🤬", result: ((angry / calResult) * 100).toFixed(0), emotionName: "분노" },
      { emotion: "hurt", emoticon: "🤕", result: ((hurt/ calResult) * 100).toFixed(0), emotionName: "상처" },
      { emotion: "anxious", emoticon: "😨", result: ((anxious / calResult) * 100).toFixed(0), emotionName: "불안" },
      { emotion: "statrled", emoticon: "😳", result: ((startled/ calResult) * 100).toFixed(0), emotionName: "당황" },
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
  
      
    if (calResult == 0){
      return (
        <Container>
            <Link id="noblue" to={`/diary-detail/${detail.id}`} >
            <Row>
              <Col id='fontSmall'style={{color: "black"}}>{moment(detail.created_at).format('YYYY-MM-DD')}</Col>
              <Col id='fontBig'>👀</Col>
              <Col id='fontSmall' style={{color: "black"}}>분석 실패</Col>
            </Row>
            </Link>
          </Container>
      )
    }
  else{
    return (
      
          <Container>
            <Link id="noblue" to={`/diary-detail/${detail.id}`} >
            <Row>
              <Col id='fontSmall'style={{color: "black"}}>{moment(detail.created_at).format('YYYY-MM-DD')}</Col>
              <Col id='fontBig'>{bestEmotionEmoticon}</Col>
              <Col id='fontSmall' style={{color: "black"}}>{bestEmotionResult}%</Col>
            </Row>
            </Link>
          </Container>
    )
}
  }
    

export default MainTrend