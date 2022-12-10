import React from 'react'
import { Container } from 'react-bootstrap';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';
import noimage from '../static/image/noimage.png';
import { useMediaQuery } from 'react-responsive';

const PostCard = ({ detail }) => {
  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 701 })
    return isMobile ? children : null
  }
  const Default = ({ children }) => {
    const isNotMobile = useMediaQuery({ minWidth: 700 })
    return isNotMobile ? children : null
  }


  const text = detail.content;

  const newtext = text.replace(/(<([^>]+)>)/ig, "");
  const newnewtext = newtext.replace(/&nbsp;/g, "");
  const handleImageError = (e) => {
    e.target.src = noimage;
  }
  const calResult = detail.happy + detail.sad + detail.angry + detail.hurt + detail.anxious + detail.startled;
  const happy = ((detail.happy / calResult) * 100).toFixed(1);
  const sad = ((detail.sad / calResult) * 100).toFixed(1)
  const angry = ((detail.angry / calResult) * 100).toFixed(1)
  const hurt = ((detail.hurt / calResult) * 100).toFixed(1)
  const anxious = ((detail.anxious / calResult) * 100).toFixed(1)
  const startled = ((detail.startled / calResult) * 100).toFixed(1)

  const emotionList = [
    { emotion: "happy", emoticon: "😄", result: happy, emotionName: "기쁨이", emotionKeyword: "기분 좋은" },
    { emotion: "sad", emoticon: "😭", result: sad, emotionName: "슬픔이", emotionKeyword: "우울한" },
    { emotion: "angry", emoticon: "🤬", result: angry, emotionName: "분노가", emotionKeyword: "빡치는" },
    { emotion: "hurt", emoticon: "🤕", result: hurt, emotionName: "상처가", emotionKeyword: "지칠 때" },
    { emotion: "anxious", emoticon: "😨", result: anxious, emotionName: "불안이", emotionKeyword: "불안한" },
    { emotion: "statrled", emoticon: "😳", result: startled, emotionName: "당황이", emotionKeyword: "어이없는" },
  ]

  const emotionSort = emotionList.sort(function (a, b) {
    return b.result - a.result; //내림차순 
  });

  const bestEmotionEmoticon = emotionSort[0].emoticon;



  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "75%" }}>
            {calResult == 0 ? <h4>👀 {detail.title}</h4> : <h4>{bestEmotionEmoticon} &nbsp; {detail.title}</h4>}
            <br />
            <div style={{ fontSize: "10pt", color: "grey", paddingLeft: "6%", paddingRight: "6%" }}>
              <p style={{ color: "grey" }}>{newnewtext.substr(0, 200)}...</p>
              <br />
              <div>{moment(detail.created_at).format('YYYY년 MM월 DD일')}</div> </div>
          </div>

          <Default>
            <div>{detail.photo && (
              <img src={detail.photo} onError={handleImageError} style={{ width: "200px", height: "200px", objectFit: "cover" }} />
            )}
            </div>
          </Default>
          <Mobile>
            <div>{detail.photo && (
              <img src={detail.photo} onError={handleImageError} style={{ width: "100px", height: "100px", objectFit: "cover" }} />
            )}
            </div>
          </Mobile>
        </div>
        <Divider />
        <br />

      </Container>
    </Link>
  )
}

export default PostCard