import { React, useEffect, useState } from 'react'
import { Container, Button, Table } from 'react-bootstrap';
import { Routes, Route, Link } from "react-router-dom";
import {Col, Row, List, Card, Typography} from 'antd';

const MainTrend = ({detail}) => {
    let diaryDateData =  new Date(detail.created_at).toISOString().split('T')[0]; //다이어리 작성 날짜
    let diaryEmotionData = detail.mainEmotion; //다이어리 작성 날짜
    let diaryEmotionStaticData = ['50%'];

    const { Title} = Typography;

    let now = new Date();
    let newDay = new Date();
    const dateFormatter = (newDay, now) => {
        let year = newDay.getFullYear();
        let month = newDay.getMonth() + 1;
        let date = newDay.getDate();

        if (now) {
            let todayDate = now.getDate();
            if (date != todayDate) {
                if (month == 0) {
                    year -= 1;
                    month = (month + 11) % 12;
                    date = new Date(year, month, 0).getDate(); //해당 달의 마지막 날짜를 반환
                }
            }
            month = ("0" + month).slice(-2);
            date = ("0" + date).slice(-2);

        }
        return year + "-" + month + "-" + date;
    }
    let newDayArray = [];
    for (var i = 0; i < 7; i++) {
        newDay.setDate(now.getDate() - i);
        let diaryOfweek = dateFormatter(newDay);
        newDayArray.push(diaryOfweek);
    }

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
      else{
        setEmotionIcon("🤪")
      }
    }
    useEffect(()=>{
      textEmotionToIcon(diaryEmotionData);
    }, [])
  
    return (
        <div style={{display : 'flex', justifyContent : 'space-evenly'}}>
          <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
              <div style={{width: '33%'}}>{diaryDateData}</div>
              <div style={{width: '33%'}}>{emotionIcon}</div>
              <div style={{width: '33%'}}>{diaryEmotionStaticData}</div>
            </Link>
        </div>
    )
}

export default MainTrend