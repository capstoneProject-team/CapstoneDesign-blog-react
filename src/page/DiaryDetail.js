import { React, useState, useEffect } from 'react'
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { Container, Row, Col, Button, Dropdown, Modal, ProgressBar } from 'react-bootstrap';
import jwt_decode from "jwt-decode";
import getStorageItem, { getJwtAtStorage } from '../utils/useLocalStorage';
import Axios from 'axios';

//antd
import { Divider, notification } from 'antd';
import { MoreOutlined, SmileOutlined, FrownOutlined, LoadingOutlined } from '@ant-design/icons';

import moment from 'moment';

const DiaryDetail = ({ setNavVisible }) => {
  setNavVisible(true);

  const navigate = useNavigate();

  const navigateEditDiary = () => {
    navigate(`/diary-edit/${post_id}`)
  }



  const token = getJwtAtStorage(); //getStorageItem('jwtToken', '')[0];
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  //작성글 관련 useState
  const { nickname } = jwt_decode(token);
  const { post_id } = useParams();
  const [created_at, setCreate_at] = useState([]);
  const [title, setTitle] = useState([]);
  const [content, setContent] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [link, setLink] = useState([]);

  //감정관련 useState
  const [happyResult, setHappyResult] = useState([]);
  const [sadResult, setSadResult] = useState([]);
  const [angryResult, setAngryResult] = useState([]);
  const [hurtResult, setHurtResult] = useState([]);
  const [anxiousResult, setAnxiousResult] = useState([]);
  const [statrledResult, setStatrledResult] = useState([]);
  const [visiable, setVisiable] = useState(false);
  const [bestEmotion, setBestEmotion] = useState("");
  const [bestEmotionEmoticon, setBestEmotionEmoticon] = useState("");
  const [bestEmotionResult, setBestEmotionResult] = useState("");

  const [params, setParams] = useState({
    key: `${process.env.REACT_APP_YOUTUBE_API_KEY}`,
    part: 'snippet',
    q: `${'슬플 때'}노래모음`,
    maxResults: 10,
    type: 'video',
    videoDuration: 'long'
  });
  console.log(process.env.REACT_APP_YOUTUBE_API_KEY);
  const [youtubeVideos, setYoutubeVideos] = useState([]);
  console.log(youtubeVideos)

  const response = async () => {
    const res = await Axios.get(`${process.env.REACT_APP_LOCAL_DJ_IP}post/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
    const data = res.data;
    console.log(data);
    setCreate_at(data.created_at);
    setTitle(data.title);
    setContent(data.content);
    setPhoto(data.photo);
    if (data.photo == null) {
      setVisiable(false);
      setPhoto(data.photo);
    } else {
      setPhoto(data.photo);
      setVisiable(true);
    }
    setHappyResult(data.happy);
    setSadResult(data.sad);
    setAngryResult(data.angry);
    setHurtResult(data.hurt);
    setAnxiousResult(data.anxious);
    setStatrledResult(data.startled);

    setKeyword(data.keyword);
    setLoadingSpinner(true);
  }

  //테스트 값만 넣어놓은 상태~
  const emotionList = [
    {emotion : "happy", emoticon : "😄", result : 600},
    {emotion : "sad", emoticon : "😭", result : 100},
    {emotion : "angry", emoticon : "🤬", result : 200},
    {emotion : "hurt", emoticon : "🤕", result : 0},
    {emotion : "anxious", emoticon : "😨", result : 60},
    {emotion : "statrled", emoticon : "😳", result : 10},
  ]
  
  const emotionResultList = (emotionList)=> {
    let emotionResult = emotionList.sort(function(a,b){
      return b.result - a.result; //내림차순 
    })
    console.log(bestEmotion, "안돼 ㅠㅠ");
    setBestEmotion(emotionResult[0].emotion);
    setBestEmotionResult(emotionResult[0].result);
    setBestEmotionEmoticon(emotionResult[0].emoticon);
  } 

  const emotionBackgroundColor =(bestEmotion)=>{
    if (bestEmotion == "happy") {
      const happyStyle = {
        backgroundColor: "#FFFFDD"
      }
      return happyStyle;
    }

    else if (bestEmotion == "statrled") {
      const statrledStyle = {
        backgroundColor: "#DDF2F8"
      }
      return statrledStyle;
    }

    else if (bestEmotion == "angry") {
      const angryStyle = {
        backgroundColor: "#F6C8C0"
      }
      return angryStyle;
    }

    else if (bestEmotion == "anxious") {
      const anxiousStyle = {
        backgroundColor: "#F2FAEC"
      }
      return anxiousStyle;
    }
    else if (bestEmotion == "hurt") {
      const hurtStyle = {
        backgroundColor: "#F5EEFE"
      }
      return hurtStyle;
    }
    else if (bestEmotion == "sad") {
      const sadStyle = {
        backgroundColor: "#DDE2F8"
      }
      return sadStyle;
    }

    }
    

  const youtube = async () => {
    const response = await Axios.get(`https://www.googleapis.com/youtube/v3/search`, { params });
    console.log(response.data.items);
    setYoutubeVideos(response.data.items);
  }

  useEffect(() => {
    response();
    youtube();
    emotionResultList(emotionList);
    
  },[]);




  const shuffle = (arr) => {
    return arr.sort(() => Math.random() - 0.5);
  }
  let now = 0;
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteDiary = async (event) => {
    event.preventDefault();
    try {
      const response = await Axios.delete(`${process.env.REACT_APP_LOCAL_DJ_IP}post/delete/${post_id}`, { headers: { Authorization: `Bearer ${getJwtAtStorage()}` } })
      handleClose();
      notification.open({
        message: "일기가 삭제되었습니다.",
        icon: <SmileOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });
      navigate('/diary-list')
    } catch (e) {
      console.log(e)
      notification.open({
        message: "일기 삭제 실패, 다시 시도해 주세요.",
        icon: <FrownOutlined style={{ color: "#108ee9" }} />,
        placement: 'topRight'
      });

    }
  }
  if (loadingSpinner == false) {
    return (
      <div className='loadingSpinner'>
        <LoadingOutlined style={{ fontSize: 100, color: 'blue', margin: '300px 300px' }} spin />
      </div>
    )
  } else {
    return (
      <div>
        <br />
        <div style={emotionBackgroundColor(bestEmotion)}> 
        <Container style={{ paddingLeft: '6%', paddingRight: '6%', border : "1px", borderRadius : "20px" }}>
          <div className='detailTop'>
            <div className='detailTitle'>
              <h2>{title}</h2>
              <br />
            </div>
            <div className='line2' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: "-25px" }}>
              <div className='writeDateWho' style={{ marginTop: "10px" }}>
                <p style={{ fontSize: '10.5pt' }}>
                  {nickname} &nbsp; <span style={{ color: 'grey' }}>{moment(created_at).format('YYYY년 MM월 DD일')}</span> </p>
              </div>
              <Dropdown>
                <Dropdown.Toggle className="shadow-none" drop="start" key="start"
                  style={{ backgroundColor: "white", border: "none", outline: "none" }}>
                  <MoreOutlined style={{ color: "grey" }} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item onClick={navigateEditDiary}>수정하기</Dropdown.Item>
                  <Dropdown.Item onClick={handleShow}>삭제하기</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
          <Divider />
          <div className='body'>
            <div className='detailImage' style={{ textAlign: 'center' }}>
              {console.log(visiable, "이미지")}
              {visiable && <img src={photo} alt='image' style={{ width: 'auto', height: 'auto', maxWidth: "300px", maxHeight: "300px" }} />}</div>
            <p dangerouslySetInnerHTML={{ __html: content }}></p>
          </div>
          <Col>

          </Col>
          <Divider />
          <Row>
            <Col>
              <div className='detailTitle'>
                <h3>일기감정분석결과</h3>
              </div>

              <Col className="mt-3" style={{ paddingLeft: "3%", paddingRight: "3%" }}>
                <Row style={{ justifyContent: "center", backgroundColor: "grey" }}>
                  <Col className='mt-4' sm={2}>
                    <div style={{ fontSize: "40pt" }}>{bestEmotionEmoticon}</div>
                  </Col>
                  <Col className='mt-4' sm={4}>
                    <Row>
                      <Col sm={2}><p>기쁨</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={happyResult} label={`${now}%`} /> </Col>
                    </Row>
                    <Row>
                      <Col sm={2}><p>슬픔</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={sadResult} label={`${now}%`} /> </Col>
                    </Row>
                    <Row>
                      <Col sm={2}><p>분노</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={angryResult} label={`${now}%`} /> </Col>
                    </Row>
                  </Col>
                  <Col className='mt-4' sm={4}>
                    <Row>
                      <Col sm={2}><p>상처</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={hurtResult} label={`${now}%`} /> </Col>
                    </Row>
                    <Row>
                      <Col sm={2}><p>당황</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={statrledResult} label={`${now}%`} /> </Col>
                    </Row>
                    <Row>
                      <Col sm={2}><p>불안</p></Col>
                      <Col sm={8}><ProgressBar variant="warning" now={anxiousResult} label={`${now}%`} /> </Col>
                    </Row>
                  </Col>
                </Row>
              </Col>
              <Divider />
            </Col>
            <Col>
              <div className='detailTitle'>
                <h3>추천 플레이리스트</h3>
              </div>
              <Col>
                {
                  shuffle(youtubeVideos).slice(0, 3).map((element) => {
                    return (
                      <Col><iframe src={`https://www.youtube.com/embed/${element.id.videoId}`} frameborder='0' allow='accelerometer; autoplay; clip-board-write; gyroscope; picture-in-picture' allowFullscreen></iframe></Col>
                    )
                  })
                }
              </Col>
            </Col>
          </Row>

        </Container>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>일기 삭제</Modal.Title>
            </Modal.Header>
            <Modal.Body>일기를 삭제하시겠습니까?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                취소
              </Button>
              <Button variant="danger" onClick={deleteDiary}>
                삭제
              </Button>
            </Modal.Footer>
          </Modal>
      </div >
    )
  }
}
export default DiaryDetail