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
      { emotion: "happy", emoticon: "π", result: ((happy/ calResult) * 100).toFixed(0), emotionName: "κΈ°μ¨" },
      { emotion: "sad", emoticon: "π­", result: ((sad / calResult) * 100).toFixed(0), emotionName: "μ¬ν" },
      { emotion: "angry", emoticon: "π€¬", result: ((angry / calResult) * 100).toFixed(0), emotionName: "λΆλΈ" },
      { emotion: "hurt", emoticon: "π€", result: ((hurt/ calResult) * 100).toFixed(0), emotionName: "μμ²" },
      { emotion: "anxious", emoticon: "π¨", result: ((anxious / calResult) * 100).toFixed(0), emotionName: "λΆμ" },
      { emotion: "statrled", emoticon: "π³", result: ((startled/ calResult) * 100).toFixed(0), emotionName: "λΉν©" },
    ]
    //best emotion κ΄λ ¨ UseState
    const [bestEmotion, setBestEmotion] = useState("");
    const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("π");
    const [bestEmotionResult, setBestEmotionResult] = useState("");
    const [bestEmotionName, setBestEmotionName] = useState("");
  
    const emotionResultList = (emotionList) => {
      let emotionResult = emotionList.sort(function (a, b) {
        return b.result - a.result; //λ΄λ¦Όμ°¨μ 
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
              <Col id='fontBig'>π</Col>
              <Col id='fontSmall' style={{color: "black"}}>λΆμ μ€ν¨</Col>
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