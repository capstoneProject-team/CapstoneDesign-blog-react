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
    { emotion: "happy", emoticon: "π", result: happy, emotionName: "κΈ°μ¨μ΄", emotionKeyword: "κΈ°λΆ μ’μ" },
    { emotion: "sad", emoticon: "π­", result: sad, emotionName: "μ¬νμ΄", emotionKeyword: "μ°μΈν" },
    { emotion: "angry", emoticon: "π€¬", result: angry, emotionName: "λΆλΈκ°", emotionKeyword: "λΉ‘μΉλ" },
    { emotion: "hurt", emoticon: "π€", result: hurt, emotionName: "μμ²κ°", emotionKeyword: "μ§μΉ  λ" },
    { emotion: "anxious", emoticon: "π¨", result: anxious, emotionName: "λΆμμ΄", emotionKeyword: "λΆμν" },
    { emotion: "statrled", emoticon: "π³", result: startled, emotionName: "λΉν©μ΄", emotionKeyword: "μ΄μ΄μλ" },
  ]

  const emotionSort = emotionList.sort(function (a, b) {
    return b.result - a.result; //λ΄λ¦Όμ°¨μ 
  });

  const bestEmotionEmoticon = emotionSort[0].emoticon;



  return (
    <Link to={`/diary-detail/${detail.id}`} style={{ textDecoration: 'none' }}>
      <Container style={{ paddingLeft: "5%", paddingRight: "5%" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div style={{ width: "75%" }}>
            {calResult == 0 ? <h4>π {detail.title}</h4> : <h4>{bestEmotionEmoticon} &nbsp; {detail.title}</h4>}
            <br />
            <div style={{ fontSize: "10pt", color: "grey", paddingLeft: "6%", paddingRight: "6%" }}>
              <p style={{ color: "grey" }}>{newnewtext.substr(0, 200)}...</p>
              <br />
              <div>{moment(detail.created_at).format('YYYYλ MMμ DDμΌ')}</div> </div>
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